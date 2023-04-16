import {
    ControllerToRemoteControl,
    RemoteControlTeamState,
    RemoteControlToController
} from '../proto/ssl_gc_rcon_remotecontrol';
import {ControllerReply_StatusCode} from '../proto/ssl_gc_rcon';

export class ApiController {
    private readonly apiPath = '/api/control'
    private ws ?: WebSocket
    private stateConsumer: ((state: RemoteControlTeamState) => any)[] = []
    private errorConsumer: ((message: string) => any)[] = []

    private latestState: RemoteControlTeamState

    constructor(latestState: RemoteControlTeamState) {
        this.latestState = latestState
        this.connect(this.determineWebSocketAddress())
    }

    public Send(request: RemoteControlToController) {
        const ws = this.ws
        if (ws) {
            const json = JSON.stringify(RemoteControlToController.toJSON(request))
            ws.send(json)
        }
    }

    public RegisterStateConsumer(cb: ((state: RemoteControlTeamState) => any)) {
        this.stateConsumer.push(cb)
        cb(this.latestState)
    }

    public RegisterErrorConsumer(cb: ((message: string) => any)) {
        this.errorConsumer.push(cb)
    }

    private determineWebSocketAddress() {
        const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
        return protocol + '//' + window.location.hostname + ':' + window.location.port + this.apiPath
    }

    private connect(address: string) {
        const ws = new WebSocket(address);

        ws.onmessage = (e) => {
            const reply = ControllerToRemoteControl.fromJSON(JSON.parse(e.data))
            if (reply.controllerReply?.statusCode === ControllerReply_StatusCode.OK && reply.state) {
                this.latestState = reply.state
                for (const callback of this.stateConsumer) {
                    callback(reply.state)
                }
            } else if (reply.controllerReply?.statusCode === ControllerReply_StatusCode.REJECTED) {
                for (const callback of this.errorConsumer) {
                    callback(reply.controllerReply.reason)
                }
            }
        };

        ws.onclose = () => {
            setTimeout(() => {
                this.connect(address)
            }, 1000);
        };

        ws.onerror = () => {
            ws.close()
        };

        this.ws = ws;
    }
}

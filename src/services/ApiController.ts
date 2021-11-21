import {
    ControllerToRemoteControl,
    RemoteControlTeamState,
    RemoteControlToController
} from '../proto/ssl_gc_rcon_remotecontrol';
import {ControllerReply_StatusCode} from '../proto/ssl_gc_rcon';

export class ApiController {
    private ws ?: WebSocket
    private stateConsumer: ((state: RemoteControlTeamState) => any)[] = []

    constructor() {
        this.connect(ApiController.determineWebSocketAddress())
    }

    public Send(request: RemoteControlToController) {
        const ws = this.ws
        if (ws) {
            const json = JSON.stringify(RemoteControlToController.toJSON(request))
            ws.send(json)
        }
    }

    public SendState(obj: any) {
        this.Send(RemoteControlToController.fromJSON(obj))
    }

    public RegisterStateConsumer(cb: ((state: RemoteControlTeamState) => any)) {
        this.stateConsumer.push(cb)
    }

    private static determineWebSocketAddress() {
        if (process.env.NODE_ENV === 'development') {
            // use the default backend port
            return 'ws://localhost:8083/api/control'
        }
        // UI and backend are served on the same host+port on production builds
        const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
        return protocol + '//' + window.location.hostname + ':' + window.location.port + '/api/control'
    }

    private connect(address: string) {
        const ws = new WebSocket(address);

        ws.onmessage = (e) => {
            const reply = ControllerToRemoteControl.fromJSON(JSON.parse(e.data))
            if (reply.controllerReply?.statusCode === ControllerReply_StatusCode.OK
                && reply.state) {
                for (const stateConsumerElement of this.stateConsumer) {
                    stateConsumerElement(reply.state)
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

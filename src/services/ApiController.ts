import {
    ControllerToRemoteControl, RemoteControlRequestType,
    RemoteControlTeamState,
    RemoteControlToController
} from '../proto/ssl_gc_rcon_remotecontrol';
import {ControllerReply_StatusCode} from '../proto/ssl_gc_rcon';

export class ApiController {
    private ws ?: WebSocket
    private stateConsumer: ((state: RemoteControlTeamState) => any)[] = []
    private errorConsumer: ((message: string) => any)[] = []

    private latestState: RemoteControlTeamState = {
        availableRequests: [
            RemoteControlRequestType.CHANGE_KEEPER_ID,
            RemoteControlRequestType.CHALLENGE_FLAG,
            RemoteControlRequestType.ROBOT_SUBSTITUTION,
        ],
        activeRequests: [RemoteControlRequestType.ROBOT_SUBSTITUTION],
        yellowCardsDue: [120, 100.111],
        keeperId: 1,
        maxRobots: 11,
        challengeFlagsLeft: 3,
        emergencyStopIn: 3,
        timeoutsLeft: 4,
    }

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

    public RegisterStateConsumer(cb: ((state: RemoteControlTeamState) => any)) {
        this.stateConsumer.push(cb)
        cb(this.latestState)
    }

    public RegisterErrorConsumer(cb: ((message: string) => any)) {
        this.errorConsumer.push(cb)
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

import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import {ApiController} from './services/ApiController';
import {
    RemoteControlRequestType,
    RemoteControlTeamState,
    RemoteControlTeamStateSchema
} from './proto/ssl_gc_rcon_remotecontrol_pb';
import {Team} from "./proto/ssl_gc_common_pb";
import {create} from "@bufbuild/protobuf";

let latestState: RemoteControlTeamState
if (import.meta.env.PROD) {
    latestState = create(RemoteControlTeamStateSchema, {
        team: Team.UNKNOWN,
        availableRequests: [],
        activeRequests: [],
        yellowCardsDue: [],
        keeperId: 0,
        maxRobots: 0,
        robotsOnField: 0,
        challengeFlagsLeft: 0,
        emergencyStopIn: 0,
        timeoutsLeft: 0,
        timeoutTimeLeft: 0,
        canSubstituteRobot: false,
        botSubstitutionsLeft: 0,
        botSubstitutionTimeLeft: 0,
    })
} else {
    latestState = create(RemoteControlTeamStateSchema, {
        team: Team.BLUE,
        availableRequests: [
            RemoteControlRequestType.CHANGE_KEEPER_ID,
            RemoteControlRequestType.CHALLENGE_FLAG,
            RemoteControlRequestType.ROBOT_SUBSTITUTION,
        ],
        activeRequests: [RemoteControlRequestType.ROBOT_SUBSTITUTION],
        yellowCardsDue: [120, 100.111],
        keeperId: 1,
        maxRobots: 11,
        robotsOnField: 9,
        challengeFlagsLeft: 3,
        emergencyStopIn: 3,
        timeoutsLeft: 4,
        timeoutTimeLeft: 251.5,
        canSubstituteRobot: false,
        botSubstitutionsLeft: 5,
        botSubstitutionTimeLeft: 1.5,
    })
}

const apiController = new ApiController(latestState)

createApp(App)
    .use(router)
    .provide('api', apiController)
    .mount('#app')

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Team, teamFromJSON, teamToJSON } from "./ssl_gc_common";
import { ControllerReply, Signature } from "./ssl_gc_rcon";

export const protobufPackage = "";

/** All possible request types that the remote control can make */
export enum RemoteControlRequestType {
  UNKNOWN_REQUEST_TYPE = 0,
  EMERGENCY_STOP = 1,
  ROBOT_SUBSTITUTION = 2,
  TIMEOUT = 3,
  CHALLENGE_FLAG = 4,
  CHANGE_KEEPER_ID = 5,
  STOP_TIMEOUT = 6,
  UNRECOGNIZED = -1,
}

export function remoteControlRequestTypeFromJSON(object: any): RemoteControlRequestType {
  switch (object) {
    case 0:
    case "UNKNOWN_REQUEST_TYPE":
      return RemoteControlRequestType.UNKNOWN_REQUEST_TYPE;
    case 1:
    case "EMERGENCY_STOP":
      return RemoteControlRequestType.EMERGENCY_STOP;
    case 2:
    case "ROBOT_SUBSTITUTION":
      return RemoteControlRequestType.ROBOT_SUBSTITUTION;
    case 3:
    case "TIMEOUT":
      return RemoteControlRequestType.TIMEOUT;
    case 4:
    case "CHALLENGE_FLAG":
      return RemoteControlRequestType.CHALLENGE_FLAG;
    case 5:
    case "CHANGE_KEEPER_ID":
      return RemoteControlRequestType.CHANGE_KEEPER_ID;
    case 6:
    case "STOP_TIMEOUT":
      return RemoteControlRequestType.STOP_TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RemoteControlRequestType.UNRECOGNIZED;
  }
}

export function remoteControlRequestTypeToJSON(object: RemoteControlRequestType): string {
  switch (object) {
    case RemoteControlRequestType.UNKNOWN_REQUEST_TYPE:
      return "UNKNOWN_REQUEST_TYPE";
    case RemoteControlRequestType.EMERGENCY_STOP:
      return "EMERGENCY_STOP";
    case RemoteControlRequestType.ROBOT_SUBSTITUTION:
      return "ROBOT_SUBSTITUTION";
    case RemoteControlRequestType.TIMEOUT:
      return "TIMEOUT";
    case RemoteControlRequestType.CHALLENGE_FLAG:
      return "CHALLENGE_FLAG";
    case RemoteControlRequestType.CHANGE_KEEPER_ID:
      return "CHANGE_KEEPER_ID";
    case RemoteControlRequestType.STOP_TIMEOUT:
      return "STOP_TIMEOUT";
    case RemoteControlRequestType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** a registration that must be send by the remote control to the controller as the very first message */
export interface RemoteControlRegistration {
  /** the team to be controlled */
  team: Team;
  /** signature can optionally be specified to enable secure communication */
  signature?: Signature | undefined;
}

/** wrapper for all messages from the remote control to the controller */
export interface RemoteControlToController {
  /** signature can optionally be specified to enable secure communication */
  signature?: Signature | undefined;
  msg?:
    | { $case: "request"; request: RemoteControlToController_Request }
    | { $case: "desiredKeeper"; desiredKeeper: number }
    | { $case: "requestRobotSubstitution"; requestRobotSubstitution: boolean }
    | { $case: "requestTimeout"; requestTimeout: boolean }
    | { $case: "requestEmergencyStop"; requestEmergencyStop: boolean }
    | undefined;
}

export enum RemoteControlToController_Request {
  UNKNOWN = 0,
  /** PING - Ping the GC to test the connection. The GC will respond with OK and the current team state */
  PING = 1,
  /** CHALLENGE_FLAG - Raise a challenge flag (this is not revocable) */
  CHALLENGE_FLAG = 2,
  /** STOP_TIMEOUT - Stop an ongoing timeout */
  STOP_TIMEOUT = 3,
  UNRECOGNIZED = -1,
}

export function remoteControlToController_RequestFromJSON(object: any): RemoteControlToController_Request {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return RemoteControlToController_Request.UNKNOWN;
    case 1:
    case "PING":
      return RemoteControlToController_Request.PING;
    case 2:
    case "CHALLENGE_FLAG":
      return RemoteControlToController_Request.CHALLENGE_FLAG;
    case 3:
    case "STOP_TIMEOUT":
      return RemoteControlToController_Request.STOP_TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RemoteControlToController_Request.UNRECOGNIZED;
  }
}

export function remoteControlToController_RequestToJSON(object: RemoteControlToController_Request): string {
  switch (object) {
    case RemoteControlToController_Request.UNKNOWN:
      return "UNKNOWN";
    case RemoteControlToController_Request.PING:
      return "PING";
    case RemoteControlToController_Request.CHALLENGE_FLAG:
      return "CHALLENGE_FLAG";
    case RemoteControlToController_Request.STOP_TIMEOUT:
      return "STOP_TIMEOUT";
    case RemoteControlToController_Request.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** wrapper for all messages from controller to a team's computer */
export interface ControllerToRemoteControl {
  /** a reply from the controller */
  controllerReply?:
    | ControllerReply
    | undefined;
  /** current team state */
  state?: RemoteControlTeamState | undefined;
}

/** Current team state from Controller for remote control */
export interface RemoteControlTeamState {
  /** the team that is controlled */
  team: Team;
  /** list of all currently available request types that can be made */
  availableRequests: RemoteControlRequestType[];
  /** list of all currently active request types that are pending */
  activeRequests: RemoteControlRequestType[];
  /** currently set keeper id */
  keeperId: number;
  /**
   * number of seconds till emergency stop is executed
   * zero, if no emergency stop requested
   */
  emergencyStopIn: number;
  /** number of timeouts left for the team */
  timeoutsLeft: number;
  /** number of seconds left for timeout for the team */
  timeoutTimeLeft: number;
  /** number of challenge flags left for the team */
  challengeFlagsLeft: number;
  /** max number of robots currently allowed */
  maxRobots: number;
  /** current number of robots visible on field */
  robotsOnField: number;
  /** list of due times for each active yellow card (in seconds) */
  yellowCardsDue: number[];
  /** if true, team is allowed to substitute robots */
  canSubstituteRobot: boolean;
  /** number of bot substitutions left by the team in this halftime */
  botSubstitutionsLeft: number;
  /** number of seconds left for current bot substitution */
  botSubstitutionTimeLeft: number;
}

function createBaseRemoteControlRegistration(): RemoteControlRegistration {
  return { team: 0, signature: undefined };
}

export const RemoteControlRegistration = {
  encode(message: RemoteControlRegistration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.team !== 0) {
      writer.uint32(8).int32(message.team);
    }
    if (message.signature !== undefined) {
      Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoteControlRegistration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoteControlRegistration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.team = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.signature = Signature.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoteControlRegistration {
    return {
      team: isSet(object.team) ? teamFromJSON(object.team) : 0,
      signature: isSet(object.signature) ? Signature.fromJSON(object.signature) : undefined,
    };
  },

  toJSON(message: RemoteControlRegistration): unknown {
    const obj: any = {};
    if (message.team !== 0) {
      obj.team = teamToJSON(message.team);
    }
    if (message.signature !== undefined) {
      obj.signature = Signature.toJSON(message.signature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoteControlRegistration>, I>>(base?: I): RemoteControlRegistration {
    return RemoteControlRegistration.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoteControlRegistration>, I>>(object: I): RemoteControlRegistration {
    const message = createBaseRemoteControlRegistration();
    message.team = object.team ?? 0;
    message.signature = (object.signature !== undefined && object.signature !== null)
      ? Signature.fromPartial(object.signature)
      : undefined;
    return message;
  },
};

function createBaseRemoteControlToController(): RemoteControlToController {
  return { signature: undefined, msg: undefined };
}

export const RemoteControlToController = {
  encode(message: RemoteControlToController, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signature !== undefined) {
      Signature.encode(message.signature, writer.uint32(10).fork()).ldelim();
    }
    switch (message.msg?.$case) {
      case "request":
        writer.uint32(16).int32(message.msg.request);
        break;
      case "desiredKeeper":
        writer.uint32(24).int32(message.msg.desiredKeeper);
        break;
      case "requestRobotSubstitution":
        writer.uint32(32).bool(message.msg.requestRobotSubstitution);
        break;
      case "requestTimeout":
        writer.uint32(40).bool(message.msg.requestTimeout);
        break;
      case "requestEmergencyStop":
        writer.uint32(48).bool(message.msg.requestEmergencyStop);
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoteControlToController {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoteControlToController();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signature = Signature.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.msg = { $case: "request", request: reader.int32() as any };
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.msg = { $case: "desiredKeeper", desiredKeeper: reader.int32() };
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.msg = { $case: "requestRobotSubstitution", requestRobotSubstitution: reader.bool() };
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.msg = { $case: "requestTimeout", requestTimeout: reader.bool() };
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.msg = { $case: "requestEmergencyStop", requestEmergencyStop: reader.bool() };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoteControlToController {
    return {
      signature: isSet(object.signature) ? Signature.fromJSON(object.signature) : undefined,
      msg: isSet(object.request)
        ? { $case: "request", request: remoteControlToController_RequestFromJSON(object.request) }
        : isSet(object.desiredKeeper)
        ? { $case: "desiredKeeper", desiredKeeper: globalThis.Number(object.desiredKeeper) }
        : isSet(object.requestRobotSubstitution)
        ? {
          $case: "requestRobotSubstitution",
          requestRobotSubstitution: globalThis.Boolean(object.requestRobotSubstitution),
        }
        : isSet(object.requestTimeout)
        ? { $case: "requestTimeout", requestTimeout: globalThis.Boolean(object.requestTimeout) }
        : isSet(object.requestEmergencyStop)
        ? { $case: "requestEmergencyStop", requestEmergencyStop: globalThis.Boolean(object.requestEmergencyStop) }
        : undefined,
    };
  },

  toJSON(message: RemoteControlToController): unknown {
    const obj: any = {};
    if (message.signature !== undefined) {
      obj.signature = Signature.toJSON(message.signature);
    }
    if (message.msg?.$case === "request") {
      obj.request = remoteControlToController_RequestToJSON(message.msg.request);
    }
    if (message.msg?.$case === "desiredKeeper") {
      obj.desiredKeeper = Math.round(message.msg.desiredKeeper);
    }
    if (message.msg?.$case === "requestRobotSubstitution") {
      obj.requestRobotSubstitution = message.msg.requestRobotSubstitution;
    }
    if (message.msg?.$case === "requestTimeout") {
      obj.requestTimeout = message.msg.requestTimeout;
    }
    if (message.msg?.$case === "requestEmergencyStop") {
      obj.requestEmergencyStop = message.msg.requestEmergencyStop;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoteControlToController>, I>>(base?: I): RemoteControlToController {
    return RemoteControlToController.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoteControlToController>, I>>(object: I): RemoteControlToController {
    const message = createBaseRemoteControlToController();
    message.signature = (object.signature !== undefined && object.signature !== null)
      ? Signature.fromPartial(object.signature)
      : undefined;
    if (object.msg?.$case === "request" && object.msg?.request !== undefined && object.msg?.request !== null) {
      message.msg = { $case: "request", request: object.msg.request };
    }
    if (
      object.msg?.$case === "desiredKeeper" &&
      object.msg?.desiredKeeper !== undefined &&
      object.msg?.desiredKeeper !== null
    ) {
      message.msg = { $case: "desiredKeeper", desiredKeeper: object.msg.desiredKeeper };
    }
    if (
      object.msg?.$case === "requestRobotSubstitution" &&
      object.msg?.requestRobotSubstitution !== undefined &&
      object.msg?.requestRobotSubstitution !== null
    ) {
      message.msg = {
        $case: "requestRobotSubstitution",
        requestRobotSubstitution: object.msg.requestRobotSubstitution,
      };
    }
    if (
      object.msg?.$case === "requestTimeout" &&
      object.msg?.requestTimeout !== undefined &&
      object.msg?.requestTimeout !== null
    ) {
      message.msg = { $case: "requestTimeout", requestTimeout: object.msg.requestTimeout };
    }
    if (
      object.msg?.$case === "requestEmergencyStop" &&
      object.msg?.requestEmergencyStop !== undefined &&
      object.msg?.requestEmergencyStop !== null
    ) {
      message.msg = { $case: "requestEmergencyStop", requestEmergencyStop: object.msg.requestEmergencyStop };
    }
    return message;
  },
};

function createBaseControllerToRemoteControl(): ControllerToRemoteControl {
  return { controllerReply: undefined, state: undefined };
}

export const ControllerToRemoteControl = {
  encode(message: ControllerToRemoteControl, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.controllerReply !== undefined) {
      ControllerReply.encode(message.controllerReply, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      RemoteControlTeamState.encode(message.state, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerToRemoteControl {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerToRemoteControl();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.controllerReply = ControllerReply.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = RemoteControlTeamState.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ControllerToRemoteControl {
    return {
      controllerReply: isSet(object.controllerReply) ? ControllerReply.fromJSON(object.controllerReply) : undefined,
      state: isSet(object.state) ? RemoteControlTeamState.fromJSON(object.state) : undefined,
    };
  },

  toJSON(message: ControllerToRemoteControl): unknown {
    const obj: any = {};
    if (message.controllerReply !== undefined) {
      obj.controllerReply = ControllerReply.toJSON(message.controllerReply);
    }
    if (message.state !== undefined) {
      obj.state = RemoteControlTeamState.toJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerToRemoteControl>, I>>(base?: I): ControllerToRemoteControl {
    return ControllerToRemoteControl.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ControllerToRemoteControl>, I>>(object: I): ControllerToRemoteControl {
    const message = createBaseControllerToRemoteControl();
    message.controllerReply = (object.controllerReply !== undefined && object.controllerReply !== null)
      ? ControllerReply.fromPartial(object.controllerReply)
      : undefined;
    message.state = (object.state !== undefined && object.state !== null)
      ? RemoteControlTeamState.fromPartial(object.state)
      : undefined;
    return message;
  },
};

function createBaseRemoteControlTeamState(): RemoteControlTeamState {
  return {
    team: 0,
    availableRequests: [],
    activeRequests: [],
    keeperId: 0,
    emergencyStopIn: 0,
    timeoutsLeft: 0,
    timeoutTimeLeft: 0,
    challengeFlagsLeft: 0,
    maxRobots: 0,
    robotsOnField: 0,
    yellowCardsDue: [],
    canSubstituteRobot: false,
    botSubstitutionsLeft: 0,
    botSubstitutionTimeLeft: 0,
  };
}

export const RemoteControlTeamState = {
  encode(message: RemoteControlTeamState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.team !== 0) {
      writer.uint32(96).int32(message.team);
    }
    writer.uint32(10).fork();
    for (const v of message.availableRequests) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(18).fork();
    for (const v of message.activeRequests) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.keeperId !== 0) {
      writer.uint32(24).int32(message.keeperId);
    }
    if (message.emergencyStopIn !== 0) {
      writer.uint32(37).float(message.emergencyStopIn);
    }
    if (message.timeoutsLeft !== 0) {
      writer.uint32(40).int32(message.timeoutsLeft);
    }
    if (message.timeoutTimeLeft !== 0) {
      writer.uint32(85).float(message.timeoutTimeLeft);
    }
    if (message.challengeFlagsLeft !== 0) {
      writer.uint32(48).int32(message.challengeFlagsLeft);
    }
    if (message.maxRobots !== 0) {
      writer.uint32(56).int32(message.maxRobots);
    }
    if (message.robotsOnField !== 0) {
      writer.uint32(72).int32(message.robotsOnField);
    }
    writer.uint32(66).fork();
    for (const v of message.yellowCardsDue) {
      writer.float(v);
    }
    writer.ldelim();
    if (message.canSubstituteRobot === true) {
      writer.uint32(88).bool(message.canSubstituteRobot);
    }
    if (message.botSubstitutionsLeft !== 0) {
      writer.uint32(104).uint32(message.botSubstitutionsLeft);
    }
    if (message.botSubstitutionTimeLeft !== 0) {
      writer.uint32(117).float(message.botSubstitutionTimeLeft);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoteControlTeamState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoteControlTeamState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 12:
          if (tag !== 96) {
            break;
          }

          message.team = reader.int32() as any;
          continue;
        case 1:
          if (tag === 8) {
            message.availableRequests.push(reader.int32() as any);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.availableRequests.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 2:
          if (tag === 16) {
            message.activeRequests.push(reader.int32() as any);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.activeRequests.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.keeperId = reader.int32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.emergencyStopIn = reader.float();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.timeoutsLeft = reader.int32();
          continue;
        case 10:
          if (tag !== 85) {
            break;
          }

          message.timeoutTimeLeft = reader.float();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.challengeFlagsLeft = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.maxRobots = reader.int32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.robotsOnField = reader.int32();
          continue;
        case 8:
          if (tag === 69) {
            message.yellowCardsDue.push(reader.float());

            continue;
          }

          if (tag === 66) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.yellowCardsDue.push(reader.float());
            }

            continue;
          }

          break;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.canSubstituteRobot = reader.bool();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.botSubstitutionsLeft = reader.uint32();
          continue;
        case 14:
          if (tag !== 117) {
            break;
          }

          message.botSubstitutionTimeLeft = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoteControlTeamState {
    return {
      team: isSet(object.team) ? teamFromJSON(object.team) : 0,
      availableRequests: globalThis.Array.isArray(object?.availableRequests)
        ? object.availableRequests.map((e: any) => remoteControlRequestTypeFromJSON(e))
        : [],
      activeRequests: globalThis.Array.isArray(object?.activeRequests)
        ? object.activeRequests.map((e: any) => remoteControlRequestTypeFromJSON(e))
        : [],
      keeperId: isSet(object.keeperId) ? globalThis.Number(object.keeperId) : 0,
      emergencyStopIn: isSet(object.emergencyStopIn) ? globalThis.Number(object.emergencyStopIn) : 0,
      timeoutsLeft: isSet(object.timeoutsLeft) ? globalThis.Number(object.timeoutsLeft) : 0,
      timeoutTimeLeft: isSet(object.timeoutTimeLeft) ? globalThis.Number(object.timeoutTimeLeft) : 0,
      challengeFlagsLeft: isSet(object.challengeFlagsLeft) ? globalThis.Number(object.challengeFlagsLeft) : 0,
      maxRobots: isSet(object.maxRobots) ? globalThis.Number(object.maxRobots) : 0,
      robotsOnField: isSet(object.robotsOnField) ? globalThis.Number(object.robotsOnField) : 0,
      yellowCardsDue: globalThis.Array.isArray(object?.yellowCardsDue)
        ? object.yellowCardsDue.map((e: any) => globalThis.Number(e))
        : [],
      canSubstituteRobot: isSet(object.canSubstituteRobot) ? globalThis.Boolean(object.canSubstituteRobot) : false,
      botSubstitutionsLeft: isSet(object.botSubstitutionsLeft) ? globalThis.Number(object.botSubstitutionsLeft) : 0,
      botSubstitutionTimeLeft: isSet(object.botSubstitutionTimeLeft)
        ? globalThis.Number(object.botSubstitutionTimeLeft)
        : 0,
    };
  },

  toJSON(message: RemoteControlTeamState): unknown {
    const obj: any = {};
    if (message.team !== 0) {
      obj.team = teamToJSON(message.team);
    }
    if (message.availableRequests?.length) {
      obj.availableRequests = message.availableRequests.map((e) => remoteControlRequestTypeToJSON(e));
    }
    if (message.activeRequests?.length) {
      obj.activeRequests = message.activeRequests.map((e) => remoteControlRequestTypeToJSON(e));
    }
    if (message.keeperId !== 0) {
      obj.keeperId = Math.round(message.keeperId);
    }
    if (message.emergencyStopIn !== 0) {
      obj.emergencyStopIn = message.emergencyStopIn;
    }
    if (message.timeoutsLeft !== 0) {
      obj.timeoutsLeft = Math.round(message.timeoutsLeft);
    }
    if (message.timeoutTimeLeft !== 0) {
      obj.timeoutTimeLeft = message.timeoutTimeLeft;
    }
    if (message.challengeFlagsLeft !== 0) {
      obj.challengeFlagsLeft = Math.round(message.challengeFlagsLeft);
    }
    if (message.maxRobots !== 0) {
      obj.maxRobots = Math.round(message.maxRobots);
    }
    if (message.robotsOnField !== 0) {
      obj.robotsOnField = Math.round(message.robotsOnField);
    }
    if (message.yellowCardsDue?.length) {
      obj.yellowCardsDue = message.yellowCardsDue;
    }
    if (message.canSubstituteRobot === true) {
      obj.canSubstituteRobot = message.canSubstituteRobot;
    }
    if (message.botSubstitutionsLeft !== 0) {
      obj.botSubstitutionsLeft = Math.round(message.botSubstitutionsLeft);
    }
    if (message.botSubstitutionTimeLeft !== 0) {
      obj.botSubstitutionTimeLeft = message.botSubstitutionTimeLeft;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoteControlTeamState>, I>>(base?: I): RemoteControlTeamState {
    return RemoteControlTeamState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoteControlTeamState>, I>>(object: I): RemoteControlTeamState {
    const message = createBaseRemoteControlTeamState();
    message.team = object.team ?? 0;
    message.availableRequests = object.availableRequests?.map((e) => e) || [];
    message.activeRequests = object.activeRequests?.map((e) => e) || [];
    message.keeperId = object.keeperId ?? 0;
    message.emergencyStopIn = object.emergencyStopIn ?? 0;
    message.timeoutsLeft = object.timeoutsLeft ?? 0;
    message.timeoutTimeLeft = object.timeoutTimeLeft ?? 0;
    message.challengeFlagsLeft = object.challengeFlagsLeft ?? 0;
    message.maxRobots = object.maxRobots ?? 0;
    message.robotsOnField = object.robotsOnField ?? 0;
    message.yellowCardsDue = object.yellowCardsDue?.map((e) => e) || [];
    message.canSubstituteRobot = object.canSubstituteRobot ?? false;
    message.botSubstitutionsLeft = object.botSubstitutionsLeft ?? 0;
    message.botSubstitutionTimeLeft = object.botSubstitutionTimeLeft ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

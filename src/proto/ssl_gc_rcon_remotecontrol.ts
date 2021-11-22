/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Team, teamFromJSON, teamToJSON } from "./ssl_gc_common";
import { Signature, ControllerReply } from "./ssl_gc_rcon";

export const protobufPackage = "";

/** All possible request types that the remote control can make */
export enum RemoteControlRequestType {
  UNKNOWN_REQUEST_TYPE = 0,
  EMERGENCY_STOP = 1,
  ROBOT_SUBSTITUTION = 2,
  TIMEOUT = 3,
  CHALLENGE_FLAG = 4,
  CHANGE_KEEPER_ID = 5,
  UNRECOGNIZED = -1,
}

export function remoteControlRequestTypeFromJSON(
  object: any
): RemoteControlRequestType {
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
    case -1:
    case "UNRECOGNIZED":
    default:
      return RemoteControlRequestType.UNRECOGNIZED;
  }
}

export function remoteControlRequestTypeToJSON(
  object: RemoteControlRequestType
): string {
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
    default:
      return "UNKNOWN";
  }
}

/** a registration that must be send by the remote control to the controller as the very first message */
export interface RemoteControlRegistration {
  /** the team to be controlled */
  team: Team;
  /** signature can optionally be specified to enable secure communication */
  signature?: Signature;
}

/** wrapper for all messages from the remote control to the controller */
export interface RemoteControlToController {
  /** signature can optionally be specified to enable secure communication */
  signature?: Signature;
  msg?:
    | { $case: "request"; request: RemoteControlToController_Request }
    | { $case: "desiredKeeper"; desiredKeeper: number }
    | { $case: "requestRobotSubstitution"; requestRobotSubstitution: boolean }
    | { $case: "requestTimeout"; requestTimeout: boolean }
    | { $case: "requestEmergencyStop"; requestEmergencyStop: boolean };
}

export enum RemoteControlToController_Request {
  UNKNOWN = 0,
  /** PING - Ping the GC to test the connection. The GC will respond with OK and the current team state */
  PING = 1,
  /** CHALLENGE_FLAG - Raise a challenge flag (this is not revocable) */
  CHALLENGE_FLAG = 2,
  UNRECOGNIZED = -1,
}

export function remoteControlToController_RequestFromJSON(
  object: any
): RemoteControlToController_Request {
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
    case -1:
    case "UNRECOGNIZED":
    default:
      return RemoteControlToController_Request.UNRECOGNIZED;
  }
}

export function remoteControlToController_RequestToJSON(
  object: RemoteControlToController_Request
): string {
  switch (object) {
    case RemoteControlToController_Request.UNKNOWN:
      return "UNKNOWN";
    case RemoteControlToController_Request.PING:
      return "PING";
    case RemoteControlToController_Request.CHALLENGE_FLAG:
      return "CHALLENGE_FLAG";
    default:
      return "UNKNOWN";
  }
}

/** wrapper for all messages from controller to a team's computer */
export interface ControllerToRemoteControl {
  /** a reply from the controller */
  controllerReply?: ControllerReply;
  /** current team state */
  state?: RemoteControlTeamState;
}

/** Current team state from Controller for remote control */
export interface RemoteControlTeamState {
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
  /** number of challenge flags left for the team */
  challengeFlagsLeft: number;
  /** max number of robots currently allowed */
  maxRobots: number;
  /** current number of robots visible on field */
  robotsOnField: number;
  /** list of due times for each active yellow card (in seconds) */
  yellowCardsDue: number[];
}

const baseRemoteControlRegistration: object = { team: 0 };

export const RemoteControlRegistration = {
  encode(
    message: RemoteControlRegistration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.team !== 0) {
      writer.uint32(8).int32(message.team);
    }
    if (message.signature !== undefined) {
      Signature.encode(message.signature, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RemoteControlRegistration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRemoteControlRegistration,
    } as RemoteControlRegistration;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.team = reader.int32() as any;
          break;
        case 2:
          message.signature = Signature.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoteControlRegistration {
    const message = {
      ...baseRemoteControlRegistration,
    } as RemoteControlRegistration;
    message.team =
      object.team !== undefined && object.team !== null
        ? teamFromJSON(object.team)
        : 0;
    message.signature =
      object.signature !== undefined && object.signature !== null
        ? Signature.fromJSON(object.signature)
        : undefined;
    return message;
  },

  toJSON(message: RemoteControlRegistration): unknown {
    const obj: any = {};
    message.team !== undefined && (obj.team = teamToJSON(message.team));
    message.signature !== undefined &&
      (obj.signature = message.signature
        ? Signature.toJSON(message.signature)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RemoteControlRegistration>
  ): RemoteControlRegistration {
    const message = {
      ...baseRemoteControlRegistration,
    } as RemoteControlRegistration;
    message.team = object.team ?? 0;
    message.signature =
      object.signature !== undefined && object.signature !== null
        ? Signature.fromPartial(object.signature)
        : undefined;
    return message;
  },
};

const baseRemoteControlToController: object = {};

export const RemoteControlToController = {
  encode(
    message: RemoteControlToController,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signature !== undefined) {
      Signature.encode(message.signature, writer.uint32(10).fork()).ldelim();
    }
    if (message.msg?.$case === "request") {
      writer.uint32(16).int32(message.msg.request);
    }
    if (message.msg?.$case === "desiredKeeper") {
      writer.uint32(24).int32(message.msg.desiredKeeper);
    }
    if (message.msg?.$case === "requestRobotSubstitution") {
      writer.uint32(32).bool(message.msg.requestRobotSubstitution);
    }
    if (message.msg?.$case === "requestTimeout") {
      writer.uint32(40).bool(message.msg.requestTimeout);
    }
    if (message.msg?.$case === "requestEmergencyStop") {
      writer.uint32(48).bool(message.msg.requestEmergencyStop);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RemoteControlToController {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRemoteControlToController,
    } as RemoteControlToController;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signature = Signature.decode(reader, reader.uint32());
          break;
        case 2:
          message.msg = { $case: "request", request: reader.int32() as any };
          break;
        case 3:
          message.msg = {
            $case: "desiredKeeper",
            desiredKeeper: reader.int32(),
          };
          break;
        case 4:
          message.msg = {
            $case: "requestRobotSubstitution",
            requestRobotSubstitution: reader.bool(),
          };
          break;
        case 5:
          message.msg = {
            $case: "requestTimeout",
            requestTimeout: reader.bool(),
          };
          break;
        case 6:
          message.msg = {
            $case: "requestEmergencyStop",
            requestEmergencyStop: reader.bool(),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoteControlToController {
    const message = {
      ...baseRemoteControlToController,
    } as RemoteControlToController;
    message.signature =
      object.signature !== undefined && object.signature !== null
        ? Signature.fromJSON(object.signature)
        : undefined;
    if (object.request !== undefined && object.request !== null) {
      message.msg = {
        $case: "request",
        request: remoteControlToController_RequestFromJSON(object.request),
      };
    }
    if (object.desiredKeeper !== undefined && object.desiredKeeper !== null) {
      message.msg = {
        $case: "desiredKeeper",
        desiredKeeper: Number(object.desiredKeeper),
      };
    }
    if (
      object.requestRobotSubstitution !== undefined &&
      object.requestRobotSubstitution !== null
    ) {
      message.msg = {
        $case: "requestRobotSubstitution",
        requestRobotSubstitution: Boolean(object.requestRobotSubstitution),
      };
    }
    if (object.requestTimeout !== undefined && object.requestTimeout !== null) {
      message.msg = {
        $case: "requestTimeout",
        requestTimeout: Boolean(object.requestTimeout),
      };
    }
    if (
      object.requestEmergencyStop !== undefined &&
      object.requestEmergencyStop !== null
    ) {
      message.msg = {
        $case: "requestEmergencyStop",
        requestEmergencyStop: Boolean(object.requestEmergencyStop),
      };
    }
    return message;
  },

  toJSON(message: RemoteControlToController): unknown {
    const obj: any = {};
    message.signature !== undefined &&
      (obj.signature = message.signature
        ? Signature.toJSON(message.signature)
        : undefined);
    message.msg?.$case === "request" &&
      (obj.request =
        message.msg?.request !== undefined
          ? remoteControlToController_RequestToJSON(message.msg?.request)
          : undefined);
    message.msg?.$case === "desiredKeeper" &&
      (obj.desiredKeeper = message.msg?.desiredKeeper);
    message.msg?.$case === "requestRobotSubstitution" &&
      (obj.requestRobotSubstitution = message.msg?.requestRobotSubstitution);
    message.msg?.$case === "requestTimeout" &&
      (obj.requestTimeout = message.msg?.requestTimeout);
    message.msg?.$case === "requestEmergencyStop" &&
      (obj.requestEmergencyStop = message.msg?.requestEmergencyStop);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RemoteControlToController>
  ): RemoteControlToController {
    const message = {
      ...baseRemoteControlToController,
    } as RemoteControlToController;
    message.signature =
      object.signature !== undefined && object.signature !== null
        ? Signature.fromPartial(object.signature)
        : undefined;
    if (
      object.msg?.$case === "request" &&
      object.msg?.request !== undefined &&
      object.msg?.request !== null
    ) {
      message.msg = { $case: "request", request: object.msg.request };
    }
    if (
      object.msg?.$case === "desiredKeeper" &&
      object.msg?.desiredKeeper !== undefined &&
      object.msg?.desiredKeeper !== null
    ) {
      message.msg = {
        $case: "desiredKeeper",
        desiredKeeper: object.msg.desiredKeeper,
      };
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
      message.msg = {
        $case: "requestTimeout",
        requestTimeout: object.msg.requestTimeout,
      };
    }
    if (
      object.msg?.$case === "requestEmergencyStop" &&
      object.msg?.requestEmergencyStop !== undefined &&
      object.msg?.requestEmergencyStop !== null
    ) {
      message.msg = {
        $case: "requestEmergencyStop",
        requestEmergencyStop: object.msg.requestEmergencyStop,
      };
    }
    return message;
  },
};

const baseControllerToRemoteControl: object = {};

export const ControllerToRemoteControl = {
  encode(
    message: ControllerToRemoteControl,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.controllerReply !== undefined) {
      ControllerReply.encode(
        message.controllerReply,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.state !== undefined) {
      RemoteControlTeamState.encode(
        message.state,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ControllerToRemoteControl {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseControllerToRemoteControl,
    } as ControllerToRemoteControl;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.controllerReply = ControllerReply.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.state = RemoteControlTeamState.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ControllerToRemoteControl {
    const message = {
      ...baseControllerToRemoteControl,
    } as ControllerToRemoteControl;
    message.controllerReply =
      object.controllerReply !== undefined && object.controllerReply !== null
        ? ControllerReply.fromJSON(object.controllerReply)
        : undefined;
    message.state =
      object.state !== undefined && object.state !== null
        ? RemoteControlTeamState.fromJSON(object.state)
        : undefined;
    return message;
  },

  toJSON(message: ControllerToRemoteControl): unknown {
    const obj: any = {};
    message.controllerReply !== undefined &&
      (obj.controllerReply = message.controllerReply
        ? ControllerReply.toJSON(message.controllerReply)
        : undefined);
    message.state !== undefined &&
      (obj.state = message.state
        ? RemoteControlTeamState.toJSON(message.state)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ControllerToRemoteControl>
  ): ControllerToRemoteControl {
    const message = {
      ...baseControllerToRemoteControl,
    } as ControllerToRemoteControl;
    message.controllerReply =
      object.controllerReply !== undefined && object.controllerReply !== null
        ? ControllerReply.fromPartial(object.controllerReply)
        : undefined;
    message.state =
      object.state !== undefined && object.state !== null
        ? RemoteControlTeamState.fromPartial(object.state)
        : undefined;
    return message;
  },
};

const baseRemoteControlTeamState: object = {
  availableRequests: 0,
  activeRequests: 0,
  keeperId: 0,
  emergencyStopIn: 0,
  timeoutsLeft: 0,
  challengeFlagsLeft: 0,
  maxRobots: 0,
  robotsOnField: 0,
  yellowCardsDue: 0,
};

export const RemoteControlTeamState = {
  encode(
    message: RemoteControlTeamState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RemoteControlTeamState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRemoteControlTeamState } as RemoteControlTeamState;
    message.availableRequests = [];
    message.activeRequests = [];
    message.yellowCardsDue = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.availableRequests.push(reader.int32() as any);
            }
          } else {
            message.availableRequests.push(reader.int32() as any);
          }
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.activeRequests.push(reader.int32() as any);
            }
          } else {
            message.activeRequests.push(reader.int32() as any);
          }
          break;
        case 3:
          message.keeperId = reader.int32();
          break;
        case 4:
          message.emergencyStopIn = reader.float();
          break;
        case 5:
          message.timeoutsLeft = reader.int32();
          break;
        case 6:
          message.challengeFlagsLeft = reader.int32();
          break;
        case 7:
          message.maxRobots = reader.int32();
          break;
        case 9:
          message.robotsOnField = reader.int32();
          break;
        case 8:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.yellowCardsDue.push(reader.float());
            }
          } else {
            message.yellowCardsDue.push(reader.float());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoteControlTeamState {
    const message = { ...baseRemoteControlTeamState } as RemoteControlTeamState;
    message.availableRequests = (object.availableRequests ?? []).map((e: any) =>
      remoteControlRequestTypeFromJSON(e)
    );
    message.activeRequests = (object.activeRequests ?? []).map((e: any) =>
      remoteControlRequestTypeFromJSON(e)
    );
    message.keeperId =
      object.keeperId !== undefined && object.keeperId !== null
        ? Number(object.keeperId)
        : 0;
    message.emergencyStopIn =
      object.emergencyStopIn !== undefined && object.emergencyStopIn !== null
        ? Number(object.emergencyStopIn)
        : 0;
    message.timeoutsLeft =
      object.timeoutsLeft !== undefined && object.timeoutsLeft !== null
        ? Number(object.timeoutsLeft)
        : 0;
    message.challengeFlagsLeft =
      object.challengeFlagsLeft !== undefined &&
      object.challengeFlagsLeft !== null
        ? Number(object.challengeFlagsLeft)
        : 0;
    message.maxRobots =
      object.maxRobots !== undefined && object.maxRobots !== null
        ? Number(object.maxRobots)
        : 0;
    message.robotsOnField =
      object.robotsOnField !== undefined && object.robotsOnField !== null
        ? Number(object.robotsOnField)
        : 0;
    message.yellowCardsDue = (object.yellowCardsDue ?? []).map((e: any) =>
      Number(e)
    );
    return message;
  },

  toJSON(message: RemoteControlTeamState): unknown {
    const obj: any = {};
    if (message.availableRequests) {
      obj.availableRequests = message.availableRequests.map((e) =>
        remoteControlRequestTypeToJSON(e)
      );
    } else {
      obj.availableRequests = [];
    }
    if (message.activeRequests) {
      obj.activeRequests = message.activeRequests.map((e) =>
        remoteControlRequestTypeToJSON(e)
      );
    } else {
      obj.activeRequests = [];
    }
    message.keeperId !== undefined && (obj.keeperId = message.keeperId);
    message.emergencyStopIn !== undefined &&
      (obj.emergencyStopIn = message.emergencyStopIn);
    message.timeoutsLeft !== undefined &&
      (obj.timeoutsLeft = message.timeoutsLeft);
    message.challengeFlagsLeft !== undefined &&
      (obj.challengeFlagsLeft = message.challengeFlagsLeft);
    message.maxRobots !== undefined && (obj.maxRobots = message.maxRobots);
    message.robotsOnField !== undefined &&
      (obj.robotsOnField = message.robotsOnField);
    if (message.yellowCardsDue) {
      obj.yellowCardsDue = message.yellowCardsDue.map((e) => e);
    } else {
      obj.yellowCardsDue = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<RemoteControlTeamState>
  ): RemoteControlTeamState {
    const message = { ...baseRemoteControlTeamState } as RemoteControlTeamState;
    message.availableRequests = (object.availableRequests ?? []).map((e) => e);
    message.activeRequests = (object.activeRequests ?? []).map((e) => e);
    message.keeperId = object.keeperId ?? 0;
    message.emergencyStopIn = object.emergencyStopIn ?? 0;
    message.timeoutsLeft = object.timeoutsLeft ?? 0;
    message.challengeFlagsLeft = object.challengeFlagsLeft ?? 0;
    message.maxRobots = object.maxRobots ?? 0;
    message.robotsOnField = object.robotsOnField ?? 0;
    message.yellowCardsDue = (object.yellowCardsDue ?? []).map((e) => e);
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & {
      $case: T["$case"];
    }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

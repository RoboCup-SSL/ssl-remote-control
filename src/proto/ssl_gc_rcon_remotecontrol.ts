/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Team, teamFromJSON, teamToJSON } from "./ssl_gc_common";
import { Signature, ControllerReply } from "./ssl_gc_rcon";

export const protobufPackage = "";

/** a registration that must be send by the remote control to the controller as the very first message */
export interface RemoteControlRegistration {
  /** the team to be controlled */
  team: Team;
  /** signature can optionally be specified to enable secure communication */
  signature: Signature | undefined;
}

/** wrapper for all messages from the remote control to the controller */
export interface RemoteControlToController {
  /** signature can optionally be specified to enable secure communication */
  signature: Signature | undefined;
  /**
   * send a ping to the GC to test if the connection is still open.
   * the value is ignored and a reply is sent back
   */
  request: RemoteControlToController_Request | undefined;
  /** request a new desired keeper id */
  desiredKeeper: number | undefined;
  /**
   * true: request to substitute a robot at the next possibility
   * false: cancel request
   */
  substituteBot: boolean | undefined;
  /**
   * true: request a timeout with the next stoppage
   * false: cancel the request
   */
  timeout: boolean | undefined;
  /**
   * true: initiate an emergency stop
   * false: cancel the request
   */
  emergencyStop: boolean | undefined;
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
  controllerReply: ControllerReply | undefined;
  /** current team state */
  state: RemoteControlTeamState | undefined;
}

/** Current team state from Controller for remote control */
export interface RemoteControlTeamState {
  /** currently set keeper id */
  keeperId: number;
  /** true, if substitution request pending */
  substituteBot: boolean;
  /** true, if emergency stop pending */
  emergencyStop: boolean;
  /** number of seconds till emergency stop is executed */
  emergencyStopIn: number;
  /** true, if timeout request pending */
  timeout: boolean;
  /** true, if challenge flag pending */
  challengeFlag: boolean;
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
    if (message.request !== undefined) {
      writer.uint32(16).int32(message.request);
    }
    if (message.desiredKeeper !== undefined) {
      writer.uint32(24).int32(message.desiredKeeper);
    }
    if (message.substituteBot !== undefined) {
      writer.uint32(32).bool(message.substituteBot);
    }
    if (message.timeout !== undefined) {
      writer.uint32(40).bool(message.timeout);
    }
    if (message.emergencyStop !== undefined) {
      writer.uint32(48).bool(message.emergencyStop);
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
          message.request = reader.int32() as any;
          break;
        case 3:
          message.desiredKeeper = reader.int32();
          break;
        case 4:
          message.substituteBot = reader.bool();
          break;
        case 5:
          message.timeout = reader.bool();
          break;
        case 6:
          message.emergencyStop = reader.bool();
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
    message.request =
      object.request !== undefined && object.request !== null
        ? remoteControlToController_RequestFromJSON(object.request)
        : undefined;
    message.desiredKeeper =
      object.desiredKeeper !== undefined && object.desiredKeeper !== null
        ? Number(object.desiredKeeper)
        : undefined;
    message.substituteBot =
      object.substituteBot !== undefined && object.substituteBot !== null
        ? Boolean(object.substituteBot)
        : undefined;
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? Boolean(object.timeout)
        : undefined;
    message.emergencyStop =
      object.emergencyStop !== undefined && object.emergencyStop !== null
        ? Boolean(object.emergencyStop)
        : undefined;
    return message;
  },

  toJSON(message: RemoteControlToController): unknown {
    const obj: any = {};
    message.signature !== undefined &&
      (obj.signature = message.signature
        ? Signature.toJSON(message.signature)
        : undefined);
    message.request !== undefined &&
      (obj.request =
        message.request !== undefined
          ? remoteControlToController_RequestToJSON(message.request)
          : undefined);
    message.desiredKeeper !== undefined &&
      (obj.desiredKeeper = message.desiredKeeper);
    message.substituteBot !== undefined &&
      (obj.substituteBot = message.substituteBot);
    message.timeout !== undefined && (obj.timeout = message.timeout);
    message.emergencyStop !== undefined &&
      (obj.emergencyStop = message.emergencyStop);
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
    message.request = object.request ?? undefined;
    message.desiredKeeper = object.desiredKeeper ?? undefined;
    message.substituteBot = object.substituteBot ?? undefined;
    message.timeout = object.timeout ?? undefined;
    message.emergencyStop = object.emergencyStop ?? undefined;
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
  keeperId: 0,
  substituteBot: false,
  emergencyStop: false,
  emergencyStopIn: 0,
  timeout: false,
  challengeFlag: false,
};

export const RemoteControlTeamState = {
  encode(
    message: RemoteControlTeamState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.keeperId !== 0) {
      writer.uint32(8).int32(message.keeperId);
    }
    if (message.substituteBot === true) {
      writer.uint32(16).bool(message.substituteBot);
    }
    if (message.emergencyStop === true) {
      writer.uint32(24).bool(message.emergencyStop);
    }
    if (message.emergencyStopIn !== 0) {
      writer.uint32(37).float(message.emergencyStopIn);
    }
    if (message.timeout === true) {
      writer.uint32(40).bool(message.timeout);
    }
    if (message.challengeFlag === true) {
      writer.uint32(48).bool(message.challengeFlag);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RemoteControlTeamState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRemoteControlTeamState } as RemoteControlTeamState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keeperId = reader.int32();
          break;
        case 2:
          message.substituteBot = reader.bool();
          break;
        case 3:
          message.emergencyStop = reader.bool();
          break;
        case 4:
          message.emergencyStopIn = reader.float();
          break;
        case 5:
          message.timeout = reader.bool();
          break;
        case 6:
          message.challengeFlag = reader.bool();
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
    message.keeperId =
      object.keeperId !== undefined && object.keeperId !== null
        ? Number(object.keeperId)
        : 0;
    message.substituteBot =
      object.substituteBot !== undefined && object.substituteBot !== null
        ? Boolean(object.substituteBot)
        : false;
    message.emergencyStop =
      object.emergencyStop !== undefined && object.emergencyStop !== null
        ? Boolean(object.emergencyStop)
        : false;
    message.emergencyStopIn =
      object.emergencyStopIn !== undefined && object.emergencyStopIn !== null
        ? Number(object.emergencyStopIn)
        : 0;
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? Boolean(object.timeout)
        : false;
    message.challengeFlag =
      object.challengeFlag !== undefined && object.challengeFlag !== null
        ? Boolean(object.challengeFlag)
        : false;
    return message;
  },

  toJSON(message: RemoteControlTeamState): unknown {
    const obj: any = {};
    message.keeperId !== undefined && (obj.keeperId = message.keeperId);
    message.substituteBot !== undefined &&
      (obj.substituteBot = message.substituteBot);
    message.emergencyStop !== undefined &&
      (obj.emergencyStop = message.emergencyStop);
    message.emergencyStopIn !== undefined &&
      (obj.emergencyStopIn = message.emergencyStopIn);
    message.timeout !== undefined && (obj.timeout = message.timeout);
    message.challengeFlag !== undefined &&
      (obj.challengeFlag = message.challengeFlag);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RemoteControlTeamState>
  ): RemoteControlTeamState {
    const message = { ...baseRemoteControlTeamState } as RemoteControlTeamState;
    message.keeperId = object.keeperId ?? 0;
    message.substituteBot = object.substituteBot ?? false;
    message.emergencyStop = object.emergencyStop ?? false;
    message.emergencyStopIn = object.emergencyStopIn ?? 0;
    message.timeout = object.timeout ?? false;
    message.challengeFlag = object.challengeFlag ?? false;
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
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

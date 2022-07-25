/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

/** a reply that is sent by the controller for each request from teams or autoRefs */
export interface ControllerReply {
  /** status_code is an optional code that indicates the result of the last request */
  statusCode: ControllerReply_StatusCode;
  /** reason is an optional explanation of the status code */
  reason: string;
  /**
   * next_token must be send with the next request, if secure communication is used
   * the token is used to avoid replay attacks
   * the token is always present in the very first message before the registration starts
   * the token is not present, if secure communication is not used
   */
  nextToken: string;
  /** verification indicates if the last request could be verified (secure communication) */
  verification: ControllerReply_Verification;
}

export enum ControllerReply_StatusCode {
  UNKNOWN_STATUS_CODE = 0,
  OK = 1,
  REJECTED = 2,
  UNRECOGNIZED = -1,
}

export function controllerReply_StatusCodeFromJSON(
  object: any
): ControllerReply_StatusCode {
  switch (object) {
    case 0:
    case "UNKNOWN_STATUS_CODE":
      return ControllerReply_StatusCode.UNKNOWN_STATUS_CODE;
    case 1:
    case "OK":
      return ControllerReply_StatusCode.OK;
    case 2:
    case "REJECTED":
      return ControllerReply_StatusCode.REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ControllerReply_StatusCode.UNRECOGNIZED;
  }
}

export function controllerReply_StatusCodeToJSON(
  object: ControllerReply_StatusCode
): string {
  switch (object) {
    case ControllerReply_StatusCode.UNKNOWN_STATUS_CODE:
      return "UNKNOWN_STATUS_CODE";
    case ControllerReply_StatusCode.OK:
      return "OK";
    case ControllerReply_StatusCode.REJECTED:
      return "REJECTED";
    case ControllerReply_StatusCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ControllerReply_Verification {
  UNKNOWN_VERIFICATION = 0,
  VERIFIED = 1,
  UNVERIFIED = 2,
  UNRECOGNIZED = -1,
}

export function controllerReply_VerificationFromJSON(
  object: any
): ControllerReply_Verification {
  switch (object) {
    case 0:
    case "UNKNOWN_VERIFICATION":
      return ControllerReply_Verification.UNKNOWN_VERIFICATION;
    case 1:
    case "VERIFIED":
      return ControllerReply_Verification.VERIFIED;
    case 2:
    case "UNVERIFIED":
      return ControllerReply_Verification.UNVERIFIED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ControllerReply_Verification.UNRECOGNIZED;
  }
}

export function controllerReply_VerificationToJSON(
  object: ControllerReply_Verification
): string {
  switch (object) {
    case ControllerReply_Verification.UNKNOWN_VERIFICATION:
      return "UNKNOWN_VERIFICATION";
    case ControllerReply_Verification.VERIFIED:
      return "VERIFIED";
    case ControllerReply_Verification.UNVERIFIED:
      return "UNVERIFIED";
    case ControllerReply_Verification.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Signature can be added to a request to let it be verfied by the controller */
export interface Signature {
  /** the token that was received with the last controller reply */
  token: string;
  /** the PKCS1v15 signature of this message */
  pkcs1v15: Uint8Array;
}

function createBaseControllerReply(): ControllerReply {
  return { statusCode: 0, reason: "", nextToken: "", verification: 0 };
}

export const ControllerReply = {
  encode(
    message: ControllerReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.statusCode !== 0) {
      writer.uint32(8).int32(message.statusCode);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    if (message.nextToken !== "") {
      writer.uint32(26).string(message.nextToken);
    }
    if (message.verification !== 0) {
      writer.uint32(32).int32(message.verification);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.statusCode = reader.int32() as any;
          break;
        case 2:
          message.reason = reader.string();
          break;
        case 3:
          message.nextToken = reader.string();
          break;
        case 4:
          message.verification = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ControllerReply {
    return {
      statusCode: isSet(object.statusCode)
        ? controllerReply_StatusCodeFromJSON(object.statusCode)
        : 0,
      reason: isSet(object.reason) ? String(object.reason) : "",
      nextToken: isSet(object.nextToken) ? String(object.nextToken) : "",
      verification: isSet(object.verification)
        ? controllerReply_VerificationFromJSON(object.verification)
        : 0,
    };
  },

  toJSON(message: ControllerReply): unknown {
    const obj: any = {};
    message.statusCode !== undefined &&
      (obj.statusCode = controllerReply_StatusCodeToJSON(message.statusCode));
    message.reason !== undefined && (obj.reason = message.reason);
    message.nextToken !== undefined && (obj.nextToken = message.nextToken);
    message.verification !== undefined &&
      (obj.verification = controllerReply_VerificationToJSON(
        message.verification
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ControllerReply>, I>>(
    object: I
  ): ControllerReply {
    const message = createBaseControllerReply();
    message.statusCode = object.statusCode ?? 0;
    message.reason = object.reason ?? "";
    message.nextToken = object.nextToken ?? "";
    message.verification = object.verification ?? 0;
    return message;
  },
};

function createBaseSignature(): Signature {
  return { token: "", pkcs1v15: new Uint8Array() };
}

export const Signature = {
  encode(
    message: Signature,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.pkcs1v15.length !== 0) {
      writer.uint32(18).bytes(message.pkcs1v15);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Signature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          message.pkcs1v15 = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Signature {
    return {
      token: isSet(object.token) ? String(object.token) : "",
      pkcs1v15: isSet(object.pkcs1v15)
        ? bytesFromBase64(object.pkcs1v15)
        : new Uint8Array(),
    };
  },

  toJSON(message: Signature): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    message.pkcs1v15 !== undefined &&
      (obj.pkcs1v15 = base64FromBytes(
        message.pkcs1v15 !== undefined ? message.pkcs1v15 : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signature>, I>>(
    object: I
  ): Signature {
    const message = createBaseSignature();
    message.token = object.token ?? "";
    message.pkcs1v15 = object.pkcs1v15 ?? new Uint8Array();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

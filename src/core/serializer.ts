import { SerializationError } from "./errors.js";
import type { Serializer } from "./types.js";

export const defaultSerializer: Serializer = {
  serialize(value: unknown): string {
    try {
      return JSON.stringify(value);
    } catch (err) {
      throw new SerializationError("failed to serialize value to json", err);
    }
  },
  deserialize<T = unknown>(raw: string): T {
    try {
      return JSON.parse(raw) as T;
    } catch (err) {
      throw new SerializationError("failed to parse json payload", err);
    }
  },
};

export const rawSerializer: Serializer = {
  serialize(value: unknown): string {
    return String(value);
  },
  deserialize<T = unknown>(raw: string): T {
    return raw as unknown as T;
  },
};

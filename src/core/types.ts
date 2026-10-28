export interface SetOptions {
  ttl?: number;
  nx?: boolean;
  xx?: boolean;
}

export interface AdapterCapabilities {
  ttl: boolean;
  batch: boolean;
  scan: boolean;
  cas: boolean;
  binary: boolean;
}

export interface KVEntry<T = unknown> {
  key: string;
  value: T;
  expiresAt?: number | null;
  updatedAt: number;
}

export interface Serializer {
  serialize(value: unknown): string;
  deserialize<T = unknown>(raw: string): T;
}

export interface StorageAdapter {
  readonly name: string;
  readonly capabilities: AdapterCapabilities;

  get<T = unknown>(key: string): Promise<T | null>;
  set<T = unknown>(key: string, value: T, options?: SetOptions): Promise<void>;
  delete(key: string): Promise<boolean>;
  has(key: string): Promise<boolean>;
  clear(): Promise<void>;
  keys(pattern?: string): Promise<string[]>;

  getMany?<T = unknown>(keys: string[]): Promise<Map<string, T | null>>;
  setMany?<T = unknown>(
    entries: Array<{ key: string; value: T; options?: SetOptions }>,
  ): Promise<void>;
  deleteMany?(keys: string[]): Promise<number>;

  disconnect?(): Promise<void>;
}

export interface StoreOptions {
  adapter: StorageAdapter;
  prefix?: string;
  defaultTTL?: number;
  serializer?: Serializer;
}

export interface StoreMetrics {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
}

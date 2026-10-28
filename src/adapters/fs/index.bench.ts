import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, bench, describe } from "vitest";
import { FsAdapter } from "./index.js";

describe("FsAdapter micro-benchmarks", () => {
  let tempDir: string;
  let adapter: FsAdapter;

  beforeAll(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "kvdock-bench-"));
    adapter = new FsAdapter({ dir: tempDir });
  });

  afterAll(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  bench("write file payload", async () => {
    await adapter.set("bench-key", "some payload string");
  });

  bench("read file payload", async () => {
    await adapter.get("bench-key");
  });
});

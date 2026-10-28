import { bench, describe } from "vitest";
import { MemoryAdapter } from "./index.js";

describe("MemoryAdapter micro-benchmarks", () => {
  const adapter = new MemoryAdapter({ maxSize: 100_000 });

  bench("set sequential keys", async () => {
    for (let i = 0; i < 1_000; i++) {
      await adapter.set(`bench:${i}`, "value");
    }
  });

  bench("get hit path", async () => {
    for (let i = 0; i < 1_000; i++) {
      await adapter.get(`bench:${i}`);
    }
  });

  bench("get miss path", async () => {
    for (let i = 0; i < 1_000; i++) {
      await adapter.get(`missing:${i}`);
    }
  });
});

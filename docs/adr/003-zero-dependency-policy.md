# 3. Zero Runtime Dependency Policy

Date: 2026-10-28

## Status

Accepted

## Context

Adding utility packages (`lodash`, `chalk`, `uuid`, `ms`) into foundational utility libraries bloats downstream `node_modules`, introduces supply chain attack vectors, and causes dependency resolution collisions across modern runtimes (Node.js, Bun, Deno, Cloudflare Workers).

## Decision

1. Zero external runtime dependencies in `dependencies` for the core engine.
2. Only `devDependencies` allowed for testing, linting, and build tooling (`typescript`, `vitest`, `tsup`, `@biomejs/biome`).
3. Standard runtime utilities (UUID generation, binary buffers, timers, hashing) must use standard web APIs (`crypto.randomUUID()`, `crypto.subtle`, `structuredClone`) or lightweight inline implementations.
4. Optional external drivers (e.g. `ioredis`, `@upstash/redis`, `@aws-sdk/client-s3`) must be marked as `peerDependencies` or dynamic imports in their respective subpaths, never in the main core bundle.

## Consequences

- Zero supply chain risk for core consumers.
- Instant installation time with zero transitive bloat.
- Universal compatibility across Node.js >= 18, Bun, Deno, and Edge runtimes.

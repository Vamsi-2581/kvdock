# 1. Core Architecture and Adapter Isolation

Date: 2026-10-28

## Status

Accepted

## Context

Most cache and key-value abstractions bundle multiple drivers (Redis, Memcached, SQLite, S3) inside one heavy package. This pulls hundreds of transient dependencies into production builds even when consumers only need in-memory or single-driver storage.

Additionally, when multiple contributors write adapters against a central monolithic file, git merge conflicts block release velocity.

## Decision

1. Keep `@kvdock/core` (or root `kvdock`) zero-dependency. Core defines pure interfaces, lifecycle hooks, key prefixing, invalidation logic, and serialization drivers.
2. Structure storage drivers under `src/adapters/<driver>/`.
3. Require each adapter to co-locate code (`index.ts`), unit tests (`index.test.ts`), and micro-benchmarks (`index.bench.ts`) in its dedicated folder.
4. Export adapters via subpath exports (`kvdock/adapters/memory`, `kvdock/adapters/fs`) to allow tree-shaking and independent consumption.

## Consequences

- Core bundle stays sub-3KB minified.
- PRs adding or fixing an adapter only touch `src/adapters/<driver>/**`, eliminating merge conflicts between concurrent contributors.
- Consumers pay zero dependency tax for unused storage engines.

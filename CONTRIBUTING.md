# Contributing to kvdock

## Quick Start

```bash
git clone https://github.com/zisam-glitch/kvdock.git
cd kvdock
npm install
npm run check
```

## Creating a Storage Adapter

All storage backends live in isolated directories under `src/adapters/<driver>/`:

```text
src/adapters/<driver>/
├── index.ts        # Implements StorageAdapter interface
├── index.test.ts   # Unit & edge-case test suite
└── index.bench.ts  # Micro-benchmark suite
```

### Requirements:

1. **Strict Interface Compliance**: Implement `StorageAdapter` from `src/core/types.ts`.
2. **Zero Core Bloat**: Never add driver-specific packages to the root `dependencies`. Driver SDKs must be `peerDependencies` or dynamically imported.
3. **Co-location**: Code, tests, and benchmarks must live in the same adapter folder.
4. **Coverage**: 95%+ branch coverage for all adapter code.

## Commits & Style

We use conventional commit format:

- `feat(core): add batch get support`
- `feat(adapter): add upstash redis adapter`
- `fix(fs): handle concurrent unlink races`
- `perf(memory): optimize sweep iteration`
- `test(core): add boundary tests for ttl`

Run validation before opening a PR:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

# 2. Error Handling and Failure Modes

Date: 2026-10-28

## Status

Accepted

## Context

Different backends fail differently. Redis times out over network, filesystem hits permission errors or disk-full, and in-memory throws on allocation limits. Bubbling raw driver errors leaks adapter internals and breaks downstream caller exception handling.

Swallowing errors silently or logging to stdout is equally harmful in production environments.

## Decision

1. Define a strict `KVDockError` hierarchy extending native `Error`:
   - `AdapterConnectionError`: transport or socket failures.
   - `KeyNotFoundError`: explicit missing key lookups when strict mode enabled.
   - `SerializationError`: JSON/binary encode/decode failures.
   - `TTLValidationError`: malformed expiry values.
2. Every adapter must catch driver-specific exceptions and wrap them in `KVDockError` with `.cause` pointing to the original error.
3. Operations support an optional `fallback` option: on backend timeout or connection drops, reads can gracefully resolve to default values without crashing the request loop.

## Consequences

- Callers write uniform `try/catch` blocks regardless of underlying driver.
- Original stack traces preserved via `error.cause`.
- Test suites can cleanly assert on error codes (`ERR_ADAPTER_TIMEOUT`, `ERR_SERIALIZATION`).

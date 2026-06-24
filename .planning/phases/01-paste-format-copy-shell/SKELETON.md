# Walking Skeleton - Easy LaTeX Formatter

**Phase:** 1
**Generated:** 2026-06-24

## Capability Proven End-to-End

User can open the app, paste LaTeX source, run a best-effort deterministic formatter, inspect output, and copy or download the formatted result.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Vite + React + TypeScript | Fits a small interactive client-side utility without server complexity. |
| Data layer | Browser state only | No persistence is required; pasted source should not be stored by default. |
| Auth | None | Accounts are explicitly out of scope. |
| Deployment target | Static web app | The Phase 1 app can be served as static assets. |
| Directory layout | `src/lib` for formatter logic, `src/App.tsx` for shell, `src/__tests__` for tests | Keeps formatter replaceable and UI easy to test. |

## Stack Touched in Phase 1

- [ ] Project scaffold (framework, build, lint/test runner)
- [ ] Routing - single root route
- [ ] Database - not applicable; Phase 1 is intentionally client-only
- [ ] UI - interactive paste-format-copy flow
- [ ] Deployment - documented local full-stack run command for the static app

## Out of Scope (Deferred to Later Slices)

- Production `tex-fmt` or `latexindent` integration.
- Full LaTeX parser.
- Diff view.
- File upload.
- PDF preview.
- AI cleanup.
- User accounts or saved documents.

## Subsequent Slice Plan

- Phase 2: Strengthen deterministic LaTeX formatter rules and protected block handling.
- Phase 3: Add options and diagnostics polish.
- Phase 4: Expand fixture-based quality harness and adapter replacement confidence.
- Phase 5: Finish responsive polish and release readiness.

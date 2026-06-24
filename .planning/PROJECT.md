# Easy LaTeX Formatter

## What This Is

Easy LaTeX Formatter is a small web tool for pasting LaTeX source and getting clean, consistently formatted LaTeX back immediately. It is for users who want a simple "paste, format, copy" workflow without installing a desktop editor extension or learning formatter command-line flags.

The first version is not a LaTeX authoring suite. It is a focused formatter interface that makes messy `.tex` source readable through deterministic local rules.

## Core Value

User can paste LaTeX source, click format, and copy a cleaner version in one quick flow.

## Requirements

### Validated

(None yet - ship to validate)

### Active

- [ ] User can paste LaTeX source into a single-page interface.
- [ ] User can format source with a deterministic local formatter.
- [ ] User can inspect the formatted output before copying it.
- [ ] User can copy or download the formatted result.
- [ ] User receives clear feedback when input cannot be formatted safely.

### Out of Scope

- AI rewriting or semantic cleanup - v1 must be deterministic, local, and repeatable.
- Full LaTeX compilation or PDF preview - useful later, but not needed for the core formatting loop.
- Account system, saved documents, or cloud storage - unnecessary for a single-purpose formatter.
- Template generation from prose - user selected source formatting, not text-to-LaTeX conversion.

## Context

- Repository target: `https://github.com/AE-BASOL/easylatexformatter.git`.
- The remote appears to have no published branch content at initialization time; this workspace starts as a greenfield project.
- User selected:
  - Formatter scope: LaTeX source formatting.
  - Interface: paste-format-copy.
  - Engine: deterministic local.
  - GSD mode: YOLO.
  - Granularity: standard.
  - Planning: parallel enabled, docs committed, research/plan check/verifier/drift guard enabled.
- Current formatter landscape:
  - `tex-fmt` is a fast Rust LaTeX formatter with CLI, stdin/stdout, config, and browser demo support.
  - `latexindent` is the mature CTAN/TeX Live/MiKTeX formatter, but Perl/TeX distribution coupling is heavier for a simple web app.
  - `unified-latex` offers JavaScript AST tooling and is useful if custom parsing/manipulation becomes necessary.

## Constraints

- **Product focus**: v1 must be a simple one-screen formatter - the user wants "put text in, format immediately."
- **Engine behavior**: v1 formatting must be deterministic and local - no AI dependency, no remote model call.
- **UX**: primary flow must be paste -> format -> copy/download with obvious controls and clear error states.
- **Architecture**: keep formatter integration replaceable so the project can start with a pragmatic engine and swap/extend later.
- **Privacy**: source text should stay client-side if feasible; if a server formatter is used temporarily, that must be explicit.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build LaTeX source formatter, not prose-to-LaTeX converter | User chose source formatting as v1 scope | - Pending |
| Use paste-format-copy UI for v1 | Fastest path to the requested workflow | - Pending |
| Use deterministic local formatting | User wants reliable formatting without AI uncertainty | - Pending |
| Keep AI assistance out of v1 | Avoid cost, latency, semantic drift, and privacy concerns | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? Move to Out of Scope with reason
2. Requirements validated? Move to Validated with phase reference
3. New requirements emerged? Add to Active
4. Decisions to log? Add to Key Decisions
5. "What This Is" still accurate? Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-24 after initialization*

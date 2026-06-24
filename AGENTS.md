# AGENTS.md

## Project

Easy LaTeX Formatter is a single-purpose web tool: paste LaTeX source, format it deterministically, then copy or download the result.

Read these files before planning or implementing:

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`

## Working Rules

- Keep v1 focused on paste-format-copy. Do not expand into a full IDE, PDF previewer, account system, or AI rewriting tool unless the planning docs are updated first.
- Formatting must be deterministic and local by default.
- Protect user input: failed formatting must not erase or overwrite the original source.
- Keep formatter logic behind an adapter so the engine can be replaced or upgraded.
- Add fixture tests for formatter behavior whenever formatting rules change.

## Current Next Step

Run `$gsd-discuss-phase 1` to clarify the implementation approach for the Paste-Format-Copy Shell.

# Pitfalls Research: Easy LaTeX Formatter

## Pitfall: Formatting Changes Meaning

Warning signs:

- Math environments are reflowed aggressively.
- Comments are moved or dropped.
- Verbatim-like blocks are modified.

Prevention:

- Treat `verbatim`, `lstlisting`, `minted`, and similar environments as protected blocks.
- Preserve comments unless a rule explicitly handles them.
- Use fixture tests with equations, lists, tables, comments, and nested environments.

Phase: 2 and 3.

## Pitfall: Building a Full Editor Too Early

Warning signs:

- Syntax highlighting, preview, file projects, or account features block the first usable formatter.

Prevention:

- Phase 1 must deliver the plain paste-format-copy loop.
- Defer split editor, preview, and project storage.

Phase: 1.

## Pitfall: Engine Packaging Blocks the Product

Warning signs:

- The app cannot run because Rust/WASM/server packaging is unresolved.

Prevention:

- Build a formatter adapter first.
- Ship a minimal deterministic formatter while integrating a stronger engine behind the same interface.

Phase: 2.

## Pitfall: Weak Error Messages

Warning signs:

- Users see "failed" with no context.
- Output disappears after an error.

Prevention:

- Keep input intact.
- Show diagnostics separately.
- Allow copying original input if no formatted output exists.

Phase: 3.

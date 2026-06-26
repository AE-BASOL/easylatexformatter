# Phase 2: Deterministic Formatter Core - Context

**Gathered:** 2026-06-27
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase replaces the Phase 1 best-effort formatter with a stronger set of deterministic LaTeX source formatting rules. The formatter adapter (`src/lib/formatter.ts`) is strengthened in-place. This phase covers: display math environment indentation, comment line handling, blank-line normalization, preamble detection, expanded verbatim protection, and diagnostic improvement. This phase does not add user-facing options UI, diff views, file upload, or any AI-based formatting.

</domain>

<decisions>
## Implementation Decisions

### Math and Display Environments
- Display math environments (`equation`, `align`, `gather`, `multline`, `eqnarray` and their starred variants) are indented like any other `\begin{}/\end{}` environment — content inside receives one additional indent level.
- Starred variants (`equation*`, `align*`, `gather*`, etc.) are treated identically to their unstarred equivalents.
- `\[...\]` display math is treated as a virtual environment: content between `\[` and `\]` receives one indent level.
- Inline `$...$` math is left entirely untouched within lines — no parsing or reformatting of inline math content.

### Comment and Blank-Line Rules
- Comment lines starting with `%` are indented to the current depth and have trailing whitespace stripped, but are otherwise not rewritten. They are treated like regular lines for depth purposes.
- Multiple consecutive blank lines are collapsed to a single blank line.
- Lines in the preamble (before `\begin{document}`) are kept at depth 0 — the formatter detects the first `\begin{document}` and resets depth tracking from that point. Preamble `\begin{}` lines (like `\begin{frame}` in standalone preambles) are unusual and treated normally.
- Partial LaTeX snippets (no `\begin{document}`) are formatted normally with no special treatment or warning.

### Protected Block Coverage
- Protected environments (content preserved exactly, indentation not applied): `verbatim`, `Verbatim`, `lstlisting`, `minted`, `BVerbatim`, `LVerbatim`, `alltt`, `tikzpicture`, `pgfpicture`, `forest`.
- Inline `\verb|...|` is left untouched within any line — lines containing `\verb` are not skipped from reformatting, but the `\verb` content itself is not parsed.
- `figure` and `table` (and `figure*`, `table*`) are indented as normal environments — their content is not specially protected.
- `subfigure` and `wrapfigure` are treated as normal environments.

### Diagnostics and Confidence Signal
- The default diagnostic "Best-effort formatter: advanced LaTeX formatting comes later." is replaced with "Formatted with deterministic LaTeX rules." when formatting succeeds.
- Unrecognized environments are formatted with default indentation rules silently — no per-environment diagnostic warning (would be too noisy).
- The formatter detects unmatched `\begin{}/\end{}` pairs (more opens than closes or vice versa at end of input) and adds a diagnostic: "Warning: unmatched environment block detected — check nesting."
- The existing `changed: boolean` field in `FormatResult` covers OUTP-04 ("user can see whether formatting changed input") — no additional delta reporting needed in Phase 2.

### Claude's Discretion
- Exact threshold for "consecutive blank lines" (2 or more → 1) is at implementation discretion.
- The implementation may add any additional math-family environments it detects as commonly used (e.g., `cases`, `matrix`, `pmatrix`, `bmatrix`) to the standard environment set.
- Edge cases in `\[...\]` detection (e.g., `\[` not at start of trimmed line) handled at discretion.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/formatter.ts` — `formatLatexSource(input, options)` returns `FormatResult`. This is the only file to modify in Phase 2.
- `FormatResult` type already has `ok`, `output`, `diagnostics`, `changed` fields.
- `FormatOptions` type has `indentSize` and `wrapLines`.
- `PROTECTED_ENVIRONMENTS` Set and `LIST_ENVIRONMENTS` Set are the expandable collections.
- `beginPattern`, `endPattern` regexes are reusable.
- `softWrapLine` utility is unrelated to Phase 2 changes.

### Established Patterns
- The formatter is a pure function (no side effects, no state). Phase 2 continues this pattern.
- Tests are in `src/__tests__/formatter.test.ts` using Vitest. Fixture-style tests with representative input strings.
- `App.tsx` calls `formatLatexSource(input)` with no options — Phase 2 changes are transparent to the UI unless diagnostics change.

### Integration Points
- `App.tsx` displays `result.diagnostics` in the diagnostics section. The new success message flows through without UI changes.
- `App.tsx` uses `result.changed` to set toolbar status ("Formatted" vs "No changes") — this already works.
- The adapter boundary is `src/lib/formatter.ts` — Phase 4 will isolate this behind a formal interface; Phase 2 strengthens in-place.

</code_context>

<specifics>
## Specific Ideas

- The formatter must not claim to handle cases it does not — diagnostics should be honest but confident.
- Blank-line collapsing is a common formatter quality expectation; missing it makes output look unprofessional.
- `tikzpicture` content is extremely sensitive to whitespace — protecting it is a correctness requirement, not cosmetic.
- The preamble-at-depth-0 rule matters for real-world usage: most users will paste full `.tex` files, not snippets.

</specifics>

<deferred>
## Deferred Ideas

- User-configurable protected environment list (Phase 3 options work)
- Diff view showing what changed between input and output (Phase 3, OUTP-04 extended)
- Per-environment diagnostic counts (too noisy for Phase 2)
- Formal adapter interface extraction (Phase 4, QUAL-03)

</deferred>

---

*Phase: 2-Deterministic-Formatter-Core*
*Context gathered: 2026-06-27*

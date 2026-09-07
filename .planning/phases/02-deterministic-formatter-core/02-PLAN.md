# Phase 2: Deterministic Formatter Core - Plan

**Status:** Planned
**Mode:** mvp

<plan>
## Execution Plan

### 1. Update Formatter Types & Constants
- Update `FormatResult` in `src/lib/formatter.ts`.
- Add extended protected environments: `Verbatim`, `tikzpicture`, `pgfpicture`, `forest`, `BVerbatim`, `LVerbatim`, `alltt`.
- Define display math environments that should be treated as regular environments: `equation`, `equation*`, `align`, `align*`, `gather`, `gather*`, `multline`, `multline*`, `eqnarray`, `eqnarray*`.

### 2. Implement Deterministic Formatting Logic
- **Math & Display Environments**: Indent them like normal `\begin{...}` / `\end{...}`.
- **Virtual Environment `\[` ... `\]`**: When matching `\[`, treat as `\begin` math block. When matching `\]`, treat as `\end` math block.
- **Comment Lines (`%`)**: Keep at current depth, strip trailing whitespace, do not parse for environments.
- **Multiple Blank Lines**: Collapse consecutive blank lines into a single blank line.
- **Preamble Handling**: Detect first `\begin{document}`. Lines before this remain at depth 0.
- **Diagnostics**:
  - Replace "Best-effort formatter..." with "Formatted with deterministic LaTeX rules." on success.
  - Add "Warning: unmatched environment block detected — check nesting." if `depth !== 0` at the end or if `\end` is encountered without matching `\begin`.

### 3. Add Tests
- Update `src/__tests__/formatter.test.ts` to test new behaviors.
</plan>

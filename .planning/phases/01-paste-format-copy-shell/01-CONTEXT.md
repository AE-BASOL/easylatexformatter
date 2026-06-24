# Phase 1: Paste-Format-Copy Shell - Context

**Gathered:** 2026-06-24
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers the first usable single-page formatter shell: a user can paste LaTeX source, run a basic deterministic format action, inspect output, copy/download the result, clear input, and load a sample. This phase should not build the full production formatter engine, diff view, file upload, PDF preview, AI cleanup, or account/storage features.

</domain>

<decisions>
## Implementation Decisions

### Layout Shape
- **D-01:** Use stacked panels: input on top, output below.
- **D-02:** Put the main controls in one top action bar rather than scattering controls across panel headers.
- **D-03:** On mobile, keep output below input in normal document flow. Do not add collapsible output or automatic scroll-to-output behavior in Phase 1.

### Visual Tone
- **D-04:** Use a minimal utility feel: simple, fast, low-distraction, and tool-like.
- **D-05:** Use a light neutral palette with clear typography, readable borders, and one restrained accent color.
- **D-06:** Avoid an IDE-like or academic-paper aesthetic in Phase 1.

### First Formatter Behavior
- **D-07:** Phase 1 should include a basic LaTeX indentation formatter, not just whitespace normalization.
- **D-08:** The formatter should handle simple `\begin{...}` / `\end{...}` block indentation, `\item` lines, and basic whitespace cleanup as best-effort behavior.
- **D-09:** The UI must be honest about limitations: show a short notice or diagnostic that advanced formatting comes later.

### Output Actions
- **D-10:** Make Format the primary action.
- **D-11:** Make Copy a secondary action that is enabled when output exists.
- **D-12:** Keep Download, Clear, and Sample as quieter secondary actions in the top action bar.
- **D-13:** Show formatting feedback as short status text in the toolbar, such as "Formatted", "No changes", or "Check diagnostics". Do not add toast or output-banner feedback in Phase 1.

### the agent's Discretion
- The implementation agent may choose the exact frontend scaffold and styling implementation as long as the resulting app follows the decisions above and remains easy to test.
- The implementation agent may choose the exact sample LaTeX snippet, but it should exercise at least a document environment, item list, and simple math block.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` — Product scope, constraints, and v1 exclusions.
- `.planning/REQUIREMENTS.md` — Phase 1 requirement IDs and acceptance criteria.
- `.planning/ROADMAP.md` — Phase 1 goal, success criteria, and requirement mapping.
- `.planning/STATE.md` — Current project state and phase status.

### Research
- `.planning/research/SUMMARY.md` — Stack and formatter research summary.
- `.planning/research/ARCHITECTURE.md` — Formatter adapter direction and data flow.
- `.planning/research/FEATURES.md` — Table stakes and deferred feature ideas.
- `.planning/research/PITFALLS.md` — Risks to avoid while building the initial shell.
- `.planning/research/STACK.md` — Formatter engine options and app stack recommendation.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No app source code exists yet. The repo currently contains planning artifacts only.

### Established Patterns
- No frontend conventions are established yet. Phase 1 may define the initial app structure, component naming, and CSS conventions.

### Integration Points
- New app scaffold should live at the repository root unless planning later decides otherwise.
- Formatter behavior should be isolated behind an adapter from the beginning so Phase 2 can replace or strengthen the implementation without rewriting the UI.

</code_context>

<specifics>
## Specific Ideas

- First screen should feel like a straightforward utility, not a marketing landing page.
- The top action bar should make the main flow obvious: format first, then copy/download.
- The first formatter should provide visible value while clearly avoiding claims of complete LaTeX formatting.

</specifics>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Paste-Format-Copy Shell*
*Context gathered: 2026-06-24*

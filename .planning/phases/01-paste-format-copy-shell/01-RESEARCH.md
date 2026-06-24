# Phase 1: Paste-Format-Copy Shell - Research

**Researched:** 2026-06-24
**Domain:** Client-side React formatter utility
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Use stacked panels: input on top, output below.
- Put the main controls in one top action bar.
- On mobile, keep output below input in normal document flow.
- Use a minimal utility feel with a light neutral palette and one restrained accent color.
- Avoid IDE-like, academic-paper, landing-page, toast, or banner-heavy UI.
- Phase 1 includes basic LaTeX indentation, not only whitespace normalization.
- Basic formatter is best-effort and must show limitation notice/diagnostics.
- Format is primary, Copy is secondary, Download/Clear/Sample are quieter secondary actions.
- Formatting feedback appears as short toolbar status text.

### the agent's Discretion
- Exact frontend scaffold and styling implementation.
- Exact sample LaTeX snippet.
- Exact wording of status and diagnostics.

### Deferred Ideas (OUT OF SCOPE)
- Full production formatter engine integration.
- Diff view.
- File upload.
- PDF preview.
- AI cleanup.
- Account/storage features.
</user_constraints>

<architectural_responsibility_map>
## Architectural Responsibility Map

Single-tier application - all Phase 1 capabilities reside in the browser/client tier.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|--------------|----------------|-----------|
| Paste/type source | Browser/Client | - | User input stays in local UI state. |
| Basic formatting | Browser/Client | - | Phase 1 deterministic formatter can run locally without server dependency. |
| Output rendering | Browser/Client | - | Output is derived from input and displayed immediately. |
| Copy/download | Browser/Client | - | Clipboard and Blob download APIs are browser-native. |
| Sample/clear | Browser/Client | - | Pure UI state actions. |
</architectural_responsibility_map>

<research_summary>
## Summary

Phase 1 should use a simple Vite + React + TypeScript scaffold because the project is a client-side utility with no backend requirement. The architecture should still isolate formatting logic behind an adapter so Phase 2 can strengthen the formatter without rewriting the UI.

The standard approach is a controlled React app: input state, formatter result state, toolbar commands, and pure helper functions for deterministic formatting/copy/download behavior. Styling should be plain CSS with stable responsive constraints because no design system exists yet.

**Primary recommendation:** Build a Vite React app with `src/lib/formatter.ts`, `src/App.tsx`, and focused tests around the formatter and UI flow.
</research_summary>

<standard_stack>
## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | latest stable | Frontend build/dev server | Fast, minimal React scaffolding. |
| react | latest stable | UI state and rendering | Standard for small interactive web apps. |
| typescript | latest stable | Static typing | Keeps formatter contracts explicit. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| vitest | latest stable | Unit tests | Formatter fixtures and pure helpers. |
| @testing-library/react | latest stable | UI tests | Button states and paste-format-copy flow. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vite React | Next.js | Next is unnecessary for a static client utility in Phase 1. |
| Plain CSS | Tailwind | Tailwind is fine, but plain CSS avoids extra setup and is enough for the minimal utility UI. |
| Internal formatter | tex-fmt integration | `tex-fmt` is preferred later, but Phase 1 needs a working shell without packaging risk. |

**Installation:**
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### System Architecture Diagram

```text
User text input
  -> React state
  -> Format command
  -> formatter adapter
  -> FormatResult { output, diagnostics, changed }
  -> Output panel + toolbar status
  -> Copy/download browser APIs
```

### Recommended Project Structure

```text
src/
├── App.tsx                 # Single-page shell and command wiring
├── App.css                 # Minimal utility layout and responsive styling
├── lib/
│   └── formatter.ts        # FormatOptions, FormatResult, formatLatexSource
├── test/
│   └── setup.ts            # Test setup for DOM assertions
└── __tests__/
    ├── formatter.test.ts   # Formatter fixture tests
    └── App.test.tsx        # Flow/button-state tests
```

### Pattern 1: Formatter Adapter

**What:** A pure function receives source and options, returns output plus diagnostics.
**When to use:** Always. UI should not embed formatting rules directly.

### Pattern 2: Derived Toolbar State

**What:** Button enabled/disabled and status text derive from input/output/result state.
**When to use:** For Format, Copy, Download, Clear, and Sample actions.

### Anti-Patterns to Avoid
- **Formatter rules inside JSX:** Makes Phase 2 replacement harder.
- **Marketing hero screen:** User asked for the tool as the first screen.
- **Server dependency:** Phase 1 can run fully in-browser.
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Full LaTeX parser | Regex parser pretending to understand all TeX | Best-effort simple rules with diagnostics | Full TeX parsing is out of scope and risky. |
| Clipboard fallback matrix | Complex legacy clipboard support | `navigator.clipboard.writeText` with error handling | Modern browsers cover the target utility flow. |
| App framework | Custom bundler | Vite | Reduces setup risk. |

**Key insight:** Hand-roll only the minimal Phase 1 best-effort formatter. Keep the adapter boundary ready for a real formatter later.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Overstating Formatter Completeness
**What goes wrong:** Users think the tool fully understands LaTeX.
**Why it happens:** UI says "formatted" without limitation notice.
**How to avoid:** Always include diagnostics/notice for best-effort formatting.
**Warning signs:** No diagnostics for complex input.

### Pitfall 2: Losing User Input
**What goes wrong:** Clear/error paths wipe pasted source.
**Why it happens:** Output and input state are coupled incorrectly.
**How to avoid:** Keep input, output, and diagnostics as separate state.
**Warning signs:** Format failure modifies input textarea.

### Pitfall 3: Responsive Layout Drift
**What goes wrong:** Buttons wrap badly or panels become cramped on mobile.
**Why it happens:** Toolbar and panels have no stable responsive constraints.
**How to avoid:** Use flex-wrap, min-height textareas, and full-width mobile buttons where needed.
**Warning signs:** Text overflows toolbar buttons at narrow widths.
</common_pitfalls>

<code_examples>
## Code Examples

### Formatter Adapter Shape

```typescript
export type FormatResult = {
  ok: boolean;
  output: string;
  diagnostics: string[];
  changed: boolean;
};
```

### Browser Download

```typescript
const blob = new Blob([output], { type: "text/x-tex;charset=utf-8" });
const url = URL.createObjectURL(blob);
```
</code_examples>

<sota_updates>
## State of the Art (2024-2025)

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Heavy SPA scaffolds for tiny tools | Vite-powered focused apps | Faster setup and simpler deployment. |
| Formatting directly in UI handlers | Pure formatter adapters | Easier replacement and testing. |

**New tools/patterns to consider:**
- `tex-fmt` can replace or augment the internal formatter in a later phase.

**Deprecated/outdated:**
- Server round-trips for simple formatting utilities when client-side state is enough.
</sota_updates>

<open_questions>
## Open Questions

None blocking for Phase 1. The exact production formatter engine is intentionally deferred to Phase 2.
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `.planning/phases/01-paste-format-copy-shell/01-CONTEXT.md` - locked user decisions.
- `.planning/research/SUMMARY.md` - project-level formatter research.
- `.planning/research/ARCHITECTURE.md` - adapter and data-flow recommendation.
- `.planning/research/PITFALLS.md` - phase risks.

### Secondary (MEDIUM confidence)
- Vite/React ecosystem conventions from standard project scaffolding.
</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: Vite + React + TypeScript.
- Ecosystem: local client-side utility patterns.
- Patterns: formatter adapter, toolbar state, responsive stacked panels.
- Pitfalls: misleading formatter claims, input loss, responsive drift.

**Confidence breakdown:**
- Standard stack: HIGH - simple browser utility.
- Architecture: HIGH - matches project research and context.
- Pitfalls: HIGH - directly derived from scope and UI decisions.
- Code examples: MEDIUM - illustrative, to be validated during implementation.

**Research date:** 2026-06-24
**Valid until:** 2026-07-24
</metadata>

---

*Phase: 01-paste-format-copy-shell*
*Research completed: 2026-06-24*
*Ready for planning: yes*

# Phase 3: Options and Diagnostics - Context

**Gathered:** 2026-07-08
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase introduces basic user controls for formatting options (indent size and text wrapping) and improves the diagnostic feedback mechanism in the UI. It satisfies FORM-04, FORM-05, and OUTP-04. The formatter engine already supports these options programmatically; this phase wires them up to the UI and refines how feedback and changes are surfaced.

</domain>

<decisions>
## Implementation Decisions

### Formatting Options UI
- A new "Settings" or "Options" section will be added to the UI, likely above or next to the toolbar.
- The user can select indent size (e.g. 2, 4, Tab).
- The user can toggle text wrapping (`wrapLines`).

### Diagnostics and State UI
- Formatting errors and warnings should appear clearly (e.g., inside the diagnostics panel).
- The formatter must never delete or overwrite the user's `textarea` input when an error occurs.
- The UI must visibly indicate whether the source was changed by the formatter (OUTP-04) — the existing `changed` boolean in `FormatResult` will be used to show a "No changes needed" or "Formatted" status more prominently.

### Claude's Discretion
- The exact placement of the options UI (e.g. a collapsible panel, inline dropdowns, or modal) is at the implementation's discretion, keeping it simple and non-intrusive.
- Styling of the diagnostics list can be improved to look more like actionable messages rather than plain text.

</decisions>

<code_context>
## Existing Code Insights

- `src/lib/formatter.ts` already takes `options: Partial<FormatOptions> = {}` which includes `indentSize` and `wrapLines`.
- `App.tsx` already has `handleFormat` which checks `result.ok` and displays diagnostics.
- `App.tsx` already uses `result.changed` to update the toolbar status. We will make this more noticeable if needed or add a visual indicator.

</code_context>

<specifics>
## Specific Ideas

- Keep the options very lightweight to not clutter the "paste-format-copy" one-page vibe.
- Ensure the options state is preserved during the session (using standard React state).

</specifics>

<deferred>
## Deferred Ideas

- LocalStorage persistence for options (can be done later if requested, but not strictly MVP for this phase).
- Advanced formatter rules like sorting packages.

</deferred>

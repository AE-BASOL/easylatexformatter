# Phase 3: Options and Diagnostics - Plan

**Status:** Planned
**Mode:** mvp

<plan>
## Execution Plan

### 1. Options UI Component
- In `src/App.tsx`, create state variables for formatter options: `indentSize` (default: 2) and `wrapLines` (default: false).
- Add a new settings/options panel next to or below the main toolbar.
- The options panel will include:
  - A `<select>` or radio buttons for **Indent Size**: 2 spaces, 4 spaces.
  - A `<input type="checkbox">` for **Wrap Lines** (soft wrapping at 100 chars).
- Pass these options to `formatLatexSource(input, { indentSize, wrapLines })`.

### 2. Diagnostics UI Refinement
- Improve the diagnostics section in `src/App.tsx` and `src/App.css`.
- Render diagnostics with visual cues (e.g. icons or colors: warning vs success vs error).
- Ensure that if formatting fails, the original input is untouched (already handled, just ensure the UI reflects it clearly).

### 3. State Indicators
- Make the `result.changed` status more explicit in the UI. We already have `statusKind` ("success", "info"). Add a visual badge or text to the Output panel header indicating "Changed" or "Unchanged".

### 4. Tests
- Update `src/__tests__/App.test.tsx` to ensure that formatting options are present and interactable, and diagnostics display properly.

</plan>

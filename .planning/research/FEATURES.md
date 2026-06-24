# Feature Research: Easy LaTeX Formatter

## Table Stakes

- Paste input area for LaTeX source.
- Format command with visible success/error state.
- Output area preserving whitespace and line breaks.
- Copy formatted output.
- Download output as `.tex`.
- Clear sample input or empty-state behavior.
- Basic options:
  - indentation width
  - line wrapping on/off
  - table formatting on/off if engine supports it
- Formatter diagnostics that do not erase the user's input.

## Differentiators

- Client-side formatting for privacy.
- Before/after diff view.
- Formatting options saved locally.
- Keyboard shortcut for formatting.
- Example snippets for common LaTeX structures.
- File upload/drop for `.tex`.

## Anti-Features

- AI rewrite by default.
- Auto-changing math semantics.
- Requiring login.
- Hiding formatter failures behind generic "something went wrong" messages.
- Full IDE layout before the core flow is solid.

## v1 Feature Recommendation

Ship a tight paste-format-copy loop first:

1. Input textarea.
2. Format button.
3. Output textarea/pre block.
4. Copy and download buttons.
5. Minimal options.
6. Diagnostics panel.

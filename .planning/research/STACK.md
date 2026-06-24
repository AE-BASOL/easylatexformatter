# Stack Research: Easy LaTeX Formatter

## Recommendation

Use a small TypeScript web app with a replaceable formatter adapter. Target a local deterministic formatter first, with the adapter shaped around `format(input, options) -> { output, diagnostics }`.

## Formatter Options

### tex-fmt

- Rust formatter focused on LaTeX source indentation, line wrapping, and table formatting.
- Supports CLI usage with `--stdin` and `--print`, making it easy to wrap from a backend or compile to a browser-capable path later.
- Has an existing browser demo, which suggests the project shape is compatible with the requested paste-format-copy experience.
- Good default candidate for v1 if packaging friction is acceptable.

Source: https://github.com/WGUNDERWOOD/tex-fmt

### latexindent

- Mature formatter distributed through CTAN and included in TeX Live/MiKTeX.
- Strong choice for users already inside a TeX distribution.
- Less attractive as the default web-app engine because Perl/runtime packaging is heavier than a single app dependency.

Source: https://ctan.org/pkg/latexindent

### unified-latex

- JavaScript/TypeScript LaTeX parsing and AST manipulation utilities.
- Useful if the app needs custom transformations, syntax-aware error recovery, or editor features.
- More work than delegating to a dedicated formatter if the immediate goal is "format now."

Source: https://github.com/siefkenj/unified-latex

## App Stack

- Frontend: Vite + React + TypeScript for a small single-page app.
- UI: plain CSS or a lightweight component layer; avoid heavy design systems for v1.
- Formatter adapter:
  - Phase 1 can include a deterministic internal formatter skeleton for vertical delivery.
  - Phase 2 should integrate a proven engine such as `tex-fmt` through CLI/server or WASM/browser packaging.
- Tests:
  - Unit tests for formatting fixtures.
  - UI tests for paste, format, copy, download, and error states.

## Decision

Plan the project around `tex-fmt` compatibility, but keep the app code engine-agnostic. This avoids blocking the whole product on one packaging path.

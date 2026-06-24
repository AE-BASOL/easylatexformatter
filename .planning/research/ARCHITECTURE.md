# Architecture Research: Easy LaTeX Formatter

## Components

### Web UI

Owns the single-page flow:

- input text
- formatter options
- output text
- diagnostics
- copy/download actions

### Formatter Adapter

Stable interface between UI and engine:

```ts
type FormatOptions = {
  indentSize: number;
  wrapLines: boolean;
  formatTables: boolean;
};

type FormatResult = {
  ok: boolean;
  output: string;
  diagnostics: string[];
};
```

### Formatter Engine

Implementation can evolve:

- v1 internal deterministic formatter for immediate app behavior.
- proven engine integration (`tex-fmt`) for production-grade formatting.
- optional future AI cleanup behind an explicit separate control, not v1 default.

### Persistence

Use local browser state only:

- last options
- optional sample toggle

Do not persist pasted LaTeX content by default.

## Data Flow

1. User pastes LaTeX source.
2. UI validates non-empty input.
3. UI calls formatter adapter with current options.
4. Adapter returns output and diagnostics.
5. UI renders output and enables copy/download.

## Suggested Build Order

1. Static UI shell with paste-format-copy flow.
2. Formatter adapter contract and fixture tests.
3. Internal deterministic formatting rules.
4. Diagnostics and error handling.
5. Copy/download UX polish.
6. Swap or augment engine with `tex-fmt` integration.

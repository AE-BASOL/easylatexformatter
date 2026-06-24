# Research Summary: Easy LaTeX Formatter

## Stack

Use a Vite + React + TypeScript app with a replaceable formatter adapter. Design toward `tex-fmt` compatibility because it is a fast Rust LaTeX formatter with CLI/stdin support and a browser demo, while keeping `latexindent` and `unified-latex` as reference alternatives.

## Table Stakes

- Paste LaTeX source.
- Format deterministically.
- Show formatted output.
- Copy output.
- Download `.tex`.
- Preserve input on failure.
- Show clear diagnostics.

## Watch Out For

- Do not mutate semantic content while formatting.
- Protect verbatim-like environments.
- Do not overbuild an editor before the core flow works.
- Keep engine integration swappable to avoid packaging dead ends.

## Key Decision

The v1 product should be a focused paste-format-copy formatter, not a LaTeX IDE, AI converter, or compiler preview tool.

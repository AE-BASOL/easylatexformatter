# Phase 4: Formatter Quality Harness - Context

**Gathered:** 2026-07-08
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase focuses strictly on the architecture and reliability of the formatting engine. It satisfies QUAL-01 (Adapter pattern) and QUAL-03 (Fixture tests). There are no new user-facing features or UI changes in this phase.

</domain>

<decisions>
## Implementation Decisions

### Formatter Adapter Interface
- Define a `FormatterEngine` interface that takes `input: string` and `options: FormatOptions` and returns a `FormatResult`.
- Move the current deterministic implementation into a `RegexFormatterEngine` class or a concrete adapter module (e.g., `src/lib/adapters/regexFormatter.ts`).
- Update `src/lib/formatter.ts` to act as a facade/adapter registry. The UI (`App.tsx`) will just call `formatLatexSource` as usual, completely unaware of the underlying engine.

### Fixture Test Suite
- Introduce a mechanism to read from a `fixtures` array or directory in `src/__tests__/fixtures/`.
- We can define simple inline fixtures within `src/__tests__/formatter.fixtures.test.ts` or as separate `.tex` files. For Vite/Vitest, inline objects are easiest to maintain without complex fs reads.
- We will define 3-4 comprehensive LaTeX snippets covering edge cases: heavy nesting, mixed comments, preamble with document, and equations.
- The test will loop through these fixtures, asserting that `formatLatexSource(input)` matches `expected`.

</decisions>

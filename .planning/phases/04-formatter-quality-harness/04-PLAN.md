# Phase 4: Formatter Quality Harness - Plan

**Status:** Planned
**Mode:** mvp

<plan>
## Execution Plan

### 1. Engine Adapter Abstraction
- In `src/lib/formatter.ts` (or a new `src/lib/types.ts`), define `FormatterEngine` interface:
  ```typescript
  export interface FormatterEngine {
    format(input: string, options: FormatOptions): FormatResult;
  }
  ```
- Move the current formatting logic into `src/lib/adapters/RegexFormatterEngine.ts` implementing `FormatterEngine`.
- Refactor `src/lib/formatter.ts` to instantiate `RegexFormatterEngine` and call its `format` method.

### 2. Fixture Test Suite
- Create `src/__tests__/fixtures.test.ts`.
- Define an array of test fixtures containing `name`, `input`, and `expected` string pairs covering:
  1. A full document with preamble, math block, list, and verbatim blocks.
  2. Nested lists with comments.
- Assert that `formatLatexSource` correctly matches the `expected` output for each fixture.
- This secures the `RegexFormatterEngine` behavior from regressions.

### 3. Cleanup
- Ensure all existing tests in `formatter.test.ts` pass with the new adapter pattern.

</plan>

# Roadmap: Easy LaTeX Formatter

**Created:** 2026-06-24
**Mode:** Standard granularity with MVP-oriented vertical delivery
**Core Value:** User can paste LaTeX source, click format, and copy a cleaner version in one quick flow.

## Overview

| Phase | Name | Goal | Requirements |
|-------|------|------|--------------|
| 1 | Paste-Format-Copy Shell | Complete: 3/3 plans executed on 2026-06-24. Delivered the first usable one-page workflow with placeholder deterministic formatting. | INPT-01, INPT-02, INPT-03, FORM-01, OUTP-01, OUTP-02, OUTP-03 |
| 2 | Deterministic Formatter Core | Implement safe LaTeX source formatting rules for common structures. | FORM-02, FORM-03 |
| 3 | Options and Diagnostics | Add basic formatter options, change status, and useful failure feedback. | FORM-04, FORM-05, OUTP-04 |
| 4 | Formatter Quality Harness | Lock behavior with fixtures and keep engine code swappable. | QUAL-01, QUAL-03 |
| 5 | Responsive Polish and Release | Make the app feel complete across desktop/mobile and ready for deployment. | QUAL-02 |

## Phases

### Phase 1: Paste-Format-Copy Shell

**Goal:** Deliver the first usable one-page formatter flow.
**Mode:** mvp

**Requirements:** INPT-01, INPT-02, INPT-03, FORM-01, OUTP-01, OUTP-02, OUTP-03

**Success Criteria:**

1. User can paste LaTeX source into a large input area.
2. User can click Format and see formatted output in a separate output area.
3. User can copy and download the output.
4. User can clear input and load a sample snippet.

**UI hint:** yes

### Phase 2: Deterministic Formatter Core

**Goal:** Replace placeholder formatting with safe deterministic LaTeX source rules.
**Mode:** mvp

**Requirements:** FORM-02, FORM-03

**Success Criteria:**

1. Common `\begin{...}` and `\end{...}` blocks receive consistent indentation.
2. Lists, math blocks, and nested environments remain readable.
3. Comments are preserved.
4. Verbatim-like blocks are protected from formatting changes.

**UI hint:** no

### Phase 3: Options and Diagnostics

**Goal:** Give users control over basic formatting behavior and clear feedback.
**Mode:** mvp

**Requirements:** FORM-04, FORM-05, OUTP-04

**Success Criteria:**

1. User can set indentation and wrapping options.
2. Formatter diagnostics appear without deleting input.
3. UI shows whether formatting changed the source.
4. Invalid or unsupported input has an actionable message.

**UI hint:** yes

### Phase 4: Formatter Quality Harness

**Goal:** Make formatter behavior testable and engine implementation replaceable.
**Mode:** mvp

**Requirements:** QUAL-01, QUAL-03

**Success Criteria:**

1. Fixture tests cover documents, lists, math, tables, comments, and nested environments.
2. Formatter is exposed through a stable adapter interface.
3. Adapter tests allow a future `tex-fmt` integration without rewriting UI code.
4. Regression cases can be added as input/output fixtures.

**UI hint:** no

### Phase 5: Responsive Polish and Release

**Goal:** Make the app comfortable to use and ready to publish.
**Mode:** mvp

**Requirements:** QUAL-02

**Success Criteria:**

1. Main workflow works on desktop and mobile viewport widths.
2. Controls have clear loading, success, error, disabled, and copied states.
3. Text does not overflow buttons, panels, or narrow screens.
4. App has a basic README with local run, test, and deploy instructions.

**UI hint:** yes

## Coverage

All 15 v1 requirements are mapped to exactly one phase.

---
*Roadmap created: 2026-06-24*

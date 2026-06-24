# Phase 1: Paste-Format-Copy Shell - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-06-24
**Phase:** 1-Paste-Format-Copy Shell
**Areas discussed:** Layout Shape, Visual Tone, First Formatter Behavior, Output Actions

---

## Layout Shape

| Option | Description | Selected |
|--------|-------------|----------|
| Split panels | Desktop left/right, mobile stacked. Efficient for comparison. | |
| Stacked panels | Input above output on every screen. Simpler for v1. | yes |
| Single panel toggle | One large editor area with input/output toggle. | |

**User's choice:** Stacked panels.
**Notes:** User also selected a top action bar and always-below mobile output.

---

## Layout Controls

| Option | Description | Selected |
|--------|-------------|----------|
| Top action bar | Format, Copy, Download, Clear, Sample together in one toolbar. | yes |
| Between panels | Format/Clear between panels, Copy/Download on output. | |
| Panel headers | Each panel owns its local actions. | |

**User's choice:** Top action bar.
**Notes:** Keeps controls predictable and centralized.

---

## Mobile Output

| Option | Description | Selected |
|--------|-------------|----------|
| Always below | Output stays below input in normal page flow. | yes |
| Collapsible output | Output expands after formatting. | |
| Jump to output | Format action automatically scrolls to output. | |

**User's choice:** Always below.
**Notes:** Avoid extra mobile state in Phase 1.

---

## Visual Tone

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal utility | Sade, fast, low-distraction tool feel. | yes |
| Editor-like | Stronger code editor feel. | |
| Academic clean | Document/LaTeX-paper inspired feel. | |

**User's choice:** Minimal utility.
**Notes:** User then selected a light neutral color direction.

---

## Palette

| Option | Description | Selected |
|--------|-------------|----------|
| Light neutral | Open background, black/gray text, one accent. | yes |
| High contrast tool | Stronger borders and developer-tool feel. | |
| Soft polished | More color and softened surfaces. | |

**User's choice:** Light neutral.
**Notes:** Maintain utility sharpness without visual noise.

---

## First Formatter Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Normalize only | Normalize whitespace and line endings. | |
| Basic LaTeX indent | Simple `\begin` / `\end`, `\item`, and whitespace formatting. | yes |
| Demo transform | Mostly sample-focused visual transform. | |

**User's choice:** Basic LaTeX indent.
**Notes:** Phase 1 should already feel useful, even if not a complete formatter.

---

## Formatter Honesty

| Option | Description | Selected |
|--------|-------------|----------|
| Best-effort with notice | Apply simple rules and show limitation notice/diagnostics. | yes |
| Silent simple formatter | Apply rules without explaining limitations. | |
| Strict safe mode | Format only very clear structures. | |

**User's choice:** Best-effort with notice.
**Notes:** Avoid misleading users about formatter completeness.

---

## Output Actions

| Option | Description | Selected |
|--------|-------------|----------|
| Format primary, Copy secondary | Format is strongest; Copy enabled when output exists. | yes |
| Format and Copy both primary | Both actions heavily emphasized. | |
| Compact icon toolbar | Icon-heavy compact toolbar. | |

**User's choice:** Format primary, Copy secondary.
**Notes:** Download, Clear, and Sample remain quieter secondary actions.

---

## Feedback

| Option | Description | Selected |
|--------|-------------|----------|
| Status text | Short toolbar state such as Formatted or No changes. | yes |
| Toast | Temporary notification. | |
| Inline output banner | Banner above output. | |

**User's choice:** Status text.
**Notes:** Keep feedback simple and visible without adding more UI surfaces.

## the agent's Discretion

- Exact frontend scaffold and styling implementation.
- Exact sample LaTeX snippet content.
- Exact wording of status text and diagnostics, provided the behavior stays honest.

## Deferred Ideas

None.

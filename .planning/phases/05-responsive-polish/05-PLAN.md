# Phase 5: Responsive Polish and Release - Plan

**Status:** Planned
**Mode:** mvp

<plan>
## Execution Plan

### 1. Refine Mobile Viewport Layout (`App.css`)
- In the `@media (max-width: 720px)` block:
  - Set `.button` minimum height to `44px` for mobile touch targets.
  - Set `.option-label select` and `.option-label input[type="checkbox"]` to scale up slightly (e.g. `min-height: 44px`, `transform: scale(1.1)` for checkbox) to improve touch area.
  - Make `h1` slightly smaller (`font-size: 1.6rem`) to prevent wrapping awkwardly.
  - Ensure `.toolbar` buttons wrap securely without overflowing `min-width: 320px`.
  - Ensure `.options-bar` elements have enough gap (`gap: 12px` instead of `8px`) when stacking vertically.

### 2. Verify Touch Targets & Accessibility
- Check the `.options-bar` flex layout. The existing `.options-bar` uses `flex-direction: column` and `align-items: flex-start` on mobile. We will add `width: 100%` and make `.option-label` take `width: 100%` with `justify-content: space-between` to create a generous hit area for touch users.

### 3. Release Readiness
- No other logic changes needed. This finalizes the V1 milestone.
</plan>

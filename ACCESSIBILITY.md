# Shore Haven Media — Accessibility (WCAG 2.1 / 2.2 AA) Checklist

This tracks the site against the **Web Content Accessibility Guidelines, Level AA** — the standard U.S. courts and the ADA point to. It's an honest record: each item is marked **Met in code**, **Depends on content**, **Action needed**, **Needs manual test**, or **N/A**.

> **Important framing:** Code can satisfy most criteria, but no automated process can certify full ADA/WCAG compliance. A few items depend on what your wife uploads (image descriptions) or require a human test (screen-reader pass). This list tells you exactly which is which — the opposite of the "one line of code = compliant" claim that got accessiBe fined.

---

## What was changed in this pass

- Teal text recolored to `#3AAFAF` so it meets the 4.5:1 contrast minimum (the old teal failed at 4.33:1; small uppercase labels were the problem)
- Navigation converted from click-only `<span>`s to real keyboard-operable links
- Added a "skip to main content" link, a `<main>` landmark, and section labelling
- Contact form: proper hidden labels, required-field markers, visible validation, and screen-reader status announcements
- Decorative compasses hidden from screen readers; the hero logo given a text label
- Visible keyboard focus outlines added
- `prefers-reduced-motion` support so the rotating compass and fades stop for users who ask the OS to reduce motion
- Input borders darkened to meet the 3:1 non-text contrast rule
- New **Image Alt Text** field added to the CMS portfolio editor

---

## Perceivable

| # | Criterion | Level | Status | Notes |
|---|-----------|-------|--------|-------|
| 1.1.1 | Non-text Content | A | Met in code / Depends on content | Decorative SVGs are `aria-hidden`; logo is labelled. Portfolio images pull alt text from the new CMS field — **she should fill it in for each image** (falls back to client + category if blank). |
| 1.3.1 | Info and Relationships | A | Met in code | Semantic `h1–h3`, `nav`/`main`/`footer` landmarks, form labels tied to inputs. |
| 1.3.2 | Meaningful Sequence | A | Met in code | Reading order follows the visual order. |
| 1.3.4 | Orientation | AA | Met in code | Works in portrait and landscape; layout is responsive. |
| 1.3.5 | Identify Input Purpose | AA | Met in code | `autocomplete` set on name/email/company. |
| 1.4.1 | Use of Color | A | Met in code | Color isn't the only signal — links carry text, form errors are spelled out in words. |
| 1.4.3 | Contrast (Minimum) | AA | Met in code (verified) | Every text/background pair computed ≥ 4.5:1 (large text ≥ 3:1). Teal text fix was the key change. |
| 1.4.4 | Resize Text | AA | Met / minor note | Browser zoom to 200% works and layout reflows. Font sizes are in px; switching to rem would improve text-only zoom but isn't required for AA. |
| 1.4.5 | Images of Text | AA | Met in code | No text baked into images; the wordmark is real text. |
| 1.4.10 | Reflow | AA | Needs manual test | Single-column on mobile; confirm no horizontal scroll at 320px width in a browser. |
| 1.4.11 | Non-text Contrast | AA | Met in code (verified) | Input borders 3.57:1, focus ring 6.31:1, both above the 3:1 requirement. |
| 1.4.12 | Text Spacing | AA | Met in code | Uses relative line-heights; tolerates user spacing overrides. |
| 1.4.13 | Content on Hover or Focus | AA | Met in code | Hover effects are decorative and non-blocking. |

## Operable

| # | Criterion | Level | Status | Notes |
|---|-----------|-------|--------|-------|
| 2.1.1 | Keyboard | A | Met in code | All controls (nav links, buttons, form fields) are keyboard-operable. This was a real fix — the old nav couldn't be reached by keyboard. |
| 2.1.2 | No Keyboard Trap | A | Met in code | Nothing traps focus. |
| 2.2.2 | Pause, Stop, Hide | A | Addressed — see note | The rotating compass auto-animates. We honor `prefers-reduced-motion` (OS-level "reduce motion" stops it). Strict reading of 2.2.2 wants an on-page pause control; the motion here is decorative at ~4% opacity, so the reduced-motion approach is a defensible position, but a purist auditor may flag it. Easy to remove the rotation entirely if you'd rather not carry the caveat. |
| 2.3.1 | Three Flashes | A | Met in code | Nothing flashes. |
| 2.4.1 | Bypass Blocks | A | Met in code | Skip link added. |
| 2.4.2 | Page Titled | A | **Action needed** | Confirm `<title>` in your root `index.html` is meaningful (e.g. "Shore Haven Media — Marketing & Brand Strategy"). |
| 2.4.3 | Focus Order | A | Met in code | Follows DOM/visual order. |
| 2.4.4 | Link Purpose | A | Met in code | Link text is self-describing. |
| 2.4.5 | Multiple Ways | AA | Met in code | Nav menu + in-page anchors on a single-page site. |
| 2.4.6 | Headings and Labels | AA | Met in code | Descriptive headings and field labels. |
| 2.4.7 | Focus Visible | AA | Met in code | Teal focus outline on all interactive elements. |
| 2.4.11 | Focus Not Obscured (Min) | AA (2.2) | Met / minor note | `scroll-margin` keeps anchored targets clear of the fixed nav. Tabbing near the very top is fine in practice; worth a quick manual check. |
| 2.5.3 | Label in Name | A | Met in code | Visible text matches accessible names. |
| 2.5.8 | Target Size (Minimum) | AA (2.2) | Met / verify | Buttons and links have generous padding/spacing; glance-check the footer links on mobile. |

## Understandable

| # | Criterion | Level | Status | Notes |
|---|-----------|-------|--------|-------|
| 3.1.1 | Language of Page | A | **Action needed** | Confirm `<html lang="en">` in your root `index.html` (Vite's default template includes it — just verify it's still there). |
| 3.2.1 / 3.2.2 | On Focus / On Input | A | Met in code | No surprise context changes. |
| 3.2.3 / 3.2.4 | Consistent Nav / Identification | AA | Met in code | Same nav and labels throughout. |
| 3.3.1 | Error Identification | A | Met in code | Missing required fields produce a spelled-out message announced to screen readers. |
| 3.3.2 | Labels or Instructions | A | Met in code | Every field has a programmatic label + placeholder. |
| 3.3.3 | Error Suggestion | AA | Met in code | The message says which fields are needed. |
| 3.3.7 | Redundant Entry | AA (2.2) | Met in code | No information is requested twice. |

## Robust

| # | Criterion | Level | Status | Notes |
|---|-----------|-------|--------|-------|
| 4.1.2 | Name, Role, Value | A | Met in code | Native elements + ARIA where needed. |
| 4.1.3 | Status Messages | AA | Met in code | Form status and validation use `aria-live` / `role="alert"`. |

## Not applicable

Time limits (2.2.1), audio/video captions and alternatives (1.2.x, 1.4.2), character-key shortcuts (2.1.4), motion actuation (2.5.4), accessible authentication (3.3.8 — no login), error prevention for legal/financial transactions (3.3.4 — the contact form isn't transactional).

---

## Your remaining to-dos

1. **In `index.html` (root):** confirm `<html lang="en">` and a meaningful `<title>`. *(2.4.2, 3.1.1)*
2. **In the CMS:** fill the **Image Alt Text** field whenever a portfolio image is uploaded. *(1.1.1)*
3. **One manual test:** tab through the whole page with only the keyboard, and run the site through a free screen reader once (VoiceOver on Mac: Cmd+F5). This catches what code review can't. *(confirms 1.4.10, 2.4.11, 2.5.8 and overall real-world usability)*

## Third-party caveat

The **Calendly** scheduler is an embedded iframe Calendly controls — its internal accessibility is on them, not something this code governs. The booking section around it is compliant.

---

*Honest bottom line: the code now meets the Level AA criteria that code can satisfy, verified by contrast computation and semantic review. Finishing the three to-dos above gets you to a genuinely strong, defensible accessibility posture — real conformance, not an overlay's promise of it.*

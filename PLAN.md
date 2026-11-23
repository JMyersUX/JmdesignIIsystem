# Design System Website – Plan

Source of truth: `DESIGN.md` (exported from the Figma file "Game Tracking Site").
Stack: plain HTML + one shared CSS file (`css/style.css`) driven by CSS custom properties taken from DESIGN.md. Font: Roboto (Google Fonts, weights 300/400/500/700).

## Site map

```
index.html                     Cover page (this step)
foundations/
  color-palette.html           Primitives + semantic tokens
  typography.html              Type hierarchy
  logo.html                    Logo usage
components/
  navigation-bar.html
  button.html
  card.html                    (swap for Pill/Chip or Filter Tag if the Figma layout uses them more)
patterns/
  game-tracker.html            Live version of the Figma layout
```

Nav bar (all pages): Logo (home) · **Foundations** ▾ · **Components** ▾ · **Page Patterns** ▾

## Step 1 – Cover page (`index.html`)  ← build now
- Dark Blue nav bar with logo + three dropdown sections.
- Hero: title, one-line description, CTA to Foundations.
- Three section cards (Foundations / Components / Page Patterns) linking to the sub pages.
- Footer.

## Step 2 – Foundations
**Color palette** – swatch grid for every Primitive (hex + name) and a table of Tokens → the primitive they alias (e.g. Button → Blue-Purple). Show contrast ratios for text/background pairs (Text Primary on Page Background, Text On Dark on Navigation Bar, etc.).
**Typography** – render each of the 14 type tokens in a live specimen (Heading 1–3, Paragraph, Navigation Text, Link Text, Card Title, Subheading, Menu Option, Filter Tag Text (+Mobile), Button Text Small, Caption, Chip Label) with size/weight spec. Reuse hierarchy ideas from `../JustinMyers_TypeHierarchies` where they fit; Roboto replaces Oxygen/Manrope.
**Logo** – reuse `../JustinMyers_Logo` assets already copied to `images/` (color, reverse, favicon). Show clear space, minimum size, on-light/on-dark usage, do/don't. Logo text token = Cream (#FBF5EF) on Navigation Bar.

## Step 3 – Components (3 pages)
Pick three components that appear in the Figma layout. Every page gets the same template:
1. Live demo (all states: default, hover, focus, active, disabled)
2. Anatomy
3. **Full CSS spec** – every property: size, padding, margin, border, radius, colors (as tokens), font token, transitions, breakpoints; copyable code block
4. **Accessibility** – contrast ratios, keyboard behavior, visible focus ring, ARIA roles/attributes, touch target ≥ 44px, reduced-motion, screen-reader text
5. Do / Don't

Candidates: Navigation Bar, Button (Button / Hover / Disabled tokens), Game Card (Card Background, Card Title, Platform Chip, Digital/Physical pills).

## Step 4 – Page Patterns
`patterns/game-tracker.html` – live, responsive build of the Figma layout using only the tokens and components above (Page Background, Cards, Filter Tags with the mobile variant at small widths). Pull exact structure from Figma via the Figma MCP (`get_design_context`) once the frame link is provided.

## Conventions
- All colors/type via CSS variables in `:root` named after DESIGN.md tokens (`--color-nav-bar`, `--color-button-hover`, `--text-h1`, …).
- Semantic HTML, skip link, `aria-current="page"` on active nav item, visible `:focus-visible` outline.
- Mobile-first; nav collapses to a menu button under 768px.

## Open items
- Figma frame URL for the layout (needed for Step 4 and to confirm which 3 components).
- Spacing/radius/motion tokens are missing from DESIGN.md → define provisional values, mark them in the spec.

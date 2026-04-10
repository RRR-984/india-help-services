# Design Brief: India Help Services

## Tone & Purpose
Professional marketplace SaaS with Indian cultural warmth. Builds trust through accessibility and vibrant local identity.

## Color Palette
| Name | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Saffron | `0.65 0.22 40` | #FF9933 | Primary CTAs, accents, hero highlights |
| Green | `0.35 0.18 142` | #138808 | Secondary, service category tags |
| White | `0.99 0 0` | #FFFFFF | Primary background, cards |
| Neutral Dark | `0.25 0.02 190` | #3A3A42 | Text foreground |
| Muted | `0.92 0 0` | #EBEBEB | Secondary backgrounds, dividers |

## Typography
| Role | Font | Size Scale |
|------|------|-----------|
| Display | Bricolage Grotesque (700) | Hero: 48px mobile / 64px desktop |
| Body | Plus Jakarta Sans (400/500) | 16px base, 14px small, 12px caption |
| Mono | JetBrains Mono (400) | 13px technical text |

## Structural Zones
| Zone | Background | Border | Shadow |
|------|-----------|--------|--------|
| Header/Nav | White (0.98 0 0) | Saffron accent bottom | None |
| Hero | White + saffron gradient accent | None | None |
| Card Grid | White (0.99 0 0) | Subtle grey (0.88 0.01 230) | `shadow-card` |
| Service Chips | Green/saffron gradient | Rounded 24px | None |
| Footer | Muted (0.92 0 0) | Green top border | None |

## Spacing & Rhythm
- Base unit: 4px. 16px/24px/32px gaps. Touch targets: 44px minimum (mobile).
- Generous vertical rhythm on mobile (32px sections), compact on desktop (24px).
- Cards: 16px padding, 12px radius. Buttons: 12px padding, 8px radius.

## Component Patterns
- **Buttons**: Saffron primary (text white), green secondary, muted tertiary. Always 44px height on touch.
- **Cards**: White with grey border, `shadow-card` on hover. Service category cards add 4px green/saffron accent stripe left.
- **Search**: Grey input (0.95 0.01 220), saffron focus ring.
- **Service Chips**: Inline tags with green or saffron background, white text, 4px radius.
- **Language Toggle**: Bilingual nav button. Hindi/English switch preserves route context.

## Motion
- Hover transitions: 0.2s ease (primary color saturation shift).
- Card elevation on hover: add `shadow-elevated`.
- Language toggle: 0.15s color transition.
- Page transitions: fade in 0.3s on load (mobile-aware, avoid jank).

## Responsive Breakpoints
| Breakpoint | Layout | Type Scale |
|------------|--------|-----------|
| Mobile (320px) | Single column, 16px margin | 14px body, 32px h1 |
| Tablet (768px) | 2-column grid, 24px margin | 16px body, 48px h1 |
| Desktop (1024px) | 3-4 column grid, 32px margin | 16px body, 64px h1 |

## Accessibility Constraints
- Minimum contrast: AA+ on all text (OKLCH lightness delta ≥ 0.7 on backgrounds).
- Focus rings: saffron (0.65 0.22 40), 2px width, on all interactive elements.
- No reliance on color alone for information (service type uses icon + color).
- Alt text on all category/provider images. Language toggle labeled.

## Constraints
- Light mode only (no dark variant required yet).
- No animations > 0.3s (performance on older mobile devices).
- No gradients on text (readability at small sizes).
- Bilingual strings hardcoded initially; key-value structure ready for i18n.
- Icons: inline SVG or system icon set (consistent 20px/24px sizes).

## Signature Detail
**Saffron-Green Accent Stripe**: Service category cards and hero section use thin (4px) vertical or angled stripe in saffron fading to green, evoking Indian tricolor. Reinforces brand identity without decoration.

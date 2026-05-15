# Design Brief: India Help Services

## Tone & Purpose
Professional marketplace SaaS with Indian cultural warmth. Builds trust through accessibility and vibrant local identity.

## Color Palette
| Name | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Saffron | `0.65 0.22 40` | #FF9933 | Primary CTAs, accents, hero highlights |
| Green | `0.35 0.18 142` | #138808 | Secondary, service category tags |
| Purple | `0.55 0.2 305` | #9370DB | Online Classes accent, learning category |
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
| Online Classes Cards | White (0.99 0 0) with purple accent stripe | Purple accent (0.55 0.2 305) | `shadow-card` on hover |
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

## Verified Provider Badge
- 32px saffron circle with checkmark, 3px white ring + 2px saffron outer ring.
- Absolute positioned on provider card top-right. Signifies trust and platform verification.

## Star Rating Component
- 5-point system: unfilled stars (muted), filled stars (saffron).
- Display as inline flex, 2px gaps. Used on provider cards and detail pages.

## Loading States
- Skeleton cards: muted gradient (0.92 0 0) with pulse animation. 2s infinite.
- Skeleton text: 16px height, 75% width. Skeleton avatar: 48px circle.
- Applied to grid on initial load and during filter/search.

## Empty States
- Muted background (0.92 0 0 / 30%), 400px minimum height, centered content.
- Emoji icon (64px opacity 60%), text (14px muted-foreground, max 280px width).
- Used for: no results, no providers in category, no inquiries yet.

## Inquiry Status Badges
| State | Background | Border | Usage |
|-------|-----------|--------|-------|
| Pending | Muted (0.92 0 0) | None | Initial inquiry submitted |
| In-Progress | Primary / 15% opacity | Primary / 30% | Service provider accepted |
| Resolved | Secondary / 15% opacity | Secondary / 30% | Service completed |
| Cancelled | Destructive / 15% opacity | Destructive / 30% | Cancelled by user or provider |

## Provider Card Enhancements
- Tricolor accent stripe: 4px left border gradient (saffron→green) with 2px radius.
- Image zoom on hover (1.05x scale, 0.3s ease). Card elevation on hover.
- Overlay: verified badge (top-right), category tag (bottom-left), location (bottom).

## Online Classes Video Cards
- Purple accent stripe: 4px left border gradient (purple fading), distinct from marketplace tricolor.
- 16:9 video thumbnail with play button overlay (56px purple circle, appears on hover).
- Video duration badge: dark overlay (bottom-right), white text, 12px.
- Image zoom on hover (1.08x scale). Card shadow-elevated on hover.
- Rating stars (secondary accent). Provider name and duration visible below thumbnail.

## Constraints
- Light mode only (no dark variant required yet).
- No animations > 0.3s (performance on older mobile devices).
- No gradients on text (readability at small sizes).
- Bilingual strings hardcoded initially; key-value structure ready for i18n.
- Icons: inline SVG or system icon set (consistent 20px/24px sizes).
- Bilingual text: `.text-hindi` class for Devanagari, `.text-english` for Latin.
- Online Classes video cards use `.accent-stripe-purple` for left border accent.
- Video play button: fixed 56px circle, centred on thumbnail hover, purple background.

## Signature Detail
**Saffron-Green Accent Stripe**: All marketplace cards use thin (4px) vertical gradient stripe (saffron fading to green) on left edge, evoking Indian tricolor. Reinforces brand identity and service category differentiation.

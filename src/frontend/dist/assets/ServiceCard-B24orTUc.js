import { c as createLucideIcon, u as useLanguage, j as jsxRuntimeExports, M as MapPin, B as Button, L as Link } from "./index-CKeR-Ro-.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-BkEFOeVR.js";
import { C as Card, a as CardContent, B as Badge } from "./card-lnFnQWO5.js";
import { B as BadgeCheck, a as StarRating } from "./StarRating-CmVwHuAf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function ServiceCard({
  provider,
  categories
}) {
  const { lang, t } = useLanguage();
  const initials = provider.businessName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const primaryCategory = categories == null ? void 0 : categories.find(
    (c) => provider.categoryIds[0] !== void 0 && c.id === provider.categoryIds[0]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group overflow-hidden hover:shadow-elevated transition-smooth border-border",
      "data-ocid": `service-card-${provider.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-14 w-14 shrink-0 rounded-xl border-2 border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarImage,
                {
                  src: provider.profileImage,
                  alt: provider.businessName
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-xl bg-primary/10 text-primary font-display font-bold text-lg", children: initials })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate text-base leading-tight", children: provider.businessName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: provider.ownerName })
                ] }),
                provider.isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "secondary",
                    className: "shrink-0 text-xs gap-1 bg-secondary/15 text-secondary border-secondary/30",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 11 }),
                      t("services.verified")
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11, className: "shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  provider.city,
                  ", ",
                  provider.state
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 gap-2", children: [
            primaryCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs truncate max-w-[140px]",
                style: {
                  borderColor: primaryCategory.color,
                  color: primaryCategory.color
                },
                children: lang === "hi" ? primaryCategory.name.hi : primaryCategory.name.en
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: provider.averageRating, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "(",
                Number(provider.reviewCount),
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "sm",
                className: "flex-1 text-xs",
                "data-ocid": `view-profile-${provider.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/services/$providerId",
                    params: { providerId: provider.id.toString() },
                    children: t("services.viewProfile")
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "sm",
                className: "flex-1 text-xs",
                "data-ocid": `contact-now-${provider.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/services/$providerId",
                    params: { providerId: provider.id.toString() },
                    hash: "inquire",
                    children: t("services.contactNow")
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ServiceCard as S,
  Search as a
};

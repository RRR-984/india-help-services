import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-CKeR-Ro-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const sizeMap = { sm: 12, md: 16, lg: 20 };
function StarRating({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onChange
}) {
  const px = sizeMap[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-0.5",
      role: interactive ? "group" : "img",
      "aria-label": `Rating: ${rating.toFixed(1)} out of ${max}`,
      children: Array.from({ length: max }, (_, i) => {
        const filled = rating >= i + 1;
        const starKey = `star-${i + 1}`;
        if (interactive) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "star-rating",
                value: i + 1,
                checked: Math.round(rating) === i + 1,
                onChange: () => onChange == null ? void 0 : onChange(i + 1),
                className: "sr-only",
                "aria-label": `Rate ${i + 1} stars`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size: px,
                className: filled ? "text-primary fill-primary" : "text-muted-foreground/30 fill-transparent"
              }
            )
          ] }, starKey);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            size: px,
            className: filled ? "text-primary fill-primary" : "text-muted-foreground/30 fill-transparent"
          },
          starKey
        );
      })
    }
  );
}
export {
  BadgeCheck as B,
  Star as S,
  StarRating as a
};

import { u as useLanguage, j as jsxRuntimeExports, L as Link } from "./index-CKeR-Ro-.js";
const iconEmoji = {
  government: "🏛️",
  legal: "⚖️",
  medical: "🏥",
  health: "🏥",
  education: "📚",
  financial: "💰",
  finance: "💰",
  home: "🏠",
  tech: "💻",
  travel: "✈️",
  transport: "🚗",
  business: "💼",
  agricultural: "🌾",
  agriculture: "🌾",
  religious: "🙏",
  social: "🤝",
  utilities: "⚡",
  food: "🍽️",
  real_estate: "🏗️",
  insurance: "🛡️"
};
function getEmoji(icon) {
  const key = icon.toLowerCase().replace(/[^a-z_]/g, "");
  return iconEmoji[key] ?? "🔧";
}
function CategoryCard({ category }) {
  const { lang } = useLanguage();
  const name = lang === "hi" ? category.name.hi : category.name.en;
  const description = lang === "hi" ? category.description.hi : category.description.en;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/services",
      search: {
        category: category.id.toString(),
        state: void 0,
        city: void 0,
        search: void 0,
        sort: void 0
      },
      className: "group block",
      "data-ocid": `category-card-${category.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 h-full transition-smooth hover:shadow-elevated hover:-translate-y-0.5",
          style: {
            borderTopColor: category.color,
            borderTopWidth: "3px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110",
                style: { backgroundColor: `${category.color}18` },
                children: getEmoji(category.icon)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug mb-1 truncate", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-4 right-4 text-sm font-bold opacity-0 group-hover:opacity-100 transition-smooth",
                style: { color: category.color },
                children: "→"
              }
            )
          ]
        }
      )
    }
  );
}
export {
  CategoryCard as C
};

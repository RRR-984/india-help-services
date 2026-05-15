import { u as useLanguage, j as jsxRuntimeExports, L as Link } from "./index-DNcnJBsr.js";
import { m as motion, B as Badge } from "./badge-szpuQhX_.js";
import { S as Skeleton } from "./skeleton-CYZiRy75.js";
import { u as useCategories, e as useProviders } from "./use-api-Dj0wz_nq.js";
const iconEmoji = {
  government: "🏛️",
  sarkari: "🏛️",
  legal: "⚖️",
  kanooni: "⚖️",
  medical: "🏥",
  chikitsa: "🏥",
  health: "🏥",
  financial: "💰",
  vittiya: "💰",
  education: "🎓",
  shiksha: "🎓",
  transport: "🚗",
  parivahan: "🚗",
  business: "💼",
  vyapaar: "💼",
  wellness: "🌿",
  swasthya: "🌿",
  home: "🏠",
  ghar: "🏠",
  social: "🤝",
  insurance: "🛡️",
  agriculture: "🌾"
};
function getEmoji(icon) {
  const lower = icon.toLowerCase().replace(/[^a-z_]/g, "");
  return iconEmoji[lower] ?? "🔧";
}
function CategoriesSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5", children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card p-5 space-y-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-14 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" })
      ]
    },
    i
  )) });
}
function EnhancedCategoryCard({
  category,
  providerCount,
  index
}) {
  const { lang } = useLanguage();
  const nameEn = category.name.en;
  const nameHi = category.name.hi;
  const descEn = category.description.en;
  const descHi = category.description.hi;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.06 },
      whileHover: { y: -3 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          className: "group block h-full",
          "data-ocid": `category-card-${category.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 h-full flex flex-col gap-3 transition-all duration-300 group-hover:shadow-elevated group-hover:border-primary/30",
              style: { borderTopColor: category.color, borderTopWidth: "3px" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-300 pointer-events-none rounded-xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 shrink-0",
                    style: { backgroundColor: `${category.color}18` },
                    children: getEmoji(category.icon)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug", children: nameEn }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-hindi leading-snug", children: nameHi })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: lang === "hi" ? descHi : descEn }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs font-medium px-2.5 py-0.5",
                      style: {
                        background: `${category.color}18`,
                        color: category.color,
                        border: `1px solid ${category.color}30`
                      },
                      children: [
                        providerCount,
                        " ",
                        lang === "hi" ? "प्रदाता" : providerCount === 1 ? "provider" : "providers"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0",
                      style: { color: category.color },
                      children: "→"
                    }
                  )
                ] })
              ]
            }
          )
        }
      )
    }
  );
}
function CategoriesPage() {
  const { t, lang } = useLanguage();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: allProvidersPage, isLoading: providersLoading } = useProviders(
    {},
    0n,
    200n
  );
  const isLoading = categoriesLoading || providersLoading;
  const providerCountMap = /* @__PURE__ */ new Map();
  if (allProvidersPage == null ? void 0 : allProvidersPage.items) {
    for (const p of allProvidersPage.items) {
      for (const catId of p.categoryIds) {
        const key = catId.toString();
        providerCountMap.set(key, (providerCountMap.get(key) ?? 0) + 1);
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10 sm:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-16 rounded-full gradient-tricolor border border-border" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "text-3xl sm:text-4xl font-display font-bold text-foreground",
          children: t("categories.title")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed",
          children: lang === "hi" ? "विश्वसनीय सेवाओं के लिए द्विभाषी (हिंदी/अंग्रेजी) सहायता" : t("categories.subtitle")
        }
      ),
      !isLoading && categories && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          className: "flex justify-center gap-6 pt-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-primary", children: categories.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "hi" ? "श्रेणियां" : "Categories" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-secondary", children: [
                (allProvidersPage == null ? void 0 : allProvidersPage.items.length) ?? 0,
                "+"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "hi" ? "प्रदाता" : "Providers" })
            ] })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CategoriesSkeleton, {}) : (categories ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", "data-ocid": "categories-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "📂" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground mb-2", children: lang === "hi" ? "कोई श्रेणी नहीं मिली" : "No categories found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "empty-state-text", children: lang === "hi" ? "अभी श्रेणियां उपलब्ध नहीं हैं। बाद में पुनः प्रयास करें।" : "No categories are available yet. Please check back later." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5",
        "data-ocid": "categories-grid",
        children: (categories ?? []).map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnhancedCategoryCard,
          {
            category: cat,
            providerCount: providerCountMap.get(cat.id.toString()) ?? 0,
            index: i
          },
          cat.id.toString()
        ))
      }
    ) }),
    !isLoading && (categories ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: lang === "hi" ? "अपनी जरूरत की सेवा नहीं मिली?" : "Can't find what you're looking for?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto", children: lang === "hi" ? "सभी प्रदाता ब्राउज़ करें या खोज करें" : "Browse all providers or search by name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/services",
          search: {
            category: void 0,
            state: void 0,
            city: void 0,
            search: void 0,
            sort: void 0
          },
          "data-ocid": "browse-all-services",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors", children: [
            lang === "hi" ? "सभी सेवाएं देखें" : "Browse All Services",
            " →"
          ] })
        }
      )
    ] }) })
  ] });
}
export {
  CategoriesPage as default
};

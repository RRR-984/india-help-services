import { u as useLanguage, j as jsxRuntimeExports, a as LoadingSpinner } from "./index-CKeR-Ro-.js";
import { C as CategoryCard } from "./CategoryCard-ByfNTMjd.js";
import { u as useCategories, m as motion } from "./use-api-CvM1d6Wo.js";
function CategoriesPage() {
  const { t } = useLanguage();
  const { data: categories, isLoading } = useCategories();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-display font-bold text-foreground mb-3", children: t("categories.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: t("categories.subtitle") })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: (categories ?? []).map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.04 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryCard, { category: cat })
      },
      cat.id.toString()
    )) }) })
  ] });
}
export {
  CategoriesPage as default
};

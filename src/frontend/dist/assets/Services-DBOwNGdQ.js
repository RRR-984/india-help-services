import { c as createLucideIcon, u as useLanguage, r as reactExports, j as jsxRuntimeExports, B as Button, X, b as useNavigate, d as useSearch, a as LoadingSpinner, E as ErrorMessage } from "./index-CKeR-Ro-.js";
import { B as Badge } from "./card-lnFnQWO5.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, I as Input } from "./input-Mp3jGbSf.js";
import { I as INDIAN_STATES } from "./backend-api-DxyZzRIE.js";
import { a as Search, S as ServiceCard } from "./ServiceCard-B24orTUc.js";
import { u as useCategories, a as useProviders, m as motion } from "./use-api-CvM1d6Wo.js";
import { S as Star } from "./StarRating-CmVwHuAf.js";
import { C as ChevronLeft } from "./chevron-left-6R-BJOQy.js";
import { C as ChevronRight } from "./chevron-right-0XGpycnY.js";
import "./index-CwpZ18Ca.js";
import "./avatar-BkEFOeVR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M20 8h-5", key: "1vsyxs" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10", key: "ag13bf" }],
  ["path", { d: "M15 14h5l-5 6h5", key: "ur5jdg" }]
];
const ArrowDownAZ = createLucideIcon("arrow-down-a-z", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function FilterSidebar({
  filters,
  categories,
  onFilterChange,
  onReset
}) {
  var _a;
  const { t, lang } = useLanguage();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const hasActiveFilters = !!filters.categoryId || !!filters.state || !!filters.city;
  const filterContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "filter-sidebar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "filter-category",
          className: "text-xs font-semibold text-foreground uppercase tracking-wider",
          children: t("services.filter.category")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: ((_a = filters.categoryId) == null ? void 0 : _a.toString()) ?? "all",
          onValueChange: (val) => onFilterChange({
            ...filters,
            categoryId: val === "all" ? void 0 : BigInt(val)
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "filter-category",
                className: "h-9 text-sm",
                "data-ocid": "filter-category",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t("common.all") })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: t("common.all") }),
              categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.id.toString(), children: lang === "hi" ? cat.name.hi : cat.name.en }, cat.id.toString()))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "filter-state",
          className: "text-xs font-semibold text-foreground uppercase tracking-wider",
          children: t("services.filter.state")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: filters.state ?? "all",
          onValueChange: (val) => onFilterChange({
            ...filters,
            state: val === "all" ? void 0 : val,
            city: void 0
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "filter-state",
                className: "h-9 text-sm",
                "data-ocid": "filter-state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t("common.all") })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-64", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: t("common.all") }),
              INDIAN_STATES.map((state) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: state, children: state }, state))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "filter-city",
          className: "text-xs font-semibold text-foreground uppercase tracking-wider",
          children: t("services.filter.city")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "filter-city",
          type: "text",
          value: filters.city ?? "",
          onChange: (e) => onFilterChange({ ...filters, city: e.target.value || void 0 }),
          placeholder: t("services.filter.city"),
          className: "w-full h-9 px-3 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": "filter-city"
        }
      )
    ] }),
    hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "w-full text-muted-foreground hover:text-destructive",
        onClick: onReset,
        "data-ocid": "filter-reset",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
          t("services.filter.reset")
        ]
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-56 shrink-0 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 bg-card rounded-xl border border-border p-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: t("common.filter") }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-full", children: [filters.categoryId, filters.state, filters.city].filter(
          Boolean
        ).length })
      ] }),
      filterContent
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setMobileOpen(true),
          className: "gap-2",
          "data-ocid": "filter-mobile-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 14 }),
            t("common.filter"),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-full", children: [filters.categoryId, filters.state, filters.city].filter(
              Boolean
            ).length })
          ]
        }
      ),
      mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm",
            onClick: () => setMobileOpen(false),
            onKeyUp: (e) => {
              if (e.key === "Enter") setMobileOpen(false);
            },
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl p-6 pb-8 shadow-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 16, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: t("common.filter") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileOpen(false),
                className: "p-2 rounded-md hover:bg-muted",
                "aria-label": "Close filters",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
              }
            )
          ] }),
          filterContent,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full mt-4",
              onClick: () => setMobileOpen(false),
              children: t("common.filter")
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SearchBar({
  value,
  onChange,
  placeholder,
  debounceMs = 300,
  className = "",
  size = "md"
}) {
  const { t } = useLanguage();
  const [localValue, setLocalValue] = reactExports.useState(value);
  const timerRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(val);
    }, debounceMs);
  };
  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };
  const inputHeight = size === "lg" ? "h-12" : size === "sm" ? "h-8 text-sm" : "h-10";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex items-center ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Search,
      {
        size: size === "sm" ? 14 : 16,
        className: "absolute left-3 text-muted-foreground pointer-events-none",
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        type: "search",
        value: localValue,
        onChange: handleChange,
        placeholder: placeholder ?? t("common.search"),
        className: `pl-9 pr-8 ${inputHeight} bg-background border-input`,
        "aria-label": placeholder ?? t("common.search"),
        "data-ocid": "search-input"
      }
    ),
    localValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleClear,
        className: "absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors",
        "aria-label": "Clear search",
        type: "button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
      }
    )
  ] });
}
const PAGE_SIZE = BigInt(12);
function FilterChip({ label, onRemove }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "secondary",
      className: "flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 transition-smooth cursor-default",
      children: [
        label,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            "aria-label": `Remove ${label} filter`,
            className: "ml-0.5 hover:text-primary/70 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 11 })
          }
        )
      ]
    }
  );
}
function ServicesPage() {
  var _a;
  const { t, lang } = useLanguage();
  const navigate = useNavigate({ from: "/services" });
  const search = useSearch({ from: "/services" });
  const [filters, setFilters] = reactExports.useState({
    categoryId: search.category ? BigInt(search.category) : void 0,
    state: search.state ?? void 0,
    city: search.city ?? void 0,
    search: search.search ?? void 0
  });
  const [sort, setSort] = reactExports.useState(
    search.sort ?? "rating"
  );
  const [page, setPage] = reactExports.useState(BigInt(0));
  const { data: categories } = useCategories();
  const {
    data: providersPage,
    isLoading,
    isError,
    refetch
  } = useProviders(
    {
      categoryId: filters.categoryId,
      state: filters.state,
      city: filters.city
    },
    page,
    PAGE_SIZE
  );
  const totalPages = providersPage ? Math.ceil(Number(providersPage.total) / Number(PAGE_SIZE)) : 0;
  reactExports.useEffect(() => {
    void navigate({
      search: (prev) => {
        var _a2;
        return {
          ...prev,
          category: (_a2 = filters.categoryId) == null ? void 0 : _a2.toString(),
          state: filters.state,
          city: filters.city,
          search: filters.search || void 0,
          sort: sort !== "rating" ? sort : void 0
        };
      },
      replace: true
    });
  }, [filters, sort, navigate]);
  const handleFilterChange = reactExports.useCallback((next) => {
    setFilters(next);
    setPage(BigInt(0));
  }, []);
  const handleReset = reactExports.useCallback(() => {
    setFilters({});
    setSort("rating");
    setPage(BigInt(0));
  }, []);
  const displayItems = (() => {
    var _a2;
    if (!(providersPage == null ? void 0 : providersPage.items)) return [];
    let items = [...providersPage.items];
    if ((_a2 = filters.search) == null ? void 0 : _a2.trim()) {
      const q = filters.search.trim().toLowerCase();
      items = items.filter(
        (p) => p.businessName.toLowerCase().includes(q) || p.ownerName.toLowerCase().includes(q)
      );
    }
    if (sort === "rating") {
      items.sort((a, b) => b.averageRating - a.averageRating);
    } else {
      items.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0);
    }
    return items;
  })();
  const activeChips = [];
  if (filters.categoryId !== void 0) {
    const cat = categories == null ? void 0 : categories.find((c) => c.id === filters.categoryId);
    const label = cat ? lang === "hi" ? cat.name.hi : cat.name.en : `#${filters.categoryId}`;
    activeChips.push({
      key: "category",
      label,
      onRemove: () => handleFilterChange({ ...filters, categoryId: void 0 })
    });
  }
  if (filters.state) {
    activeChips.push({
      key: "state",
      label: filters.state,
      onRemove: () => handleFilterChange({ ...filters, state: void 0, city: void 0 })
    });
  }
  if (filters.city) {
    activeChips.push({
      key: "city",
      label: filters.city,
      onRemove: () => handleFilterChange({ ...filters, city: void 0 })
    });
  }
  if (filters.search) {
    activeChips.push({
      key: "search",
      label: `"${filters.search}"`,
      onRemove: () => handleFilterChange({ ...filters, search: void 0 })
    });
  }
  const resultCount = ((_a = filters.search) == null ? void 0 : _a.trim()) ? displayItems.length : providersPage ? Number(providersPage.total) : 0;
  const sortLabel = (opt) => lang === "hi" ? opt === "rating" ? "रेटिंग के अनुसार" : "नवीनतम पहले" : opt === "rating" ? "By Rating" : "Newest First";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-8 sm:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-foreground mb-1", children: t("services.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("services.subtitle") })
        ] }),
        providersPage && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg border border-border self-start mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { size: 14, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
            resultCount,
            " ",
            lang === "hi" ? "प्रदाता" : "providers"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchBar,
        {
          value: filters.search ?? "",
          onChange: (val) => handleFilterChange({
            ...filters,
            search: val || void 0
          }),
          placeholder: t("services.filter.search"),
          size: "lg",
          "data-ocid": "services-search"
        }
      ) })
    ] }) }),
    (activeChips.length > 0 || providersPage) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 flex-wrap flex-1 min-w-0",
          "data-ocid": "active-filter-chips",
          children: [
            activeChips.map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterChip,
              {
                label: chip.label,
                onRemove: chip.onRemove
              },
              chip.key
            )),
            activeChips.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleReset,
                className: "text-xs text-muted-foreground hover:text-destructive underline underline-offset-2 transition-colors",
                "data-ocid": "clear-all-filters",
                children: lang === "hi" ? "सभी हटाएं" : "Clear all"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArrowDownAZ,
          {
            size: 14,
            className: "text-muted-foreground hidden sm:block"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: sort,
            onValueChange: (v) => {
              setSort(v);
              setPage(BigInt(0));
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs w-36 border-input bg-background",
                  "data-ocid": "sort-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["rating", "newest"].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, className: "text-xs", children: opt === "rating" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, className: "text-primary" }),
                sortLabel(opt)
              ] }) : sortLabel(opt) }, opt)) })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterSidebar,
        {
          filters,
          categories: categories ?? [],
          onFilterChange: handleFilterChange,
          onReset: handleReset
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between lg:hidden mb-5 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterSidebar,
            {
              filters,
              categories: categories ?? [],
              onFilterChange: handleFilterChange,
              onReset: handleReset
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: sort,
                onValueChange: (v) => {
                  setSort(v);
                  setPage(BigInt(0));
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-8 text-xs w-32 border-input bg-background",
                      "data-ocid": "sort-select-mobile",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["rating", "newest"].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, className: "text-xs", children: sortLabel(opt) }, opt)) })
                ]
              }
            ),
            providersPage && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: [
              resultCount,
              " ",
              lang === "hi" ? "प्रदाता" : "found"
            ] })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { message: t("services.loading") }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: refetch }) : displayItems.length === 0 ? (
          /* Empty state */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              className: "flex flex-col items-center justify-center py-24 text-center gap-5 rounded-2xl border border-dashed border-border bg-muted/20",
              "data-ocid": "no-results",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🔍" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold font-display text-foreground", children: t("services.noResults") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: lang === "hi" ? "अलग फ़िल्टर आज़माएं या सभी फ़िल्टर हटाएं।" : "Try different filters or clear all to see all providers." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: handleReset,
                    "data-ocid": "empty-state-reset",
                    children: t("services.filter.reset")
                  }
                )
              ]
            }
          )
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5",
              "data-ocid": "providers-grid",
              children: displayItems.map((provider, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 14 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    delay: Math.min(i * 0.05, 0.4),
                    duration: 0.3
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ServiceCard,
                    {
                      provider,
                      categories: categories ?? []
                    }
                  )
                },
                `provider-${provider.id}`
              ))
            }
          ),
          totalPages > 1 && !filters.search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-center gap-3 mt-10",
              "data-ocid": "pagination",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setPage((p) => BigInt(Math.max(0, Number(p) - 1))),
                    disabled: page === BigInt(0),
                    "data-ocid": "prev-page",
                    className: "gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 15 }),
                      t("common.previous")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: Array.from(
                  { length: Math.min(totalPages, 5) },
                  (_, i) => {
                    const pageNum = totalPages <= 5 ? i : Math.max(
                      0,
                      Math.min(
                        Number(page) - 2 + i,
                        totalPages - 5 + i
                      )
                    );
                    const isActive = BigInt(pageNum) === page;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPage(BigInt(pageNum)),
                        className: `w-8 h-8 text-xs rounded-md font-medium transition-smooth ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
                        "aria-current": isActive ? "page" : void 0,
                        "data-ocid": `page-${pageNum}`,
                        children: pageNum + 1
                      },
                      `page-${pageNum}`
                    );
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setPage((p) => p + BigInt(1)),
                    disabled: Number(page) + 1 >= totalPages,
                    "data-ocid": "next-page",
                    className: "gap-1.5",
                    children: [
                      t("common.next"),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 15 })
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ServicesPage as default
};

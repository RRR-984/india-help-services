import { u as useLanguage, j as jsxRuntimeExports, B as Button, L as Link } from "./index-DNcnJBsr.js";
function NotFoundPage() {
  const { lang } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-5 max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl font-display font-bold text-primary/20", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "🔍" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: lang === "hi" ? "पेज नहीं मिला" : "Page Not Found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "hi" ? "आप जो पेज खोज रहे हैं वह उपलब्ध नहीं है।" : "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "back-home", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: lang === "hi" ? "होम पर जाएं" : "Back to Home" }) })
  ] }) });
}
export {
  NotFoundPage as default
};

import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as useComposedRefs, f as cn, g as useParams, u as useLanguage, h as useAuth, a as LoadingSpinner, E as ErrorMessage, L as Link, M as MapPin, P as Phone, i as Mail, B as Button, k as ue } from "./index-CKeR-Ro-.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-BkEFOeVR.js";
import { C as Card, a as CardContent, B as Badge, b as CardHeader, c as CardTitle } from "./card-lnFnQWO5.js";
import { L as Label } from "./label-CWNPGoQK.js";
import { u as useDirection, a as useControllableState, P as Primitive, c as composeEventHandlers, b as createContextScope, d as usePrevious, e as useSize } from "./index-CwpZ18Ca.js";
import { R as Root, I as Item, c as createRovingFocusGroupScope, P as Presence, T as Tabs, a as TabsList, b as TabsTrigger, d as TabsContent } from "./tabs-DmzzxyOA.js";
import { S as Separator } from "./separator-BJ0gAKxi.js";
import { T as Textarea } from "./textarea-vLO6ldw2.js";
import { B as BadgeCheck, S as Star, a as StarRating } from "./StarRating-CmVwHuAf.js";
import { d as useProvider, u as useCategories, e as useReviewsByProvider, f as useSubmitInquiry, g as useAddReview, m as motion } from "./use-api-CvM1d6Wo.js";
import { C as ChevronRight } from "./chevron-right-0XGpycnY.js";
import { C as ChevronLeft } from "./chevron-left-6R-BJOQy.js";
import { C as Clock, M as MessageCircle } from "./message-circle-BzqZK8kZ.js";
import { M as MessageSquare } from "./message-square-BbIx7PCd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
];
const UserRound = createLucideIcon("user-round", __iconNode);
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadio,
      name,
      checked = false,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...radioProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": checked,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...radioProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            if (!checked) onCheck == null ? void 0 : onCheck();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadio, forceMount, ...indicatorProps } = props;
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef
      }
    ) });
  }
);
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = reactExports.forwardRef(
  ({
    __scopeRadio,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "radio",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange,
      caller: RADIO_GROUP_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroupProvider,
      {
        scope: __scopeRadioGroup,
        name,
        required,
        disabled,
        value,
        onValueChange: setValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation,
            dir: direction,
            loop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "radiogroup",
                "aria-required": required,
                "aria-orientation": orientation,
                "data-disabled": disabled ? "" : void 0,
                dir: direction,
                ...groupProps,
                ref: forwardedRef
              }
            )
          }
        )
      }
    );
  }
);
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value === itemProps.value;
    const isArrowKeyPressedRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => isArrowKeyPressedRef.current = false;
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !isDisabled,
        active: checked,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radio,
          {
            disabled: isDisabled,
            required: context.required,
            checked,
            ...radioScope,
            ...itemProps,
            name: context.name,
            ref: composedRefs,
            onCheck: () => context.onValueChange(itemProps.value),
            onKeyDown: composeEventHandlers((event) => {
              if (event.key === "Enter") event.preventDefault();
            }),
            onFocus: composeEventHandlers(itemProps.onFocus, () => {
              var _a;
              if (isArrowKeyPressedRef.current) (_a = ref.current) == null ? void 0 : _a.click();
            })
          }
        )
      }
    );
  }
);
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
  }
);
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
function maskName(name) {
  const parts = name.trim().split(" ");
  return parts.map((p) => p.length > 1 ? `${p[0]}${"*".repeat(p.length - 1)}` : p).join(" ");
}
function formatDate(ns, lang) {
  const ms = Number(ns) / 1e6;
  return new Date(ms).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const contactIcons = {
  phone: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15 }),
  email: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15 }),
  whatsapp: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 15 })
};
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay }
});
function ProviderDetailPage() {
  const { providerId } = useParams({ from: "/services/$providerId" });
  const { t, lang } = useLanguage();
  const { isAuthenticated, user, login } = useAuth();
  const id = BigInt(providerId);
  const { data: provider, isLoading, isError, refetch } = useProvider(id);
  const { data: categories } = useCategories();
  const { data: reviews } = useReviewsByProvider(id);
  const submitInquiry = useSubmitInquiry();
  const addReview = useAddReview();
  const [inquiryForm, setInquiryForm] = reactExports.useState({
    serviceName: "",
    message: "",
    preferredContact: "phone"
  });
  const [reviewRating, setReviewRating] = reactExports.useState(0);
  const [reviewComment, setReviewComment] = reactExports.useState("");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  if (isError || !provider)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: refetch }) });
  const initials = provider.businessName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const bio = lang === "hi" ? provider.bioHi : provider.bioEn;
  const providerCategories = categories == null ? void 0 : categories.filter(
    (c) => provider.categoryIds.includes(c.id)
  );
  const avgRating = reviews && reviews.length > 0 ? reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length : 0;
  const hasReviewed = isAuthenticated && user && (reviews == null ? void 0 : reviews.some((r) => r.seekerId.toString() === user.id.toString()));
  const isSeeker = (user == null ? void 0 : user.role) === "seeker" || !user;
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!inquiryForm.serviceName.trim() || !inquiryForm.message.trim()) return;
    try {
      await submitInquiry.mutateAsync({ ...inquiryForm, providerId: id });
      ue.success(t("inquiry.success"));
      setInquiryForm({
        serviceName: "",
        message: "",
        preferredContact: "phone"
      });
    } catch {
      ue.error(t("common.error"));
    }
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      login();
      return;
    }
    if (reviewRating === 0) {
      ue.error(lang === "hi" ? "कृपया रेटिंग चुनें" : "Please select a rating");
      return;
    }
    try {
      const input = {
        rating: BigInt(reviewRating),
        comment: reviewComment,
        providerId: id
      };
      await addReview.mutateAsync(input);
      ue.success(t("review.success"));
      setReviewRating(0);
      setReviewComment("");
    } catch {
      ue.error(t("common.error"));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 13 }),
            lang === "hi" ? "होम" : "Home"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, className: "text-muted-foreground/50" }),
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
          className: "text-muted-foreground hover:text-foreground transition-colors",
          children: t("nav.services")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, className: "text-muted-foreground/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: provider.businessName })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        className: "inline-flex items-center gap-1.5 text-sm text-primary font-medium",
        "data-ocid": "back-to-services",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
          t("common.back")
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-24 w-24 rounded-2xl border-2 border-primary/20 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarImage,
              {
                src: provider.profileImage,
                alt: provider.businessName
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-2xl bg-primary/10 text-primary font-display font-bold text-3xl", children: initials })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight", children: provider.businessName }),
                  provider.isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1 bg-secondary/15 text-secondary border border-secondary/30 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 12 }),
                    t("services.verified")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground text-sm mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 13 }),
                  provider.ownerName
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center bg-muted/60 rounded-xl px-4 py-2 border border-border",
                  "data-ocid": "provider-rating",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, className: "fill-primary text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-lg leading-none", children: avgRating.toFixed(1) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      (reviews == null ? void 0 : reviews.length) ?? 0,
                      " ",
                      t("services.reviews")
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  provider.city,
                  ", ",
                  provider.state
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-secondary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `tel:${provider.phone}`,
                    className: "hover:text-foreground transition-colors",
                    children: provider.phone
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `mailto:${provider.email}`,
                    className: "hover:text-foreground transition-colors truncate max-w-[220px]",
                    children: provider.email
                  }
                )
              ] })
            ] }),
            providerCategories && providerCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: providerCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs",
                style: { borderColor: cat.color, color: cat.color },
                children: [
                  cat.icon,
                  " ",
                  lang === "hi" ? cat.name.hi : cat.name.en
                ]
              },
              cat.id.toString()
            )) })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp(0.1), className: "lg:col-span-2 space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "about", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "about", "data-ocid": "tab-about", children: t("provider.about") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "services", "data-ocid": "tab-services", children: t("provider.services") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "reviews", "data-ocid": "tab-reviews", children: [
              t("provider.reviews"),
              reviews && reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-primary/15 text-primary rounded-full text-[10px] px-1.5 py-0.5 font-semibold", children: reviews.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "inquire", "data-ocid": "tab-inquire", children: t("provider.inquire") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "about", className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 16, className: "text-primary" }),
                lang === "hi" ? "हमारे बारे में" : "About Us"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: bio ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed text-sm", children: bio }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm italic", children: t("common.noData") }) })
            ] }),
            provider.serviceAreas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-secondary" }),
                t("provider.serviceAreas")
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: provider.serviceAreas.map((area) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 10 }),
                    area
                  ]
                },
                area
              )) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "services", children: provider.servicesOffered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("common.noData") }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: provider.servicesOffered.map((svc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.3, delay: idx * 0.07 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground truncate", children: svc.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: svc.description }),
                  svc.availability && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11, className: "shrink-0" }),
                    svc.availability
                  ] })
                ] }),
                svc.price && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "shrink-0 gap-1 bg-primary/10 text-primary border-primary/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 10 }),
                  svc.price
                ] })
              ] }) }) })
            },
            svc.serviceId.toString()
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "reviews", className: "space-y-4", children: [
            isAuthenticated && isSeeker && !hasReviewed && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/20 bg-primary/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, className: "text-primary fill-primary" }),
                t("provider.writeReview")
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReviewSubmit, className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm mb-2 block", children: t("review.rating") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StarRating,
                    {
                      rating: reviewRating,
                      interactive: true,
                      onChange: setReviewRating,
                      size: "lg"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "review-comment",
                      className: "text-sm mb-1 block",
                      children: t("review.comment")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "review-comment",
                      value: reviewComment,
                      onChange: (e) => setReviewComment(e.target.value),
                      placeholder: lang === "hi" ? "अपना अनुभव साझा करें..." : "Share your experience with this provider...",
                      rows: 3,
                      "data-ocid": "review-comment"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: addReview.isPending || reviewRating === 0,
                    "data-ocid": "submit-review",
                    className: "w-full sm:w-auto",
                    children: addReview.isPending ? t("common.loading") : t("review.submit")
                  }
                )
              ] }) })
            ] }),
            !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-6 text-center space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "hi" ? "समीक्षा लिखने के लिए लॉग इन करें" : "Log in to write a review" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: login,
                  "data-ocid": "login-to-review",
                  children: t("nav.login")
                }
              )
            ] }) }),
            (reviews ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  size: 32,
                  className: "mx-auto text-muted-foreground/30"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "hi" ? "अभी तक कोई समीक्षा नहीं" : "No reviews yet. Be the first to review!" })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "reviews-list", children: (reviews ?? []).map((review, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: idx * 0.06 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StarRating,
                        {
                          rating: Number(review.rating),
                          size: "sm"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: maskName(
                        lang === "hi" ? "उपयोगकर्ता" : "User"
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatDate(review.createdAt, lang) })
                  ] }),
                  review.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed", children: review.comment })
                ] }) })
              },
              review.id.toString()
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "inquire", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 16, className: "text-primary" }),
              t("inquiry.title")
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "hi" ? "पूछताछ भेजने के लिए लॉग इन करें" : "Please log in to send an inquiry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "login-to-inquire", children: t("nav.login") })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleInquirySubmit,
                className: "space-y-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "service-name",
                        className: "text-sm mb-1.5 block",
                        children: [
                          t("inquiry.service"),
                          " *"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "service-name",
                        className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        value: inquiryForm.serviceName,
                        onChange: (e) => setInquiryForm({
                          ...inquiryForm,
                          serviceName: e.target.value
                        }),
                        placeholder: lang === "hi" ? "किस सेवा की जरूरत है?" : "What service do you need?",
                        required: true,
                        "data-ocid": "inquiry-service"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "inquiry-message",
                        className: "text-sm mb-1.5 block",
                        children: [
                          t("inquiry.message"),
                          " *"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "inquiry-message",
                        value: inquiryForm.message,
                        onChange: (e) => setInquiryForm({
                          ...inquiryForm,
                          message: e.target.value
                        }),
                        placeholder: lang === "hi" ? "अपनी जरूरत विस्तार से बताएं..." : "Describe your requirement in detail...",
                        rows: 4,
                        required: true,
                        "data-ocid": "inquiry-message"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm mb-3 block", children: t("inquiry.contact") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      RadioGroup,
                      {
                        value: inquiryForm.preferredContact,
                        onValueChange: (val) => setInquiryForm({
                          ...inquiryForm,
                          preferredContact: val
                        }),
                        className: "grid grid-cols-3 gap-3",
                        "data-ocid": "inquiry-contact",
                        children: ["phone", "email", "whatsapp"].map(
                          (method) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              htmlFor: `contact-${method}`,
                              className: `flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${inquiryForm.preferredContact === method ? "border-primary bg-primary/8 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  RadioGroupItem,
                                  {
                                    value: method,
                                    id: `contact-${method}`,
                                    className: "sr-only"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-current", children: contactIcons[method] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium capitalize", children: method === "whatsapp" ? "WhatsApp" : lang === "hi" ? method === "phone" ? "फोन" : "ईमेल" : method.charAt(0).toUpperCase() + method.slice(1) })
                              ]
                            },
                            method
                          )
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full",
                      disabled: submitInquiry.isPending,
                      "data-ocid": "submit-inquiry",
                      children: submitInquiry.isPending ? t("common.loading") : t("inquiry.submit")
                    }
                  )
                ]
              }
            ) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(0.2), className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15, className: "text-primary" }),
              t("provider.contact")
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-secondary shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "hi" ? "फोन" : "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `tel:${provider.phone}`,
                      className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
                      children: provider.phone
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "hi" ? "ईमेल" : "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `mailto:${provider.email}`,
                      className: "text-sm font-medium text-foreground hover:text-primary transition-colors break-all",
                      children: provider.email
                    }
                  )
                ] })
              ] }),
              provider.address && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MapPin,
                    {
                      size: 14,
                      className: "text-secondary shrink-0 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "hi" ? "पता" : "Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: provider.address })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "hi" ? "स्थान" : "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                    provider.city,
                    ", ",
                    provider.state
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${provider.phone}`, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full gap-2",
                "data-ocid": "cta-call",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15 }),
                  lang === "hi" ? "कॉल करें" : "Call Now"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://wa.me/${provider.phone.replace(/\D/g, "")}`,
                target: "_blank",
                rel: "noreferrer",
                className: "block",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full gap-2 border-secondary/40 text-secondary hover:bg-secondary/10",
                    "data-ocid": "cta-whatsapp",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 15 }),
                      "WhatsApp"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${provider.email}`, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full gap-2",
                "data-ocid": "cta-email",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15 }),
                  lang === "hi" ? "ईमेल करें" : "Send Email"
                ]
              }
            ) })
          ] }) }),
          provider.serviceAreas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2 text-muted-foreground font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
              t("provider.serviceAreas")
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: provider.serviceAreas.map((area) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: area }, area)) }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProviderDetailPage as default
};

import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as cn, g as useAuth, u as useLanguage, a as useNavigate, k as LoadingSpinner, R as Role, B as Button, L as Link, I as InquiryStatus, i as ue, l as useActor, E as ExternalBlob } from "./index-DNcnJBsr.js";
import { B as Badge, m as motion } from "./badge-szpuQhX_.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DItjgxJ4.js";
import { I as Input, S as Select, a as SelectTrigger, b as SelectValue, d as SelectContent, e as SelectItem } from "./input-LiZhWAs2.js";
import { L as Label } from "./label-B_YRXDqu.js";
import { c as createContextScope, B as BadgeCheck, S as StarRating } from "./StarRating-DYEcnFL7.js";
import { P as Primitive } from "./index-hdPYc3Da.js";
import { S as Switch } from "./switch-CHCTPaek.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, d as TabsContent } from "./tabs-OsjaBStS.js";
import { T as Textarea } from "./textarea-jwx31fHs.js";
import { o as useMyInquiries, p as useMyReviews, q as useMyProviderProfile, r as useInquiriesByProvider, s as useUpdateUserProfile, n as useCreateProviderProfile, t as useUpdateProviderProfile, v as useMyClassVideos, w as useDeleteClassVideo, x as useToggleClassVideoActive, y as useUpdateInquiryStatus, z as useAddClassVideo } from "./use-api-Dj0wz_nq.js";
import { I as INDIAN_STATES, a as getSubCategoryIcon, g as getSubCategoryLabel, f as formatVideoDate, C as CLASS_SUBCATEGORIES } from "./backend-api-B2Sc0xPK.js";
import { U as User } from "./user-GLCPWYrP.js";
import { M as MessageSquare } from "./message-square-DtRUtV4v.js";
import { S as Star } from "./star-D8GCJbR8.js";
import { P as Pen, T as Trash2, C as CircleX } from "./trash-2-CJRNfDoG.js";
import { C as ChevronRight } from "./chevron-right-D_Vxr1q2.js";
import { C as CircleCheck } from "./circle-check-DvFln69C.js";
import { V as Video, M as MessageCircle, C as Clock } from "./video-C1S9Hf_o.js";
import "./index-CF8YMB3f.js";
import "./chevron-down-HilyGg4K.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M12 9v4l2 2", key: "1c63tq" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }]
];
const AlarmClock = createLucideIcon("alarm-clock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$2);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const STATUS_CONFIG = {
  [InquiryStatus.pending]: {
    colorClass: "bg-primary/10 text-primary border-primary/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
    labelEn: "Pending",
    labelHi: "प्रतीक्षारत"
  },
  [InquiryStatus.responded]: {
    colorClass: "bg-secondary/10 text-secondary border-secondary/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 11 }),
    labelEn: "Responded",
    labelHi: "जवाब मिला"
  },
  [InquiryStatus.closed]: {
    colorClass: "bg-muted text-muted-foreground border-border",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 11 }),
    labelEn: "Closed",
    labelHi: "बंद"
  }
};
function StatusBadge({
  status,
  lang
}) {
  const cfg = STATUS_CONFIG[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.colorClass}`,
      children: [
        cfg.icon,
        lang === "hi" ? cfg.labelHi : cfg.labelEn
      ]
    }
  );
}
function EmptyState({
  icon,
  title,
  description,
  action,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-14 text-center",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: action })
      ]
    }
  );
}
function ProfileDetails({ user, lang }) {
  const fields = [
    { label: lang === "hi" ? "नाम" : "Name", value: user.name },
    { label: lang === "hi" ? "ईमेल" : "Email", value: user.email },
    { label: lang === "hi" ? "फोन" : "Phone", value: user.phone || "—" },
    { label: lang === "hi" ? "राज्य" : "State", value: user.state || "—" },
    { label: lang === "hi" ? "शहर" : "City", value: user.city || "—" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3", children: fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: f.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 text-sm font-medium text-foreground", children: f.value })
  ] }, f.label)) });
}
function ProfileEditForm({
  user,
  lang,
  onClose
}) {
  const [name, setName] = reactExports.useState(user.name);
  const [email, setEmail] = reactExports.useState(user.email);
  const [phone, setPhone] = reactExports.useState(user.phone);
  const [state, setState] = reactExports.useState(user.state);
  const [city, setCity] = reactExports.useState(user.city);
  const updateProfile = useUpdateUserProfile();
  function handleSubmit(e) {
    e.preventDefault();
    updateProfile.mutate(
      { name, email, phone, state, city },
      {
        onSuccess: () => {
          ue.success(lang === "hi" ? "प्रोफाइल अपडेट हुई" : "Profile updated");
          onClose();
        },
        onError: () => ue.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "profile-edit-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: lang === "hi" ? "पूरा नाम" : "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-name",
                value: name,
                onChange: (e) => setName(e.target.value),
                required: true,
                "data-ocid": "edit-name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-email", children: lang === "hi" ? "ईमेल" : "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true,
                "data-ocid": "edit-email"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-phone", children: lang === "hi" ? "फोन" : "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-phone",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                "data-ocid": "edit-phone"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-state", children: lang === "hi" ? "राज्य" : "State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: state, onValueChange: setState, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "edit-state", "data-ocid": "edit-state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INDIAN_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-city", children: lang === "hi" ? "शहर" : "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-city",
                value: city,
                onChange: (e) => setCity(e.target.value),
                "data-ocid": "edit-city"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onClose, children: lang === "hi" ? "रद्द करें" : "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "sm",
              disabled: updateProfile.isPending,
              "data-ocid": "save-profile-btn",
              children: updateProfile.isPending ? lang === "hi" ? "सहेज रहे हैं..." : "Saving..." : lang === "hi" ? "सहेजें" : "Save Changes"
            }
          )
        ] })
      ]
    }
  );
}
function InquiryCard({
  inquiry,
  lang
}) {
  const date = new Date(
    Number(inquiry.createdAt) / 1e6
  ).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "shadow-card hover:shadow-elevated transition-smooth",
      "data-ocid": "inquiry-row",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 16, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: inquiry.serviceName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: inquiry.status, lang })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: inquiry.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: date })
        ] })
      ] })
    }
  );
}
function IncomingInquiryCard({
  inquiry,
  lang
}) {
  const updateStatus = useUpdateInquiryStatus();
  const date = new Date(
    Number(inquiry.createdAt) / 1e6
  ).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  function markStatus(status) {
    updateStatus.mutate(
      { id: inquiry.id, status },
      {
        onSuccess: () => ue.success(lang === "hi" ? "स्थिति अपडेट हुई" : "Status updated"),
        onError: () => ue.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", "data-ocid": "incoming-inquiry-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 16, className: "text-secondary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: inquiry.serviceName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: inquiry.status, lang })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: inquiry.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: date })
      ] })
    ] }),
    inquiry.status !== InquiryStatus.closed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3 flex-wrap", children: [
      inquiry.status === InquiryStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "text-xs h-7 border-secondary/40 text-secondary hover:bg-secondary/10",
          disabled: updateStatus.isPending,
          onClick: () => markStatus(InquiryStatus.responded),
          "data-ocid": "mark-responded-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, className: "mr-1" }),
            lang === "hi" ? "जवाब दिया" : "Mark Responded"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "text-xs h-7",
          disabled: updateStatus.isPending,
          onClick: () => markStatus(InquiryStatus.closed),
          "data-ocid": "mark-closed-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12, className: "mr-1" }),
            lang === "hi" ? "बंद करें" : "Mark Closed"
          ]
        }
      )
    ] })
  ] }) });
}
function ReviewCard({ review, lang }) {
  const date = new Date(
    Number(review.createdAt) / 1e6
  ).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", "data-ocid": "review-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Number(review.rating), size: "sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: date })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: review.comment })
  ] }) });
}
function ProviderProfileForm({
  lang,
  initialData,
  providerId,
  onClose
}) {
  const createProvider = useCreateProviderProfile();
  const updateProvider = useUpdateProviderProfile();
  const { user } = useAuth();
  const [form, setForm] = reactExports.useState(
    initialData ?? {
      businessName: "",
      bioEn: "",
      bioHi: "",
      servicesOffered: "",
      state: (user == null ? void 0 : user.state) ?? "",
      city: (user == null ? void 0 : user.city) ?? "",
      phone: (user == null ? void 0 : user.phone) ?? ""
    }
  );
  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }
  function buildInput() {
    const servicesArr = form.servicesOffered.split("\n").filter(Boolean).map((line, idx) => ({
      serviceId: BigInt(idx + 1),
      title: line.trim(),
      description: "",
      availability: "Mon–Sat"
    }));
    return {
      businessName: form.businessName,
      ownerName: (user == null ? void 0 : user.name) ?? "",
      email: (user == null ? void 0 : user.email) ?? "",
      phone: form.phone,
      state: form.state,
      city: form.city,
      address: "",
      bioEn: form.bioEn,
      bioHi: form.bioHi,
      servicesOffered: servicesArr,
      serviceAreas: [form.city],
      categoryIds: [],
      profileImage: void 0
    };
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.businessName.trim()) {
      ue.error(
        lang === "hi" ? "व्यापार का नाम आवश्यक है" : "Business name required"
      );
      return;
    }
    try {
      if (providerId !== void 0) {
        await updateProvider.mutateAsync({
          id: providerId,
          input: buildInput()
        });
        ue.success(lang === "hi" ? "प्रोफाइल अपडेट हुई" : "Profile updated!");
      } else {
        await createProvider.mutateAsync(buildInput());
        ue.success(
          lang === "hi" ? "प्रोफाइल बनाई गई!" : "Provider profile created!"
        );
      }
      onClose == null ? void 0 : onClose();
    } catch {
      ue.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong");
    }
  }
  const isPending = createProvider.isPending || updateProvider.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "provider-profile-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pf-business", children: [
            lang === "hi" ? "व्यापार का नाम" : "Business Name",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "pf-business",
              placeholder: lang === "hi" ? "जैसे: शर्मा इलेक्ट्रिकल्स" : "e.g. Sharma Electricals",
              value: form.businessName,
              onChange: (e) => setField("businessName", e.target.value),
              required: true,
              "data-ocid": "pf-business-name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pf-state", children: lang === "hi" ? "राज्य" : "State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.state,
                onValueChange: (v) => setField("state", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "pf-state", "data-ocid": "pf-state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectValue,
                    {
                      placeholder: lang === "hi" ? "राज्य चुनें" : "Select state"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INDIAN_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pf-city", children: lang === "hi" ? "शहर" : "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pf-city",
                value: form.city,
                onChange: (e) => setField("city", e.target.value),
                "data-ocid": "pf-city"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pf-phone", children: lang === "hi" ? "फोन" : "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pf-phone",
                value: form.phone,
                onChange: (e) => setField("phone", e.target.value),
                "data-ocid": "pf-phone"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pf-services", children: [
            lang === "hi" ? "दी जाने वाली सेवाएं" : "Services Offered",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
              "(",
              lang === "hi" ? "एक प्रति पंक्ति" : "one per line",
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "pf-services",
              rows: 3,
              placeholder: lang === "hi" ? "इलेक्ट्रिकल वायरिंग\nफैन इंस्टालेशन" : "Electrical wiring\nFan installation\nSwitch repair",
              value: form.servicesOffered,
              onChange: (e) => setField("servicesOffered", e.target.value),
              "data-ocid": "pf-services"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pf-bio-en", children: lang === "hi" ? "परिचय (अंग्रेजी)" : "Bio (English)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "pf-bio-en",
              rows: 3,
              placeholder: "Describe your experience and expertise...",
              value: form.bioEn,
              onChange: (e) => setField("bioEn", e.target.value),
              "data-ocid": "pf-bio-en"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pf-bio-hi", children: [
            lang === "hi" ? "परिचय (हिंदी)" : "Bio (Hindi)",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs ml-1", children: [
              "(",
              lang === "hi" ? "वैकल्पिक" : "optional",
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "pf-bio-hi",
              rows: 2,
              placeholder: "हिंदी में अपना परिचय लिखें...",
              value: form.bioHi,
              onChange: (e) => setField("bioHi", e.target.value),
              "data-ocid": "pf-bio-hi"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-1", children: [
          onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onClose, children: lang === "hi" ? "रद्द करें" : "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "sm",
              disabled: isPending,
              "data-ocid": "pf-save-btn",
              children: isPending ? lang === "hi" ? "सहेज रहे हैं..." : "Saving..." : providerId !== void 0 ? lang === "hi" ? "अपडेट करें" : "Update Profile" : lang === "hi" ? "प्रोफाइल बनाएं" : "Create Profile"
            }
          )
        ] })
      ]
    }
  );
}
function WorkingHoursCard({
  lang,
  providerId,
  initialEnabled,
  initialFrom,
  initialTo
}) {
  const updateProvider = useUpdateProviderProfile();
  const { data: providerProfile } = useMyProviderProfile();
  const [enabled, setEnabled] = reactExports.useState(initialEnabled);
  const [from, setFrom] = reactExports.useState(initialFrom || "09:00");
  const [to, setTo] = reactExports.useState(initialTo || "18:00");
  const [saved, setSaved] = reactExports.useState(false);
  async function handleSave() {
    if (!providerProfile) return;
    const input = {
      businessName: providerProfile.businessName,
      ownerName: providerProfile.ownerName,
      email: providerProfile.email,
      phone: providerProfile.phone,
      state: providerProfile.state,
      city: providerProfile.city,
      address: providerProfile.address,
      bioEn: providerProfile.bioEn,
      bioHi: providerProfile.bioHi,
      servicesOffered: providerProfile.servicesOffered,
      serviceAreas: providerProfile.serviceAreas,
      categoryIds: providerProfile.categoryIds,
      profileImage: providerProfile.profileImage,
      contactAvailabilityEnabled: enabled,
      availableFrom: enabled ? from : "",
      availableTo: enabled ? to : ""
    };
    try {
      await updateProvider.mutateAsync({ id: providerId, input });
      setSaved(true);
      ue.success(
        lang === "hi" ? "उपलब्धता सेटिंग सहेजी गई" : "Availability saved"
      );
      setTimeout(() => setSaved(false), 3e3);
    } catch {
      ue.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-card border-primary/20",
      "data-ocid": "working-hours-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlarmClock, { size: 16, className: "text-primary" }),
          lang === "hi" ? "संपर्क समय सेटिंग" : "Working Hours"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "availability-toggle",
                  className: "text-sm font-medium cursor-pointer",
                  children: lang === "hi" ? "संपर्क समय सक्षम करें" : "Enable contact availability hours"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "hi" ? "वह समय सेट करें जब विजिटर आपकी संपर्क जानकारी देख सकें" : "Set hours when visitors can see your contact info" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "availability-toggle",
                checked: enabled,
                onCheckedChange: setEnabled,
                "data-ocid": "availability-toggle",
                className: "data-[state=checked]:bg-primary"
              }
            )
          ] }),
          enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              transition: { duration: 0.2 },
              className: "grid grid-cols-2 gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "avail-from", className: "text-sm", children: lang === "hi" ? "उपलब्ध से" : "Available from" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "avail-from",
                      type: "time",
                      value: from,
                      onChange: (e) => setFrom(e.target.value),
                      "data-ocid": "avail-from"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "avail-to", className: "text-sm", children: lang === "hi" ? "उपलब्ध तक" : "Available to" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "avail-to",
                      type: "time",
                      value: to,
                      onChange: (e) => setTo(e.target.value),
                      "data-ocid": "avail-to"
                    }
                  )
                ] })
              ]
            }
          ),
          !enabled && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: lang === "hi" ? "जब बंद हो: आपका फोन और WhatsApp हमेशा दिखेगा।" : "When off: your phone and WhatsApp are always visible to visitors." }),
          saved && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-secondary font-medium flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
            lang === "hi" ? `सेटिंग सहेजी गई${enabled ? ` (${from} – ${to} IST)` : ""}` : `Settings saved${enabled ? ` (${from} – ${to} IST)` : ""}`
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: handleSave,
              disabled: updateProvider.isPending,
              "data-ocid": "save-availability-btn",
              className: "w-full sm:w-auto",
              children: updateProvider.isPending ? lang === "hi" ? "सहेज रहे हैं..." : "Saving..." : lang === "hi" ? "उपलब्धता सहेजें" : "Save availability"
            }
          )
        ] })
      ]
    }
  );
}
function VideoUploadForm({
  lang,
  providerId,
  onUploaded
}) {
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [subCategory, setSubCategory] = reactExports.useState("yoga");
  const [file, setFile] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const { actor } = useActor();
  const addClassVideo = useAddClassVideo();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      ue.error(lang === "hi" ? "शीर्षक आवश्यक है" : "Title is required");
      return;
    }
    if (!file) {
      ue.error(
        lang === "hi" ? "कृपया वीडियो चुनें" : "Please select a video file"
      );
      return;
    }
    if (!actor) {
      ue.error(lang === "hi" ? "कनेक्शन नहीं है" : "Not connected");
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(Math.round(pct * 100));
      });
      const actorInternal = actor;
      let fileKey;
      if (typeof actorInternal._uploadFile === "function") {
        const resultBytes = await actorInternal._uploadFile(blob);
        fileKey = new TextDecoder().decode(resultBytes);
      } else {
        throw new Error("Upload not available");
      }
      await addClassVideo.mutateAsync({
        providerId,
        input: { title, description, subCategory, fileKey }
      });
      ue.success(
        lang === "hi" ? "वीडियो सफलतापूर्वक अपलोड हुआ! 🎉" : "Video uploaded successfully! 🎉"
      );
      setTitle("");
      setDescription("");
      setSubCategory("yoga");
      setFile(null);
      setUploadProgress(0);
      if (fileRef.current) fileRef.current.value = "";
      onUploaded();
    } catch (err) {
      console.error(err);
      ue.error(
        lang === "hi" ? "अपलोड विफल हुआ, पुनः प्रयास करें" : "Upload failed, please try again"
      );
    } finally {
      setIsUploading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "video-upload-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "vid-title", children: [
              lang === "hi" ? "वीडियो शीर्षक / Video Title" : "Video Title / वीडियो शीर्षक",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "vid-title",
                placeholder: lang === "hi" ? "जैसे: सुबह की योग दिनचर्या" : "e.g. Morning Yoga Routine",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                required: true,
                disabled: isUploading,
                "data-ocid": "vid-title"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vid-subcategory", children: lang === "hi" ? "श्रेणी / Category" : "Category / श्रेणी" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: subCategory,
                onValueChange: (v) => setSubCategory(v),
                disabled: isUploading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "vid-subcategory", "data-ocid": "vid-subcategory", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLASS_SUBCATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: cat.value, children: [
                    cat.icon,
                    " ",
                    lang === "hi" ? cat.labelHi : cat.labelEn
                  ] }, cat.value)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "vid-file", children: [
              lang === "hi" ? "वीडियो फाइल / Video File" : "Video File / वीडियो फाइल",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "vid-file",
                type: "file",
                accept: "video/*",
                ref: fileRef,
                onChange: (e) => {
                  var _a;
                  return setFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                },
                disabled: isUploading,
                className: "cursor-pointer file:mr-2 file:text-xs file:font-medium file:bg-[oklch(var(--online-classes-accent)/0.1)] file:text-[oklch(var(--online-classes-accent))] file:border-0 file:rounded file:px-2 file:py-1",
                "data-ocid": "vid-file"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vid-desc", children: lang === "hi" ? "विवरण / Description" : "Description / विवरण" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "vid-desc",
                rows: 2,
                placeholder: lang === "hi" ? "इस वीडियो के बारे में बताएं..." : "Describe what this video covers...",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                disabled: isUploading,
                "data-ocid": "vid-desc"
              }
            )
          ] })
        ] }),
        isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "space-y-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang === "hi" ? "अपलोड हो रहा है..." : "Uploading..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  uploadProgress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Progress,
                {
                  value: uploadProgress,
                  className: "h-2 bg-muted [&>div]:bg-[oklch(var(--online-classes-accent))]"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: isUploading || !file || !title.trim(),
            className: "bg-[oklch(var(--online-classes-accent))] text-[oklch(var(--online-classes-accent-foreground))] hover:bg-[oklch(var(--online-classes-accent)/0.9)]",
            "data-ocid": "vid-upload-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 15, className: "mr-2" }),
              isUploading ? lang === "hi" ? "अपलोड हो रहा है..." : "Uploading..." : lang === "hi" ? "वीडियो अपलोड करें" : "Upload Video"
            ]
          }
        ) })
      ]
    }
  );
}
function MyVideosSection({
  lang,
  providerId
}) {
  const [showUpload, setShowUpload] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const { data: videos, isLoading, refetch } = useMyClassVideos(providerId);
  const deleteVideo = useDeleteClassVideo();
  const toggleActive = useToggleClassVideoActive();
  async function handleDelete(videoId) {
    if (!window.confirm(
      lang === "hi" ? "क्या आप इस वीडियो को हटाना चाहते हैं?" : "Are you sure you want to delete this video?"
    ))
      return;
    setDeletingId(videoId);
    try {
      await deleteVideo.mutateAsync({ videoId, providerId });
      ue.success(lang === "hi" ? "वीडियो हटा दिया गया" : "Video deleted");
    } catch {
      ue.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }
  async function handleToggle(videoId) {
    try {
      await toggleActive.mutateAsync({ videoId, providerId });
      ue.success(lang === "hi" ? "स्थिति अपडेट हुई" : "Status updated");
    } catch {
      ue.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-card border-[oklch(var(--online-classes-accent)/0.25)]",
      "data-ocid": "my-videos-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-[oklch(var(--online-classes-accent)/0.12)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Video,
              {
                size: 16,
                className: "text-[oklch(var(--online-classes-accent))]"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display", children: lang === "hi" ? "मेरे वीडियो" : "My Videos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "hi" ? "ऑनलाइन क्लास वीडियो प्रबंधित करें" : "Manage your online class videos" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: showUpload ? "outline" : "default",
              onClick: () => setShowUpload((v) => !v),
              className: showUpload ? "" : "bg-[oklch(var(--online-classes-accent))] text-[oklch(var(--online-classes-accent-foreground))] hover:bg-[oklch(var(--online-classes-accent)/0.9)]",
              "data-ocid": "toggle-upload-form-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14, className: "mr-1.5" }),
                showUpload ? lang === "hi" ? "बंद करें" : "Close" : lang === "hi" ? "नया वीडियो" : "Upload New"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          showUpload && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              className: "border border-[oklch(var(--online-classes-accent)/0.3)] rounded-xl p-4 bg-[oklch(var(--online-classes-accent)/0.04)]",
              "data-ocid": "upload-form-panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-[oklch(var(--online-classes-accent))] mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14 }),
                  lang === "hi" ? "नया वीडियो अपलोड करें / Upload New Video" : "Upload New Video / नया वीडियो अपलोड करें"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  VideoUploadForm,
                  {
                    lang,
                    providerId,
                    onUploaded: () => {
                      setShowUpload(false);
                      refetch();
                    }
                  }
                )
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : !(videos == null ? void 0 : videos.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: "🎥",
              title: lang === "hi" ? "अभी तक कोई वीडियो नहीं" : "No videos yet",
              description: lang === "hi" ? "अपना पहला योग, ध्यान या कोचिंग वीडियो अपलोड करें।" : "Upload your first yoga, meditation, fitness or coaching video.",
              ocid: "empty-videos"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: videos.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.05 },
              className: "border border-border rounded-xl overflow-hidden bg-card hover:shadow-card transition-smooth",
              "data-ocid": "video-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video bg-muted/60 relative flex items-center justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-[oklch(var(--online-classes-accent)/0.15)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Video,
                    {
                      size: 22,
                      className: "text-[oklch(var(--online-classes-accent))]"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[oklch(var(--online-classes-accent)/0.15)] text-[oklch(var(--online-classes-accent))] border border-[oklch(var(--online-classes-accent)/0.3)]", children: [
                    getSubCategoryIcon(video.subCategory),
                    getSubCategoryLabel(video.subCategory, lang)
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${video.isActive ? "bg-secondary/15 text-secondary border-secondary/30" : "bg-muted text-muted-foreground border-border"}`,
                      children: video.isActive ? lang === "hi" ? "सक्रिय" : "Active" : lang === "hi" ? "निष्क्रिय" : "Inactive"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground line-clamp-1", children: video.title }),
                  video.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: video.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: formatVideoDate(video.uploadedAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Switch,
                        {
                          checked: video.isActive,
                          onCheckedChange: () => handleToggle(video.id),
                          disabled: toggleActive.isPending,
                          className: "data-[state=checked]:bg-[oklch(var(--online-classes-accent))]",
                          "aria-label": lang === "hi" ? "सक्रिय/निष्क्रिय करें" : "Toggle active",
                          "data-ocid": "toggle-video-active"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: video.isActive ? lang === "hi" ? "दिख रहा है" : "Visible" : lang === "hi" ? "छुपा हुआ" : "Hidden" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-7 w-7 p-0 text-destructive hover:bg-destructive/10",
                        disabled: deletingId === video.id || deleteVideo.isPending,
                        onClick: () => handleDelete(video.id),
                        "aria-label": lang === "hi" ? "वीडियो हटाएं" : "Delete video",
                        "data-ocid": "delete-video-btn",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                      }
                    )
                  ] })
                ] })
              ]
            },
            video.id.toString()
          )) })
        ] })
      ]
    }
  );
}
function ProviderProfileTab({ lang }) {
  var _a;
  const [editing, setEditing] = reactExports.useState(false);
  const { data: providerProfile, isLoading } = useMyProviderProfile();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {});
  if (!providerProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 p-4 rounded-xl bg-primary/6 border border-primary/20 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: lang === "hi" ? "अपना व्यापार शुरू करें" : "Start offering your services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "hi" ? "प्रदाता प्रोफाइल बनाएं और हजारों ग्राहकों तक पहुंचें।" : "Create your provider profile and reach thousands of customers across India." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 16, className: "text-primary" }),
          lang === "hi" ? "प्रदाता प्रोफाइल बनाएं" : "Create Provider Profile"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderProfileForm, { lang }) })
      ] })
    ] });
  }
  const initialData = {
    businessName: providerProfile.businessName,
    bioEn: providerProfile.bioEn,
    bioHi: providerProfile.bioHi,
    servicesOffered: providerProfile.servicesOffered.map((s) => s.title).join("\n"),
    state: providerProfile.state,
    city: providerProfile.city,
    phone: providerProfile.phone
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/10 border border-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16, className: "text-secondary shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-secondary", children: lang === "hi" ? "आपकी प्रोफाइल लाइव है" : "Your profile is live" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          size: "sm",
          className: "ml-auto text-xs h-7 text-secondary hover:bg-secondary/10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/services/$providerId",
              params: { providerId: providerProfile.id.toString() },
              children: [
                lang === "hi" ? "देखें" : "View",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12, className: "ml-0.5" })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", "data-ocid": "provider-profile-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display truncate", children: providerProfile.businessName }),
          providerProfile.isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-secondary/10 text-secondary border-secondary/30 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 12, className: "mr-1" }),
            lang === "hi" ? "सत्यापित" : "Verified"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-primary border-primary/40 shrink-0",
              "data-ocid": "verification-status",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 12, className: "mr-1" }),
                lang === "hi" ? "सत्यापन लंबित" : "Pending Verification"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setEditing(!editing),
            "data-ocid": "edit-provider-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13, className: "mr-1.5" }),
              editing ? lang === "hi" ? "रद्द करें" : "Cancel" : lang === "hi" ? "संपादित करें" : "Edit"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProviderProfileForm,
        {
          lang,
          initialData,
          providerId: providerProfile.id,
          onClose: () => setEditing(false)
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3", children: [
        [
          {
            label: lang === "hi" ? "शहर" : "City",
            value: providerProfile.city
          },
          {
            label: lang === "hi" ? "राज्य" : "State",
            value: providerProfile.state
          },
          {
            label: lang === "hi" ? "फोन" : "Phone",
            value: providerProfile.phone
          }
        ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 text-sm font-medium text-foreground", children: f.value || "—" })
        ] }, f.label)),
        providerProfile.bioEn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: lang === "hi" ? "परिचय" : "Bio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 text-sm text-foreground leading-relaxed", children: providerProfile.bioEn })
        ] })
      ] }) })
    ] }),
    !editing && ((_a = providerProfile.servicesOffered) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-display", children: lang === "hi" ? "दी जाने वाली सेवाएं" : "Services Offered" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: providerProfile.servicesOffered.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/40",
          "data-ocid": "service-row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: svc.title }),
              svc.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: svc.description })
            ] }),
            svc.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary whitespace-nowrap", children: [
              "₹",
              svc.price
            ] })
          ]
        },
        svc.serviceId.toString()
      )) }) })
    ] }),
    !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkingHoursCard,
      {
        lang,
        providerId: providerProfile.id,
        initialEnabled: providerProfile.contactAvailabilityEnabled ?? false,
        initialFrom: providerProfile.availableFrom ?? "09:00",
        initialTo: providerProfile.availableTo ?? "18:00"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MyVideosSection, { lang, providerId: providerProfile.id.toString() })
  ] });
}
function IncomingInquiriesPanel({
  providerId,
  lang
}) {
  const { data: providerInquiries, isLoading } = useInquiriesByProvider(providerId);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {});
  if (!(providerInquiries == null ? void 0 : providerInquiries.length)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "📬",
        title: lang === "hi" ? "कोई पूछताछ नहीं मिली" : "No inquiries received",
        description: lang === "hi" ? "अभी तक किसी ने पूछताछ नहीं की है।" : "No one has sent you an inquiry yet.",
        ocid: "empty-provider-inquiries"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: providerInquiries.map((inq) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(IncomingInquiryCard, { inquiry: inq, lang })
    },
    inq.id.toString()
  )) });
}
function SeekerDashboard({
  user,
  lang
}) {
  const [editingProfile, setEditingProfile] = reactExports.useState(false);
  const { data: inquiries, isLoading: inquiriesLoading } = useMyInquiries();
  const { data: reviews, isLoading: reviewsLoading } = useMyReviews();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "inquiries", className: "w-full", "data-ocid": "seeker-tabs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 w-full sm:w-auto flex-wrap h-auto gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "inquiries", "data-ocid": "tab-inquiries", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 14, className: "mr-1.5" }),
        lang === "hi" ? "पूछताछ" : "My Inquiries",
        ((inquiries == null ? void 0 : inquiries.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1.5 text-xs px-1.5 py-0", children: inquiries.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "reviews", "data-ocid": "tab-reviews", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "mr-1.5" }),
        lang === "hi" ? "समीक्षाएं" : "My Reviews",
        ((reviews == null ? void 0 : reviews.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1.5 text-xs px-1.5 py-0", children: reviews.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "profile", "data-ocid": "tab-profile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "mr-1.5" }),
        lang === "hi" ? "प्रोफाइल" : "My Profile"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "inquiries", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "hi" ? "मेरी पूछताछ" : "My Inquiries" }) }),
      inquiriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : ((inquiries == null ? void 0 : inquiries.length) ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: "📭",
          title: lang === "hi" ? "अभी तक कोई पूछताछ नहीं" : "No inquiries yet",
          description: lang === "hi" ? "सेवा प्रदाताओं से पूछताछ करें।" : "Browse services and send your first inquiry.",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "browse-services-link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
              children: [
                lang === "hi" ? "सेवाएं देखें" : "Find a Provider",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "ml-1" })
              ]
            }
          ) }),
          ocid: "empty-inquiries"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: inquiries.map((inq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.04 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(InquiryCard, { inquiry: inq, lang })
        },
        inq.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "reviews", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "hi" ? "मेरी समीक्षाएं" : "My Reviews" }) }),
      reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : ((reviews == null ? void 0 : reviews.length) ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: "⭐",
          title: lang === "hi" ? "अभी तक कोई समीक्षा नहीं" : "No reviews yet",
          description: lang === "hi" ? "सेवाओं का अनुभव लेकर समीक्षा लिखें।" : "Use a service and leave your first review.",
          ocid: "empty-reviews"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reviews.map((rev, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.04 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review: rev, lang })
        },
        rev.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display", children: lang === "hi" ? "मेरी प्रोफाइल" : "My Profile" }),
        !editingProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setEditingProfile(true),
            "data-ocid": "edit-profile-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13, className: "mr-1.5" }),
              lang === "hi" ? "संपादित करें" : "Edit"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: editingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProfileEditForm,
        {
          user,
          lang,
          onClose: () => setEditingProfile(false)
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileDetails, { user, lang }) })
    ] }) })
  ] });
}
function ProviderDashboard({
  user,
  lang
}) {
  const [editingProfile, setEditingProfile] = reactExports.useState(false);
  const { data: providerProfile, isLoading: providerLoading } = useMyProviderProfile();
  const { data: reviews, isLoading: reviewsLoading } = useMyReviews();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Tabs,
    {
      defaultValue: "provider-profile",
      className: "w-full",
      "data-ocid": "provider-tabs",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 w-full sm:w-auto flex-wrap h-auto gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "provider-profile", "data-ocid": "tab-provider-profile", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14, className: "mr-1.5" }),
            lang === "hi" ? "प्रदाता प्रोफाइल" : "Provider Profile"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "inquiries", "data-ocid": "tab-inquiries", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 14, className: "mr-1.5" }),
            lang === "hi" ? "आई पूछताछ" : "Incoming Inquiries"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "reviews", "data-ocid": "tab-reviews", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "mr-1.5" }),
            lang === "hi" ? "समीक्षाएं" : "Reviews"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "profile", "data-ocid": "tab-profile", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "mr-1.5" }),
            lang === "hi" ? "मेरी प्रोफाइल" : "My Profile"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "provider-profile", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "hi" ? "प्रदाता प्रोफाइल" : "Provider Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: lang === "hi" ? "अपनी व्यावसायिक जानकारी प्रबंधित करें।" : "Manage your business information and services." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderProfileTab, { lang })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "inquiries", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "hi" ? "मुझे मिली पूछताछ" : "Incoming Inquiries" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: lang === "hi" ? "सेवा खोजने वालों की पूछताछ यहां दिखेगी।" : "Inquiries from service seekers appear here." })
          ] }),
          providerLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : !providerProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: "📬",
              title: lang === "hi" ? "प्रदाता प्रोफाइल नहीं है" : "No provider profile",
              description: lang === "hi" ? "पूछताछ देखने के लिए पहले प्रदाता प्रोफाइल बनाएं।" : "Create a provider profile first to receive inquiries.",
              ocid: "no-profile-for-inquiries"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(IncomingInquiriesPanel, { providerId: providerProfile.id, lang })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "reviews", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "hi" ? "प्राप्त समीक्षाएं" : "Reviews Received" }) }),
          reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : ((reviews == null ? void 0 : reviews.length) ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: "⭐",
              title: lang === "hi" ? "अभी तक कोई समीक्षा नहीं" : "No reviews yet",
              description: lang === "hi" ? "जब लोग आपकी सेवा की समीक्षा करेंगे तो यहां दिखेंगी।" : "Reviews from clients will appear here.",
              ocid: "empty-provider-reviews"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reviews.map((rev) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review: rev, lang }, rev.id.toString())) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display", children: lang === "hi" ? "मेरी प्रोफाइल" : "My Profile" }),
            !editingProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setEditingProfile(true),
                "data-ocid": "edit-profile-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13, className: "mr-1.5" }),
                  lang === "hi" ? "संपादित करें" : "Edit"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: editingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileEditForm,
            {
              user,
              lang,
              onClose: () => setEditingProfile(false)
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileDetails, { user, lang }) })
        ] }) })
      ]
    }
  );
}
function DashboardStats({
  lang,
  isProvider
}) {
  const { data: inquiries } = useMyInquiries();
  const { data: reviews } = useMyReviews();
  const { data: providerProfile } = useMyProviderProfile();
  const avgRating = reviews && reviews.length > 0 ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length : 0;
  const stats = isProvider ? [
    {
      icon: "🏢",
      value: (providerProfile == null ? void 0 : providerProfile.businessName) ?? "—",
      label: lang === "hi" ? "व्यवसाय" : "Business"
    },
    {
      icon: "⭐",
      value: avgRating.toFixed(1),
      label: lang === "hi" ? "औसत रेटिंग" : "Avg. Rating"
    },
    {
      icon: "💬",
      value: String((reviews == null ? void 0 : reviews.length) ?? 0),
      label: lang === "hi" ? "समीक्षाएं" : "Reviews"
    }
  ] : [
    {
      icon: "📋",
      value: String((inquiries == null ? void 0 : inquiries.length) ?? 0),
      label: lang === "hi" ? "पूछताछ" : "Inquiries"
    },
    {
      icon: "⭐",
      value: avgRating > 0 ? avgRating.toFixed(1) : "—",
      label: lang === "hi" ? "औसत रेटिंग" : "Avg. Rating"
    },
    {
      icon: "💬",
      value: String((reviews == null ? void 0 : reviews.length) ?? 0),
      label: lang === "hi" ? "समीक्षाएं" : "Reviews"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg mb-0.5", children: stat.icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground truncate", children: stat.value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: stat.label })
  ] }) }, stat.label)) });
}
function Dashboard() {
  const { user, isLoading } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {});
  if (!user) {
    navigate({ to: "/" });
    return null;
  }
  const isProvider = user.role === Role.provider || user.role === Role.admin;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 min-h-[60vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 20, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground truncate", children: lang === "hi" ? `नमस्ते, ${user.name}` : `Hello, ${user.name}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isProvider ? lang === "hi" ? "प्रदाता डैशबोर्ड" : "Provider Dashboard" : lang === "hi" ? "उपयोगकर्ता डैशबोर्ड" : "User Dashboard" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardStats, { user, lang, isProvider }),
    isProvider ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderDashboard, { user, lang }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SeekerDashboard, { user, lang })
  ] });
}
export {
  Dashboard as default
};

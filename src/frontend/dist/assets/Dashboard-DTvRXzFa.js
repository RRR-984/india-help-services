import { c as createLucideIcon, u as useLanguage, h as useAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, B as Button, R as Role, L as Link, k as ue, I as InquiryStatus } from "./index-CKeR-Ro-.js";
import { B as Badge, C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-lnFnQWO5.js";
import { I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./input-Mp3jGbSf.js";
import { L as Label } from "./label-CWNPGoQK.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, d as TabsContent } from "./tabs-DmzzxyOA.js";
import { S as Star, B as BadgeCheck, a as StarRating } from "./StarRating-CmVwHuAf.js";
import { l as useMyProfile, m as motion, p as useMyInquiries, q as useMyReviews, r as useMyProviderProfile, s as useInquiriesByProvider, t as useUpdateUserProfile } from "./use-api-CvM1d6Wo.js";
import { I as INDIAN_STATES } from "./backend-api-DxyZzRIE.js";
import { C as ChevronRight } from "./chevron-right-0XGpycnY.js";
import { M as MessageSquare } from "./message-square-BbIx7PCd.js";
import { U as User } from "./user-CwVnJJ8s.js";
import { P as Pen, C as CircleX } from "./pen-DiUxJYOD.js";
import { M as MessageCircle, C as Clock } from "./message-circle-BzqZK8kZ.js";
import "./index-CwpZ18Ca.js";
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
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
const STATUS_CONFIG = {
  [InquiryStatus.pending]: {
    style: {
      backgroundColor: "#FFF3E0",
      color: "#B45309",
      borderColor: "#F59E0B"
    },
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
    labelEn: "Pending",
    labelHi: "प्रतीक्षारत"
  },
  [InquiryStatus.responded]: {
    style: {
      backgroundColor: "#E6F4EA",
      color: "#166534",
      borderColor: "#86EFAC"
    },
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 12 }),
    labelEn: "Responded",
    labelHi: "जवाब मिला"
  },
  [InquiryStatus.closed]: {
    style: {},
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12 }),
    labelEn: "Closed",
    labelHi: "बंद"
  }
};
function StatusBadge({
  status,
  lang
}) {
  const cfg = STATUS_CONFIG[status];
  const isClosedStatus = status === InquiryStatus.closed;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${isClosedStatus ? "bg-muted text-muted-foreground border-border" : ""}`,
      style: isClosedStatus ? {} : cfg.style,
      children: [
        cfg.icon,
        lang === "hi" ? cfg.labelHi : cfg.labelEn
      ]
    }
  );
}
function ProfileEditForm({ user, lang, onClose }) {
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
function ProviderInquiriesPanel({
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: providerInquiries.map((inq) => /* @__PURE__ */ jsxRuntimeExports.jsx(InquiryCard, { inquiry: inq, lang }, inq.id.toString())) });
}
function SeekerDashboard({
  user,
  lang
}) {
  const [editingProfile, setEditingProfile] = reactExports.useState(false);
  const { data: inquiries, isLoading: inquiriesLoading } = useMyInquiries();
  const { data: reviews, isLoading: reviewsLoading } = useMyReviews();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "inquiries", className: "w-full", "data-ocid": "seeker-tabs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 w-full sm:w-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "inquiries", "data-ocid": "tab-inquiries", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 14, className: "mr-1.5" }),
        lang === "hi" ? "पूछताछ" : "Inquiries",
        ((inquiries == null ? void 0 : inquiries.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1.5 text-xs px-1.5 py-0", children: inquiries.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "reviews", "data-ocid": "tab-reviews", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "mr-1.5" }),
        lang === "hi" ? "समीक्षाएं" : "Reviews",
        ((reviews == null ? void 0 : reviews.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1.5 text-xs px-1.5 py-0", children: reviews.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "profile", "data-ocid": "tab-profile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "mr-1.5" }),
        lang === "hi" ? "प्रोफाइल" : "Profile"
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
                lang === "hi" ? "सेवाएं देखें" : "Browse Services",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "ml-1" })
              ]
            }
          ) }),
          ocid: "empty-inquiries"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: inquiries.map((inq) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
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
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reviews.map((rev) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
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
function ProviderDashboard({
  user,
  lang
}) {
  var _a;
  const [editingProfile, setEditingProfile] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const { data: providerProfile, isLoading: providerLoading } = useMyProviderProfile();
  const { data: reviews, isLoading: reviewsLoading } = useMyReviews();
  const avgRating = reviews && reviews.length > 0 ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length : 0;
  function handleEditProvider() {
    setEditingProfile(true);
    setActiveTab("profile");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Tabs,
    {
      value: activeTab,
      onValueChange: setActiveTab,
      className: "w-full",
      "data-ocid": "provider-tabs",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "overview", "data-ocid": "tab-overview", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14, className: "mr-1.5" }),
            lang === "hi" ? "अवलोकन" : "Overview"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "inquiries", "data-ocid": "tab-inquiries", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 14, className: "mr-1.5" }),
            lang === "hi" ? "पूछताछ" : "Inquiries"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "reviews", "data-ocid": "tab-reviews", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "mr-1.5" }),
            lang === "hi" ? "समीक्षाएं" : "Reviews"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "profile", "data-ocid": "tab-profile", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "mr-1.5" }),
            lang === "hi" ? "प्रोफाइल" : "Profile"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", children: providerLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : !providerProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: "🏢",
            title: lang === "hi" ? "प्रदाता प्रोफाइल नहीं है" : "No provider profile",
            description: lang === "hi" ? "अपनी सेवाएं जोड़ने के लिए प्रदाता प्रोफाइल बनाएं।" : "Create a provider profile to list your services.",
            action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "create-provider-link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                children: lang === "hi" ? "प्रोफाइल बनाएं" : "Create Profile"
              }
            ) }),
            ocid: "empty-provider-profile"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", "data-ocid": "provider-profile-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 sm:items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-2xl", children: providerProfile.profileImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: providerProfile.profileImage,
                alt: providerProfile.businessName,
                className: "w-full h-full object-cover rounded-2xl"
              }
            ) : "🏢" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground truncate", children: providerProfile.businessName }),
                providerProfile.isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 12, className: "mr-1" }),
                  lang === "hi" ? "सत्यापित" : "Verified"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-amber-600 border-amber-300 shrink-0",
                    "data-ocid": "verification-status",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 12, className: "mr-1" }),
                      lang === "hi" ? "सत्यापन लंबित" : "Pending Verification"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                providerProfile.city,
                ", ",
                providerProfile.state
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mt-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: avgRating, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: avgRating.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "(",
                  (reviews == null ? void 0 : reviews.length) ?? 0,
                  " ",
                  lang === "hi" ? "समीक्षाएं" : "reviews",
                  ")"
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "view-provider-link",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/services/$providerId",
                      params: { providerId: providerProfile.id.toString() },
                      children: lang === "hi" ? "देखें" : "View"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: handleEditProvider,
                  "data-ocid": "edit-provider-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13, className: "mr-1" }),
                    lang === "hi" ? "संपादित करें" : "Edit"
                  ]
                }
              )
            ] })
          ] }) }) }),
          ((_a = providerProfile.servicesOffered) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-display", children: lang === "hi" ? "दी जाने वाली सेवाएं" : "Services Offered" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: providerProfile.servicesOffered.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/40",
                "data-ocid": "service-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: svc.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: svc.description })
                  ] }),
                  svc.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary whitespace-nowrap", children: [
                    "₹",
                    svc.price
                  ] })
                ]
              },
              svc.serviceId.toString()
            )) }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "inquiries", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "hi" ? "मुझे मिली पूछताछ" : "Inquiries Received" }),
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
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderInquiriesPanel, { providerId: providerProfile.id, lang })
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
function DashboardPage() {
  const { lang } = useLanguage();
  const { isAuthenticated, isLoading: authLoading, user, login } = useAuth();
  const navigate = useNavigate();
  const { data: freshProfile } = useMyProfile();
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/auth/$action", params: { action: "login" } });
    }
  }, [authLoading, isAuthenticated, navigate]);
  if (authLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: "🔒" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: lang === "hi" ? "लॉगिन आवश्यक है" : "Login Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "hi" ? "डैशबोर्ड देखने के लिए कृपया लॉगिन करें।" : "Please log in to view your dashboard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "dashboard-login-btn", children: lang === "hi" ? "लॉगिन करें" : "Log In" })
    ] }) });
  }
  const resolvedUser = freshProfile ?? user;
  if (!resolvedUser) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  const isProvider = resolvedUser.role === Role.provider;
  const isAdmin = resolvedUser.role === Role.admin;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-foreground", children: lang === "hi" ? "मेरा डैशबोर्ड" : "My Dashboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/30 capitalize", children: isAdmin ? lang === "hi" ? "एडमिन" : "Admin" : isProvider ? lang === "hi" ? "प्रदाता" : "Provider" : lang === "hi" ? "सेवा खोजने वाले" : "Seeker" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm sm:text-base", children: [
                lang === "hi" ? "स्वागत है," : "Welcome back,",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: resolvedUser.name }),
                " ",
                "👋"
              ] })
            ] }),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "sm",
                "data-ocid": "admin-panel-link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 14, className: "mr-1.5" }),
                  lang === "hi" ? "एडमिन पैनल" : "Admin Panel",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "ml-1" })
                ] })
              }
            )
          ]
        }
      ),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "mt-4 p-3 rounded-lg bg-primary/8 border border-primary/20 flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 16, className: "text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
              lang === "hi" ? "आप एडमिन हैं। प्लेटफॉर्म को प्रबंधित करने के लिए" : "You have admin privileges. Manage the platform from the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/admin",
                  className: "font-medium text-primary underline underline-offset-2",
                  "data-ocid": "admin-inline-link",
                  children: lang === "hi" ? "एडमिन पैनल" : "Admin Panel"
                }
              ),
              " ",
              lang === "hi" ? "जाएं।" : ""
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DashboardStats,
      {
        user: resolvedUser,
        lang,
        isProvider
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        children: isProvider ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderDashboard, { user: resolvedUser, lang }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SeekerDashboard, { user: resolvedUser, lang })
      }
    ) })
  ] });
}
function DashboardStats({
  user,
  lang,
  isProvider
}) {
  const { data: inquiries } = useMyInquiries();
  const { data: reviews } = useMyReviews();
  const { data: providerProfile } = useMyProviderProfile();
  const providerAvgRating = reviews && reviews.length > 0 ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length : 0;
  const stats = isProvider ? [
    {
      icon: "🏢",
      value: (providerProfile == null ? void 0 : providerProfile.businessName) ?? "—",
      label: lang === "hi" ? "व्यवसाय" : "Business"
    },
    {
      icon: "⭐",
      value: providerAvgRating.toFixed(1),
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
      value: String((reviews == null ? void 0 : reviews.length) ?? 0),
      label: lang === "hi" ? "समीक्षाएं" : "Reviews"
    },
    {
      icon: "📍",
      value: user.state || "—",
      label: lang === "hi" ? "राज्य" : "State"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2.5 p-2 rounded-lg bg-card border border-border",
      "data-ocid": "dashboard-stat",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: stat.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground truncate", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: stat.label })
        ] })
      ]
    },
    stat.label
  )) });
}
export {
  DashboardPage as default
};

import { c as createLucideIcon, u as useLanguage, j as jsxRuntimeExports, L as Link, r as reactExports, B as Button, a as useNavigate } from "./index-DNcnJBsr.js";
import { C as Card, a as CardContent } from "./card-DItjgxJ4.js";
import { S as Skeleton } from "./skeleton-CYZiRy75.js";
import { S as ServiceCard, a as Search } from "./ServiceCard-2OeuIN0g.js";
import { u as useCategories, a as useFeaturedProviders, b as useAdminStats, c as useSeedSampleData, d as useVisitorStats } from "./use-api-Dj0wz_nq.js";
import { U as Users } from "./users-xJjJmgxP.js";
import { B as Building2 } from "./building-2-CrHHyibZ.js";
import { M as MessageSquare } from "./message-square-DtRUtV4v.js";
import { S as Star } from "./star-D8GCJbR8.js";
import { m as motion } from "./badge-szpuQhX_.js";
import { C as CircleCheck } from "./circle-check-DvFln69C.js";
import { B as BadgeCheck } from "./StarRating-DYEcnFL7.js";
import { C as ChevronDown } from "./chevron-down-HilyGg4K.js";
import "./avatar-Cz0z8-kq.js";
import "./index-hdPYc3Da.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3", key: "efffak" }],
  [
    "path",
    {
      d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
      key: "9pr0kb"
    }
  ],
  ["path", { d: "m21 3 1 11h-2", key: "1tisrp" }],
  ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3", key: "1uvwmv" }],
  ["path", { d: "M3 4h8", key: "1ep09j" }]
];
const Handshake = createLucideIcon("handshake", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
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
  insurance: "🛡️",
  online_classes: "🎓",
  onlineclasses: "🎓",
  online: "🎓",
  classes: "🎓",
  yoga: "🧘",
  fitness: "💪",
  coaching: "🎯",
  nri: "🌐",
  nrihelp: "🌐",
  marriage: "💍",
  events: "🎉",
  house: "🔧",
  housemaintenance: "🔧",
  guide: "🗺️",
  indianguide: "🗺️"
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
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry"
];
const HOW_IT_WORKS = [
  {
    step: "01",
    titleEn: "Search Services",
    titleHi: "सेवाएं खोजें",
    descEn: "Browse categories or search by location and service type across India.",
    descHi: "भारत भर में श्रेणी या स्थान से सेवाएं खोजें।",
    Icon: Search,
    colorClass: "bg-primary/10 border-primary/30",
    iconClass: "text-primary",
    badgeClass: "bg-primary/10 text-primary"
  },
  {
    step: "02",
    titleEn: "Connect with Providers",
    titleHi: "प्रदाताओं से जुड़ें",
    descEn: "View verified profiles, ratings, and reviews. Send a direct inquiry.",
    descHi: "सत्यापित प्रोफाइल, रेटिंग और समीक्षाएं देखें। सीधे पूछताछ भेजें।",
    Icon: Handshake,
    colorClass: "bg-secondary/10 border-secondary/30",
    iconClass: "text-secondary",
    badgeClass: "bg-secondary/10 text-secondary"
  },
  {
    step: "03",
    titleEn: "Get Expert Help",
    titleHi: "विशेषज्ञ सहायता पाएं",
    descEn: "Receive trusted assistance for any service need — fast and reliable.",
    descHi: "किसी भी सेवा के लिए विश्वसनीय सहायता प्राप्त करें — तेज़ और भरोसेमंद।",
    Icon: Zap,
    colorClass: "bg-primary/10 border-primary/30",
    iconClass: "text-primary",
    badgeClass: "bg-primary/10 text-primary"
  }
];
const TESTIMONIALS = [
  {
    nameEn: "Priya Sharma",
    nameHi: "प्रिया शर्मा",
    locationEn: "Delhi",
    locationHi: "दिल्ली",
    quoteEn: "Found an excellent legal advisor within minutes. The verification system gives me full confidence.",
    quoteHi: "कुछ ही मिनटों में एक उत्कृष्ट कानूनी सलाहकार मिला। सत्यापन प्रणाली मुझे पूरा विश्वास देती है।",
    avatar: "PS"
  },
  {
    nameEn: "Rajesh Kumar",
    nameHi: "राजेश कुमार",
    locationEn: "Mumbai",
    locationHi: "मुंबई",
    quoteEn: "As a service provider, this platform helped me reach thousands of new clients across Maharashtra.",
    quoteHi: "एक सेवा प्रदाता के रूप में, इस प्लेटफॉर्म ने मुझे महाराष्ट्र भर में हजारों नए ग्राहकों तक पहुंचने में मदद की।",
    avatar: "RK"
  },
  {
    nameEn: "Meera Patel",
    nameHi: "मीरा पटेल",
    locationEn: "Ahmedabad",
    locationHi: "अहमदाबाद",
    quoteEn: "The Hindi interface made it so easy to use. Got government document assistance quickly.",
    quoteHi: "हिंदी इंटरफेस ने इसे बहुत आसान बना दिया। सरकारी दस्तावेज़ सहायता जल्दी मिली।",
    avatar: "MP"
  }
];
const TRUST_POINTS = [
  {
    en: "Verified and background-checked providers",
    hi: "सत्यापित और जांचे गए प्रदाता"
  },
  {
    en: "Bilingual support in Hindi and English",
    hi: "हिंदी और अंग्रेजी में द्विभाषी सहायता"
  },
  {
    en: "Coverage across all 28 states and 8 UTs",
    hi: "सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों में कवरेज"
  },
  {
    en: "Transparent ratings and verified reviews",
    hi: "पारदर्शी रेटिंग और सत्यापित समीक्षाएं"
  }
];
function ProviderCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-14 rounded-xl shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/5" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-md" })
      ] })
    ] })
  ] });
}
function CategorySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" });
}
function VisitorCounterWidget() {
  const { lang } = useLanguage();
  const { data, isLoading } = useVisitorStats();
  const totalVisits = data ? Number(data.totalVisits) : null;
  const uniqueVisitors = data ? Number(data.uniqueVisitors) : null;
  const headingEn = "Site Visitors";
  const headingHi = "साइट विज़िटर";
  const totalEn = "Total Visits";
  const totalHi = "कुल विज़िट";
  const uniqueEn = "Unique Visitors";
  const uniqueHi = "अनन्य विज़िटर";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      className: "w-full max-w-xl mx-auto",
      "data-ocid": "visitor-counter-widget",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-primary/30 overflow-hidden shadow-elevated",
          style: {
            background: "linear-gradient(135deg, oklch(0.97 0.03 55) 0%, oklch(0.98 0.02 70) 100%)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-1 w-full flex", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-white/80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-secondary" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", "aria-hidden": true, children: "🇮🇳" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-primary uppercase tracking-widest", children: lang === "hi" ? headingHi : headingEn }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", "aria-hidden": true, children: "🇮🇳" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center bg-card rounded-xl p-4 border border-primary/20 shadow-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20, className: "text-primary" }) }),
                  isLoading || totalVisits === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 mx-auto mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-primary leading-none mb-1", children: totalVisits.toLocaleString("en-IN") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground", children: lang === "hi" ? totalHi : totalEn })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center bg-card rounded-xl p-4 border border-secondary/20 shadow-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 20, className: "text-secondary" }) }),
                  isLoading || uniqueVisitors === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 mx-auto mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-secondary leading-none mb-1", children: uniqueVisitors.toLocaleString("en-IN") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground", children: lang === "hi" ? uniqueHi : uniqueEn })
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function HeroSearch({ categories }) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("");
  const [selectedState, setSelectedState] = reactExports.useState("");
  function handleSubmit(e) {
    e.preventDefault();
    navigate({
      to: "/services",
      search: {
        category: selectedCategory || void 0,
        state: selectedState || void 0,
        city: void 0,
        search: query.trim() || void 0,
        sort: void 0
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "w-full max-w-2xl bg-card rounded-2xl shadow-elevated border border-border/60 overflow-hidden",
      "data-ocid": "hero-search-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-4 gap-2 border-b border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, className: "text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: lang === "hi" ? "सेवा खोजें..." : "Search for a service...",
              className: "flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm py-4 outline-none min-w-0",
              "data-ocid": "hero-search-input",
              "aria-label": lang === "hi" ? "सेवा खोजें" : "Search services"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 border-b sm:border-b-0 sm:border-r border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: selectedCategory,
                onChange: (e) => setSelectedCategory(e.target.value),
                className: "w-full appearance-none bg-transparent text-sm text-foreground px-4 py-3 outline-none cursor-pointer pr-8",
                "data-ocid": "hero-category-select",
                "aria-label": lang === "hi" ? "श्रेणी चुनें" : "Select category",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: lang === "hi" ? "सभी श्रेणियां" : "All Categories" }),
                  categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.id.toString(), children: lang === "hi" ? cat.name.hi : cat.name.en }, cat.id.toString()))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                size: 14,
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 border-b sm:border-b-0 sm:border-r border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: selectedState,
                onChange: (e) => setSelectedState(e.target.value),
                className: "w-full appearance-none bg-transparent text-sm text-foreground px-4 py-3 outline-none cursor-pointer pr-8",
                "data-ocid": "hero-state-select",
                "aria-label": lang === "hi" ? "राज्य चुनें" : "Select state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: lang === "hi" ? "सभी राज्य" : "All States" }),
                  INDIAN_STATES.map((state) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: state, children: state }, state))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                size: 14,
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "lg",
              className: "rounded-none px-6 font-semibold text-sm shrink-0 min-h-[48px]",
              "data-ocid": "hero-search-submit",
              children: lang === "hi" ? "खोजें" : "Find Services"
            }
          )
        ] })
      ]
    }
  );
}
const ONLINE_CLASSES_COLOR = "#8B5CF6";
function OnlineClassesStaticCard() {
  const { lang } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/services",
      search: {
        category: "online-classes",
        state: void 0,
        city: void 0,
        search: void 0,
        sort: void 0
      },
      className: "group block",
      "data-ocid": "category-card-online-classes",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative overflow-hidden rounded-xl border border-border bg-card p-5 h-full transition-smooth hover:shadow-elevated hover:-translate-y-0.5",
          style: { borderTopColor: ONLINE_CLASSES_COLOR, borderTopWidth: "3px" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110",
                style: { backgroundColor: `${ONLINE_CLASSES_COLOR}18` },
                children: "🎓"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug mb-1 truncate", children: lang === "hi" ? "ऑनलाइन कक्षाएं" : "Online Classes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: lang === "hi" ? "योग, ध्यान, फिटनेस, कोचिंग" : "Yoga, Dhyan, Fitness, Coaching" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-4 right-4 text-sm font-bold opacity-0 group-hover:opacity-100 transition-smooth",
                style: { color: ONLINE_CLASSES_COLOR },
                children: "→"
              }
            )
          ]
        }
      )
    }
  );
}
function HomePage() {
  const { lang, t } = useLanguage();
  const categoriesQuery = useCategories();
  const featuredQuery = useFeaturedProviders();
  const statsQuery = useAdminStats();
  const seedMutation = useSeedSampleData();
  useVisitorStats();
  const seededRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!seededRef.current && !categoriesQuery.isLoading && categoriesQuery.data !== void 0 && categoriesQuery.data.length === 0 && !seedMutation.isPending) {
      seededRef.current = true;
      seedMutation.mutate();
    }
  }, [categoriesQuery.isLoading, categoriesQuery.data, seedMutation]);
  const categories = categoriesQuery.data ?? [];
  const providers = featuredQuery.data ?? [];
  const stats = statsQuery.data;
  const statsDisplay = [
    {
      labelEn: "Verified Providers",
      labelHi: "सत्यापित प्रदाता",
      value: stats ? `${Number(stats.totalProviders).toLocaleString()}+` : "500+",
      Icon: Users
    },
    {
      labelEn: "Service Categories",
      labelHi: "सेवा श्रेणियां",
      value: stats ? `${Number(stats.totalCategories)}` : categories.length > 0 ? `${categories.length}` : "11",
      Icon: Building2
    },
    {
      labelEn: "Happy Users",
      labelHi: "खुश उपयोगकर्ता",
      value: "10,000+",
      Icon: MessageSquare
    },
    {
      labelEn: "Avg. Rating",
      labelHi: "औसत रेटिंग",
      value: "4.8 ⭐",
      Icon: Star
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden min-h-[90vh] flex items-center",
        style: {
          background: "linear-gradient(135deg, oklch(0.65 0.22 40) 0%, oklch(0.52 0.20 35) 40%, oklch(0.28 0.14 142) 100%)"
        },
        "data-ocid": "hero-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.08] pointer-events-none",
              style: {
                background: "radial-gradient(circle, white 0%, transparent 70%)",
                transform: "translate(30%, -30%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none",
              style: {
                background: "radial-gradient(circle, white 0%, transparent 70%)",
                transform: "translate(-30%, 30%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none text-white hidden lg:block",
              style: { fontSize: "320px", lineHeight: 1 },
              "aria-hidden": true,
              children: "☸"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 h-1.5 flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-white/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-secondary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🇮🇳" }),
                  lang === "hi" ? "भारत का #1 सेवा पोर्टल" : "India's #1 Services Portal"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h1,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.1 },
                className: "font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-3 text-balance",
                children: lang === "hi" ? "Indiahelpsarvice" : "Indiahelpsarvice"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.15 },
                className: "font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white/70 mb-5 text-balance",
                children: "Services Portal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                className: "text-lg sm:text-xl text-white/80 mb-10 max-w-xl leading-relaxed",
                children: lang === "hi" ? "सरकारी, कानूनी, चिकित्सा, वित्तीय और तकनीकी सेवाएं — एक ही जगह पर" : "Government, legal, medical, financial & tech services — all in one place"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.3 },
                className: "mb-8",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSearch, { categories })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4 },
                className: "flex flex-col sm:flex-row gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "text-base font-semibold px-8 min-h-[48px] bg-white text-primary hover:bg-white/90",
                      "data-ocid": "hero-cta-find",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                            t("hero.cta.primary"),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, className: "ml-2" })
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      className: "text-base font-semibold px-8 min-h-[48px] border-white/40 text-white hover:bg-white/15 bg-transparent",
                      "data-ocid": "hero-cta-provider",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/$action", params: { action: "register" }, children: t("hero.cta.secondary") })
                    }
                  )
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-10 border-b border-border",
        "data-ocid": "visitor-counter-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VisitorCounterWidget, {}) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border",
        "data-ocid": "stats-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10", children: statsDisplay.map((stat, i) => {
          const Icon = stat.Icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: "flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 22, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground leading-none", children: stat.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "hi" ? stat.labelHi : stat.labelEn })
                ] })
              ]
            },
            `stat-${stat.labelEn}`
          );
        }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-16 md:py-20",
        "data-ocid": "categories-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-3 uppercase tracking-widest", children: lang === "hi" ? "सभी सेवाएं" : "All Services" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-3", children: lang === "hi" ? "सेवा श्रेणियां" : "Service Categories" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: lang === "hi" ? "हर ज़रूरत के लिए सेवाएं — सरकारी से लेकर तकनीकी तक" : "Services for every need — government to technology" })
              ]
            }
          ),
          categoriesQuery.isLoading || seedMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4", children: [
            "cs1",
            "cs2",
            "cs3",
            "cs4",
            "cs5",
            "cs6",
            "cs7",
            "cs8",
            "cs9",
            "cs10",
            "cs11"
          ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategorySkeleton, {}, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4", children: [
            categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.96 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { delay: i * 0.05 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryCard, { category: cat })
              },
              `cat-${cat.id}`
            )),
            !categories.some(
              (c) => {
                var _a;
                return c.name.en.toLowerCase().includes("online") || ((_a = c.icon) == null ? void 0 : _a.toLowerCase().includes("online"));
              }
            ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.96 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { delay: categories.length * 0.05 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(OnlineClassesStaticCard, {})
              },
              "cat-online-classes-static"
            )
          ] }),
          categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              className: "text-center mt-10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  size: "lg",
                  className: "font-semibold px-8",
                  "data-ocid": "view-all-categories",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/categories", children: [
                    lang === "hi" ? "सभी श्रेणियां देखें" : "View All Categories",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-2" })
                  ] })
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-16 md:py-20",
        "data-ocid": "featured-providers-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold text-secondary bg-secondary/10 rounded-full px-4 py-1.5 mb-3 uppercase tracking-widest", children: lang === "hi" ? "शीर्ष रेटेड" : "Top Rated" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-2", children: lang === "hi" ? "विशेष प्रदाता" : "Top Rated Providers" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: lang === "hi" ? "उच्च रेटिंग वाले विश्वसनीय सेवा प्रदाता" : "Highly-rated, verified service providers across India" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    variant: "outline",
                    className: "shrink-0",
                    "data-ocid": "browse-all-providers",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                          lang === "hi" ? "सभी प्रदाता देखें" : "Browse All",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "ml-1.5" })
                        ]
                      }
                    )
                  }
                )
              ]
            }
          ),
          featuredQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: ["ps1", "ps2", "ps3", "ps4", "ps5", "ps6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderCardSkeleton, {}, k)) }) : providers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "no-providers-empty", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: lang === "hi" ? "अभी कोई प्रदाता उपलब्ध नहीं है।" : "No providers available yet. Be the first to register!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "register-as-provider", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/$action", params: { action: "register" }, children: t("hero.cta.secondary") }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: providers.slice(0, 6).map((provider, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { provider, categories })
            },
            `provider-${provider.id}`
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-16 md:py-20",
        "data-ocid": "how-it-works-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-3 uppercase tracking-widest", children: lang === "hi" ? "यह कैसे काम करता है" : "How It Works" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-3", children: lang === "hi" ? "तीन आसान चरणों में" : "Three Simple Steps" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: lang === "hi" ? "कुछ ही मिनटों में सही सेवा प्रदाता से जुड़ें।" : "Find and connect with the right service provider in minutes." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-10 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] h-px bg-border" }),
            HOW_IT_WORKS.map((step, i) => {
              const Icon = step.Icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.15 },
                  className: "relative z-10 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-card border-2 ${step.colorClass}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 32, className: step.iconClass })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `inline-block text-xs font-bold rounded-full px-3 py-1 mb-3 ${step.badgeClass}`,
                        children: lang === "hi" ? `चरण ${step.step}` : `Step ${step.step}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: lang === "hi" ? step.titleHi : step.titleEn }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto", children: lang === "hi" ? step.descHi : step.descEn })
                  ]
                },
                `step-${step.step}`
              );
            })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-16 md:py-20",
        "data-ocid": "testimonials-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-3", children: lang === "hi" ? "लोग क्या कहते हैं" : "What People Say" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: lang === "hi" ? "हमारे उपयोगकर्ताओं के वास्तविक अनुभव" : "Real experiences from our users across India" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: TESTIMONIALS.map((testimonial, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: "bg-card rounded-2xl p-6 border border-border shadow-card accent-stripe",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-4", children: [0, 1, 2, 3, 4].map((si) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 14,
                    className: "text-primary fill-primary"
                  },
                  `t${i}-s${si}`
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-sm leading-relaxed mb-4 italic", children: [
                  "“",
                  lang === "hi" ? testimonial.quoteHi : testimonial.quoteEn,
                  "”"
                ] }),
                lang === "en" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs leading-relaxed mb-5 text-hindi", children: [
                  "“",
                  testimonial.quoteHi,
                  "”"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm shrink-0", children: testimonial.avatar }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: lang === "hi" ? testimonial.nameHi : testimonial.nameEn }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "hi" ? testimonial.locationHi : testimonial.locationEn })
                  ] })
                ] })
              ]
            },
            `testimonial-${testimonial.avatar}`
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16 md:py-20", "data-ocid": "trust-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold text-secondary bg-secondary/10 rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest", children: lang === "hi" ? "हम पर भरोसा करें" : "Why Trust Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-5 text-balance", children: lang === "hi" ? "भारत का सबसे भरोसेमंद सेवा नेटवर्क" : "India's Most Trusted Service Network" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: lang === "hi" ? "हम हर प्रदाता की पूरी जांच करते हैं ताकि आपको सर्वोत्तम सेवा मिले।" : "Every provider is thoroughly vetted so you always receive the best service." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-8", children: TRUST_POINTS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.1 },
                className: "flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      size: 20,
                      className: "text-secondary shrink-0 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-sm", children: lang === "hi" ? item.hi : item.en })
                ]
              },
              `trust-${item.en.substring(0, 15)}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "lg",
                className: "font-semibold",
                "data-ocid": "trust-cta",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                      t("hero.cta.primary"),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-2" })
                    ]
                  }
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "grid grid-cols-2 gap-4",
          children: [
            {
              icon: "⭐",
              value: "4.8/5",
              labelEn: "Avg Rating",
              labelHi: "औसत रेटिंग",
              bgClass: "bg-primary/10",
              textClass: "text-primary"
            },
            {
              icon: "✅",
              value: "100%",
              labelEn: "Verified",
              labelHi: "सत्यापित",
              bgClass: "bg-secondary/10",
              textClass: "text-secondary"
            },
            {
              icon: "🌍",
              value: "500+",
              labelEn: "Cities Covered",
              labelHi: "शहर कवर",
              bgClass: "bg-secondary/10",
              textClass: "text-secondary"
            },
            {
              icon: "🏆",
              value: "#1",
              labelEn: "In India",
              labelHi: "भारत में",
              bgClass: "bg-primary/10",
              textClass: "text-primary"
            }
          ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `${card.bgClass} rounded-2xl p-6 text-center border border-border`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: card.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-display text-2xl font-bold ${card.textClass}`,
                    children: card.value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: lang === "hi" ? card.labelHi : card.labelEn })
              ]
            },
            `highlight-${card.value}`
          ))
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-16 md:py-20 relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, oklch(0.65 0.22 40) 0%, oklch(0.52 0.20 35) 60%, oklch(0.28 0.14 142) 100%)"
        },
        "data-ocid": "cta-banner-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.08] pointer-events-none",
              style: {
                background: "radial-gradient(circle, white 0%, transparent 70%)",
                transform: "translate(30%, -30%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 h-1 flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-white/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-secondary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 border border-white/20 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 32, className: "text-white" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-balance", children: lang === "hi" ? "आज ही प्रदाता के रूप में जुड़ें" : "Are You a Service Provider?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mb-1 text-hindi", children: lang === "en" && "क्या आप एक सेवा प्रदाता हैं?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-lg mb-8 max-w-xl mx-auto mt-4", children: lang === "hi" ? "लाखों लोगों तक अपनी सेवाएं पहुंचाएं। मुफ्त में रजिस्टर करें।" : "Reach millions of people across India with your services. Register for free today." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "bg-white text-primary hover:bg-white/90 font-semibold px-10 min-h-[52px] text-base",
                      "data-ocid": "cta-register-provider",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth/$action", params: { action: "register" }, children: [
                        lang === "hi" ? "अभी रजिस्टर करें" : "Register as Provider",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, className: "ml-2" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      className: "border-white/40 text-white hover:bg-white/15 bg-transparent font-semibold px-10 min-h-[52px] text-base",
                      "data-ocid": "cta-explore-services",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                          children: lang === "hi" ? "सेवाएं देखें" : "Explore Services"
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  HomePage as default
};

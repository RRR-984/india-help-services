import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  HandshakeIcon,
  MapPin,
  MessageSquare,
  Search,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/ui/CategoryCard";
import ServiceCard from "../components/ui/ServiceCard";
import {
  useAdminStats,
  useCategories,
  useFeaturedProviders,
  useSeedSampleData,
  useVisitorStats,
} from "../hooks/use-api";
import { useLanguage } from "../hooks/use-language";

// ─── Static content ────────────────────────────────────────────────────────

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
  "Puducherry",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    titleEn: "Search Services",
    titleHi: "सेवाएं खोजें",
    descEn:
      "Browse categories or search by location and service type across India.",
    descHi: "भारत भर में श्रेणी या स्थान से सेवाएं खोजें।",
    Icon: Search,
    colorClass: "bg-primary/10 border-primary/30",
    iconClass: "text-primary",
    badgeClass: "bg-primary/10 text-primary",
  },
  {
    step: "02",
    titleEn: "Connect with Providers",
    titleHi: "प्रदाताओं से जुड़ें",
    descEn:
      "View verified profiles, ratings, and reviews. Send a direct inquiry.",
    descHi: "सत्यापित प्रोफाइल, रेटिंग और समीक्षाएं देखें। सीधे पूछताछ भेजें।",
    Icon: HandshakeIcon,
    colorClass: "bg-secondary/10 border-secondary/30",
    iconClass: "text-secondary",
    badgeClass: "bg-secondary/10 text-secondary",
  },
  {
    step: "03",
    titleEn: "Get Expert Help",
    titleHi: "विशेषज्ञ सहायता पाएं",
    descEn:
      "Receive trusted assistance for any service need — fast and reliable.",
    descHi: "किसी भी सेवा के लिए विश्वसनीय सहायता प्राप्त करें — तेज़ और भरोसेमंद।",
    Icon: Zap,
    colorClass: "bg-primary/10 border-primary/30",
    iconClass: "text-primary",
    badgeClass: "bg-primary/10 text-primary",
  },
];

const TESTIMONIALS = [
  {
    nameEn: "Priya Sharma",
    nameHi: "प्रिया शर्मा",
    locationEn: "Delhi",
    locationHi: "दिल्ली",
    quoteEn:
      "Found an excellent legal advisor within minutes. The verification system gives me full confidence.",
    quoteHi:
      "कुछ ही मिनटों में एक उत्कृष्ट कानूनी सलाहकार मिला। सत्यापन प्रणाली मुझे पूरा विश्वास देती है।",
    avatar: "PS",
  },
  {
    nameEn: "Rajesh Kumar",
    nameHi: "राजेश कुमार",
    locationEn: "Mumbai",
    locationHi: "मुंबई",
    quoteEn:
      "As a service provider, this platform helped me reach thousands of new clients across Maharashtra.",
    quoteHi:
      "एक सेवा प्रदाता के रूप में, इस प्लेटफॉर्म ने मुझे महाराष्ट्र भर में हजारों नए ग्राहकों तक पहुंचने में मदद की।",
    avatar: "RK",
  },
  {
    nameEn: "Meera Patel",
    nameHi: "मीरा पटेल",
    locationEn: "Ahmedabad",
    locationHi: "अहमदाबाद",
    quoteEn:
      "The Hindi interface made it so easy to use. Got government document assistance quickly.",
    quoteHi:
      "हिंदी इंटरफेस ने इसे बहुत आसान बना दिया। सरकारी दस्तावेज़ सहायता जल्दी मिली।",
    avatar: "MP",
  },
];

const TRUST_POINTS = [
  {
    en: "Verified and background-checked providers",
    hi: "सत्यापित और जांचे गए प्रदाता",
  },
  {
    en: "Bilingual support in Hindi and English",
    hi: "हिंदी और अंग्रेजी में द्विभाषी सहायता",
  },
  {
    en: "Coverage across all 28 states and 8 UTs",
    hi: "सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों में कवरेज",
  },
  {
    en: "Transparent ratings and verified reviews",
    hi: "पारदर्शी रेटिंग और सत्यापित समीक्षाएं",
  },
];

// ─── Skeleton Components ───────────────────────────────────────────────────

function ProviderCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border">
      <div className="h-1 w-full bg-muted" />
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/5" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-8 flex-1 rounded-md" />
          <Skeleton className="h-8 flex-1 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

function CategorySkeleton() {
  return <Skeleton className="h-28 w-full rounded-xl" />;
}

// ─── Visitor Counter Widget ──────────────────────────────────────────────────

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-xl mx-auto"
      data-ocid="visitor-counter-widget"
    >
      <div
        className="rounded-2xl border border-primary/30 overflow-hidden shadow-elevated"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.03 55) 0%, oklch(0.98 0.02 70) 100%)",
        }}
      >
        {/* Header stripe */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-white/80" />
          <div className="flex-1 bg-secondary" />
        </div>

        <div className="px-6 py-5">
          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-xl" aria-hidden>
              🇮🇳
            </span>
            <h3 className="font-display text-base font-bold text-primary uppercase tracking-widest">
              {lang === "hi" ? headingHi : headingEn}
            </h3>
            <span className="text-xl" aria-hidden>
              🇮🇳
            </span>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Visits */}
            <div className="text-center bg-card rounded-xl p-4 border border-primary/20 shadow-card">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-2">
                <Users size={20} className="text-primary" />
              </div>
              {isLoading || totalVisits === null ? (
                <Skeleton className="h-8 w-20 mx-auto mb-1" />
              ) : (
                <p className="font-display text-3xl font-bold text-primary leading-none mb-1">
                  {totalVisits.toLocaleString("en-IN")}
                </p>
              )}
              <p className="text-xs font-semibold text-muted-foreground">
                {lang === "hi" ? totalHi : totalEn}
              </p>
            </div>

            {/* Unique Visitors */}
            <div className="text-center bg-card rounded-xl p-4 border border-secondary/20 shadow-card">
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-2">
                <BadgeCheck size={20} className="text-secondary" />
              </div>
              {isLoading || uniqueVisitors === null ? (
                <Skeleton className="h-8 w-20 mx-auto mb-1" />
              ) : (
                <p className="font-display text-3xl font-bold text-secondary leading-none mb-1">
                  {uniqueVisitors.toLocaleString("en-IN")}
                </p>
              )}
              <p className="text-xs font-semibold text-muted-foreground">
                {lang === "hi" ? uniqueHi : uniqueEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface HeroSearchProps {
  categories: Array<{ id: bigint; name: { en: string; hi: string } }>;
}

function HeroSearch({ categories }: HeroSearchProps) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/services",
      search: {
        category: selectedCategory || undefined,
        state: selectedState || undefined,
        city: undefined,
        search: query.trim() || undefined,
        sort: undefined,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-card rounded-2xl shadow-elevated border border-border/60 overflow-hidden"
      data-ocid="hero-search-form"
    >
      {/* Search input row */}
      <div className="flex items-center px-4 gap-2 border-b border-border/50">
        <Search size={18} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === "hi" ? "सेवा खोजें..." : "Search for a service..."}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm py-4 outline-none min-w-0"
          data-ocid="hero-search-input"
          aria-label={lang === "hi" ? "सेवा खोजें" : "Search services"}
        />
      </div>

      {/* Dropdowns + CTA row */}
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Category dropdown */}
        <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-border/50">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none bg-transparent text-sm text-foreground px-4 py-3 outline-none cursor-pointer pr-8"
            data-ocid="hero-category-select"
            aria-label={lang === "hi" ? "श्रेणी चुनें" : "Select category"}
          >
            <option value="">
              {lang === "hi" ? "सभी श्रेणियां" : "All Categories"}
            </option>
            {categories.map((cat) => (
              <option key={cat.id.toString()} value={cat.id.toString()}>
                {lang === "hi" ? cat.name.hi : cat.name.en}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>

        {/* State dropdown */}
        <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-border/50">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full appearance-none bg-transparent text-sm text-foreground px-4 py-3 outline-none cursor-pointer pr-8"
            data-ocid="hero-state-select"
            aria-label={lang === "hi" ? "राज्य चुनें" : "Select state"}
          >
            <option value="">
              {lang === "hi" ? "सभी राज्य" : "All States"}
            </option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          className="rounded-none px-6 font-semibold text-sm shrink-0 min-h-[48px]"
          data-ocid="hero-search-submit"
        >
          {lang === "hi" ? "खोजें" : "Find Services"}
        </Button>
      </div>
    </form>
  );
}

// ─── Online Classes Static Fallback Card ──────────────────────────────────────
// Shown when backend hasn't seeded the Online Classes category yet.
// Uses the purple #8B5CF6 accent to distinguish from saffron/green categories.

const ONLINE_CLASSES_COLOR = "#8B5CF6";

function OnlineClassesStaticCard() {
  const { lang } = useLanguage();
  return (
    <Link
      to="/services"
      search={{
        category: "online-classes",
        state: undefined,
        city: undefined,
        search: undefined,
        sort: undefined,
      }}
      className="group block"
      data-ocid="category-card-online-classes"
    >
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-card p-5 h-full transition-smooth hover:shadow-elevated hover:-translate-y-0.5"
        style={{ borderTopColor: ONLINE_CLASSES_COLOR, borderTopWidth: "3px" }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${ONLINE_CLASSES_COLOR}18` }}
        >
          🎓
        </div>
        {/* Name */}
        <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-1 truncate">
          {lang === "hi" ? "ऑनलाइन कक्षाएं" : "Online Classes"}
        </h3>
        {/* Sub-text */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {lang === "hi"
            ? "योग, ध्यान, फिटनेस, कोचिंग"
            : "Yoga, Dhyan, Fitness, Coaching"}
        </p>
        {/* Subtle arrow */}
        <div
          className="absolute top-4 right-4 text-sm font-bold opacity-0 group-hover:opacity-100 transition-smooth"
          style={{ color: ONLINE_CLASSES_COLOR }}
        >
          →
        </div>
      </div>
    </Link>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────

export default function HomePage() {
  const { lang, t } = useLanguage();

  const categoriesQuery = useCategories();
  const featuredQuery = useFeaturedProviders();
  const statsQuery = useAdminStats();
  const seedMutation = useSeedSampleData();
  useVisitorStats(); // track visit on mount, side-effect only
  const seededRef = useRef(false);

  useEffect(() => {
    if (
      !seededRef.current &&
      !categoriesQuery.isLoading &&
      categoriesQuery.data !== undefined &&
      categoriesQuery.data.length === 0 &&
      !seedMutation.isPending
    ) {
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
      value: stats
        ? `${Number(stats.totalProviders).toLocaleString()}+`
        : "500+",
      Icon: Users,
    },
    {
      labelEn: "Service Categories",
      labelHi: "सेवा श्रेणियां",
      value: stats
        ? `${Number(stats.totalCategories)}`
        : categories.length > 0
          ? `${categories.length}`
          : "11",
      Icon: Building2,
    },
    {
      labelEn: "Happy Users",
      labelHi: "खुश उपयोगकर्ता",
      value: "10,000+",
      Icon: MessageSquare,
    },
    {
      labelEn: "Avg. Rating",
      labelHi: "औसत रेटिंग",
      value: "4.8 ⭐",
      Icon: Star,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[90vh] flex items-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.22 40) 0%, oklch(0.52 0.20 35) 40%, oklch(0.28 0.14 142) 100%)",
        }}
        data-ocid="hero-section"
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.08] pointer-events-none"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
        {/* Ashoka Chakra watermark */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none text-white hidden lg:block"
          style={{ fontSize: "320px", lineHeight: 1 }}
          aria-hidden
        >
          ☸
        </div>
        {/* Tricolor bottom stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-white/60" />
          <div className="flex-1 bg-secondary" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                <span className="text-base">🇮🇳</span>
                {lang === "hi"
                  ? "भारत का #1 सेवा पोर्टल"
                  : "India's #1 Services Portal"}
              </span>
            </motion.div>

            {/* Bilingual headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-3 text-balance"
            >
              {lang === "hi" ? "Indiahelpsarvice" : "Indiahelpsarvice"}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white/70 mb-5 text-balance"
            >
              {"Services Portal"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl leading-relaxed"
            >
              {lang === "hi"
                ? "सरकारी, कानूनी, चिकित्सा, वित्तीय और तकनीकी सेवाएं — एक ही जगह पर"
                : "Government, legal, medical, financial & tech services — all in one place"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <HeroSearch categories={categories} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                asChild
                size="lg"
                className="text-base font-semibold px-8 min-h-[48px] bg-white text-primary hover:bg-white/90"
                data-ocid="hero-cta-find"
              >
                <Link
                  to="/services"
                  search={{
                    category: undefined,
                    state: undefined,
                    city: undefined,
                    search: undefined,
                    sort: undefined,
                  }}
                >
                  {t("hero.cta.primary")}
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base font-semibold px-8 min-h-[48px] border-white/40 text-white hover:bg-white/15 bg-transparent"
                data-ocid="hero-cta-provider"
              >
                <Link to="/auth/$action" params={{ action: "register" }}>
                  {t("hero.cta.secondary")}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Visitor Counter ────────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-10 border-b border-border"
        data-ocid="visitor-counter-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VisitorCounterWidget />
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <section
        className="bg-card border-b border-border"
        data-ocid="stats-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {statsDisplay.map((stat, i) => {
              const Icon = stat.Icon;
              return (
                <motion.div
                  key={`stat-${stat.labelEn}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lang === "hi" ? stat.labelHi : stat.labelEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-16 md:py-20"
        data-ocid="categories-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-3 uppercase tracking-widest">
              {lang === "hi" ? "सभी सेवाएं" : "All Services"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {lang === "hi" ? "सेवा श्रेणियां" : "Service Categories"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {lang === "hi"
                ? "हर ज़रूरत के लिए सेवाएं — सरकारी से लेकर तकनीकी तक"
                : "Services for every need — government to technology"}
            </p>
          </motion.div>

          {categoriesQuery.isLoading || seedMutation.isPending ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
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
                "cs11",
              ].map((k) => (
                <CategorySkeleton key={k} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Render all backend categories */}
              {categories.map((cat, i) => (
                <motion.div
                  key={`cat-${cat.id}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CategoryCard category={cat} />
                </motion.div>
              ))}

              {/* Static Online Classes card — shown when backend hasn't seeded it yet */}
              {!categories.some(
                (c) =>
                  c.name.en.toLowerCase().includes("online") ||
                  c.icon?.toLowerCase().includes("online"),
              ) && (
                <motion.div
                  key="cat-online-classes-static"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: categories.length * 0.05 }}
                >
                  <OnlineClassesStaticCard />
                </motion.div>
              )}
            </div>
          )}

          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold px-8"
                data-ocid="view-all-categories"
              >
                <Link to="/categories">
                  {lang === "hi" ? "सभी श्रेणियां देखें" : "View All Categories"}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Featured Providers ─────────────────────────────────────────────── */}
      <section
        className="bg-background py-16 md:py-20"
        data-ocid="featured-providers-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 rounded-full px-4 py-1.5 mb-3 uppercase tracking-widest">
                {lang === "hi" ? "शीर्ष रेटेड" : "Top Rated"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {lang === "hi" ? "विशेष प्रदाता" : "Top Rated Providers"}
              </h2>
              <p className="text-muted-foreground">
                {lang === "hi"
                  ? "उच्च रेटिंग वाले विश्वसनीय सेवा प्रदाता"
                  : "Highly-rated, verified service providers across India"}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="shrink-0"
              data-ocid="browse-all-providers"
            >
              <Link
                to="/services"
                search={{
                  category: undefined,
                  state: undefined,
                  city: undefined,
                  search: undefined,
                  sort: undefined,
                }}
              >
                {lang === "hi" ? "सभी प्रदाता देखें" : "Browse All"}
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </motion.div>

          {featuredQuery.isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["ps1", "ps2", "ps3", "ps4", "ps5", "ps6"].map((k) => (
                <ProviderCardSkeleton key={k} />
              ))}
            </div>
          ) : providers.length === 0 ? (
            <div className="text-center py-16" data-ocid="no-providers-empty">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-muted-foreground mb-4">
                {lang === "hi"
                  ? "अभी कोई प्रदाता उपलब्ध नहीं है।"
                  : "No providers available yet. Be the first to register!"}
              </p>
              <Button asChild data-ocid="register-as-provider">
                <Link to="/auth/$action" params={{ action: "register" }}>
                  {t("hero.cta.secondary")}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.slice(0, 6).map((provider, i) => (
                <motion.div
                  key={`provider-${provider.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ServiceCard provider={provider} categories={categories} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-16 md:py-20"
        data-ocid="how-it-works-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-3 uppercase tracking-widest">
              {lang === "hi" ? "यह कैसे काम करता है" : "How It Works"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {lang === "hi" ? "तीन आसान चरणों में" : "Three Simple Steps"}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {lang === "hi"
                ? "कुछ ही मिनटों में सही सेवा प्रदाता से जुड़ें।"
                : "Find and connect with the right service provider in minutes."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] h-px bg-border" />
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.Icon;
              return (
                <motion.div
                  key={`step-${step.step}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative z-10 text-center"
                >
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-card border-2 ${step.colorClass}`}
                  >
                    <Icon size={32} className={step.iconClass} />
                  </div>
                  <div
                    className={`inline-block text-xs font-bold rounded-full px-3 py-1 mb-3 ${step.badgeClass}`}
                  >
                    {lang === "hi" ? `चरण ${step.step}` : `Step ${step.step}`}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {lang === "hi" ? step.titleHi : step.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {lang === "hi" ? step.descHi : step.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section
        className="bg-background py-16 md:py-20"
        data-ocid="testimonials-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {lang === "hi" ? "लोग क्या कहते हैं" : "What People Say"}
            </h2>
            <p className="text-muted-foreground">
              {lang === "hi"
                ? "हमारे उपयोगकर्ताओं के वास्तविक अनुभव"
                : "Real experiences from our users across India"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={`testimonial-${testimonial.avatar}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card accent-stripe"
              >
                <div className="flex gap-0.5 mb-4">
                  {[0, 1, 2, 3, 4].map((si) => (
                    <Star
                      key={`t${i}-s${si}`}
                      size={14}
                      className="text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4 italic">
                  &ldquo;
                  {lang === "hi" ? testimonial.quoteHi : testimonial.quoteEn}
                  &rdquo;
                </p>
                {/* Bilingual secondary text */}
                {lang === "en" && (
                  <p className="text-muted-foreground text-xs leading-relaxed mb-5 text-hindi">
                    &ldquo;{testimonial.quoteHi}&rdquo;
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {lang === "hi" ? testimonial.nameHi : testimonial.nameEn}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "hi"
                        ? testimonial.locationHi
                        : testimonial.locationEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Trust Us ──────────────────────────────────────────────────── */}
      <section className="bg-muted/30 py-16 md:py-20" data-ocid="trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
                {lang === "hi" ? "हम पर भरोसा करें" : "Why Trust Us"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 text-balance">
                {lang === "hi"
                  ? "भारत का सबसे भरोसेमंद सेवा नेटवर्क"
                  : "India's Most Trusted Service Network"}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {lang === "hi"
                  ? "हम हर प्रदाता की पूरी जांच करते हैं ताकि आपको सर्वोत्तम सेवा मिले।"
                  : "Every provider is thoroughly vetted so you always receive the best service."}
              </p>
              <div className="space-y-3 mb-8">
                {TRUST_POINTS.map((item, i) => (
                  <motion.div
                    key={`trust-${item.en.substring(0, 15)}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-secondary shrink-0 mt-0.5"
                    />
                    <span className="text-foreground text-sm">
                      {lang === "hi" ? item.hi : item.en}
                    </span>
                  </motion.div>
                ))}
              </div>
              <Button
                asChild
                size="lg"
                className="font-semibold"
                data-ocid="trust-cta"
              >
                <Link
                  to="/services"
                  search={{
                    category: undefined,
                    state: undefined,
                    city: undefined,
                    search: undefined,
                    sort: undefined,
                  }}
                >
                  {t("hero.cta.primary")}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: "⭐",
                  value: "4.8/5",
                  labelEn: "Avg Rating",
                  labelHi: "औसत रेटिंग",
                  bgClass: "bg-primary/10",
                  textClass: "text-primary",
                },
                {
                  icon: "✅",
                  value: "100%",
                  labelEn: "Verified",
                  labelHi: "सत्यापित",
                  bgClass: "bg-secondary/10",
                  textClass: "text-secondary",
                },
                {
                  icon: "🌍",
                  value: "500+",
                  labelEn: "Cities Covered",
                  labelHi: "शहर कवर",
                  bgClass: "bg-secondary/10",
                  textClass: "text-secondary",
                },
                {
                  icon: "🏆",
                  value: "#1",
                  labelEn: "In India",
                  labelHi: "भारत में",
                  bgClass: "bg-primary/10",
                  textClass: "text-primary",
                },
              ].map((card) => (
                <div
                  key={`highlight-${card.value}`}
                  className={`${card.bgClass} rounded-2xl p-6 text-center border border-border`}
                >
                  <div className="text-3xl mb-2">{card.icon}</div>
                  <p
                    className={`font-display text-2xl font-bold ${card.textClass}`}
                  >
                    {card.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {lang === "hi" ? card.labelHi : card.labelEn}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Provider CTA Banner ────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.22 40) 0%, oklch(0.52 0.20 35) 60%, oklch(0.28 0.14 142) 100%)",
        }}
        data-ocid="cta-banner-section"
      >
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.08] pointer-events-none"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-white/50" />
          <div className="flex-1 bg-secondary" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 border border-white/20 mb-5">
              <BadgeCheck size={32} className="text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-balance">
              {lang === "hi"
                ? "आज ही प्रदाता के रूप में जुड़ें"
                : "Are You a Service Provider?"}
            </h2>
            <p className="text-white/70 text-sm mb-1 text-hindi">
              {lang === "en" && "क्या आप एक सेवा प्रदाता हैं?"}
            </p>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto mt-4">
              {lang === "hi"
                ? "लाखों लोगों तक अपनी सेवाएं पहुंचाएं। मुफ्त में रजिस्टर करें।"
                : "Reach millions of people across India with your services. Register for free today."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-10 min-h-[52px] text-base"
                data-ocid="cta-register-provider"
              >
                <Link to="/auth/$action" params={{ action: "register" }}>
                  {lang === "hi" ? "अभी रजिस्टर करें" : "Register as Provider"}
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/15 bg-transparent font-semibold px-10 min-h-[52px] text-base"
                data-ocid="cta-explore-services"
              >
                <Link
                  to="/services"
                  search={{
                    category: undefined,
                    state: undefined,
                    city: undefined,
                    search: undefined,
                    sort: undefined,
                  }}
                >
                  {lang === "hi" ? "सेवाएं देखें" : "Explore Services"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

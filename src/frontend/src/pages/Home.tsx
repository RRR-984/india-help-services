import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
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
import { ErrorMessage, LoadingSpinner } from "../components/ui/LoadingSpinner";
import ServiceCard from "../components/ui/ServiceCard";
import {
  useAdminStats,
  useCategories,
  useProviders,
  useSeedSampleData,
} from "../hooks/use-api";
import { useLanguage } from "../hooks/use-language";

// ─── Static content ───────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "01",
    titleEn: "Search Services",
    titleHi: "सेवाएं खोजें",
    descEn:
      "Browse categories or search by location and service type across India.",
    descHi: "भारत भर में श्रेणी या स्थान से सेवाएं खोजें।",
    Icon: Search,
    color: "#FF9933",
  },
  {
    step: "02",
    titleEn: "Connect with Providers",
    titleHi: "प्रदाताओं से जुड़ें",
    descEn:
      "View verified profiles, ratings, and reviews. Send a direct inquiry.",
    descHi: "सत्यापित प्रोफाइल, रेटिंग और समीक्षाएं देखें। सीधे पूछताछ भेजें।",
    Icon: HandshakeIcon,
    color: "#138808",
  },
  {
    step: "03",
    titleEn: "Get Expert Help",
    titleHi: "विशेषज्ञ सहायता पाएं",
    descEn:
      "Receive trusted assistance for any service need — fast and reliable.",
    descHi: "किसी भी सेवा के लिए विश्वसनीय सहायता प्राप्त करें — तेज़ और भरोसेमंद।",
    Icon: Zap,
    color: "#FF9933",
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

// ─── Hero Search ──────────────────────────────────────────────────────────────

function HeroSearch() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/services",
      search: {
        category: undefined,
        state: undefined,
        city: undefined,
        search: query.trim() || undefined,
        sort: undefined,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl rounded-2xl overflow-hidden shadow-elevated border border-border/60 bg-card"
    >
      <div className="flex-1 flex items-center px-4 gap-2 min-w-0">
        <Search size={18} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("hero.search.placeholder")}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm py-4 outline-none min-w-0"
          data-ocid="hero-search-input"
          aria-label={t("hero.search.placeholder")}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="rounded-none rounded-r-2xl px-6 font-semibold shrink-0"
        data-ocid="hero-search-submit"
      >
        {t("common.search")}
      </Button>
    </form>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { lang, t } = useLanguage();

  const categoriesQuery = useCategories();
  const featuredQuery = useProviders(
    { categoryId: undefined, state: undefined, city: undefined },
    BigInt(0),
    BigInt(6),
  );
  const statsQuery = useAdminStats();
  const seedMutation = useSeedSampleData();
  const seededRef = useRef(false);

  // Seed sample data on first load if no categories exist
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
  const providers = featuredQuery.data?.items ?? [];
  const stats = statsQuery.data;

  const statsDisplay = [
    {
      labelEn: "Verified Providers",
      labelHi: "सत्यापित प्रदाता",
      value: stats
        ? `${Number(stats.totalProviders).toLocaleString()}+`
        : "2,800+",
      Icon: Users,
    },
    {
      labelEn: "Service Categories",
      labelHi: "सेवा श्रेणियां",
      value: stats ? `${Number(stats.totalCategories)}+` : "10+",
      Icon: Building2,
    },
    {
      labelEn: "Cities Covered",
      labelHi: "शहर कवर",
      value: "500+",
      Icon: MapPin,
    },
    {
      labelEn: "Inquiries Answered",
      labelHi: "पूछताछ उत्तर",
      value: stats
        ? `${Number(stats.totalInquiries).toLocaleString()}+`
        : "18,000+",
      Icon: MessageSquare,
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
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.08] pointer-events-none"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
        {/* Tricolor bottom stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1" style={{ background: "#FF9933" }} />
          <div className="flex-1 bg-white/60" />
          <div className="flex-1" style={{ background: "#138808" }} />
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

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-5 text-balance"
            >
              {lang === "hi" ? (
                <>
                  भारत सहायता <span className="text-white/75">सेवाएं</span>
                </>
              ) : (
                <>
                  India Help <span className="text-white/75">Services</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <HeroSearch />
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

      {/* ── Stats Banner ──────────────────────────────────────────────────── */}
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

      {/* ── Categories ────────────────────────────────────────────────────── */}
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
              {t("categories.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("categories.subtitle")}
            </p>
          </motion.div>

          {categoriesQuery.isLoading || seedMutation.isPending ? (
            <LoadingSpinner size="lg" />
          ) : categoriesQuery.isError ? (
            <ErrorMessage onRetry={() => categoriesQuery.refetch()} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.slice(0, 10).map((cat, i) => (
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
                  {t("categories.viewAll")}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Featured Providers ────────────────────────────────────────────── */}
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
                {lang === "hi" ? "विशेष प्रदाता" : "Featured Providers"}
              </h2>
              <p className="text-muted-foreground">
                {lang === "hi"
                  ? "उच्च रेटिंग वाले विश्वसनीय सेवा प्रदाता"
                  : "Highly-rated, trusted service providers across India"}
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
            <LoadingSpinner size="lg" />
          ) : featuredQuery.isError ? (
            <ErrorMessage onRetry={() => featuredQuery.refetch()} />
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

      {/* ── How It Works ──────────────────────────────────────────────────── */}
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
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-card"
                    style={{
                      backgroundColor: `${step.color}22`,
                      border: `2px solid ${step.color}40`,
                    }}
                  >
                    <Icon size={32} style={{ color: step.color }} />
                  </div>
                  <div
                    className="inline-block text-xs font-bold rounded-full px-3 py-1 mb-3"
                    style={{
                      backgroundColor: `${step.color}18`,
                      color: step.color,
                    }}
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

      {/* ── Why Trust Us ──────────────────────────────────────────────────── */}
      <section
        className="bg-background py-16 md:py-20"
        data-ocid="trust-section"
      >
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

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-16 md:py-20"
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
                className="bg-card rounded-2xl p-6 border border-border shadow-card"
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
                <p className="text-foreground text-sm leading-relaxed mb-5 italic">
                  &ldquo;
                  {lang === "hi" ? testimonial.quoteHi : testimonial.quoteEn}
                  &rdquo;
                </p>
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

      {/* ── Provider CTA Banner ───────────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.28 0.14 142) 0%, oklch(0.22 0.12 142) 100%)",
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
          <div className="flex-1" style={{ background: "#FF9933" }} />
          <div className="flex-1 bg-white/50" />
          <div className="flex-1" style={{ background: "#138808" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-5">🚀</div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              {lang === "hi"
                ? "आज ही प्रदाता के रूप में जुड़ें"
                : "Join as a Provider Today"}
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
              {lang === "hi"
                ? "लाखों लोगों तक अपनी सेवाएं पहुंचाएं। मुफ्त में रजिस्टर करें।"
                : "Reach millions of people across India with your services. Register for free."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-secondary hover:bg-white/90 font-semibold px-10 min-h-[52px] text-base"
                data-ocid="cta-register-provider"
              >
                <Link to="/auth/$action" params={{ action: "register" }}>
                  {t("hero.cta.secondary")}
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

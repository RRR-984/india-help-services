import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCategories, useProviders } from "../hooks/use-api";
import { useLanguage } from "../hooks/use-language";
import type { Category } from "../types";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconEmoji: Record<string, string> = {
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
  agriculture: "🌾",
};

function getEmoji(icon: string): string {
  const lower = icon.toLowerCase().replace(/[^a-z_]/g, "");
  return iconEmoji[lower] ?? "🔧";
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
          key={i}
          className="rounded-xl border border-border bg-card p-5 space-y-3"
        >
          <Skeleton className="h-14 w-14 rounded-xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// ─── Category card with provider count ───────────────────────────────────────

interface EnhancedCategoryCardProps {
  category: Category;
  providerCount: number;
  index: number;
}

function EnhancedCategoryCard({
  category,
  providerCount,
  index,
}: EnhancedCategoryCardProps) {
  const { lang } = useLanguage();

  const nameEn = category.name.en;
  const nameHi = category.name.hi;
  const descEn = category.description.en;
  const descHi = category.description.hi;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
    >
      <Link
        to="/services"
        search={{
          category: category.id.toString(),
          state: undefined,
          city: undefined,
          search: undefined,
          sort: undefined,
        }}
        className="group block h-full"
        data-ocid={`category-card-${category.id}`}
      >
        <div
          className="relative overflow-hidden rounded-xl border border-border bg-card p-5 h-full flex flex-col gap-3 transition-all duration-300 group-hover:shadow-elevated group-hover:border-primary/30"
          style={{ borderTopColor: category.color, borderTopWidth: "3px" }}
        >
          {/* Saffron hover glow */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-300 pointer-events-none rounded-xl" />

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 shrink-0"
            style={{ backgroundColor: `${category.color}18` }}
          >
            {getEmoji(category.icon)}
          </div>

          {/* Bilingual names */}
          <div className="space-y-0.5">
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug">
              {nameEn}
            </h3>
            <p className="text-xs text-muted-foreground text-hindi leading-snug">
              {nameHi}
            </p>
          </div>

          {/* Bilingual descriptions */}
          <div className="flex-1 space-y-1">
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {lang === "hi" ? descHi : descEn}
            </p>
          </div>

          {/* Provider count badge */}
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className="text-xs font-medium px-2.5 py-0.5"
              style={{
                background: `${category.color}18`,
                color: category.color,
                border: `1px solid ${category.color}30`,
              }}
            >
              {providerCount}{" "}
              {lang === "hi"
                ? "प्रदाता"
                : providerCount === 1
                  ? "provider"
                  : "providers"}
            </Badge>

            {/* Arrow */}
            <span
              className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
              style={{ color: category.color }}
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoriesPage() {
  const { t, lang } = useLanguage();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Load all providers once to compute per-category counts
  const { data: allProvidersPage, isLoading: providersLoading } = useProviders(
    {},
    0n,
    200n,
  );

  const isLoading = categoriesLoading || providersLoading;

  // Build a map of categoryId → provider count
  const providerCountMap = new Map<string, number>();
  if (allProvidersPage?.items) {
    for (const p of allProvidersPage.items) {
      for (const catId of p.categoryIds) {
        const key = catId.toString();
        providerCountMap.set(key, (providerCountMap.get(key) ?? 0) + 1);
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3">
            {/* Tricolor stripe accent */}
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 rounded-full gradient-tricolor border border-border" />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-display font-bold text-foreground"
            >
              {t("categories.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              {lang === "hi"
                ? "विश्वसनीय सेवाओं के लिए द्विभाषी (हिंदी/अंग्रेजी) सहायता"
                : t("categories.subtitle")}
            </motion.p>

            {/* Live stats strip */}
            {!isLoading && categories && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-6 pt-2"
              >
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-primary">
                    {categories.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lang === "hi" ? "श्रेणियां" : "Categories"}
                  </p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-secondary">
                    {allProvidersPage?.items.length ?? 0}+
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lang === "hi" ? "प्रदाता" : "Providers"}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Category grid ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {isLoading ? (
          <CategoriesSkeleton />
        ) : (categories ?? []).length === 0 ? (
          <div className="empty-state" data-ocid="categories-empty">
            <div className="empty-state-icon">📂</div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">
              {lang === "hi" ? "कोई श्रेणी नहीं मिली" : "No categories found"}
            </h2>
            <p className="empty-state-text">
              {lang === "hi"
                ? "अभी श्रेणियां उपलब्ध नहीं हैं। बाद में पुनः प्रयास करें।"
                : "No categories are available yet. Please check back later."}
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5"
            data-ocid="categories-grid"
          >
            {(categories ?? []).map((cat, i) => (
              <EnhancedCategoryCard
                key={cat.id.toString()}
                category={cat}
                providerCount={providerCountMap.get(cat.id.toString()) ?? 0}
                index={i}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      {!isLoading && (categories ?? []).length > 0 && (
        <section className="bg-muted/30 border-t border-border py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              {lang === "hi"
                ? "अपनी जरूरत की सेवा नहीं मिली?"
                : "Can't find what you're looking for?"}
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              {lang === "hi"
                ? "सभी प्रदाता ब्राउज़ करें या खोज करें"
                : "Browse all providers or search by name"}
            </p>
            <Link
              to="/services"
              search={{
                category: undefined,
                state: undefined,
                city: undefined,
                search: undefined,
                sort: undefined,
              }}
              data-ocid="browse-all-services"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                {lang === "hi" ? "सभी सेवाएं देखें" : "Browse All Services"} →
              </span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

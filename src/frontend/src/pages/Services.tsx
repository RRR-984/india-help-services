import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowDownAZ,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  MapPin,
  Search,
  Star,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import FilterSidebar from "../components/ui/FilterSidebar";
import SearchBar from "../components/ui/SearchBar";
import ServiceCard from "../components/ui/ServiceCard";
import { useCategories, useProviders } from "../hooks/use-api";
import { useLanguage } from "../hooks/use-language";
import type { FilterState } from "../types";

const PAGE_SIZE = BigInt(12);

type SortOption = "rating" | "newest" | "reviews";

// ─── Filter Chip ─────────────────────────────────────────────────────────────

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 transition-smooth cursor-default"
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="ml-0.5 hover:text-primary/70 transition-colors"
      >
        <X size={11} />
      </button>
    </Badge>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Tricolor accent top */}
      <div className="flex h-1 w-full">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 bg-secondary" />
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1 rounded-md" />
          <Skeleton className="h-8 flex-1 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({
  onReset,
  hasFilters,
}: {
  onReset: () => void;
  hasFilters: boolean;
}) {
  const { lang } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center gap-6 rounded-2xl border border-dashed border-border bg-muted/20"
      data-ocid="no-results"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <Search size={32} className="text-muted-foreground/60" />
        </div>
        {hasFilters && (
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
            <X size={12} className="text-primary" />
          </div>
        )}
      </div>
      <div className="space-y-1.5 max-w-xs">
        <p className="text-lg font-semibold font-display text-foreground">
          {lang === "hi" ? "कोई प्रदाता नहीं मिला" : "No providers found"}
        </p>
        <p className="text-sm text-muted-foreground">
          {hasFilters
            ? lang === "hi"
              ? "अलग फ़िल्टर आज़माएं या सभी फ़िल्टर हटाएं।"
              : "Try different filters or clear all to see all providers."
            : lang === "hi"
              ? "अभी कोई सेवा प्रदाता उपलब्ध नहीं है।"
              : "No service providers are available right now."}
        </p>
      </div>
      {hasFilters && (
        <Button
          variant="outline"
          onClick={onReset}
          className="gap-2"
          data-ocid="empty-state-reset"
        >
          <X size={14} />
          {lang === "hi" ? "सभी फ़िल्टर हटाएं" : "Clear all filters"}
        </Button>
      )}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate({ from: "/services" });
  const search = useSearch({ from: "/services" });

  const [filters, setFilters] = useState<FilterState>({
    categoryId: search.category ? BigInt(search.category) : undefined,
    state: search.state ?? undefined,
    city: search.city ?? undefined,
    search: (search as Record<string, string>).search ?? undefined,
  });
  const [sort, setSort] = useState<SortOption>(
    ((search as Record<string, string>).sort as SortOption) ?? "rating",
  );
  const [page, setPage] = useState(BigInt(0));

  const { data: categories } = useCategories();

  const {
    data: providersPage,
    isLoading,
    isError,
    refetch,
  } = useProviders(
    {
      categoryId: filters.categoryId,
      state: filters.state,
      city: filters.city,
    },
    page,
    PAGE_SIZE,
  );

  const totalPages = providersPage
    ? Math.ceil(Number(providersPage.total) / Number(PAGE_SIZE))
    : 0;

  // Sync filters → URL params
  useEffect(() => {
    void navigate({
      search: (prev: Record<string, string | undefined>) => ({
        ...prev,
        category: filters.categoryId?.toString(),
        state: filters.state,
        city: filters.city,
        search: filters.search || undefined,
        sort: sort !== "rating" ? sort : undefined,
      }),
      replace: true,
    });
  }, [filters, sort, navigate]);

  const handleFilterChange = useCallback((next: FilterState) => {
    setFilters(next);
    setPage(BigInt(0));
  }, []);

  const handleReset = useCallback(() => {
    setFilters({});
    setSort("rating");
    setPage(BigInt(0));
  }, []);

  // Client-side sort + search + filter
  const displayItems = (() => {
    if (!providersPage?.items) return [];
    let items = [...providersPage.items];

    // text search
    if (filters.search?.trim()) {
      const q = filters.search.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.businessName.toLowerCase().includes(q) ||
          p.ownerName.toLowerCase().includes(q),
      );
    }

    // min rating filter
    if (filters.minRating && filters.minRating > 1) {
      items = items.filter((p) => p.averageRating >= (filters.minRating ?? 1));
    }

    // verified only
    if (filters.isVerified) {
      items = items.filter((p) => p.isVerified);
    }

    // sort
    if (sort === "rating") {
      items.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sort === "reviews") {
      items.sort((a, b) => Number(b.reviewCount) - Number(a.reviewCount));
    } else {
      items.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
    }

    return items;
  })();

  // Active filter chips
  const activeChips: { key: string; label: string; onRemove: () => void }[] =
    [];

  if (filters.categoryId !== undefined) {
    const cat = categories?.find((c) => c.id === filters.categoryId);
    const label = cat
      ? lang === "hi"
        ? cat.name.hi
        : cat.name.en
      : `#${filters.categoryId}`;
    activeChips.push({
      key: "category",
      label,
      onRemove: () => handleFilterChange({ ...filters, categoryId: undefined }),
    });
  }
  if (filters.state) {
    activeChips.push({
      key: "state",
      label: filters.state,
      onRemove: () =>
        handleFilterChange({ ...filters, state: undefined, city: undefined }),
    });
  }
  if (filters.city) {
    activeChips.push({
      key: "city",
      label: filters.city,
      onRemove: () => handleFilterChange({ ...filters, city: undefined }),
    });
  }
  if (filters.search) {
    activeChips.push({
      key: "search",
      label: `"${filters.search}"`,
      onRemove: () => handleFilterChange({ ...filters, search: undefined }),
    });
  }
  if (filters.minRating && filters.minRating > 1) {
    activeChips.push({
      key: "minRating",
      label: `${filters.minRating}★+`,
      onRemove: () => handleFilterChange({ ...filters, minRating: undefined }),
    });
  }
  if (filters.isVerified) {
    activeChips.push({
      key: "verified",
      label: lang === "hi" ? "सत्यापित" : "Verified",
      onRemove: () => handleFilterChange({ ...filters, isVerified: undefined }),
    });
  }

  const resultCount = filters.search?.trim()
    ? displayItems.length
    : providersPage
      ? Number(providersPage.total)
      : 0;

  const hasFilters = activeChips.length > 0;

  const sortLabels: Record<SortOption, [string, string]> = {
    rating: ["By Rating", "रेटिंग के अनुसार"],
    newest: ["Newest First", "नवीनतम पहले"],
    reviews: ["Most Reviewed", "सर्वाधिक समीक्षित"],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ───────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-0.5">
                {lang === "hi" ? "सेवा प्रदाता खोजें" : "Find Service Providers"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {lang === "hi"
                  ? "भारत भर में विश्वसनीय पेशेवर सेवाएं"
                  : "Trusted professional services across India"}
              </p>
            </div>
            {providersPage && !isLoading && (
              <div className="flex items-center gap-1.5 bg-primary/8 px-3 py-1.5 rounded-lg border border-primary/20 self-start mt-1">
                <LayoutGrid size={14} className="text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {resultCount} {lang === "hi" ? "प्रदाता" : "providers"}
                </span>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div className="max-w-xl">
            <SearchBar
              value={filters.search ?? ""}
              onChange={(val) =>
                handleFilterChange({
                  ...filters,
                  search: val || undefined,
                })
              }
              placeholder={
                lang === "hi"
                  ? "नाम, व्यवसाय से खोजें..."
                  : "Search by name, business..."
              }
              size="lg"
              data-ocid="services-search"
            />
          </div>
        </div>
      </section>

      {/* ── Active Filter Chips + Sort bar ────────────────────────────── */}
      {(hasFilters || providersPage) && (
        <div className="border-b border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3 flex-wrap">
            {/* Chips row */}
            <div
              className="flex items-center gap-2 flex-wrap flex-1 min-w-0"
              data-ocid="active-filter-chips"
            >
              {activeChips.map((chip) => (
                <FilterChip
                  key={chip.key}
                  label={chip.label}
                  onRemove={chip.onRemove}
                />
              ))}
              {activeChips.length > 1 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2 transition-colors"
                  data-ocid="clear-all-filters"
                >
                  {lang === "hi" ? "सभी हटाएं" : "Clear all"}
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowDownAZ
                size={14}
                className="text-muted-foreground hidden sm:block"
              />
              <Select
                value={sort}
                onValueChange={(v) => {
                  setSort(v as SortOption);
                  setPage(BigInt(0));
                }}
              >
                <SelectTrigger
                  className="h-8 text-xs w-40 border-input bg-background"
                  data-ocid="sort-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["rating", "newest", "reviews"] as SortOption[]).map(
                    (opt) => (
                      <SelectItem key={opt} value={opt} className="text-xs">
                        <span className="flex items-center gap-1.5">
                          {opt === "rating" && (
                            <Star size={11} className="text-primary" />
                          )}
                          {opt === "newest" && (
                            <span className="text-[10px]">🆕</span>
                          )}
                          {opt === "reviews" && (
                            <BadgeCheck size={11} className="text-secondary" />
                          )}
                          {lang === "hi"
                            ? sortLabels[opt][1]
                            : sortLabels[opt][0]}
                        </span>
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 items-start">
          {/* Filter sidebar */}
          <FilterSidebar
            filters={filters}
            categories={categories ?? []}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />

          {/* Results panel */}
          <div className="flex-1 min-w-0">
            {/* Mobile top bar */}
            <div className="flex items-center justify-between lg:hidden mb-5 gap-3">
              <FilterSidebar
                filters={filters}
                categories={categories ?? []}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
              <div className="flex items-center gap-2 ml-auto">
                <Select
                  value={sort}
                  onValueChange={(v) => {
                    setSort(v as SortOption);
                    setPage(BigInt(0));
                  }}
                >
                  <SelectTrigger
                    className="h-8 text-xs w-36 border-input bg-background"
                    data-ocid="sort-select-mobile"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["rating", "newest", "reviews"] as SortOption[]).map(
                      (opt) => (
                        <SelectItem key={opt} value={opt} className="text-xs">
                          {lang === "hi"
                            ? sortLabels[opt][1]
                            : sortLabels[opt][0]}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                {providersPage && !isLoading && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {resultCount} {lang === "hi" ? "प्रदाता" : "found"}
                  </span>
                )}
              </div>
            </div>

            {/* Loading skeletons */}
            {isLoading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                data-ocid="loading-skeleton"
              >
                {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
                  <SkeletonCard key={k} />
                ))}
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20">
                <div className="text-4xl">⚠️</div>
                <div>
                  <p className="font-semibold text-foreground">
                    {lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {lang === "hi"
                      ? "डेटा लोड नहीं हो सका।"
                      : "Could not load providers."}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                  {lang === "hi" ? "पुनः प्रयास करें" : "Retry"}
                </Button>
              </div>
            ) : displayItems.length === 0 ? (
              <EmptyState onReset={handleReset} hasFilters={hasFilters} />
            ) : (
              <>
                {/* Provider grid */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  data-ocid="providers-grid"
                >
                  {displayItems.map((provider, i) => (
                    <motion.div
                      key={`provider-${provider.id}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(i * 0.05, 0.35),
                        duration: 0.28,
                      }}
                    >
                      <ServiceCard
                        provider={provider}
                        categories={categories ?? []}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Verified badge legend */}
                {displayItems.some((p) => p.isVerified) && (
                  <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                    <BadgeCheck size={12} className="text-secondary" />
                    {lang === "hi"
                      ? "सत्यापित प्रदाता की पहचान है।"
                      : "Verified badge indicates identity-verified providers."}
                  </p>
                )}

                {/* Pagination */}
                {totalPages > 1 && !filters.search && (
                  <div
                    className="flex items-center justify-center gap-3 mt-10"
                    data-ocid="pagination"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) => BigInt(Math.max(0, Number(p) - 1)))
                      }
                      disabled={page === BigInt(0)}
                      data-ocid="prev-page"
                      className="gap-1.5"
                    >
                      <ChevronLeft size={15} />
                      {lang === "hi" ? "पिछला" : "Previous"}
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(totalPages, 5) },
                        (_, i) => {
                          const pageNum =
                            totalPages <= 5
                              ? i
                              : Math.max(
                                  0,
                                  Math.min(
                                    Number(page) - 2 + i,
                                    totalPages - 5 + i,
                                  ),
                                );
                          const isActive = BigInt(pageNum) === page;
                          return (
                            <button
                              key={`page-${pageNum}`}
                              type="button"
                              onClick={() => setPage(BigInt(pageNum))}
                              className={`w-8 h-8 text-xs rounded-md font-medium transition-smooth ${
                                isActive
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              aria-current={isActive ? "page" : undefined}
                              data-ocid={`page-${pageNum}`}
                            >
                              {pageNum + 1}
                            </button>
                          );
                        },
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => p + BigInt(1))}
                      disabled={Number(page) + 1 >= totalPages}
                      data-ocid="next-page"
                      className="gap-1.5"
                    >
                      {lang === "hi" ? "अगला" : "Next"}
                      <ChevronRight size={15} />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

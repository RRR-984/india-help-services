import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowDownAZ,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Star,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import FilterSidebar from "../components/ui/FilterSidebar";
import { ErrorMessage, LoadingSpinner } from "../components/ui/LoadingSpinner";
import SearchBar from "../components/ui/SearchBar";
import ServiceCard from "../components/ui/ServiceCard";
import { useCategories, useProviders } from "../hooks/use-api";
import { useLanguage } from "../hooks/use-language";
import type { FilterState } from "../types";

const PAGE_SIZE = BigInt(12);

type SortOption = "rating" | "newest";

// ─── Active Filter Chip ──────────────────────────────────────────────────────

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

function FilterChip({ label, onRemove }: FilterChipProps) {
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

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate({ from: "/services" });
  const search = useSearch({ from: "/services" });

  // Derive initial state from URL params
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

  // ─── Sync filters → URL params ────────────────────────────────────────────
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

  // ─── Sort + search client-side ────────────────────────────────────────────
  const displayItems = (() => {
    if (!providersPage?.items) return [];
    let items = [...providersPage.items];

    // Client-side search filter across businessName & ownerName
    if (filters.search?.trim()) {
      const q = filters.search.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.businessName.toLowerCase().includes(q) ||
          p.ownerName.toLowerCase().includes(q),
      );
    }

    if (sort === "rating") {
      items.sort((a, b) => b.averageRating - a.averageRating);
    } else {
      // newest = descending by id (bigint)
      items.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
    }

    return items;
  })();

  // ─── Active filter chips data ─────────────────────────────────────────────
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

  const resultCount = filters.search?.trim()
    ? displayItems.length
    : providersPage
      ? Number(providersPage.total)
      : 0;

  // ─── Sort label helpers ───────────────────────────────────────────────────
  const sortLabel = (opt: SortOption) =>
    lang === "hi"
      ? opt === "rating"
        ? "रेटिंग के अनुसार"
        : "नवीनतम पहले"
      : opt === "rating"
        ? "By Rating"
        : "Newest First";

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ───────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">
                {t("services.title")}
              </h1>
              <p className="text-muted-foreground text-sm">
                {t("services.subtitle")}
              </p>
            </div>
            {/* Result count badge — desktop */}
            {providersPage && !isLoading && (
              <div className="hidden sm:flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg border border-border self-start mt-1">
                <LayoutGrid size={14} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {resultCount} {lang === "hi" ? "प्रदाता" : "providers"}
                </span>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div className="mt-5 max-w-xl">
            <SearchBar
              value={filters.search ?? ""}
              onChange={(val) =>
                handleFilterChange({
                  ...filters,
                  search: val || undefined,
                })
              }
              placeholder={t("services.filter.search")}
              size="lg"
              data-ocid="services-search"
            />
          </div>
        </div>
      </section>

      {/* ── Active Filter Chips + Sort bar ────────────────────────────── */}
      {(activeChips.length > 0 || providersPage) && (
        <div className="border-b border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap">
            {/* Chips */}
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

            {/* Sort selector */}
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
                  className="h-8 text-xs w-36 border-input bg-background"
                  data-ocid="sort-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["rating", "newest"] as SortOption[]).map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-xs">
                      {opt === "rating" ? (
                        <span className="flex items-center gap-1.5">
                          <Star size={12} className="text-primary" />
                          {sortLabel(opt)}
                        </span>
                      ) : (
                        sortLabel(opt)
                      )}
                    </SelectItem>
                  ))}
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

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Mobile top bar: filter button + result count */}
            <div className="flex items-center justify-between lg:hidden mb-5 gap-3">
              <FilterSidebar
                filters={filters}
                categories={categories ?? []}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
              <div className="flex items-center gap-2 ml-auto">
                {/* Mobile sort */}
                <Select
                  value={sort}
                  onValueChange={(v) => {
                    setSort(v as SortOption);
                    setPage(BigInt(0));
                  }}
                >
                  <SelectTrigger
                    className="h-8 text-xs w-32 border-input bg-background"
                    data-ocid="sort-select-mobile"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["rating", "newest"] as SortOption[]).map((opt) => (
                      <SelectItem key={opt} value={opt} className="text-xs">
                        {sortLabel(opt)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {providersPage && !isLoading && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {resultCount} {lang === "hi" ? "प्रदाता" : "found"}
                  </span>
                )}
              </div>
            </div>

            {/* Loading */}
            {isLoading ? (
              <LoadingSpinner message={t("services.loading")} />
            ) : isError ? (
              <ErrorMessage onRetry={refetch} />
            ) : displayItems.length === 0 ? (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center gap-5 rounded-2xl border border-dashed border-border bg-muted/20"
                data-ocid="no-results"
              >
                <div className="text-6xl">🔍</div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold font-display text-foreground">
                    {t("services.noResults")}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {lang === "hi"
                      ? "अलग फ़िल्टर आज़माएं या सभी फ़िल्टर हटाएं।"
                      : "Try different filters or clear all to see all providers."}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  data-ocid="empty-state-reset"
                >
                  {t("services.filter.reset")}
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Provider grid */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                  data-ocid="providers-grid"
                >
                  {displayItems.map((provider, i) => (
                    <motion.div
                      key={`provider-${provider.id}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(i * 0.05, 0.4),
                        duration: 0.3,
                      }}
                    >
                      <ServiceCard
                        provider={provider}
                        categories={categories ?? []}
                      />
                    </motion.div>
                  ))}
                </div>

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
                      {t("common.previous")}
                    </Button>

                    {/* Page number pills */}
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
                      {t("common.next")}
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

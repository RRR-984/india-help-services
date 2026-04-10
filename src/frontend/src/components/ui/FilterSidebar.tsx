import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../hooks/use-language";
import { INDIAN_STATES } from "../../services/backend-api";
import type { Category, FilterState } from "../../types";

interface FilterSidebarProps {
  filters: FilterState;
  categories: Category[];
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  filters,
  categories,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  const { t, lang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters =
    !!filters.categoryId || !!filters.state || !!filters.city;

  const filterContent = (
    <div className="space-y-5" data-ocid="filter-sidebar">
      {/* Category */}
      <div className="space-y-2">
        <label
          htmlFor="filter-category"
          className="text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          {t("services.filter.category")}
        </label>
        <Select
          value={filters.categoryId?.toString() ?? "all"}
          onValueChange={(val) =>
            onFilterChange({
              ...filters,
              categoryId: val === "all" ? undefined : BigInt(val),
            })
          }
        >
          <SelectTrigger
            id="filter-category"
            className="h-9 text-sm"
            data-ocid="filter-category"
          >
            <SelectValue placeholder={t("common.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("common.all")}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id.toString()} value={cat.id.toString()}>
                {lang === "hi" ? cat.name.hi : cat.name.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* State */}
      <div className="space-y-2">
        <label
          htmlFor="filter-state"
          className="text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          {t("services.filter.state")}
        </label>
        <Select
          value={filters.state ?? "all"}
          onValueChange={(val) =>
            onFilterChange({
              ...filters,
              state: val === "all" ? undefined : val,
              city: undefined,
            })
          }
        >
          <SelectTrigger
            id="filter-state"
            className="h-9 text-sm"
            data-ocid="filter-state"
          >
            <SelectValue placeholder={t("common.all")} />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            <SelectItem value="all">{t("common.all")}</SelectItem>
            {INDIAN_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City (free input) */}
      <div className="space-y-2">
        <label
          htmlFor="filter-city"
          className="text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          {t("services.filter.city")}
        </label>
        <input
          id="filter-city"
          type="text"
          value={filters.city ?? ""}
          onChange={(e) =>
            onFilterChange({ ...filters, city: e.target.value || undefined })
          }
          placeholder={t("services.filter.city")}
          className="w-full h-9 px-3 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          data-ocid="filter-city"
        />
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground hover:text-destructive"
          onClick={onReset}
          data-ocid="filter-reset"
        >
          <X size={14} className="mr-1" />
          {t("services.filter.reset")}
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0 space-y-6">
        <div className="sticky top-24 bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal size={16} className="text-primary" />
            <span className="font-display font-semibold text-sm text-foreground">
              {t("common.filter")}
            </span>
            {hasActiveFilters && (
              <span className="ml-auto text-xs text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-full">
                {
                  [filters.categoryId, filters.state, filters.city].filter(
                    Boolean,
                  ).length
                }
              </span>
            )}
          </div>
          {filterContent}
        </div>
      </aside>

      {/* Mobile filter button */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="gap-2"
          data-ocid="filter-mobile-btn"
        >
          <SlidersHorizontal size={14} />
          {t("common.filter")}
          {hasActiveFilters && (
            <span className="ml-1 text-xs text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-full">
              {
                [filters.categoryId, filters.state, filters.city].filter(
                  Boolean,
                ).length
              }
            </span>
          )}
        </Button>

        {/* Mobile filter bottom sheet */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              onKeyUp={(e) => {
                if (e.key === "Enter") setMobileOpen(false);
              }}
              role="presentation"
            />
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl p-6 pb-8 shadow-elevated">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-primary" />
                  <span className="font-display font-semibold text-foreground">
                    {t("common.filter")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md hover:bg-muted"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>
              {filterContent}
              <Button
                className="w-full mt-4"
                onClick={() => setMobileOpen(false)}
              >
                {t("common.filter")}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

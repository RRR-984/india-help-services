import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, SlidersHorizontal, X } from "lucide-react";
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

  const activeCount = [
    filters.categoryId,
    filters.state,
    filters.city,
    filters.minRating && filters.minRating > 1 ? filters.minRating : undefined,
    filters.isVerified,
  ].filter(Boolean).length;

  const hasActiveFilters = activeCount > 0;

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

      {/* City */}
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

      {/* Min Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
            {lang === "hi" ? "न्यूनतम रेटिंग" : "Min Rating"}
          </span>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
            {filters.minRating ?? 1}★
          </span>
        </div>
        <Slider
          min={1}
          max={5}
          step={1}
          value={[filters.minRating ?? 1]}
          onValueChange={([val]) =>
            onFilterChange({
              ...filters,
              minRating: val === 1 ? undefined : val,
            })
          }
          className="w-full"
          data-ocid="filter-min-rating"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>1★</span>
          <span>2★</span>
          <span>3★</span>
          <span>4★</span>
          <span>5★</span>
        </div>
      </div>

      {/* Verified Only */}
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="filter-verified"
          className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer"
        >
          <BadgeCheck size={13} className="text-secondary" />
          {lang === "hi" ? "सत्यापित ही" : "Verified Only"}
        </label>
        <Switch
          id="filter-verified"
          checked={!!filters.isVerified}
          onCheckedChange={(checked) =>
            onFilterChange({ ...filters, isVerified: checked || undefined })
          }
          data-ocid="filter-verified"
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
                {activeCount}
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
              {activeCount}
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
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl p-6 pb-8 shadow-elevated overflow-y-auto max-h-[85vh]">
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
                className="w-full mt-6"
                onClick={() => setMobileOpen(false)}
                data-ocid="apply-filters-mobile"
              >
                {lang === "hi" ? "फ़िल्टर लागू करें" : "Apply Filters"}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

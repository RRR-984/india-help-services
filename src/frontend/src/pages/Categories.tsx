import { motion } from "motion/react";
import CategoryCard from "../components/ui/CategoryCard";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useCategories } from "../hooks/use-api";
import { useLanguage } from "../hooks/use-language";

export default function CategoriesPage() {
  const { t } = useLanguage();
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            {t("categories.title")}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("categories.subtitle")}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(categories ?? []).map((cat, i) => (
              <motion.div
                key={cat.id.toString()}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

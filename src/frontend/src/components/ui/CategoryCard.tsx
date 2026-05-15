import { Link } from "@tanstack/react-router";
import { useLanguage } from "../../hooks/use-language";
import type { Category } from "../../types";

interface CategoryCardProps {
  category: Category;
}

// Map common category icon names to emoji
const iconEmoji: Record<string, string> = {
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
  indianguide: "🗺️",
};

function getEmoji(icon: string): string {
  const key = icon.toLowerCase().replace(/[^a-z_]/g, "");
  return iconEmoji[key] ?? "🔧";
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { lang } = useLanguage();

  const name = lang === "hi" ? category.name.hi : category.name.en;
  const description =
    lang === "hi" ? category.description.hi : category.description.en;

  return (
    <Link
      to="/services"
      search={{
        category: category.id.toString(),
        state: undefined,
        city: undefined,
        search: undefined,
        sort: undefined,
      }}
      className="group block"
      data-ocid={`category-card-${category.id}`}
    >
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-card p-5 h-full transition-smooth hover:shadow-elevated hover:-translate-y-0.5"
        style={{
          borderTopColor: category.color,
          borderTopWidth: "3px",
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${category.color}18` }}
        >
          {getEmoji(category.icon)}
        </div>

        {/* Name */}
        <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-1 truncate">
          {name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Subtle arrow */}
        <div
          className="absolute top-4 right-4 text-sm font-bold opacity-0 group-hover:opacity-100 transition-smooth"
          style={{ color: category.color }}
        >
          →
        </div>
      </div>
    </Link>
  );
}

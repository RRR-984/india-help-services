// Re-export all types used in the frontend for convenience.
// The actual API calls go through hooks/use-api.ts using the actor pattern.

export type {
  Category,
  CategoryId,
  CategoryInput,
  Provider,
  ProviderId,
  ProviderInput,
  ProviderSummary,
  ProviderFilter,
  Page,
  User,
  UserId,
  UserInput,
  UserUpdateInput,
  Review,
  ReviewId,
  ReviewInput,
  Inquiry,
  InquiryId,
  InquiryInput,
  ServiceOffered,
  BilingualText,
  AdminStats,
  Timestamp,
} from "../backend";

export { InquiryStatus, Role } from "../backend";

// ─── Indian States ──────────────────────────────────────────────────────────

export const INDIAN_STATES = [
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
  "Chandigarh",
] as const;

export type IndianState = (typeof INDIAN_STATES)[number];

// ─── Category Helpers ────────────────────────────────────────────────────────

/** Category icon map — keyed by lowercase category name fragment */
export const CATEGORY_ICONS: Record<string, string> = {
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
};

/** Returns an icon emoji for a given category name, falling back to a default */
export function getCategoryIcon(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "🔧";
}

/** Builds bilingual display label: "English / हिंदी" */
export function bilingualLabel(en: string, hi: string): string {
  return `${en} / ${hi}`;
}

// ─── Online Classes Helpers ──────────────────────────────────────────────────

export type ClassSubCategory = "yoga" | "dhyan" | "fitness" | "coaching";

export const CLASS_SUBCATEGORIES: {
  value: ClassSubCategory;
  labelEn: string;
  labelHi: string;
  icon: string;
}[] = [
  { value: "yoga", labelEn: "Yoga", labelHi: "योग", icon: "🧘" },
  { value: "dhyan", labelEn: "Meditation (Dhyan)", labelHi: "ध्यान", icon: "🕉️" },
  { value: "fitness", labelEn: "Fitness", labelHi: "फिटनेस", icon: "💪" },
  {
    value: "coaching",
    labelEn: "Coaching / Online Classes",
    labelHi: "कोचिंग / ऑनलाइन क्लासेस",
    icon: "📚",
  },
];

/** Returns display label for a class sub-category */
export function getSubCategoryLabel(
  subCategory: ClassSubCategory,
  lang: "en" | "hi" = "en",
): string {
  const found = CLASS_SUBCATEGORIES.find((c) => c.value === subCategory);
  if (!found) return subCategory;
  return lang === "hi" ? found.labelHi : found.labelEn;
}

/** Returns icon emoji for a class sub-category */
export function getSubCategoryIcon(subCategory: ClassSubCategory): string {
  return CLASS_SUBCATEGORIES.find((c) => c.value === subCategory)?.icon ?? "📹";
}

/** Formats uploaded timestamp (bigint nanoseconds) to readable date string */
export function formatVideoDate(uploadedAt: bigint): string {
  const ms = Number(uploadedAt / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

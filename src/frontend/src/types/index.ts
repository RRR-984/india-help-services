// Re-export backend types for convenience
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

// UI-specific types
export type Language = "en" | "hi";

/** Extended search filter used by useSearchProviders */
export interface ProviderSearchFilter {
  searchQuery?: string;
  categoryId?: bigint;
  state?: string;
  city?: string;
  minRating?: number;
  isVerified?: boolean;
}

export interface FilterState {
  categoryId?: bigint;
  state?: string;
  city?: string;
  search?: string;
  minRating?: number;
  isVerified?: boolean;
}

export interface PaginationState {
  page: bigint;
  pageSize: bigint;
}

export type NavLink = {
  labelEn: string;
  labelHi: string;
  href: string;
};

/** Inquiry status display helpers */
export type InquiryStatusDisplay = {
  label: string;
  labelHi: string;
  className: string;
};

// ─── Online Classes ──────────────────────────────────────────────────────────

export type ClassSubCategory = "yoga" | "dhyan" | "fitness" | "coaching";

export interface ClassVideo {
  id: bigint;
  providerId: string;
  title: string;
  description: string;
  subCategory: ClassSubCategory;
  fileKey: string;
  uploadedAt: bigint;
  isActive: boolean;
}

export interface ClassVideoInput {
  title: string;
  description: string;
  subCategory: ClassSubCategory;
  fileKey: string;
}

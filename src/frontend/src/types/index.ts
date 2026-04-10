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

export interface FilterState {
  categoryId?: bigint;
  state?: string;
  city?: string;
  search?: string;
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

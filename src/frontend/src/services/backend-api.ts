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

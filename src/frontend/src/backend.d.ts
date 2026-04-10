import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    id: CategoryId;
    displayOrder: bigint;
    icon: string;
    name: BilingualText;
    color: string;
    description: BilingualText;
    isActive: boolean;
}
export type Timestamp = bigint;
export interface CategoryInput {
    displayOrder: bigint;
    icon: string;
    name: BilingualText;
    color: string;
    description: BilingualText;
}
export interface User {
    id: UserId;
    city: string;
    name: string;
    createdAt: Timestamp;
    role: Role;
    email: string;
    state: string;
    phone: string;
}
export interface ProviderSummary {
    id: ProviderId;
    ownerName: string;
    city: string;
    userId: UserId;
    profileImage?: string;
    businessName: string;
    isActive: boolean;
    averageRating: number;
    state: string;
    isVerified: boolean;
    reviewCount: bigint;
    categoryIds: Array<CategoryId>;
}
export interface ProviderFilter {
    categoryId?: CategoryId;
    city?: string;
    state?: string;
}
export interface InquiryInput {
    serviceName: string;
    preferredContact: string;
    message: string;
    providerId: ProviderId;
}
export interface ProviderInput {
    ownerName: string;
    city: string;
    profileImage?: string;
    businessName: string;
    email: string;
    state: string;
    address: string;
    bioEn: string;
    bioHi: string;
    phone: string;
    servicesOffered: Array<ServiceOffered>;
    serviceAreas: Array<string>;
    categoryIds: Array<CategoryId>;
}
export type UserId = Principal;
export type ProviderId = bigint;
export interface UserUpdateInput {
    city: string;
    name: string;
    role?: Role;
    email: string;
    state: string;
    phone: string;
}
export interface ServiceOffered {
    title: string;
    description: string;
    availability: string;
    serviceId: bigint;
    price?: string;
}
export interface Page {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<ProviderSummary>;
}
export type InquiryId = bigint;
export interface BilingualText {
    en: string;
    hi: string;
}
export type CategoryId = bigint;
export interface AdminStats {
    totalSeekers: bigint;
    totalProviders: bigint;
    totalCategories: bigint;
    totalInquiries: bigint;
}
export type ReviewId = bigint;
export interface UserInput {
    city: string;
    name: string;
    email: string;
    state: string;
    phone: string;
}
export interface Inquiry {
    id: InquiryId;
    status: InquiryStatus;
    serviceName: string;
    createdAt: Timestamp;
    seekerId: UserId;
    preferredContact: string;
    message: string;
    providerId: ProviderId;
}
export interface ReviewInput {
    comment: string;
    rating: bigint;
    providerId: ProviderId;
}
export interface Review {
    id: ReviewId;
    createdAt: Timestamp;
    seekerId: UserId;
    comment: string;
    rating: bigint;
    providerId: ProviderId;
}
export interface Provider {
    id: ProviderId;
    ownerName: string;
    city: string;
    userId: UserId;
    profileImage?: string;
    createdAt: Timestamp;
    businessName: string;
    isActive: boolean;
    email: string;
    state: string;
    isVerified: boolean;
    address: string;
    bioEn: string;
    bioHi: string;
    phone: string;
    servicesOffered: Array<ServiceOffered>;
    serviceAreas: Array<string>;
    categoryIds: Array<CategoryId>;
}
export enum InquiryStatus {
    closed = "closed",
    responded = "responded",
    pending = "pending"
}
export enum Role {
    admin = "admin",
    provider = "provider",
    seeker = "seeker"
}
export interface backendInterface {
    addReview(input: ReviewInput): Promise<Review>;
    approveProvider(id: ProviderId): Promise<boolean>;
    createCategory(input: CategoryInput): Promise<Category>;
    createProviderProfile(input: ProviderInput): Promise<Provider>;
    deleteCategory(id: CategoryId): Promise<boolean>;
    disableProvider(id: ProviderId): Promise<boolean>;
    getAdminStats(): Promise<AdminStats>;
    getCategory(id: CategoryId): Promise<Category | null>;
    getInquiriesByProvider(providerId: ProviderId): Promise<Array<Inquiry>>;
    getMyInquiries(): Promise<Array<Inquiry>>;
    getMyProfile(): Promise<User | null>;
    getMyProviderProfile(): Promise<Provider | null>;
    getMyReviews(): Promise<Array<Review>>;
    getProvider(id: ProviderId): Promise<Provider | null>;
    getReviewsByProvider(providerId: ProviderId): Promise<Array<Review>>;
    listAllCategories(): Promise<Array<Category>>;
    listCategories(): Promise<Array<Category>>;
    listProviders(filter: ProviderFilter, page: bigint, pageSize: bigint): Promise<Page>;
    listUsers(): Promise<Array<User>>;
    registerUser(input: UserInput): Promise<User>;
    seedSampleData(): Promise<boolean>;
    setCategoryActive(id: CategoryId, isActive: boolean): Promise<boolean>;
    setUserRole(userId: UserId, role: Role): Promise<boolean>;
    submitInquiry(input: InquiryInput): Promise<Inquiry>;
    updateCategory(id: CategoryId, input: CategoryInput): Promise<Category | null>;
    updateInquiryStatus(id: InquiryId, status: InquiryStatus): Promise<Inquiry | null>;
    updateProviderProfile(id: ProviderId, input: ProviderInput): Promise<Provider | null>;
    updateUserProfile(input: UserUpdateInput): Promise<User | null>;
}

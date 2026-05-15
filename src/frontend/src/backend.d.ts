import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface CategoryInput {
    displayOrder: bigint;
    icon: string;
    name: BilingualText;
    color: string;
    description: BilingualText;
}
export interface InquiryInput {
    serviceName: string;
    preferredContact: string;
    message: string;
    providerId: ProviderId;
}
export interface OpenUserRecord {
    id: bigint;
    serviceCategory: string;
    city: string;
    name: string;
    createdAt: Timestamp;
    role: Role;
    email: string;
    state: string;
    phone: string;
}
export interface BilingualText {
    en: string;
    hi: string;
}
export type ProviderId = bigint;
export interface Page {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<ProviderSummary>;
}
export interface ProviderSearchFilter {
    categoryId?: CategoryId;
    minRating?: number;
    city?: string;
    state?: string;
    isVerified?: boolean;
    searchQuery?: string;
}
export type OpenRegisterResult = {
    __kind__: "ok";
    ok: OpenUserRecord;
} | {
    __kind__: "err";
    err: string;
};
export type ReviewId = bigint;
export interface UserInput {
    city: string;
    name: string;
    email: string;
    state: string;
    phone: string;
}
export interface Review {
    id: ReviewId;
    createdAt: Timestamp;
    seekerId: UserId;
    comment: string;
    rating: bigint;
    providerId: ProviderId;
}
export interface Category {
    id: CategoryId;
    displayOrder: bigint;
    icon: string;
    name: BilingualText;
    color: string;
    description: BilingualText;
    isActive: boolean;
}
export interface ClassVideo {
    id: bigint;
    subCategory: ClassSubCategory;
    title: string;
    description: string;
    isActive: boolean;
    providerId: ProviderId;
    uploadedAt: bigint;
    fileKey: string;
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
export interface ClassVideoInput {
    subCategory: ClassSubCategory;
    title: string;
    description: string;
    fileKey: string;
}
export interface ProviderInput {
    ownerName: string;
    city: string;
    profileImage?: string;
    businessName: string;
    email: string;
    state: string;
    availableFrom?: string;
    contactAvailabilityEnabled?: boolean;
    address: string;
    bioEn: string;
    bioHi: string;
    phone: string;
    servicesOffered: Array<ServiceOffered>;
    availableTo?: string;
    serviceAreas: Array<string>;
    categoryIds: Array<CategoryId>;
}
export type UserId = Principal;
export interface OpenUserInput {
    serviceCategory: string;
    city: string;
    name: string;
    role: Role;
    email: string;
    state: string;
    phone: string;
}
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
export type InquiryId = bigint;
export interface AdminStats {
    avgPlatformRating: number;
    totalSeekers: bigint;
    totalProviders: bigint;
    pendingProviderApprovals: bigint;
    totalCategories: bigint;
    totalReviews: bigint;
    totalInquiries: bigint;
}
export type CategoryId = bigint;
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
    availableFrom?: string;
    isVerified: boolean;
    contactAvailabilityEnabled?: boolean;
    address: string;
    bioEn: string;
    bioHi: string;
    phone: string;
    servicesOffered: Array<ServiceOffered>;
    availableTo?: string;
    serviceAreas: Array<string>;
    categoryIds: Array<CategoryId>;
}
export enum ClassSubCategory {
    coaching = "coaching",
    yoga = "yoga",
    fitness = "fitness",
    dhyan = "dhyan"
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
    addClassVideo(providerId: ProviderId, input: ClassVideoInput): Promise<ClassVideo>;
    addReview(input: ReviewInput): Promise<Review>;
    approveProvider(id: ProviderId): Promise<boolean>;
    checkContactAvailable(providerId: ProviderId, currentHHMM: string): Promise<boolean>;
    createCategory(input: CategoryInput): Promise<Category>;
    createProviderProfile(input: ProviderInput): Promise<Provider>;
    deleteCategory(id: CategoryId): Promise<boolean>;
    deleteClassVideo(videoId: bigint, providerId: ProviderId): Promise<boolean>;
    disableProvider(id: ProviderId): Promise<boolean>;
    getAdminStats(): Promise<AdminStats>;
    getCategory(id: CategoryId): Promise<Category | null>;
    getClassVideoById(videoId: bigint): Promise<ClassVideo | null>;
    getClassVideosByProvider(providerId: ProviderId): Promise<Array<ClassVideo>>;
    getClassVideosBySubCategory(subCategory: ClassSubCategory): Promise<Array<ClassVideo>>;
    getFeaturedProviders(): Promise<Array<ProviderSummary>>;
    getInquiriesByProvider(providerId: ProviderId): Promise<Array<Inquiry>>;
    getMyClassVideos(providerId: ProviderId): Promise<Array<ClassVideo>>;
    getMyInquiries(): Promise<Array<Inquiry>>;
    getMyProfile(): Promise<User | null>;
    getMyProviderProfile(): Promise<Provider | null>;
    getMyReviews(): Promise<Array<Review>>;
    getOpenUserCount(): Promise<bigint>;
    getProvider(id: ProviderId): Promise<Provider | null>;
    getProvidersByCategory(categoryId: CategoryId, page: bigint, pageSize: bigint): Promise<Page>;
    getReviewsByProvider(providerId: ProviderId): Promise<Array<Review>>;
    getVisitorStats(): Promise<{
        totalVisits: bigint;
        uniqueVisitors: bigint;
    }>;
    listAllCategories(): Promise<Array<Category>>;
    listCategories(): Promise<Array<Category>>;
    listProviders(filter: ProviderFilter, page: bigint, pageSize: bigint): Promise<Page>;
    listUsers(): Promise<Array<User>>;
    openRegisterUser(input: OpenUserInput): Promise<OpenRegisterResult>;
    registerUser(input: UserInput): Promise<User>;
    searchProviders(filter: ProviderSearchFilter, page: bigint, pageSize: bigint): Promise<Page>;
    seedSampleData(): Promise<boolean>;
    setCategoryActive(id: CategoryId, isActive: boolean): Promise<boolean>;
    setUserRole(userId: UserId, role: Role): Promise<boolean>;
    submitInquiry(input: InquiryInput): Promise<Inquiry>;
    toggleClassVideoActive(videoId: bigint, providerId: ProviderId): Promise<ClassVideo | null>;
    trackVisit(visitorId: string): Promise<{
        totalVisits: bigint;
        uniqueVisitors: bigint;
    }>;
    updateCategory(id: CategoryId, input: CategoryInput): Promise<Category | null>;
    updateInquiryStatus(id: InquiryId, status: InquiryStatus): Promise<Inquiry | null>;
    updateProviderProfile(id: ProviderId, input: ProviderInput): Promise<Provider | null>;
    updateUserProfile(input: UserUpdateInput): Promise<User | null>;
}

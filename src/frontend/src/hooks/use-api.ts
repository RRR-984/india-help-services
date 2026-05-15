import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CategoryId,
  CategoryInput,
  ClassSubCategory,
  ClassVideo,
  ClassVideoInput,
  InquiryId,
  InquiryInput,
  InquiryStatus,
  ProviderFilter,
  ProviderId,
  ProviderInput,
  ProviderSearchFilter,
  ReviewInput,
  Role,
  UserId,
  UserInput,
  UserUpdateInput,
} from "../types";
import { useActor } from "./use-actor";

// ─── Categories ─────────────────────────────────────────────────────────────

export function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => actor!.listCategories(),
    enabled: !!actor && !isFetching,
  });
}

export function useAllCategories() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["categories", "all"],
    queryFn: () => actor!.listAllCategories(),
    enabled: !!actor && !isFetching,
  });
}

export function useCategory(id: CategoryId | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["category", id?.toString()],
    queryFn: () => actor!.getCategory(id!),
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

// ─── Providers ──────────────────────────────────────────────────────────────

export function useProviders(
  filter: ProviderFilter,
  page: bigint,
  pageSize: bigint,
) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: [
      "providers",
      filter.categoryId?.toString(),
      filter.state,
      filter.city,
      page.toString(),
    ],
    queryFn: () => actor!.listProviders(filter, page, pageSize),
    enabled: !!actor && !isFetching,
  });
}

/** Search providers with full-text + filter support */
export function useSearchProviders(
  searchFilter: ProviderSearchFilter,
  page = 0n,
  pageSize = 12n,
) {
  const { actor, isFetching } = useActor();
  // Fall back to listProviders with subset of filter fields
  const legacyFilter: ProviderFilter = {
    categoryId: searchFilter.categoryId,
    state: searchFilter.state,
    city: searchFilter.city,
  };
  return useQuery({
    queryKey: [
      "providers",
      "search",
      searchFilter.searchQuery ?? "",
      searchFilter.categoryId?.toString() ?? "",
      searchFilter.state ?? "",
      searchFilter.city ?? "",
      searchFilter.isVerified?.toString() ?? "",
      page.toString(),
    ],
    queryFn: () => actor!.listProviders(legacyFilter, page, pageSize),
    enabled: !!actor && !isFetching,
  });
}

/** Providers by category with pagination */
export function useProvidersByCategory(
  categoryId: CategoryId | undefined,
  page = 0n,
  pageSize = 12n,
) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: [
      "providers",
      "category",
      categoryId?.toString(),
      page.toString(),
    ],
    queryFn: () => actor!.listProviders({ categoryId }, page, pageSize),
    enabled: !!actor && !isFetching && categoryId !== undefined,
  });
}

/** Featured providers — returns top-rated verified providers (up to 6) */
export function useFeaturedProviders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["providers", "featured"],
    queryFn: async () => {
      const result = await actor!.listProviders({}, 0n, 20n);
      const sorted = [...result.items]
        .filter((p) => p.isVerified && p.isActive)
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 6);
      return sorted;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // 5 min cache for featured
  });
}

export function useProvider(id: ProviderId | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["provider", id?.toString()],
    queryFn: () => actor!.getProvider(id!),
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useMyProviderProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myProviderProfile"],
    queryFn: () => actor!.getMyProviderProfile(),
    enabled: !!actor && !isFetching,
  });
}

export function useCheckContactAvailable(
  providerId: bigint | undefined,
  currentHHMM: string,
) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["checkContactAvailable", providerId?.toString(), currentHHMM],
    queryFn: () => actor!.checkContactAvailable(providerId!, currentHHMM),
    enabled: !!actor && !isFetching && providerId !== undefined,
    staleTime: 60 * 1000, // 1 min — time doesn't change that fast
  });
}

// ─── Reviews ────────────────────────────────────────────────────────────────

export function useReviewsByProvider(providerId: ProviderId | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["reviews", providerId?.toString()],
    queryFn: () => actor!.getReviewsByProvider(providerId!),
    enabled: !!actor && !isFetching && providerId !== undefined,
  });
}

export function useMyReviews() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myReviews"],
    queryFn: () => actor!.getMyReviews(),
    enabled: !!actor && !isFetching,
  });
}

// ─── Inquiries ───────────────────────────────────────────────────────────────

export function useMyInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myInquiries"],
    queryFn: () => actor!.getMyInquiries(),
    enabled: !!actor && !isFetching,
  });
}

export function useInquiriesByProvider(providerId: ProviderId | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["inquiries", "provider", providerId?.toString()],
    queryFn: () => actor!.getInquiriesByProvider(providerId!),
    enabled: !!actor && !isFetching && providerId !== undefined,
  });
}

// ─── Users ───────────────────────────────────────────────────────────────────

export function useMyProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: () => actor!.getMyProfile(),
    enabled: !!actor && !isFetching,
  });
}

export function useUsers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["users"],
    queryFn: () => actor!.listUsers(),
    enabled: !!actor && !isFetching,
  });
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export function useAdminStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: () => actor!.getAdminStats(),
    enabled: !!actor && !isFetching,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useRegisterUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UserInput) => actor!.registerUser(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myProfile"] }),
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UserUpdateInput) => actor!.updateUserProfile(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myProfile"] }),
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: InquiryInput) => actor!.submitInquiry(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myInquiries"] }),
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ReviewInput) => actor!.addReview(input),
    onSuccess: (_data, vars) =>
      qc.invalidateQueries({
        queryKey: ["reviews", vars.providerId.toString()],
      }),
  });
}

export function useCreateProviderProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ProviderInput) => actor!.createProviderProfile(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProviderProfile"] });
      qc.invalidateQueries({ queryKey: ["providers"] });
    },
  });
}

export function useUpdateProviderProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: ProviderId; input: ProviderInput }) =>
      actor!.updateProviderProfile(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProviderProfile"] });
      qc.invalidateQueries({ queryKey: ["providers"] });
    },
  });
}

export function useCreateCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CategoryInput) => actor!.createCategory(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useUpdateCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: CategoryId; input: CategoryInput }) =>
      actor!.updateCategory(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: CategoryId) => actor!.deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useSetCategoryActive() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: CategoryId; isActive: boolean }) =>
      actor!.setCategoryActive(id, isActive),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useApproveProvider() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: ProviderId) => actor!.approveProvider(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["providers"] }),
  });
}

export function useDisableProvider() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: ProviderId) => actor!.disableProvider(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["providers"] }),
  });
}

export function useSetUserRole() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: UserId; role: Role }) =>
      actor!.setUserRole(userId, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateInquiryStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: InquiryId; status: InquiryStatus }) =>
      actor!.updateInquiryStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}

export function useSeedSampleData() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => actor!.seedSampleData(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["providers"] });
    },
  });
}

// ─── Online Classes ───────────────────────────────────────────────────────────

/** Extended actor type to support online classes methods */
interface ActorWithClassVideos {
  addClassVideo: (
    providerId: string,
    input: ClassVideoInput,
  ) => Promise<ClassVideo>;
  getMyClassVideos: (providerId: string) => Promise<ClassVideo[]>;
  deleteClassVideo: (videoId: bigint, providerId: string) => Promise<boolean>;
  toggleClassVideoActive: (
    videoId: bigint,
    providerId: string,
  ) => Promise<[ClassVideo] | []>;
  getClassVideosByProvider: (providerId: string) => Promise<ClassVideo[]>;
  getClassVideosBySubCategory: (
    subCategory: ClassSubCategory,
  ) => Promise<ClassVideo[]>;
}

/** All class videos for a given sub-category (public browse) */
export function useClassVideos(subCategory?: ClassSubCategory) {
  const { actor, isFetching } = useActor();
  return useQuery<ClassVideo[]>({
    queryKey: ["classVideos", subCategory ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const ext = actor as unknown as ActorWithClassVideos;
      if (typeof ext.getClassVideosBySubCategory !== "function") return [];
      if (subCategory) {
        return ext.getClassVideosBySubCategory(subCategory);
      }
      // Fetch all sub-categories and merge
      const categories: ClassSubCategory[] = [
        "yoga",
        "dhyan",
        "fitness",
        "coaching",
      ];
      const results = await Promise.all(
        categories.map((c) => ext.getClassVideosBySubCategory(c)),
      );
      return results.flat();
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

/** Videos for a specific provider (public) */
export function useProviderClassVideos(providerId: string | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<ClassVideo[]>({
    queryKey: ["classVideos", "provider", providerId],
    queryFn: async () => {
      if (!actor || !providerId) return [];
      const ext = actor as unknown as ActorWithClassVideos;
      if (typeof ext.getClassVideosByProvider !== "function") return [];
      return ext.getClassVideosByProvider(providerId);
    },
    enabled: !!actor && !isFetching && !!providerId,
  });
}

/** My videos (provider dashboard) */
export function useMyClassVideos(providerId: string | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<ClassVideo[]>({
    queryKey: ["classVideos", "mine", providerId],
    queryFn: async () => {
      if (!actor || !providerId) return [];
      const ext = actor as unknown as ActorWithClassVideos;
      if (typeof ext.getMyClassVideos !== "function") return [];
      return ext.getMyClassVideos(providerId);
    },
    enabled: !!actor && !isFetching && !!providerId,
  });
}

export function useAddClassVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      providerId,
      input,
    }: {
      providerId: string;
      input: ClassVideoInput;
    }): Promise<ClassVideo> => {
      const ext = actor as unknown as ActorWithClassVideos;
      if (!ext || typeof ext.addClassVideo !== "function") {
        throw new Error("Backend method not available");
      }
      return ext.addClassVideo(providerId, input);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["classVideos", "mine", vars.providerId],
      });
      qc.invalidateQueries({ queryKey: ["classVideos"] });
    },
  });
}

export function useDeleteClassVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      videoId,
      providerId,
    }: {
      videoId: bigint;
      providerId: string;
    }): Promise<boolean> => {
      const ext = actor as unknown as ActorWithClassVideos;
      if (!ext || typeof ext.deleteClassVideo !== "function") {
        throw new Error("Backend method not available");
      }
      return ext.deleteClassVideo(videoId, providerId);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["classVideos", "mine", vars.providerId],
      });
      qc.invalidateQueries({ queryKey: ["classVideos"] });
    },
  });
}

export function useToggleClassVideoActive() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      videoId,
      providerId,
    }: {
      videoId: bigint;
      providerId: string;
    }): Promise<ClassVideo | null> => {
      const ext = actor as unknown as ActorWithClassVideos;
      if (!ext || typeof ext.toggleClassVideoActive !== "function") {
        throw new Error("Backend method not available");
      }
      const result = await ext.toggleClassVideoActive(videoId, providerId);
      return result.length > 0 ? (result[0] ?? null) : null;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["classVideos", "mine", vars.providerId],
      });
      qc.invalidateQueries({ queryKey: ["classVideos"] });
    },
  });
}

// ─── Open Registration (no Internet Identity required) ───────────────────────

export interface OpenUserInput {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  serviceCategory: string;
  role: { provider: null } | { seeker: null };
}

export type OpenRegisterResult = { ok: unknown } | { err: string };

export function useOpenRegisterUser() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (input: OpenUserInput): Promise<OpenRegisterResult> => {
      const a = actor as unknown as Record<
        string,
        (i: OpenUserInput) => Promise<OpenRegisterResult>
      >;
      if (!a || typeof a.openRegisterUser !== "function") {
        return { err: "Backend method not available yet" };
      }
      return a.openRegisterUser(input);
    },
  });
}

// ─── Visitor Stats ────────────────────────────────────────────────────────────

const VISITOR_ID_KEY = "ihv_uid";

interface VisitorStats {
  totalVisits: bigint;
  uniqueVisitors: bigint;
}

// Extended actor type to support visitor methods (added in latest backend version)
interface ActorWithVisitor {
  trackVisit: (visitorId: string) => Promise<VisitorStats>;
  getVisitorStats: () => Promise<VisitorStats>;
}

function getOrCreateVisitorId(): string {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function useVisitorStats() {
  const { actor, isFetching } = useActor();
  return useQuery<VisitorStats>({
    queryKey: ["visitorStats"],
    queryFn: async () => {
      if (!actor) return { totalVisits: 0n, uniqueVisitors: 0n };
      const ext = actor as unknown as ActorWithVisitor;
      if (typeof ext.trackVisit === "function") {
        const visitorId = getOrCreateVisitorId();
        return ext.trackVisit(visitorId);
      }
      if (typeof ext.getVisitorStats === "function") {
        return ext.getVisitorStats();
      }
      return { totalVisits: 0n, uniqueVisitors: 0n };
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

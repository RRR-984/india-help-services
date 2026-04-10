import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CategoryId,
  CategoryInput,
  InquiryId,
  InquiryInput,
  InquiryStatus,
  ProviderFilter,
  ProviderId,
  ProviderInput,
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

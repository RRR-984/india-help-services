var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { y as Subscribable, z as shallowEqualObjects, A as hashKey, C as getDefaultState, D as notifyManager, F as useQueryClient, r as reactExports, G as noop, H as shouldThrowError, l as useActor, J as useQuery } from "./index-DNcnJBsr.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => actor.listCategories(),
    enabled: !!actor && !isFetching
  });
}
function useAllCategories() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["categories", "all"],
    queryFn: () => actor.listAllCategories(),
    enabled: !!actor && !isFetching
  });
}
function useProviders(filter, page, pageSize) {
  var _a2;
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: [
      "providers",
      (_a2 = filter.categoryId) == null ? void 0 : _a2.toString(),
      filter.state,
      filter.city,
      page.toString()
    ],
    queryFn: () => actor.listProviders(filter, page, pageSize),
    enabled: !!actor && !isFetching
  });
}
function useFeaturedProviders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["providers", "featured"],
    queryFn: async () => {
      const result = await actor.listProviders({}, 0n, 20n);
      const sorted = [...result.items].filter((p) => p.isVerified && p.isActive).sort((a, b) => b.averageRating - a.averageRating).slice(0, 6);
      return sorted;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
    // 5 min cache for featured
  });
}
function useProvider(id) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["provider", id == null ? void 0 : id.toString()],
    queryFn: () => actor.getProvider(id),
    enabled: !!actor && !isFetching && id !== void 0
  });
}
function useMyProviderProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myProviderProfile"],
    queryFn: () => actor.getMyProviderProfile(),
    enabled: !!actor && !isFetching
  });
}
function useCheckContactAvailable(providerId, currentHHMM) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["checkContactAvailable", providerId == null ? void 0 : providerId.toString(), currentHHMM],
    queryFn: () => actor.checkContactAvailable(providerId, currentHHMM),
    enabled: !!actor && !isFetching && providerId !== void 0,
    staleTime: 60 * 1e3
    // 1 min — time doesn't change that fast
  });
}
function useReviewsByProvider(providerId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["reviews", providerId == null ? void 0 : providerId.toString()],
    queryFn: () => actor.getReviewsByProvider(providerId),
    enabled: !!actor && !isFetching && providerId !== void 0
  });
}
function useMyReviews() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myReviews"],
    queryFn: () => actor.getMyReviews(),
    enabled: !!actor && !isFetching
  });
}
function useMyInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myInquiries"],
    queryFn: () => actor.getMyInquiries(),
    enabled: !!actor && !isFetching
  });
}
function useInquiriesByProvider(providerId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["inquiries", "provider", providerId == null ? void 0 : providerId.toString()],
    queryFn: () => actor.getInquiriesByProvider(providerId),
    enabled: !!actor && !isFetching && providerId !== void 0
  });
}
function useMyProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: () => actor.getMyProfile(),
    enabled: !!actor && !isFetching
  });
}
function useUsers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["users"],
    queryFn: () => actor.listUsers(),
    enabled: !!actor && !isFetching
  });
}
function useAdminStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: () => actor.getAdminStats(),
    enabled: !!actor && !isFetching
  });
}
function useRegisterUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.registerUser(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myProfile"] })
  });
}
function useUpdateUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.updateUserProfile(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myProfile"] })
  });
}
function useSubmitInquiry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.submitInquiry(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myInquiries"] })
  });
}
function useAddReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.addReview(input),
    onSuccess: (_data, vars) => qc.invalidateQueries({
      queryKey: ["reviews", vars.providerId.toString()]
    })
  });
}
function useCreateProviderProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.createProviderProfile(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProviderProfile"] });
      qc.invalidateQueries({ queryKey: ["providers"] });
    }
  });
}
function useUpdateProviderProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => actor.updateProviderProfile(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProviderProfile"] });
      qc.invalidateQueries({ queryKey: ["providers"] });
    }
  });
}
function useCreateCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.createCategory(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] })
  });
}
function useUpdateCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => actor.updateCategory(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] })
  });
}
function useDeleteCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => actor.deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] })
  });
}
function useSetCategoryActive() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }) => actor.setCategoryActive(id, isActive),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] })
  });
}
function useApproveProvider() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => actor.approveProvider(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["providers"] })
  });
}
function useDisableProvider() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => actor.disableProvider(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["providers"] })
  });
}
function useSetUserRole() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }) => actor.setUserRole(userId, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] })
  });
}
function useUpdateInquiryStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => actor.updateInquiryStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] })
  });
}
function useSeedSampleData() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => actor.seedSampleData(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["providers"] });
    }
  });
}
function useProviderClassVideos(providerId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["classVideos", "provider", providerId],
    queryFn: async () => {
      if (!actor || !providerId) return [];
      const ext = actor;
      if (typeof ext.getClassVideosByProvider !== "function") return [];
      return ext.getClassVideosByProvider(providerId);
    },
    enabled: !!actor && !isFetching && !!providerId
  });
}
function useMyClassVideos(providerId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["classVideos", "mine", providerId],
    queryFn: async () => {
      if (!actor || !providerId) return [];
      const ext = actor;
      if (typeof ext.getMyClassVideos !== "function") return [];
      return ext.getMyClassVideos(providerId);
    },
    enabled: !!actor && !isFetching && !!providerId
  });
}
function useAddClassVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      providerId,
      input
    }) => {
      const ext = actor;
      if (!ext || typeof ext.addClassVideo !== "function") {
        throw new Error("Backend method not available");
      }
      return ext.addClassVideo(providerId, input);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["classVideos", "mine", vars.providerId]
      });
      qc.invalidateQueries({ queryKey: ["classVideos"] });
    }
  });
}
function useDeleteClassVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      videoId,
      providerId
    }) => {
      const ext = actor;
      if (!ext || typeof ext.deleteClassVideo !== "function") {
        throw new Error("Backend method not available");
      }
      return ext.deleteClassVideo(videoId, providerId);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["classVideos", "mine", vars.providerId]
      });
      qc.invalidateQueries({ queryKey: ["classVideos"] });
    }
  });
}
function useToggleClassVideoActive() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      videoId,
      providerId
    }) => {
      const ext = actor;
      if (!ext || typeof ext.toggleClassVideoActive !== "function") {
        throw new Error("Backend method not available");
      }
      const result = await ext.toggleClassVideoActive(videoId, providerId);
      return result.length > 0 ? result[0] ?? null : null;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["classVideos", "mine", vars.providerId]
      });
      qc.invalidateQueries({ queryKey: ["classVideos"] });
    }
  });
}
function useOpenRegisterUser() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (input) => {
      const a = actor;
      if (!a || typeof a.openRegisterUser !== "function") {
        return { err: "Backend method not available yet" };
      }
      return a.openRegisterUser(input);
    }
  });
}
const VISITOR_ID_KEY = "ihv_uid";
function getOrCreateVisitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}
function useVisitorStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["visitorStats"],
    queryFn: async () => {
      if (!actor) return { totalVisits: 0n, uniqueVisitors: 0n };
      const ext = actor;
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
    staleTime: 60 * 1e3
  });
}
export {
  useUsers as A,
  useAllCategories as B,
  useDeleteCategory as C,
  useSetCategoryActive as D,
  useApproveProvider as E,
  useDisableProvider as F,
  useSetUserRole as G,
  useCreateCategory as H,
  useUpdateCategory as I,
  useOpenRegisterUser as J,
  useFeaturedProviders as a,
  useAdminStats as b,
  useSeedSampleData as c,
  useVisitorStats as d,
  useProviders as e,
  useProvider as f,
  useReviewsByProvider as g,
  useProviderClassVideos as h,
  useSubmitInquiry as i,
  useAddReview as j,
  useCheckContactAvailable as k,
  useMyProfile as l,
  useRegisterUser as m,
  useCreateProviderProfile as n,
  useMyInquiries as o,
  useMyReviews as p,
  useMyProviderProfile as q,
  useInquiriesByProvider as r,
  useUpdateUserProfile as s,
  useUpdateProviderProfile as t,
  useCategories as u,
  useMyClassVideos as v,
  useDeleteClassVideo as w,
  useToggleClassVideoActive as x,
  useUpdateInquiryStatus as y,
  useAddClassVideo as z
};

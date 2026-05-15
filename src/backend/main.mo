import UserTypes "types/users";
import ProvTypes "types/providers";
import CatTypes "types/categories";
import RevTypes "types/reviews";
import InqTypes "types/inquiries";
import OcTypes "types/online-classes";
import List "mo:core/List";


import UsersApi "mixins/users-api";
import ProvidersApi "mixins/providers-api";
import CategoriesApi "mixins/categories-api";
import ReviewsApi "mixins/reviews-api";
import InquiriesApi "mixins/inquiries-api";
import AdminApi "mixins/admin-api";
import VisitorsApi "mixins/visitors-api";
import OnlineClassesApi "mixins/online-classes-api";


actor {
  // --- State ---
  let users = List.empty<UserTypes.User>();
  let providers = List.empty<ProvTypes.Provider>();
  let categories = List.empty<CatTypes.Category>();
  let reviews = List.empty<RevTypes.Review>();
  let inquiries = List.empty<InqTypes.Inquiry>();

  let nextCategoryId = { var value : Nat = 1 };
  let nextProviderId = { var value : Nat = 1 };
  let nextReviewId = { var value : Nat = 1 };
  let nextInquiryId = { var value : Nat = 1 };

  // Open registration state
  let openUsers = List.empty<UserTypes.OpenUserRecord>();
  let nextOpenUserId = { var value : Nat = 1 };

  // Visitor counter state
  let visitCount = { var value : Nat = 0 };
  let seenVisitors = List.empty<Text>();

  // Online classes state
  let classVideos = List.empty<OcTypes.ClassVideo>();
  let nextClassVideoId = { var value : Nat = 1 };

  // --- Mixins ---
  include UsersApi(users, openUsers, nextOpenUserId);
  include CategoriesApi(categories, users, nextCategoryId);
  include ProvidersApi(providers, reviews, users, nextProviderId);
  include ReviewsApi(reviews, users, nextReviewId);
  include InquiriesApi(inquiries, users, nextInquiryId);
  include AdminApi(users, providers, categories, inquiries, reviews);
  include VisitorsApi(visitCount, seenVisitors);
  include OnlineClassesApi(classVideos, nextClassVideoId);
};

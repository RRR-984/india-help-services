import UserTypes "types/users";
import ProvTypes "types/providers";
import CatTypes "types/categories";
import RevTypes "types/reviews";
import InqTypes "types/inquiries";
import List "mo:core/List";

import UsersApi "mixins/users-api";
import ProvidersApi "mixins/providers-api";
import CategoriesApi "mixins/categories-api";
import ReviewsApi "mixins/reviews-api";
import InquiriesApi "mixins/inquiries-api";
import AdminApi "mixins/admin-api";

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

  // --- Mixins ---
  include UsersApi(users);
  include CategoriesApi(categories, users, nextCategoryId);
  include ProvidersApi(providers, reviews, users, nextProviderId);
  include ReviewsApi(reviews, users, nextReviewId);
  include InquiriesApi(inquiries, users, nextInquiryId);
  include AdminApi(users, providers, categories, inquiries);
};

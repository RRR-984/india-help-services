import Types "../types/common";
import UserTypes "../types/users";
import ProvTypes "../types/providers";
import CatTypes "../types/categories";
import InqTypes "../types/inquiries";
import RevTypes "../types/reviews";
import List "mo:core/List";

module {
  public type AdminStats = {
    totalProviders : Nat;
    totalSeekers : Nat;
    totalCategories : Nat;
    totalInquiries : Nat;
    totalReviews : Nat;
    avgPlatformRating : Float;
    pendingProviderApprovals : Nat;
  };

  public func getStats(
    users : List.List<UserTypes.User>,
    providers : List.List<ProvTypes.Provider>,
    categories : List.List<CatTypes.Category>,
    inquiries : List.List<InqTypes.Inquiry>,
    reviews : List.List<RevTypes.Review>
  ) : AdminStats {
    let seekerCount = users.filter(func(u) {
      switch (u.role) { case (#seeker) true; case _ false };
    }).size();

    let totalReviews = reviews.size();

    let avgPlatformRating = if (totalReviews == 0) {
      0.0;
    } else {
      let sum = reviews.foldLeft(0, func(acc, r) { acc + r.rating });
      sum.toFloat() / totalReviews.toFloat();
    };

    // Pending = active providers that have NOT yet been verified
    let pendingApprovals = providers.filter(func(p) {
      p.isActive and (not p.isVerified)
    }).size();

    {
      totalProviders = providers.size();
      totalSeekers = seekerCount;
      totalCategories = categories.size();
      totalInquiries = inquiries.size();
      totalReviews;
      avgPlatformRating;
      pendingProviderApprovals = pendingApprovals;
    };
  };
};

import Types "../types/common";
import UserTypes "../types/users";
import ProvTypes "../types/providers";
import CatTypes "../types/categories";
import InqTypes "../types/inquiries";
import List "mo:core/List";

module {
  public type AdminStats = {
    totalProviders : Nat;
    totalSeekers : Nat;
    totalCategories : Nat;
    totalInquiries : Nat;
  };

  public func getStats(
    users : List.List<UserTypes.User>,
    providers : List.List<ProvTypes.Provider>,
    categories : List.List<CatTypes.Category>,
    inquiries : List.List<InqTypes.Inquiry>
  ) : AdminStats {
    let seekerCount = users.filter(func(u) {
      switch (u.role) { case (#seeker) true; case _ false };
    }).size();

    {
      totalProviders = providers.size();
      totalSeekers = seekerCount;
      totalCategories = categories.size();
      totalInquiries = inquiries.size();
    };
  };
};

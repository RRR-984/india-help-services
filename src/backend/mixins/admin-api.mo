import Types "../types/common";
import AdminLib "../lib/admin";
import UserTypes "../types/users";
import ProvTypes "../types/providers";
import CatTypes "../types/categories";
import InqTypes "../types/inquiries";
import RevTypes "../types/reviews";
import UserLib "../lib/users";
import CatLib "../lib/categories";
import ProvLib "../lib/providers";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  users : List.List<UserTypes.User>,
  providers : List.List<ProvTypes.Provider>,
  categories : List.List<CatTypes.Category>,
  inquiries : List.List<InqTypes.Inquiry>,
  reviews : List.List<RevTypes.Review>
) {
  public query ({ caller }) func getAdminStats() : async AdminLib.AdminStats {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    AdminLib.getStats(users, providers, categories, inquiries, reviews);
  };

  public shared ({ caller }) func seedSampleData() : async Bool {
    // Allow seeding only when categories are empty (first-time setup)
    if (CatLib.listAll(categories).size() > 0) return false;
    ignore CatLib.seedDefaults(categories, 1);
    ignore ProvLib.seedSamples(providers, 1);
    true;
  };
};

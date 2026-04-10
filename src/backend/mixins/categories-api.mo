import Types "../types/common";
import CatTypes "../types/categories";
import CatLib "../lib/categories";
import UserLib "../lib/users";
import UserTypes "../types/users";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  categories : List.List<CatTypes.Category>,
  users : List.List<UserTypes.User>,
  nextCategoryId : { var value : Nat }
) {
  public query func listCategories() : async [CatTypes.Category] {
    CatLib.listActive(categories);
  };

  public query func listAllCategories() : async [CatTypes.Category] {
    CatLib.listAll(categories);
  };

  public query func getCategory(id : Types.CategoryId) : async ?CatTypes.Category {
    CatLib.getById(categories, id);
  };

  public shared ({ caller }) func createCategory(input : CatTypes.CategoryInput) : async CatTypes.Category {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    let id = nextCategoryId.value;
    nextCategoryId.value += 1;
    CatLib.create(categories, id, input);
  };

  public shared ({ caller }) func updateCategory(id : Types.CategoryId, input : CatTypes.CategoryInput) : async ?CatTypes.Category {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    CatLib.update(categories, id, input);
  };

  public shared ({ caller }) func setCategoryActive(id : Types.CategoryId, isActive : Bool) : async Bool {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    CatLib.setActive(categories, id, isActive);
  };

  public shared ({ caller }) func deleteCategory(id : Types.CategoryId) : async Bool {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    CatLib.delete(categories, id);
  };
};

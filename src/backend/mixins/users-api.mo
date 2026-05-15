import Types "../types/common";
import UserTypes "../types/users";
import UserLib "../lib/users";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  users : List.List<UserTypes.User>,
  openUsers : List.List<UserTypes.OpenUserRecord>,
  nextOpenUserId : { var value : Nat }
) {
  public query ({ caller }) func getMyProfile() : async ?UserTypes.User {
    UserLib.getById(users, caller);
  };

  public shared ({ caller }) func registerUser(input : UserTypes.UserInput) : async UserTypes.User {
    switch (UserLib.getById(users, caller)) {
      case (?existing) existing;
      case null { UserLib.register(users, caller, input) };
    };
  };

  public shared ({ caller }) func updateUserProfile(input : UserTypes.UserUpdateInput) : async ?UserTypes.User {
    UserLib.update(users, caller, input);
  };

  public shared ({ caller }) func setUserRole(userId : Types.UserId, role : Types.Role) : async Bool {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    UserLib.setRole(users, userId, role);
  };

  public query ({ caller }) func listUsers() : async [UserTypes.User] {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    UserLib.listAll(users);
  };

  // Open registration — no login required, duplicate check by phone/email
  public shared func openRegisterUser(input : UserTypes.OpenUserInput) : async UserTypes.OpenRegisterResult {
    UserLib.openRegister(openUsers, nextOpenUserId, input);
  };

  public query func getOpenUserCount() : async Nat {
    UserLib.openUserCount(openUsers);
  };
};

import Types "../types/common";
import ProvTypes "../types/providers";
import RevTypes "../types/reviews";
import UserTypes "../types/users";
import ProvLib "../lib/providers";
import UserLib "../lib/users";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  providers : List.List<ProvTypes.Provider>,
  reviews : List.List<RevTypes.Review>,
  users : List.List<UserTypes.User>,
  nextProviderId : { var value : Nat }
) {
  public query func listProviders(filter : Types.ProviderFilter, page : Nat, pageSize : Nat) : async Types.Page<ProvTypes.ProviderSummary> {
    ProvLib.list(providers, reviews, filter, page, pageSize);
  };

  public query func getProvider(id : Types.ProviderId) : async ?ProvTypes.Provider {
    ProvLib.getById(providers, reviews, id);
  };

  public query ({ caller }) func getMyProviderProfile() : async ?ProvTypes.Provider {
    ProvLib.getByUserId(providers, caller);
  };

  public shared ({ caller }) func createProviderProfile(input : ProvTypes.ProviderInput) : async ProvTypes.Provider {
    switch (ProvLib.getByUserId(providers, caller)) {
      case (?existing) existing;
      case null {
        let id = nextProviderId.value;
        nextProviderId.value += 1;
        let provider = ProvLib.create(providers, id, caller, input);
        // Set caller role to provider
        ignore UserLib.setRole(users, caller, #provider);
        provider;
      };
    };
  };

  public shared ({ caller }) func updateProviderProfile(id : Types.ProviderId, input : ProvTypes.ProviderInput) : async ?ProvTypes.Provider {
    ProvLib.update(providers, id, caller, input);
  };

  public shared ({ caller }) func approveProvider(id : Types.ProviderId) : async Bool {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    ProvLib.setVerified(providers, id, true);
  };

  public shared ({ caller }) func disableProvider(id : Types.ProviderId) : async Bool {
    if (not UserLib.isAdmin(users, caller)) Runtime.trap("Unauthorized: admin only");
    ProvLib.setActive(providers, id, false);
  };
};

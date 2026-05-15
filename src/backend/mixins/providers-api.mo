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
  // ── list (basic filter, backward-compatible) ─────────────────────────────

  public query func listProviders(filter : Types.ProviderFilter, page : Nat, pageSize : Nat) : async Types.Page<ProvTypes.ProviderSummary> {
    Runtime.trap("not implemented");
  };

  // ── searchProviders (full-text + extended filter) ─────────────────────────

  public query func searchProviders(filter : Types.ProviderSearchFilter, page : Nat, pageSize : Nat) : async Types.Page<ProvTypes.ProviderSummary> {
    Runtime.trap("not implemented");
  };

  // ── getProvidersByCategory (paginated) ────────────────────────────────────

  public query func getProvidersByCategory(categoryId : Types.CategoryId, page : Nat, pageSize : Nat) : async Types.Page<ProvTypes.ProviderSummary> {
    Runtime.trap("not implemented");
  };

  // ── getFeaturedProviders — top-rated verified providers for home page ──────

  public query func getFeaturedProviders() : async [ProvTypes.ProviderSummary] {
    Runtime.trap("not implemented");
  };

  // ── get single provider ───────────────────────────────────────────────────

  public query func getProvider(id : Types.ProviderId) : async ?ProvTypes.Provider {
    Runtime.trap("not implemented");
  };

  public query ({ caller }) func getMyProviderProfile() : async ?ProvTypes.Provider {
    Runtime.trap("not implemented");
  };

  // ── isContactAvailable — frontend passes current IST time as "HH:MM" ──────
  // Returns true when provider has NOT enabled availability gating OR current
  // time falls within their configured window.

  public query func checkContactAvailable(providerId : Types.ProviderId, currentHHMM : Text) : async Bool {
    Runtime.trap("not implemented");
  };

  // ── create / update ───────────────────────────────────────────────────────

  public shared ({ caller }) func createProviderProfile(input : ProvTypes.ProviderInput) : async ProvTypes.Provider {
    Runtime.trap("not implemented");
  };

  // updateProviderProfile accepts availability fields via ProviderInput
  // (contactAvailabilityEnabled, availableFrom, availableTo are all ?-typed)

  public shared ({ caller }) func updateProviderProfile(id : Types.ProviderId, input : ProvTypes.ProviderInput) : async ?ProvTypes.Provider {
    Runtime.trap("not implemented");
  };

  // ── admin actions ─────────────────────────────────────────────────────────

  public shared ({ caller }) func approveProvider(id : Types.ProviderId) : async Bool {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func disableProvider(id : Types.ProviderId) : async Bool {
    Runtime.trap("not implemented");
  };
};

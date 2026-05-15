import Types "../types/common";
import ProvTypes "../types/providers";
import RevTypes "../types/reviews";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

module {
  // ── helpers ──────────────────────────────────────────────────────────────

  public func computeAverageRating(
    reviews : List.List<RevTypes.Review>,
    providerId : Types.ProviderId
  ) : Float {
    let providerReviews = reviews.filter(func(r) { r.providerId == providerId });
    let count = providerReviews.size();
    if (count == 0) return 0.0;
    let total = providerReviews.foldLeft(0, func(acc, r) { acc + r.rating });
    total.toFloat() / count.toFloat();
  };

  public func computeReviewCount(
    reviews : List.List<RevTypes.Review>,
    providerId : Types.ProviderId
  ) : Nat {
    reviews.filter(func(r) { r.providerId == providerId }).size();
  };

  public func toSummary(
    p : ProvTypes.Provider,
    reviews : List.List<RevTypes.Review>
  ) : ProvTypes.ProviderSummary {
    let providerReviews = reviews.filter(func(r) { r.providerId == p.id });
    let reviewCount = providerReviews.size();
    let avgRating = if (reviewCount == 0) {
      0.0;
    } else {
      let total = providerReviews.foldLeft(0, func(acc, r) { acc + r.rating });
      total.toFloat() / reviewCount.toFloat();
    };
    {
      id = p.id;
      userId = p.userId;
      businessName = p.businessName;
      ownerName = p.ownerName;
      state = p.state;
      city = p.city;
      categoryIds = p.categoryIds;
      averageRating = avgRating;
      reviewCount = reviewCount;
      isVerified = p.isVerified;
      isActive = p.isActive;
      profileImage = p.profileImage;
    };
  };

  // ── isContactAvailable ────────────────────────────────────────────────────
  // Returns true when:
  //   • contactAvailabilityEnabled is null/false (feature not enabled), OR
  //   • currentHHMM falls within [availableFrom, availableTo] (inclusive both ends)
  // currentHHMM is passed from the frontend in 24-hour "HH:MM" format (IST).

  func parseHHMM(t : Text) : ?Nat {
    // split on ':'
    let parts = t.split(#char ':');
    switch (parts.next()) {
      case null null;
      case (?hhText) {
        switch (parts.next()) {
          case null null;
          case (?mmText) {
            switch (hhText.toNat(), mmText.toNat()) {
              case (?hh, ?mm) {
                if (hh > 23 or mm > 59) null
                else ?(hh * 60 + mm)
              };
              case _ null;
            };
          };
        };
      };
    };
  };

  public func isContactAvailable(provider : ProvTypes.Provider, currentHHMM : Text) : Bool {
    Runtime.trap("not implemented");
  };

  // ── list (basic filter, backward-compatible) ─────────────────────────────

  public func list(
    providers : List.List<ProvTypes.Provider>,
    reviews : List.List<RevTypes.Review>,
    filter : Types.ProviderFilter,
    page : Nat,
    pageSize : Nat
  ) : Types.Page<ProvTypes.ProviderSummary> {
    Runtime.trap("not implemented");
  };

  // ── searchProviders (extended filter) ────────────────────────────────────

  func textMatchesProvider(q : Text, p : ProvTypes.Provider) : Bool {
    Runtime.trap("not implemented");
  };

  public func search(
    providers : List.List<ProvTypes.Provider>,
    reviews : List.List<RevTypes.Review>,
    filter : Types.ProviderSearchFilter,
    page : Nat,
    pageSize : Nat
  ) : Types.Page<ProvTypes.ProviderSummary> {
    Runtime.trap("not implemented");
  };

  // ── getByCategory (paginated) ─────────────────────────────────────────────

  public func getByCategory(
    providers : List.List<ProvTypes.Provider>,
    reviews : List.List<RevTypes.Review>,
    categoryId : Types.CategoryId,
    page : Nat,
    pageSize : Nat
  ) : Types.Page<ProvTypes.ProviderSummary> {
    Runtime.trap("not implemented");
  };

  // ── getFeatured — top-rated verified providers ─────────────────────────────

  public func getFeatured(
    providers : List.List<ProvTypes.Provider>,
    reviews : List.List<RevTypes.Review>,
    limit : Nat
  ) : [ProvTypes.ProviderSummary] {
    Runtime.trap("not implemented");
  };

  // ── CRUD ──────────────────────────────────────────────────────────────────

  public func getById(
    providers : List.List<ProvTypes.Provider>,
    reviews : List.List<RevTypes.Review>,
    id : Types.ProviderId
  ) : ?ProvTypes.Provider {
    Runtime.trap("not implemented");
  };

  public func getByUserId(
    providers : List.List<ProvTypes.Provider>,
    userId : Types.UserId
  ) : ?ProvTypes.Provider {
    Runtime.trap("not implemented");
  };

  public func create(
    providers : List.List<ProvTypes.Provider>,
    nextId : Nat,
    userId : Types.UserId,
    input : ProvTypes.ProviderInput
  ) : ProvTypes.Provider {
    Runtime.trap("not implemented");
  };

  public func update(
    providers : List.List<ProvTypes.Provider>,
    id : Types.ProviderId,
    caller : Types.UserId,
    input : ProvTypes.ProviderInput
  ) : ?ProvTypes.Provider {
    Runtime.trap("not implemented");
  };

  public func setActive(
    providers : List.List<ProvTypes.Provider>,
    id : Types.ProviderId,
    isActive : Bool
  ) : Bool {
    Runtime.trap("not implemented");
  };

  public func setVerified(
    providers : List.List<ProvTypes.Provider>,
    id : Types.ProviderId,
    isVerified : Bool
  ) : Bool {
    Runtime.trap("not implemented");
  };

  // ── seedSamples — realistic providers across all 9 categories ─────────────

  public func seedSamples(
    providers : List.List<ProvTypes.Provider>,
    startId : Nat
  ) : Nat {
    Runtime.trap("not implemented");
  };
};

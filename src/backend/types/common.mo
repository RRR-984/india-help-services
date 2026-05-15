import Time "mo:core/Time";

module {
  public type Timestamp = Time.Time;
  public type UserId = Principal;
  public type CategoryId = Nat;
  public type ProviderId = Nat;
  public type ReviewId = Nat;
  public type InquiryId = Nat;

  public type Role = {
    #seeker;
    #provider;
    #admin;
  };

  public type InquiryStatus = {
    #pending;
    #responded;
    #closed;
  };

  public type BilingualText = {
    en : Text;
    hi : Text;
  };

  public type Page<T> = {
    items : [T];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };

  // Basic location/category filter (backward-compatible)
  public type ProviderFilter = {
    categoryId : ?CategoryId;
    state : ?Text;
    city : ?Text;
  };

  // Extended search filter with text query, rating, and verified flag
  public type ProviderSearchFilter = {
    searchQuery : ?Text;     // partial match on name / businessName / services
    categoryId : ?CategoryId;
    state : ?Text;
    city : ?Text;
    minRating : ?Float;
    isVerified : ?Bool;
  };
};

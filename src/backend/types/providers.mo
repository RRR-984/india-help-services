import Types "common";

module {
  public type ServiceOffered = {
    serviceId : Nat;
    title : Text;
    description : Text;
    price : ?Text;
    availability : Text;
  };

  public type Provider = {
    id : Types.ProviderId;
    userId : Types.UserId;
    businessName : Text;
    ownerName : Text;
    email : Text;
    phone : Text;
    address : Text;
    state : Text;
    city : Text;
    serviceAreas : [Text];
    servicesOffered : [ServiceOffered];
    bioEn : Text;
    bioHi : Text;
    profileImage : ?Text;
    categoryIds : [Types.CategoryId];
    isVerified : Bool;
    isActive : Bool;
    createdAt : Types.Timestamp;
    // Availability / contact-hiding fields (optional for backward-compatibility)
    contactAvailabilityEnabled : ?Bool;
    availableFrom : ?Text;
    availableTo : ?Text;
  };

  public type ProviderInput = {
    businessName : Text;
    ownerName : Text;
    email : Text;
    phone : Text;
    address : Text;
    state : Text;
    city : Text;
    serviceAreas : [Text];
    servicesOffered : [ServiceOffered];
    bioEn : Text;
    bioHi : Text;
    profileImage : ?Text;
    categoryIds : [Types.CategoryId];
    // Availability fields (optional in input — keep defaults if omitted)
    contactAvailabilityEnabled : ?Bool;
    availableFrom : ?Text;
    availableTo : ?Text;
  };

  public type ProviderSummary = {
    id : Types.ProviderId;
    userId : Types.UserId;
    businessName : Text;
    ownerName : Text;
    state : Text;
    city : Text;
    categoryIds : [Types.CategoryId];
    averageRating : Float;
    reviewCount : Nat;
    isVerified : Bool;
    isActive : Bool;
    profileImage : ?Text;
  };
};

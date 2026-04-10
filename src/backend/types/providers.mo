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

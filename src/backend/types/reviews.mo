import Types "common";

module {
  public type Review = {
    id : Types.ReviewId;
    providerId : Types.ProviderId;
    seekerId : Types.UserId;
    rating : Nat;
    comment : Text;
    createdAt : Types.Timestamp;
  };

  public type ReviewInput = {
    providerId : Types.ProviderId;
    rating : Nat;
    comment : Text;
  };
};

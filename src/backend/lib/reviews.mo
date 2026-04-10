import Types "../types/common";
import RevTypes "../types/reviews";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public func getByProvider(
    reviews : List.List<RevTypes.Review>,
    providerId : Types.ProviderId
  ) : [RevTypes.Review] {
    reviews.filter(func(r) { r.providerId == providerId }).toArray();
  };

  public func getBySeeker(
    reviews : List.List<RevTypes.Review>,
    seekerId : Types.UserId
  ) : [RevTypes.Review] {
    reviews.filter(func(r) { Principal.equal(r.seekerId, seekerId) }).toArray();
  };

  public func add(
    reviews : List.List<RevTypes.Review>,
    nextId : Nat,
    seekerId : Types.UserId,
    input : RevTypes.ReviewInput
  ) : RevTypes.Review {
    let review : RevTypes.Review = {
      id = nextId;
      providerId = input.providerId;
      seekerId = seekerId;
      rating = if (input.rating > 5) 5 else input.rating;
      comment = input.comment;
      createdAt = Time.now();
    };
    reviews.add(review);
    review;
  };

  public func hasReviewed(
    reviews : List.List<RevTypes.Review>,
    seekerId : Types.UserId,
    providerId : Types.ProviderId
  ) : Bool {
    switch (reviews.find(func(r) {
      r.providerId == providerId and Principal.equal(r.seekerId, seekerId)
    })) {
      case (?_) true;
      case null false;
    };
  };
};

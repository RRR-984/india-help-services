import Types "../types/common";
import RevTypes "../types/reviews";
import UserTypes "../types/users";
import RevLib "../lib/reviews";
import UserLib "../lib/users";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  reviews : List.List<RevTypes.Review>,
  users : List.List<UserTypes.User>,
  nextReviewId : { var value : Nat }
) {
  public query func getReviewsByProvider(providerId : Types.ProviderId) : async [RevTypes.Review] {
    RevLib.getByProvider(reviews, providerId);
  };

  public query ({ caller }) func getMyReviews() : async [RevTypes.Review] {
    RevLib.getBySeeker(reviews, caller);
  };

  public shared ({ caller }) func addReview(input : RevTypes.ReviewInput) : async RevTypes.Review {
    if (RevLib.hasReviewed(reviews, caller, input.providerId)) {
      Runtime.trap("You have already reviewed this provider");
    };
    let id = nextReviewId.value;
    nextReviewId.value += 1;
    RevLib.add(reviews, id, caller, input);
  };
};

import List "mo:core/List";

mixin (
  visitCount : { var value : Nat },
  seenVisitors : List.List<Text>
) {
  // Track a visit: always increments totalVisits; uniqueVisitors only if visitorId is new
  public shared func trackVisit(visitorId : Text) : async { totalVisits : Nat; uniqueVisitors : Nat } {
    visitCount.value += 1;
    let alreadySeen = seenVisitors.find(func(id) { id == visitorId });
    switch (alreadySeen) {
      case null { seenVisitors.add(visitorId) };
      case (?_) {};
    };
    { totalVisits = visitCount.value; uniqueVisitors = seenVisitors.size() };
  };

  public query func getVisitorStats() : async { totalVisits : Nat; uniqueVisitors : Nat } {
    { totalVisits = visitCount.value; uniqueVisitors = seenVisitors.size() };
  };
};

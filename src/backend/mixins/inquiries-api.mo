import Types "../types/common";
import InqTypes "../types/inquiries";
import UserTypes "../types/users";
import InqLib "../lib/inquiries";
import UserLib "../lib/users";
import List "mo:core/List";

mixin (
  inquiries : List.List<InqTypes.Inquiry>,
  users : List.List<UserTypes.User>,
  nextInquiryId : { var value : Nat }
) {
  public shared ({ caller }) func submitInquiry(input : InqTypes.InquiryInput) : async InqTypes.Inquiry {
    let id = nextInquiryId.value;
    nextInquiryId.value += 1;
    InqLib.submit(inquiries, id, caller, input);
  };

  public query ({ caller }) func getInquiriesByProvider(providerId : Types.ProviderId) : async [InqTypes.Inquiry] {
    InqLib.getByProvider(inquiries, providerId);
  };

  public query ({ caller }) func getMyInquiries() : async [InqTypes.Inquiry] {
    InqLib.getBySeeker(inquiries, caller);
  };

  public shared ({ caller }) func updateInquiryStatus(id : Types.InquiryId, status : Types.InquiryStatus) : async ?InqTypes.Inquiry {
    InqLib.updateStatus(inquiries, id, caller, status);
  };
};

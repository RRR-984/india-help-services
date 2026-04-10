import Types "../types/common";
import InqTypes "../types/inquiries";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public func getByProvider(
    inquiries : List.List<InqTypes.Inquiry>,
    providerId : Types.ProviderId
  ) : [InqTypes.Inquiry] {
    inquiries.filter(func(i) { i.providerId == providerId }).toArray();
  };

  public func getBySeeker(
    inquiries : List.List<InqTypes.Inquiry>,
    seekerId : Types.UserId
  ) : [InqTypes.Inquiry] {
    inquiries.filter(func(i) { Principal.equal(i.seekerId, seekerId) }).toArray();
  };

  public func submit(
    inquiries : List.List<InqTypes.Inquiry>,
    nextId : Nat,
    seekerId : Types.UserId,
    input : InqTypes.InquiryInput
  ) : InqTypes.Inquiry {
    let inquiry : InqTypes.Inquiry = {
      id = nextId;
      providerId = input.providerId;
      seekerId = seekerId;
      serviceName = input.serviceName;
      message = input.message;
      preferredContact = input.preferredContact;
      status = #pending;
      createdAt = Time.now();
    };
    inquiries.add(inquiry);
    inquiry;
  };

  public func updateStatus(
    inquiries : List.List<InqTypes.Inquiry>,
    id : Types.InquiryId,
    caller : Types.UserId,
    status : Types.InquiryStatus
  ) : ?InqTypes.Inquiry {
    var updated : ?InqTypes.Inquiry = null;
    inquiries.mapInPlace(func(i) {
      if (i.id == id) {
        let newInq = { i with status = status };
        updated := ?newInq;
        newInq;
      } else { i };
    });
    updated;
  };

  public func countAll(
    inquiries : List.List<InqTypes.Inquiry>
  ) : Nat {
    inquiries.size();
  };
};

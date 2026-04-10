import Types "common";

module {
  public type Inquiry = {
    id : Types.InquiryId;
    providerId : Types.ProviderId;
    seekerId : Types.UserId;
    serviceName : Text;
    message : Text;
    preferredContact : Text;
    status : Types.InquiryStatus;
    createdAt : Types.Timestamp;
  };

  public type InquiryInput = {
    providerId : Types.ProviderId;
    serviceName : Text;
    message : Text;
    preferredContact : Text;
  };
};

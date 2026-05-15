import Types "common";

module {
  // Sub-categories of online classes
  public type ClassSubCategory = {
    #yoga;
    #dhyan;   // Meditation / Dhyan
    #fitness; // Fitness Club
    #coaching; // Coaching Classes
  };

  // A video uploaded by a provider for an online class
  public type ClassVideo = {
    id : Nat;
    providerId : Types.ProviderId;
    title : Text;
    description : Text;
    subCategory : ClassSubCategory;
    fileKey : Text; // object-storage key: "videos/{providerId}/{videoId}"
    uploadedAt : Int; // Time.now() — nanoseconds
    isActive : Bool;
  };

  // Input type for adding a new class video (sans generated fields)
  public type ClassVideoInput = {
    title : Text;
    description : Text;
    subCategory : ClassSubCategory;
    fileKey : Text;
  };

  // Public/shared view — same as ClassVideo (all fields are shared types)
  public type ClassVideoSummary = {
    id : Nat;
    providerId : Types.ProviderId;
    title : Text;
    description : Text;
    subCategory : ClassSubCategory;
    fileKey : Text;
    uploadedAt : Int;
    isActive : Bool;
  };
};

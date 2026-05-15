import Types "common";

module {
  public type User = {
    id : Types.UserId;
    name : Text;
    email : Text;
    phone : Text;
    state : Text;
    city : Text;
    role : Types.Role;
    createdAt : Types.Timestamp;
  };

  public type UserInput = {
    name : Text;
    email : Text;
    phone : Text;
    state : Text;
    city : Text;
  };

  public type UserUpdateInput = {
    name : Text;
    email : Text;
    phone : Text;
    state : Text;
    city : Text;
    role : ?Types.Role;
  };

  // Result type for open registration (avoids deprecated Result module)
  public type OpenRegisterResult = { #ok : OpenUserRecord; #err : Text };

  // Open (no-login) registration types
  public type OpenUserInput = {
    name : Text;
    phone : Text;
    email : Text;
    city : Text;
    state : Text;
    serviceCategory : Text;
    role : Types.Role;
  };

  public type OpenUserRecord = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    city : Text;
    state : Text;
    serviceCategory : Text;
    role : Types.Role;
    createdAt : Types.Timestamp;
  };
};

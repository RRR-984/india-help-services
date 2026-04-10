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
};

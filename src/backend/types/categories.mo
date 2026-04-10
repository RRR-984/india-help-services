import Types "common";

module {
  public type Category = {
    id : Types.CategoryId;
    name : Types.BilingualText;
    description : Types.BilingualText;
    icon : Text;
    color : Text;
    displayOrder : Nat;
    isActive : Bool;
  };

  public type CategoryInput = {
    name : Types.BilingualText;
    description : Types.BilingualText;
    icon : Text;
    color : Text;
    displayOrder : Nat;
  };
};

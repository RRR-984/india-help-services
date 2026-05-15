import Types "../types/common";
import UserTypes "../types/users";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
module {
  public func getById(
    users : List.List<UserTypes.User>,
    id : Types.UserId
  ) : ?UserTypes.User {
    users.find(func(u) { Principal.equal(u.id, id) });
  };

  public func register(
    users : List.List<UserTypes.User>,
    caller : Types.UserId,
    input : UserTypes.UserInput
  ) : UserTypes.User {
    let user : UserTypes.User = {
      id = caller;
      name = input.name;
      email = input.email;
      phone = input.phone;
      state = input.state;
      city = input.city;
      role = #seeker;
      createdAt = Time.now();
    };
    users.add(user);
    user;
  };

  public func update(
    users : List.List<UserTypes.User>,
    caller : Types.UserId,
    input : UserTypes.UserUpdateInput
  ) : ?UserTypes.User {
    var updated : ?UserTypes.User = null;
    users.mapInPlace(func(u) {
      if (Principal.equal(u.id, caller)) {
        let newRole = switch (input.role) {
          case (?r) r;
          case null u.role;
        };
        let newUser = { u with
          name = input.name;
          email = input.email;
          phone = input.phone;
          state = input.state;
          city = input.city;
          role = newRole;
        };
        updated := ?newUser;
        newUser;
      } else { u };
    });
    updated;
  };

  public func setRole(
    users : List.List<UserTypes.User>,
    userId : Types.UserId,
    role : Types.Role
  ) : Bool {
    var found = false;
    users.mapInPlace(func(u) {
      if (Principal.equal(u.id, userId)) {
        found := true;
        { u with role = role };
      } else { u };
    });
    found;
  };

  public func isAdmin(
    users : List.List<UserTypes.User>,
    caller : Types.UserId
  ) : Bool {
    switch (users.find(func(u) { Principal.equal(u.id, caller) })) {
      case (?u) {
        switch (u.role) { case (#admin) true; case _ false };
      };
      case null false;
    };
  };

  public func listAll(
    users : List.List<UserTypes.User>
  ) : [UserTypes.User] {
    users.toArray();
  };

  public func countByRole(
    users : List.List<UserTypes.User>,
    role : Types.Role
  ) : Nat {
    users.filter(func(u) {
      switch (role) {
        case (#seeker) { switch (u.role) { case (#seeker) true; case _ false } };
        case (#provider) { switch (u.role) { case (#provider) true; case _ false } };
        case (#admin) { switch (u.role) { case (#admin) true; case _ false } };
      };
    }).size();
  };

  // Open registration (no Principal required)
  public func openRegister(
    openUsers : List.List<UserTypes.OpenUserRecord>,
    nextId : { var value : Nat },
    input : UserTypes.OpenUserInput
  ) : UserTypes.OpenRegisterResult {
    // Duplicate check by phone or email
    let duplicate = openUsers.find(func(u) {
      (input.phone != "" and u.phone == input.phone) or
      (input.email != "" and u.email == input.email)
    });
    switch (duplicate) {
      case (?_) {
        #err("Is phone ya email se pehle se registration ho chuka hai. Duplicate registration allowed nahi hai.");
      };
      case null {
        let id = nextId.value;
        nextId.value += 1;
        let record : UserTypes.OpenUserRecord = {
          id;
          name = input.name;
          phone = input.phone;
          email = input.email;
          city = input.city;
          state = input.state;
          serviceCategory = input.serviceCategory;
          role = input.role;
          createdAt = Time.now();
        };
        openUsers.add(record);
        #ok(record);
      };
    };
  };

  public func openUserCount(
    openUsers : List.List<UserTypes.OpenUserRecord>
  ) : Nat {
    openUsers.size();
  };
};

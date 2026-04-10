import Types "../types/common";
import ProvTypes "../types/providers";
import RevTypes "../types/reviews";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public func computeAverageRating(
    reviews : List.List<RevTypes.Review>,
    providerId : Types.ProviderId
  ) : Float {
    let providerReviews = reviews.filter(func(r) { r.providerId == providerId });
    let count = providerReviews.size();
    if (count == 0) return 0.0;
    let total = providerReviews.foldLeft(0, func(acc, r) { acc + r.rating });
    total.toFloat() / count.toFloat();
  };

  public func toSummary(
    p : ProvTypes.Provider,
    reviews : List.List<RevTypes.Review>
  ) : ProvTypes.ProviderSummary {
    let providerReviews = reviews.filter(func(r) { r.providerId == p.id });
    let reviewCount = providerReviews.size();
    let avgRating = if (reviewCount == 0) {
      0.0;
    } else {
      let total = providerReviews.foldLeft(0, func(acc, r) { acc + r.rating });
      total.toFloat() / reviewCount.toFloat();
    };
    {
      id = p.id;
      userId = p.userId;
      businessName = p.businessName;
      ownerName = p.ownerName;
      state = p.state;
      city = p.city;
      categoryIds = p.categoryIds;
      averageRating = avgRating;
      reviewCount = reviewCount;
      isVerified = p.isVerified;
      isActive = p.isActive;
      profileImage = p.profileImage;
    };
  };

  public func list(
    providers : List.List<ProvTypes.Provider>,
    reviews : List.List<RevTypes.Review>,
    filter : Types.ProviderFilter,
    page : Nat,
    pageSize : Nat
  ) : Types.Page<ProvTypes.ProviderSummary> {
    let filtered = providers.filter(func(p) {
      if (not p.isActive) return false;
      let catMatch = switch (filter.categoryId) {
        case null true;
        case (?cid) {
          switch (p.categoryIds.find(func(c) { c == cid })) {
            case (?_) true;
            case null false;
          };
        };
      };
      let stateMatch = switch (filter.state) {
        case null true;
        case (?s) { p.state == s };
      };
      let cityMatch = switch (filter.city) {
        case null true;
        case (?c) { p.city == c };
      };
      catMatch and stateMatch and cityMatch;
    });

    let total = filtered.size();
    let startIdx = page * pageSize;
    let items = if (startIdx >= total) {
      [];
    } else {
      let endIdx = if (startIdx + pageSize > total) total else startIdx + pageSize;
      filtered.sliceToArray(startIdx, endIdx)
        .map(func(p : ProvTypes.Provider) : ProvTypes.ProviderSummary { toSummary(p, reviews) });
    };

    { items; total; page; pageSize };
  };

  public func getById(
    providers : List.List<ProvTypes.Provider>,
    reviews : List.List<RevTypes.Review>,
    id : Types.ProviderId
  ) : ?ProvTypes.Provider {
    providers.find(func(p) { p.id == id });
  };

  public func getByUserId(
    providers : List.List<ProvTypes.Provider>,
    userId : Types.UserId
  ) : ?ProvTypes.Provider {
    providers.find(func(p) { Principal.equal(p.userId, userId) });
  };

  public func create(
    providers : List.List<ProvTypes.Provider>,
    nextId : Nat,
    userId : Types.UserId,
    input : ProvTypes.ProviderInput
  ) : ProvTypes.Provider {
    let provider : ProvTypes.Provider = {
      id = nextId;
      userId = userId;
      businessName = input.businessName;
      ownerName = input.ownerName;
      email = input.email;
      phone = input.phone;
      address = input.address;
      state = input.state;
      city = input.city;
      serviceAreas = input.serviceAreas;
      servicesOffered = input.servicesOffered;
      bioEn = input.bioEn;
      bioHi = input.bioHi;
      profileImage = input.profileImage;
      categoryIds = input.categoryIds;
      isVerified = false;
      isActive = true;
      createdAt = Time.now();
    };
    providers.add(provider);
    provider;
  };

  public func update(
    providers : List.List<ProvTypes.Provider>,
    id : Types.ProviderId,
    caller : Types.UserId,
    input : ProvTypes.ProviderInput
  ) : ?ProvTypes.Provider {
    var updated : ?ProvTypes.Provider = null;
    providers.mapInPlace(func(p) {
      if (p.id == id and Principal.equal(p.userId, caller)) {
        let newProv = { p with
          businessName = input.businessName;
          ownerName = input.ownerName;
          email = input.email;
          phone = input.phone;
          address = input.address;
          state = input.state;
          city = input.city;
          serviceAreas = input.serviceAreas;
          servicesOffered = input.servicesOffered;
          bioEn = input.bioEn;
          bioHi = input.bioHi;
          profileImage = input.profileImage;
          categoryIds = input.categoryIds;
        };
        updated := ?newProv;
        newProv;
      } else { p };
    });
    updated;
  };

  public func setActive(
    providers : List.List<ProvTypes.Provider>,
    id : Types.ProviderId,
    isActive : Bool
  ) : Bool {
    var found = false;
    providers.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with isActive = isActive };
      } else { p };
    });
    found;
  };

  public func setVerified(
    providers : List.List<ProvTypes.Provider>,
    id : Types.ProviderId,
    isVerified : Bool
  ) : Bool {
    var found = false;
    providers.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with isVerified = isVerified };
      } else { p };
    });
    found;
  };

  public func seedSamples(
    providers : List.List<ProvTypes.Provider>,
    startId : Nat
  ) : Nat {
    // Seed principal placeholders — these represent real users in production
    let p1 = Principal.fromText("aaaaa-aa");

    let samples : [(Text, Text, Text, Text, Text, Text, Text, Text, [Nat], Text, Text)] = [
      (
        "Sharma Legal Associates",
        "Rajesh Sharma",
        "rajesh.sharma@example.com",
        "+91-9876543210",
        "12, MG Road, Connaught Place",
        "Delhi",
        "New Delhi",
        "Experienced law firm specialising in property disputes, family law, and civil litigation with 15 years of practice.",
        [2],
        "संपत्ति विवाद, पारिवारिक कानून और दीवानी मुकदमेबाजी में विशेषज्ञ। 15 वर्षों का अनुभव।",
        "⚖️"
      ),
      (
        "HealthFirst Clinic",
        "Dr. Priya Patel",
        "priya.patel@example.com",
        "+91-9765432109",
        "45, Bandra West, Near Linking Road",
        "Maharashtra",
        "Mumbai",
        "Multi-speciality clinic offering general medicine, paediatrics, and preventive health check-ups.",
        [3],
        "सामान्य चिकित्सा, बाल रोग और निवारक स्वास्थ्य जांच प्रदान करने वाला मल्टी-स्पेशलिटी क्लीनिक।",
        "🏥"
      ),
      (
        "TechFix Solutions",
        "Arun Kumar",
        "arun.kumar@example.com",
        "+91-9654321098",
        "78, Koramangala, 5th Block",
        "Karnataka",
        "Bengaluru",
        "Computer and mobile repair specialists. We handle all brands, offer home visits, and provide IT support for small businesses.",
        [7],
        "कंप्यूटर और मोबाइल मरम्मत विशेषज्ञ। सभी ब्रांड, होम विजिट और छोटे व्यवसायों के लिए IT सपोर्ट।",
        "💻"
      ),
      (
        "Gupta Tax & Accounting",
        "Suresh Gupta",
        "suresh.gupta@example.com",
        "+91-9543210987",
        "22, Park Street, Ground Floor",
        "West Bengal",
        "Kolkata",
        "Chartered accountants providing GST filing, income tax returns, company registration, and audit services.",
        [9, 5],
        "GST फाइलिंग, आयकर रिटर्न, कंपनी पंजीकरण और ऑडिट सेवाएं प्रदान करने वाले चार्टर्ड अकाउंटेंट।",
        "💼"
      ),
      (
        "HomeHero Services",
        "Kavitha Reddy",
        "kavitha.reddy@example.com",
        "+91-9432109876",
        "33, Jubilee Hills, Road No. 10",
        "Telangana",
        "Hyderabad",
        "Complete home maintenance: plumbing, electrical, painting, carpentry, and deep cleaning services across Hyderabad.",
        [6],
        "पूर्ण घर रखरखाव: प्लंबिंग, इलेक्ट्रिकल, पेंटिंग, बढ़ईगीरी और हैदराबाद में गहरी सफाई सेवाएं।",
        "🏠"
      ),
    ];

    var id = startId;
    for ((bName, oName, email, phone, addr, state, city, bioEn, catIds, bioHi, _icon) in samples.vals()) {
      let provider : ProvTypes.Provider = {
        id = id;
        userId = p1;
        businessName = bName;
        ownerName = oName;
        email = email;
        phone = phone;
        address = addr;
        state = state;
        city = city;
        serviceAreas = [city];
        servicesOffered = [];
        bioEn = bioEn;
        bioHi = bioHi;
        profileImage = null;
        categoryIds = catIds;
        isVerified = true;
        isActive = true;
        createdAt = Time.now();
      };
      providers.add(provider);
      id += 1;
    };
    id;
  };
};

import Types "../types/common";
import CatTypes "../types/categories";
import List "mo:core/List";

module {
  public func listActive(
    categories : List.List<CatTypes.Category>
  ) : [CatTypes.Category] {
    categories.filter(func(c) { c.isActive }).toArray();
  };

  public func listAll(
    categories : List.List<CatTypes.Category>
  ) : [CatTypes.Category] {
    categories.toArray();
  };

  public func getById(
    categories : List.List<CatTypes.Category>,
    id : Types.CategoryId
  ) : ?CatTypes.Category {
    categories.find(func(c) { c.id == id });
  };

  public func create(
    categories : List.List<CatTypes.Category>,
    nextId : Nat,
    input : CatTypes.CategoryInput
  ) : CatTypes.Category {
    let cat : CatTypes.Category = {
      id = nextId;
      name = input.name;
      description = input.description;
      icon = input.icon;
      color = input.color;
      displayOrder = input.displayOrder;
      isActive = true;
    };
    categories.add(cat);
    cat;
  };

  public func update(
    categories : List.List<CatTypes.Category>,
    id : Types.CategoryId,
    input : CatTypes.CategoryInput
  ) : ?CatTypes.Category {
    var updated : ?CatTypes.Category = null;
    categories.mapInPlace(func(c) {
      if (c.id == id) {
        let newCat = { c with
          name = input.name;
          description = input.description;
          icon = input.icon;
          color = input.color;
          displayOrder = input.displayOrder;
        };
        updated := ?newCat;
        newCat;
      } else { c };
    });
    updated;
  };

  public func setActive(
    categories : List.List<CatTypes.Category>,
    id : Types.CategoryId,
    isActive : Bool
  ) : Bool {
    var found = false;
    categories.mapInPlace(func(c) {
      if (c.id == id) {
        found := true;
        { c with isActive = isActive };
      } else { c };
    });
    found;
  };

  public func delete(
    categories : List.List<CatTypes.Category>,
    id : Types.CategoryId
  ) : Bool {
    let before = categories.size();
    let filtered = categories.filter(func(c) { c.id != id });
    categories.clear();
    categories.append(filtered);
    categories.size() < before;
  };

  public func seedDefaults(categories : List.List<CatTypes.Category>, startId : Nat) : Nat {
    let seeds : [(Text, Text, Text, Text, Text, Text, Nat)] = [
      ("Government Services", "सरकारी सेवाएं", "All government-related services including documents, certificates, and public utilities.", "सभी सरकारी सेवाएं जैसे दस्तावेज़, प्रमाण पत्र और सार्वजनिक सुविधाएं।", "🏛️", "#FF9933", 1),
      ("Legal Help", "कानूनी सहायता", "Legal advice, documentation, court assistance, and lawyer consultations.", "कानूनी सलाह, दस्तावेज़ीकरण, अदालत सहायता, और वकील परामर्श।", "⚖️", "#138808", 2),
      ("Medical / Health", "चिकित्सा / स्वास्थ्य", "Doctors, hospitals, clinics, pharmacies, and health-related services.", "डॉक्टर, अस्पताल, क्लीनिक, फार्मेसी और स्वास्थ्य सेवाएं।", "🏥", "#FF4444", 3),
      ("Education", "शिक्षा", "Schools, colleges, tutors, coaching centres, and educational resources.", "स्कूल, कॉलेज, ट्यूटर, कोचिंग सेंटर और शैक्षिक संसाधन।", "📚", "#4A90D9", 4),
      ("Financial Services", "वित्तीय सेवाएं", "Banking, insurance, loans, investment, and financial planning services.", "बैंकिंग, बीमा, ऋण, निवेश और वित्तीय योजना सेवाएं।", "💰", "#F5A623", 5),
      ("Home Services", "घरेलू सेवाएं", "Plumbers, electricians, carpenters, cleaners, and home maintenance.", "प्लम्बर, इलेक्ट्रीशियन, बढ़ई, सफाईकर्मी और घर रखरखाव।", "🏠", "#7B68EE", 6),
      ("Tech Support", "तकनीकी सहायता", "Computer repair, software help, mobile service, and IT support.", "कंप्यूटर मरम्मत, सॉफ्टवेयर मदद, मोबाइल सेवा और IT सपोर्ट।", "💻", "#00BCD4", 7),
      ("Travel & Transport", "यात्रा और परिवहन", "Taxi, bus, train, travel agents, tour packages, and logistics.", "टैक्सी, बस, ट्रेन, ट्रैवल एजेंट, टूर पैकेज और लॉजिस्टिक्स।", "✈️", "#009688", 8),
      ("Business Services", "व्यापार सेवाएं", "Accounting, registration, GST, marketing, and business consulting.", "लेखांकन, पंजीकरण, GST, मार्केटिंग और व्यापार परामर्श।", "💼", "#795548", 9),
      ("Emergency Services", "आपातकालीन सेवाएं", "Police, fire brigade, ambulance, disaster relief, and crisis support.", "पुलिस, अग्निशमन, एम्बुलेंस, आपदा राहत और संकट सहायता।", "🚨", "#F44336", 10),
    ];

    var id = startId;
    for ((enName, hiName, enDesc, hiDesc, icon, color, order) in seeds.vals()) {
      let cat : CatTypes.Category = {
        id = id;
        name = { en = enName; hi = hiName };
        description = { en = enDesc; hi = hiDesc };
        icon = icon;
        color = color;
        displayOrder = order;
        isActive = true;
      };
      categories.add(cat);
      id += 1;
    };
    id;
  };
};

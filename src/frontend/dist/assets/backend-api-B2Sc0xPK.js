import "./index-DNcnJBsr.js";
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh"
];
const CLASS_SUBCATEGORIES = [
  { value: "yoga", labelEn: "Yoga", labelHi: "योग", icon: "🧘" },
  { value: "dhyan", labelEn: "Meditation (Dhyan)", labelHi: "ध्यान", icon: "🕉️" },
  { value: "fitness", labelEn: "Fitness", labelHi: "फिटनेस", icon: "💪" },
  {
    value: "coaching",
    labelEn: "Coaching / Online Classes",
    labelHi: "कोचिंग / ऑनलाइन क्लासेस",
    icon: "📚"
  }
];
function getSubCategoryLabel(subCategory, lang = "en") {
  const found = CLASS_SUBCATEGORIES.find((c) => c.value === subCategory);
  if (!found) return subCategory;
  return lang === "hi" ? found.labelHi : found.labelEn;
}
function getSubCategoryIcon(subCategory) {
  var _a;
  return ((_a = CLASS_SUBCATEGORIES.find((c) => c.value === subCategory)) == null ? void 0 : _a.icon) ?? "📹";
}
function formatVideoDate(uploadedAt) {
  const ms = Number(uploadedAt / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
export {
  CLASS_SUBCATEGORIES as C,
  INDIAN_STATES as I,
  getSubCategoryIcon as a,
  formatVideoDate as f,
  getSubCategoryLabel as g
};

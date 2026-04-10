export type TranslationKey =
  | "nav.home"
  | "nav.services"
  | "nav.categories"
  | "nav.login"
  | "nav.register"
  | "nav.dashboard"
  | "nav.admin"
  | "nav.logout"
  | "nav.profile"
  | "hero.title"
  | "hero.subtitle"
  | "hero.cta.primary"
  | "hero.cta.secondary"
  | "hero.search.placeholder"
  | "categories.title"
  | "categories.subtitle"
  | "categories.viewAll"
  | "services.title"
  | "services.subtitle"
  | "services.filter.category"
  | "services.filter.state"
  | "services.filter.city"
  | "services.filter.search"
  | "services.filter.reset"
  | "services.noResults"
  | "services.loading"
  | "services.viewProfile"
  | "services.contactNow"
  | "services.verified"
  | "services.reviews"
  | "services.rating"
  | "provider.about"
  | "provider.services"
  | "provider.contact"
  | "provider.inquire"
  | "provider.reviews"
  | "provider.writeReview"
  | "provider.serviceAreas"
  | "auth.loginTitle"
  | "auth.registerTitle"
  | "auth.loginBtn"
  | "auth.registerBtn"
  | "auth.loginWithII"
  | "auth.registerSeeker"
  | "auth.registerProvider"
  | "auth.name"
  | "auth.email"
  | "auth.phone"
  | "auth.state"
  | "auth.city"
  | "auth.role"
  | "auth.submit"
  | "auth.cancel"
  | "auth.loggingIn"
  | "dashboard.title"
  | "dashboard.welcome"
  | "dashboard.myInquiries"
  | "dashboard.myReviews"
  | "dashboard.providerProfile"
  | "dashboard.editProfile"
  | "dashboard.createProvider"
  | "admin.title"
  | "admin.categories"
  | "admin.providers"
  | "admin.users"
  | "admin.stats"
  | "admin.addCategory"
  | "admin.editCategory"
  | "admin.deleteCategory"
  | "admin.approveProvider"
  | "admin.disableProvider"
  | "admin.setRole"
  | "inquiry.title"
  | "inquiry.service"
  | "inquiry.message"
  | "inquiry.contact"
  | "inquiry.submit"
  | "inquiry.success"
  | "review.title"
  | "review.rating"
  | "review.comment"
  | "review.submit"
  | "review.success"
  | "common.loading"
  | "common.error"
  | "common.retry"
  | "common.save"
  | "common.cancel"
  | "common.delete"
  | "common.edit"
  | "common.close"
  | "common.back"
  | "common.next"
  | "common.previous"
  | "common.search"
  | "common.filter"
  | "common.all"
  | "common.yes"
  | "common.no"
  | "common.noData"
  | "footer.tagline"
  | "footer.quickLinks"
  | "footer.contact"
  | "footer.built";

type Translations = Record<TranslationKey, string>;

const en: Translations = {
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.categories": "Categories",
  "nav.login": "Log In",
  "nav.register": "Register",
  "nav.dashboard": "Dashboard",
  "nav.admin": "Admin Panel",
  "nav.logout": "Log Out",
  "nav.profile": "My Profile",
  "hero.title": "Find Trusted Services Across India",
  "hero.subtitle":
    "Connect with verified service providers for government help, legal aid, medical, education, home services, and more — all in one place.",
  "hero.cta.primary": "Explore Services",
  "hero.cta.secondary": "Register as Provider",
  "hero.search.placeholder": "Search services, providers, locations...",
  "categories.title": "Service Categories",
  "categories.subtitle":
    "From government assistance to home repairs — find everything you need.",
  "categories.viewAll": "View All Categories",
  "services.title": "Browse Services",
  "services.subtitle": "Trusted providers near you",
  "services.filter.category": "Category",
  "services.filter.state": "State",
  "services.filter.city": "City",
  "services.filter.search": "Search providers...",
  "services.filter.reset": "Reset Filters",
  "services.noResults": "No service providers found for the selected filters.",
  "services.loading": "Loading providers...",
  "services.viewProfile": "View Profile",
  "services.contactNow": "Contact Now",
  "services.verified": "Verified",
  "services.reviews": "reviews",
  "services.rating": "Rating",
  "provider.about": "About",
  "provider.services": "Services Offered",
  "provider.contact": "Contact Information",
  "provider.inquire": "Send Inquiry",
  "provider.reviews": "Reviews",
  "provider.writeReview": "Write a Review",
  "provider.serviceAreas": "Service Areas",
  "auth.loginTitle": "Welcome Back",
  "auth.registerTitle": "Create Your Account",
  "auth.loginBtn": "Log In",
  "auth.registerBtn": "Register",
  "auth.loginWithII": "Login with Internet Identity",
  "auth.registerSeeker": "Register as Service Seeker",
  "auth.registerProvider": "Register as Service Provider",
  "auth.name": "Full Name",
  "auth.email": "Email Address",
  "auth.phone": "Phone Number",
  "auth.state": "State",
  "auth.city": "City",
  "auth.role": "Role",
  "auth.submit": "Submit",
  "auth.cancel": "Cancel",
  "auth.loggingIn": "Logging in...",
  "dashboard.title": "My Dashboard",
  "dashboard.welcome": "Welcome",
  "dashboard.myInquiries": "My Inquiries",
  "dashboard.myReviews": "My Reviews",
  "dashboard.providerProfile": "Provider Profile",
  "dashboard.editProfile": "Edit Profile",
  "dashboard.createProvider": "Create Provider Profile",
  "admin.title": "Admin Panel",
  "admin.categories": "Manage Categories",
  "admin.providers": "Manage Providers",
  "admin.users": "Manage Users",
  "admin.stats": "Platform Statistics",
  "admin.addCategory": "Add Category",
  "admin.editCategory": "Edit Category",
  "admin.deleteCategory": "Delete Category",
  "admin.approveProvider": "Approve Provider",
  "admin.disableProvider": "Disable Provider",
  "admin.setRole": "Set User Role",
  "inquiry.title": "Send Inquiry",
  "inquiry.service": "Service Required",
  "inquiry.message": "Your Message",
  "inquiry.contact": "Preferred Contact Method",
  "inquiry.submit": "Send Inquiry",
  "inquiry.success": "Your inquiry has been sent successfully!",
  "review.title": "Write a Review",
  "review.rating": "Rating",
  "review.comment": "Your Review",
  "review.submit": "Submit Review",
  "review.success": "Your review has been submitted!",
  "common.loading": "Loading...",
  "common.error": "Something went wrong. Please try again.",
  "common.retry": "Try Again",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.delete": "Delete",
  "common.edit": "Edit",
  "common.close": "Close",
  "common.back": "Back",
  "common.next": "Next",
  "common.previous": "Previous",
  "common.search": "Search",
  "common.filter": "Filter",
  "common.all": "All",
  "common.yes": "Yes",
  "common.no": "No",
  "common.noData": "No data available",
  "footer.tagline":
    "Connecting citizens with trusted service providers across India.",
  "footer.quickLinks": "Quick Links",
  "footer.contact": "Contact",
  "footer.built": "Built with love using",
};

const hi: Translations = {
  "nav.home": "होम",
  "nav.services": "सेवाएं",
  "nav.categories": "श्रेणियां",
  "nav.login": "लॉग इन",
  "nav.register": "रजिस्टर",
  "nav.dashboard": "डैशबोर्ड",
  "nav.admin": "एडमिन पैनल",
  "nav.logout": "लॉग आउट",
  "nav.profile": "मेरी प्रोफाइल",
  "hero.title": "पूरे भारत में विश्वसनीय सेवाएं खोजें",
  "hero.subtitle":
    "सरकारी सहायता, कानूनी, चिकित्सा, शिक्षा, घरेलू सेवाओं के लिए सत्यापित प्रदाताओं से जुड़ें — सब एक जगह।",
  "hero.cta.primary": "सेवाएं देखें",
  "hero.cta.secondary": "प्रदाता के रूप में रजिस्टर करें",
  "hero.search.placeholder": "सेवाएं, प्रदाता, स्थान खोजें...",
  "categories.title": "सेवा श्रेणियां",
  "categories.subtitle": "सरकारी सहायता से लेकर घर की मरम्मत तक — सब कुछ यहां पाएं।",
  "categories.viewAll": "सभी श्रेणियां देखें",
  "services.title": "सेवाएं ब्राउज़ करें",
  "services.subtitle": "आपके नजदीक विश्वसनीय प्रदाता",
  "services.filter.category": "श्रेणी",
  "services.filter.state": "राज्य",
  "services.filter.city": "शहर",
  "services.filter.search": "प्रदाता खोजें...",
  "services.filter.reset": "फ़िल्टर रीसेट करें",
  "services.noResults": "चुने गए फ़िल्टर के लिए कोई प्रदाता नहीं मिला।",
  "services.loading": "प्रदाता लोड हो रहे हैं...",
  "services.viewProfile": "प्रोफाइल देखें",
  "services.contactNow": "अभी संपर्क करें",
  "services.verified": "सत्यापित",
  "services.reviews": "समीक्षाएं",
  "services.rating": "रेटिंग",
  "provider.about": "परिचय",
  "provider.services": "दी जाने वाली सेवाएं",
  "provider.contact": "संपर्क जानकारी",
  "provider.inquire": "पूछताछ भेजें",
  "provider.reviews": "समीक्षाएं",
  "provider.writeReview": "समीक्षा लिखें",
  "provider.serviceAreas": "सेवा क्षेत्र",
  "auth.loginTitle": "वापस स्वागत है",
  "auth.registerTitle": "अपना अकाउंट बनाएं",
  "auth.loginBtn": "लॉग इन",
  "auth.registerBtn": "रजिस्टर करें",
  "auth.loginWithII": "इंटरनेट आइडेंटिटी से लॉगिन करें",
  "auth.registerSeeker": "सेवा खोजने वाले के रूप में रजिस्टर करें",
  "auth.registerProvider": "सेवा प्रदाता के रूप में रजिस्टर करें",
  "auth.name": "पूरा नाम",
  "auth.email": "ईमेल पता",
  "auth.phone": "फोन नंबर",
  "auth.state": "राज्य",
  "auth.city": "शहर",
  "auth.role": "भूमिका",
  "auth.submit": "सबमिट करें",
  "auth.cancel": "रद्द करें",
  "auth.loggingIn": "लॉगिन हो रहा है...",
  "dashboard.title": "मेरा डैशबोर्ड",
  "dashboard.welcome": "स्वागत",
  "dashboard.myInquiries": "मेरी पूछताछ",
  "dashboard.myReviews": "मेरी समीक्षाएं",
  "dashboard.providerProfile": "प्रदाता प्रोफाइल",
  "dashboard.editProfile": "प्रोफाइल संपादित करें",
  "dashboard.createProvider": "प्रदाता प्रोफाइल बनाएं",
  "admin.title": "एडमिन पैनल",
  "admin.categories": "श्रेणियां प्रबंधित करें",
  "admin.providers": "प्रदाता प्रबंधित करें",
  "admin.users": "उपयोगकर्ता प्रबंधित करें",
  "admin.stats": "प्लेटफॉर्म आंकड़े",
  "admin.addCategory": "श्रेणी जोड़ें",
  "admin.editCategory": "श्रेणी संपादित करें",
  "admin.deleteCategory": "श्रेणी हटाएं",
  "admin.approveProvider": "प्रदाता को मंजूरी दें",
  "admin.disableProvider": "प्रदाता को अक्षम करें",
  "admin.setRole": "उपयोगकर्ता भूमिका सेट करें",
  "inquiry.title": "पूछताछ भेजें",
  "inquiry.service": "आवश्यक सेवा",
  "inquiry.message": "आपका संदेश",
  "inquiry.contact": "पसंदीदा संपर्क विधि",
  "inquiry.submit": "पूछताछ भेजें",
  "inquiry.success": "आपकी पूछताछ सफलतापूर्वक भेज दी गई!",
  "review.title": "समीक्षा लिखें",
  "review.rating": "रेटिंग",
  "review.comment": "आपकी समीक्षा",
  "review.submit": "समीक्षा सबमिट करें",
  "review.success": "आपकी समीक्षा सबमिट कर दी गई!",
  "common.loading": "लोड हो रहा है...",
  "common.error": "कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
  "common.retry": "पुनः प्रयास करें",
  "common.save": "सहेजें",
  "common.cancel": "रद्द करें",
  "common.delete": "हटाएं",
  "common.edit": "संपादित करें",
  "common.close": "बंद करें",
  "common.back": "वापस",
  "common.next": "अगला",
  "common.previous": "पिछला",
  "common.search": "खोजें",
  "common.filter": "फ़िल्टर",
  "common.all": "सभी",
  "common.yes": "हां",
  "common.no": "नहीं",
  "common.noData": "कोई डेटा उपलब्ध नहीं",
  "footer.tagline": "पूरे भारत में नागरिकों को विश्वसनीय सेवा प्रदाताओं से जोड़ना।",
  "footer.quickLinks": "त्वरित लिंक",
  "footer.contact": "संपर्क",
  "footer.built": "के साथ प्यार से बनाया",
};

const translations: Record<"en" | "hi", Translations> = { en, hi };

export function createTranslator(lang: "en" | "hi") {
  return (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.en[key] ?? key;
  };
}

export default translations;

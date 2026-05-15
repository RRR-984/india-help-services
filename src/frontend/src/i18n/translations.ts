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
  | "services.filter.verified"
  | "services.filter.minRating"
  | "services.noResults"
  | "services.noResults.hint"
  | "services.loading"
  | "services.viewProfile"
  | "services.contactNow"
  | "services.verified"
  | "services.reviews"
  | "services.rating"
  | "services.featured"
  | "services.featured.subtitle"
  | "provider.about"
  | "provider.services"
  | "provider.contact"
  | "provider.inquire"
  | "provider.reviews"
  | "provider.writeReview"
  | "provider.serviceAreas"
  | "provider.notFound"
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
  | "dashboard.noInquiries"
  | "dashboard.noReviews"
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
  | "admin.seedData"
  | "admin.totalProviders"
  | "admin.totalSeekers"
  | "admin.totalCategories"
  | "admin.totalInquiries"
  | "admin.pendingApproval"
  | "inquiry.title"
  | "inquiry.service"
  | "inquiry.message"
  | "inquiry.contact"
  | "inquiry.submit"
  | "inquiry.success"
  | "inquiry.status.pending"
  | "inquiry.status.responded"
  | "inquiry.status.closed"
  | "inquiry.empty"
  | "review.title"
  | "review.rating"
  | "review.comment"
  | "review.submit"
  | "review.success"
  | "review.empty"
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
  | "common.verified"
  | "common.notVerified"
  | "common.active"
  | "common.inactive"
  | "common.viewMore"
  | "footer.tagline"
  | "footer.quickLinks"
  | "footer.contact"
  | "footer.built"
  | "footer.allRightsReserved"
  | "footer.servingIndia"
  | "availability.enableAvailability"
  | "availability.availableFrom"
  | "availability.availableTo"
  | "availability.contactAvailableUntil"
  | "availability.providerAvailableFrom"
  | "availability.notAvailableNow"
  | "availability.saveAvailability"
  | "availability.availabilityHoursHint"
  | "visitor_counter.heading"
  | "visitor_counter.total_visits"
  | "visitor_counter.unique_visitors"
  | "register.title"
  | "register.subtitle"
  | "register.roleLabel"
  | "register.seeker"
  | "register.provider"
  | "register.serviceCategory"
  | "register.selectCategory"
  | "register.submitting"
  | "register.submit"
  | "register.successTitle"
  | "register.successBody"
  | "register.alreadyAccount"
  | "register.loginLink"
  | "register.termsNote"
  | "register.duplicateError"
  | "register.genericError"
  | "onlineClasses"
  | "uploadVideo"
  | "videoTitle"
  | "videoDescription"
  | "subCategory"
  | "yoga"
  | "dhyan"
  | "fitness"
  | "coaching"
  | "myVideos"
  | "uploadNewVideo"
  | "deleteVideo"
  | "videoUploadSuccess"
  | "videoDeleteSuccess"
  | "classesTab"
  | "downloadVideo"
  | "noVideosYet"
  | "videoActive"
  | "videoInactive"
  | "toggleVideo"
  | "experience.title"
  | "experience.subtitle"
  | "experience.addExperience"
  | "experience.yourExperience"
  | "experience.experiencePlaceholder"
  | "experience.submitExperience"
  | "experience.experienceSubmitted"
  | "experience.noExperiences"
  | "experience.reportInappropriate"
  | "legalServices.title"
  | "legalServices.subtitle"
  | "legalServices.browseProviders";

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
  "categories.title": "All Services Categories",
  "categories.subtitle":
    "Comprehensive bilingual (Hindi/English) for trusted services.",
  "categories.viewAll": "View All Categories",
  "services.title": "Browse Services",
  "services.subtitle": "Trusted providers near you",
  "services.filter.category": "Category",
  "services.filter.state": "State",
  "services.filter.city": "City",
  "services.filter.search": "Search providers...",
  "services.filter.reset": "Reset Filters",
  "services.filter.verified": "Verified Only",
  "services.filter.minRating": "Minimum Rating",
  "services.noResults": "No service providers found.",
  "services.noResults.hint": "Try adjusting your filters or search terms.",
  "services.loading": "Loading providers...",
  "services.viewProfile": "View Profile",
  "services.contactNow": "Book Now",
  "services.verified": "Verified",
  "services.reviews": "reviews",
  "services.rating": "Rating",
  "services.featured": "Verified Providers",
  "services.featured.subtitle": "Top-rated professionals trusted by thousands",
  "provider.about": "About",
  "provider.services": "Services Offered",
  "provider.contact": "Contact Information",
  "provider.inquire": "Send Inquiry",
  "provider.reviews": "Reviews",
  "provider.writeReview": "Write a Review",
  "provider.serviceAreas": "Service Areas",
  "provider.notFound": "Provider not found.",
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
  "dashboard.noInquiries": "No inquiries yet. Start by contacting a provider.",
  "dashboard.noReviews":
    "No reviews yet. Share your experience with providers.",
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
  "admin.seedData": "Seed Sample Data",
  "admin.totalProviders": "Total Providers",
  "admin.totalSeekers": "Total Seekers",
  "admin.totalCategories": "Total Categories",
  "admin.totalInquiries": "Total Inquiries",
  "admin.pendingApproval": "Pending Approval",
  "inquiry.title": "Send Inquiry",
  "inquiry.service": "Service Required",
  "inquiry.message": "Your Message",
  "inquiry.contact": "Preferred Contact Method",
  "inquiry.submit": "Send Inquiry",
  "inquiry.success": "Your inquiry has been sent successfully!",
  "inquiry.status.pending": "Pending",
  "inquiry.status.responded": "Responded",
  "inquiry.status.closed": "Closed",
  "inquiry.empty": "No new inquiries yet. / कोई नई पूछताछ नहीं।",
  "review.title": "Write a Review",
  "review.rating": "Rating",
  "review.comment": "Your Review",
  "review.submit": "Submit Review",
  "review.success": "Your review has been submitted!",
  "review.empty": "No reviews yet. Be the first to review!",
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
  "common.verified": "Verified",
  "common.notVerified": "Not Verified",
  "common.active": "Active",
  "common.inactive": "Inactive",
  "common.viewMore": "View More",
  "footer.tagline":
    "Connecting citizens with trusted service providers across India.",
  "footer.quickLinks": "Quick Links",
  "footer.contact": "Contact Us",
  "footer.built": "Built with love using",
  "footer.allRightsReserved": "All rights reserved.",
  "footer.servingIndia": "Serving all 28 States & 8 UTs of India",
  "availability.enableAvailability": "Enable contact availability hours",
  "availability.availableFrom": "Available from",
  "availability.availableTo": "Available to",
  "availability.contactAvailableUntil": "Contact available until",
  "availability.providerAvailableFrom":
    "Provider available from {from} to {to} IST",
  "availability.notAvailableNow": "Not available right now",
  "availability.saveAvailability": "Save availability",
  "availability.availabilityHoursHint":
    "Set hours when visitors can see your contact info",
  "visitor_counter.heading": "Site Visitors",
  "visitor_counter.total_visits": "Total Visits",
  "visitor_counter.unique_visitors": "Unique Visitors",
  "register.title": "Register Now",
  "register.subtitle": "Fill in your details and join Indiahelpsarvice",
  "register.roleLabel": "I am a...",
  "register.seeker": "Service Seeker",
  "register.provider": "Service Provider",
  "register.serviceCategory": "Service Category",
  "register.selectCategory": "Select category",
  "register.submitting": "Registering...",
  "register.submit": "Register",
  "register.successTitle": "Registration Successful!",
  "register.successBody":
    "You have been successfully registered. You can now browse services and contact providers.",
  "register.alreadyAccount": "Already have an account?",
  "register.loginLink": "Log In",
  "register.termsNote":
    "By registering you agree to our terms of service. Your information is kept secure.",
  "register.duplicateError":
    "This phone number or email is already registered.",
  "register.genericError": "Something went wrong. Please try again.",
  onlineClasses: "Online Classes",
  uploadVideo: "Upload Video",
  videoTitle: "Video Title",
  videoDescription: "Video Description",
  subCategory: "Sub Category",
  yoga: "Yoga",
  dhyan: "Meditation (Dhyan)",
  fitness: "Fitness",
  coaching: "Coaching / Online Classes",
  myVideos: "My Videos",
  uploadNewVideo: "Upload New Video",
  deleteVideo: "Delete Video",
  videoUploadSuccess: "Video uploaded successfully!",
  videoDeleteSuccess: "Video deleted successfully!",
  classesTab: "Classes",
  downloadVideo: "Download Video",
  noVideosYet: "No videos uploaded yet. Upload your first class video!",
  videoActive: "Active",
  videoInactive: "Inactive",
  toggleVideo: "Toggle Video Visibility",
  "experience.title": "Share Your Experience",
  "experience.subtitle":
    "Help others by sharing your experience with this service",
  "experience.addExperience": "Add Experience",
  "experience.yourExperience": "Your Experience",
  "experience.experiencePlaceholder":
    "Describe your experience with this service provider...",
  "experience.submitExperience": "Submit Experience",
  "experience.experienceSubmitted":
    "Thank you! Your experience has been submitted.",
  "experience.noExperiences": "No experiences shared yet. Be the first!",
  "experience.reportInappropriate": "Report Inappropriate",
  "legalServices.title": "Legal Services",
  "legalServices.subtitle":
    "Find trusted legal advisors and lawyers across India",
  "legalServices.browseProviders": "Browse Legal Providers",
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
  "categories.title": "सभी सेवा श्रेणियां",
  "categories.subtitle": "विश्वसनीय सेवाओं के लिए द्विभाषी (हिंदी/अंग्रेजी) सहायता।",
  "categories.viewAll": "सभी श्रेणियां देखें",
  "services.title": "सेवाएं ब्राउज़ करें",
  "services.subtitle": "आपके नजदीक विश्वसनीय प्रदाता",
  "services.filter.category": "श्रेणी",
  "services.filter.state": "राज्य",
  "services.filter.city": "शहर",
  "services.filter.search": "प्रदाता खोजें...",
  "services.filter.reset": "फ़िल्टर रीसेट करें",
  "services.filter.verified": "केवल सत्यापित",
  "services.filter.minRating": "न्यूनतम रेटिंग",
  "services.noResults": "कोई सेवा प्रदाता नहीं मिला।",
  "services.noResults.hint": "अपने फ़िल्टर या खोज शब्द बदलकर देखें।",
  "services.loading": "प्रदाता लोड हो रहे हैं...",
  "services.viewProfile": "प्रोफाइल देखें",
  "services.contactNow": "अभी बुक करें",
  "services.verified": "सत्यापित",
  "services.reviews": "समीक्षाएं",
  "services.rating": "रेटिंग",
  "services.featured": "सत्यापित प्रदाता",
  "services.featured.subtitle": "हजारों लोगों द्वारा भरोसेमंद शीर्ष विशेषज्ञ",
  "provider.about": "परिचय",
  "provider.services": "दी जाने वाली सेवाएं",
  "provider.contact": "संपर्क जानकारी",
  "provider.inquire": "पूछताछ भेजें",
  "provider.reviews": "समीक्षाएं",
  "provider.writeReview": "समीक्षा लिखें",
  "provider.serviceAreas": "सेवा क्षेत्र",
  "provider.notFound": "प्रदाता नहीं मिला।",
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
  "dashboard.noInquiries": "अभी तक कोई पूछताछ नहीं। किसी प्रदाता से संपर्क करें।",
  "dashboard.noReviews": "अभी तक कोई समीक्षा नहीं। अपना अनुभव साझा करें।",
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
  "admin.seedData": "सैंपल डेटा जोड़ें",
  "admin.totalProviders": "कुल प्रदाता",
  "admin.totalSeekers": "कुल खोजकर्ता",
  "admin.totalCategories": "कुल श्रेणियां",
  "admin.totalInquiries": "कुल पूछताछ",
  "admin.pendingApproval": "अनुमोदन प्रतीक्षित",
  "inquiry.title": "पूछताछ भेजें",
  "inquiry.service": "आवश्यक सेवा",
  "inquiry.message": "आपका संदेश",
  "inquiry.contact": "पसंदीदा संपर्क विधि",
  "inquiry.submit": "पूछताछ भेजें",
  "inquiry.success": "आपकी पूछताछ सफलतापूर्वक भेज दी गई!",
  "inquiry.status.pending": "प्रतीक्षित",
  "inquiry.status.responded": "जवाब दिया गया",
  "inquiry.status.closed": "बंद",
  "inquiry.empty": "कोई नई पूछताछ नहीं। / No new inquiries yet.",
  "review.title": "समीक्षा लिखें",
  "review.rating": "रेटिंग",
  "review.comment": "आपकी समीक्षा",
  "review.submit": "समीक्षा सबमिट करें",
  "review.success": "आपकी समीक्षा सबमिट कर दी गई!",
  "review.empty": "अभी तक कोई समीक्षा नहीं। पहले समीक्षा करें!",
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
  "common.verified": "सत्यापित",
  "common.notVerified": "असत्यापित",
  "common.active": "सक्रिय",
  "common.inactive": "निष्क्रिय",
  "common.viewMore": "और देखें",
  "footer.tagline": "पूरे भारत में नागरिकों को विश्वसनीय सेवा प्रदाताओं से जोड़ना।",
  "footer.quickLinks": "त्वरित लिंक",
  "footer.contact": "संपर्क करें",
  "footer.built": "के साथ प्यार से बनाया",
  "footer.allRightsReserved": "सर्वाधिकार सुरक्षित।",
  "footer.servingIndia": "भारत के सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों में सेवा",
  "availability.enableAvailability": "संपर्क समय सक्षम करें",
  "availability.availableFrom": "उपलब्ध से",
  "availability.availableTo": "उपलब्ध तक",
  "availability.contactAvailableUntil": "संपर्क उपलब्ध तक",
  "availability.providerAvailableFrom":
    "सेवा प्रदाता {from} से {to} IST तक उपलब्ध हैं",
  "availability.notAvailableNow": "अभी उपलब्ध नहीं हैं",
  "availability.saveAvailability": "उपलब्धता सहेजें",
  "availability.availabilityHoursHint":
    "वह समय सेट करें जब विजिटर आपकी संपर्क जानकारी देख सकें",
  "visitor_counter.heading": "साइट विज़िटर",
  "visitor_counter.total_visits": "कुल विज़िट",
  "visitor_counter.unique_visitors": "अनन्य विज़िटर",
  "register.title": "रजिस्ट्रेशन करें",
  "register.subtitle": "अपनी जानकारी भरें और Indiahelpsarvice से जुड़ें",
  "register.roleLabel": "आप क्या हैं?",
  "register.seeker": "सेवा खोजने वाला",
  "register.provider": "सेवा देने वाला",
  "register.serviceCategory": "सेवा श्रेणी",
  "register.selectCategory": "श्रेणी चुनें",
  "register.submitting": "रजिस्टर हो रहा है...",
  "register.submit": "रजिस्टर करें",
  "register.successTitle": "रजिस्ट्रेशन सफल!",
  "register.successBody":
    "आपका रजिस्ट्रेशन हो गया है। अब आप सेवाएं खोज सकते हैं और प्रदाताओं से संपर्क कर सकते हैं।",
  "register.alreadyAccount": "पहले से अकाउंट है?",
  "register.loginLink": "लॉग इन करें",
  "register.termsNote":
    "रजिस्ट्रेशन करके आप हमारी सेवा शर्तों से सहमत होते हैं। आपकी जानकारी सुरक्षित रहेगी।",
  "register.duplicateError": "यह फोन नंबर या ईमेल पहले से रजिस्टर है।",
  "register.genericError": "कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
  onlineClasses: "ऑनलाइन क्लासेस",
  uploadVideo: "वीडियो अपलोड करें",
  videoTitle: "वीडियो शीर्षक",
  videoDescription: "वीडियो विवरण",
  subCategory: "उप-श्रेणी",
  yoga: "योग",
  dhyan: "ध्यान",
  fitness: "फिटनेस",
  coaching: "कोचिंग / ऑनलाइन क्लासेस",
  myVideos: "मेरे वीडियो",
  uploadNewVideo: "नया वीडियो अपलोड करें",
  deleteVideo: "वीडियो हटाएं",
  videoUploadSuccess: "वीडियो सफलतापूर्वक अपलोड हो गया!",
  videoDeleteSuccess: "वीडियो सफलतापूर्वक हटा दिया गया!",
  classesTab: "क्लासेस",
  downloadVideo: "वीडियो डाउनलोड करें",
  noVideosYet:
    "अभी तक कोई वीडियो अपलोड नहीं हुआ। अपना पहला क्लास वीडियो अपलोड करें!",
  videoActive: "सक्रिय",
  videoInactive: "निष्क्रिय",
  toggleVideo: "वीडियो दृश्यता बदलें",
  "experience.title": "अपना अनुभव साझा करें",
  "experience.subtitle": "इस सेवा के बारे में अपना अनुभव बताकर दूसरों की मदद करें",
  "experience.addExperience": "अनुभव जोड़ें",
  "experience.yourExperience": "आपका अनुभव",
  "experience.experiencePlaceholder": "इस सेवा प्रदाता के साथ अपना अनुभव लिखें...",
  "experience.submitExperience": "अनुभव सबमिट करें",
  "experience.experienceSubmitted": "धन्यवाद! आपका अनुभव सबमिट हो गया।",
  "experience.noExperiences": "अभी तक कोई अनुभव साझा नहीं हुआ। पहले बनें!",
  "experience.reportInappropriate": "अनुचित सामग्री की रिपोर्ट करें",
  "legalServices.title": "कानूनी सेवाएं",
  "legalServices.subtitle": "पूरे भारत में विश्वसनीय कानूनी सलाहकार और वकील खोजें",
  "legalServices.browseProviders": "कानूनी प्रदाता देखें",
};

const translations: Record<"en" | "hi", Translations> = { en, hi };

export function createTranslator(lang: "en" | "hi") {
  return (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.en[key] ?? key;
  };
}

export default translations;

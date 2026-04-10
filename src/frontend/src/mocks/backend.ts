import type { backendInterface, Category, User, Provider, ProviderSummary, Page, Inquiry, Review, AdminStats } from "../backend";
import { InquiryStatus, Role } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText("2vxsx-fae");

const sampleCategories: Category[] = [
  {
    id: BigInt(1),
    displayOrder: BigInt(1),
    icon: "🏛️",
    name: { en: "Government Services", hi: "सरकारी सेवाएं" },
    color: "#FF9933",
    description: { en: "Access government schemes and services", hi: "सरकारी योजनाओं और सेवाओं तक पहुंच" },
    isActive: true,
  },
  {
    id: BigInt(2),
    displayOrder: BigInt(2),
    icon: "⚖️",
    name: { en: "Legal Help", hi: "कानूनी सहायता" },
    color: "#138808",
    description: { en: "Legal advice and representation", hi: "कानूनी सलाह और प्रतिनिधित्व" },
    isActive: true,
  },
  {
    id: BigInt(3),
    displayOrder: BigInt(3),
    icon: "🏥",
    name: { en: "Medical & Health", hi: "चिकित्सा और स्वास्थ्य" },
    color: "#FF9933",
    description: { en: "Healthcare services and medical assistance", hi: "स्वास्थ्य सेवाएं और चिकित्सा सहायता" },
    isActive: true,
  },
  {
    id: BigInt(4),
    displayOrder: BigInt(4),
    icon: "📚",
    name: { en: "Education", hi: "शिक्षा" },
    color: "#138808",
    description: { en: "Educational support and tutoring", hi: "शैक्षिक सहायता और ट्यूटोरिंग" },
    isActive: true,
  },
  {
    id: BigInt(5),
    displayOrder: BigInt(5),
    icon: "💰",
    name: { en: "Financial Services", hi: "वित्तीय सेवाएं" },
    color: "#FF9933",
    description: { en: "Banking, loans, and financial planning", hi: "बैंकिंग, ऋण और वित्तीय योजना" },
    isActive: true,
  },
  {
    id: BigInt(6),
    displayOrder: BigInt(6),
    icon: "🏠",
    name: { en: "Home Services", hi: "घरेलू सेवाएं" },
    color: "#138808",
    description: { en: "Repairs, cleaning, and home maintenance", hi: "मरम्मत, सफाई और घर रखरखाव" },
    isActive: true,
  },
];

const sampleProviders: ProviderSummary[] = [
  {
    id: BigInt(1),
    ownerName: "Rajesh Kumar",
    city: "Mumbai",
    userId: samplePrincipal,
    businessName: "Kumar Legal Associates",
    isActive: true,
    averageRating: 4.5,
    state: "Maharashtra",
    isVerified: true,
    reviewCount: BigInt(28),
    categoryIds: [BigInt(2)],
  },
  {
    id: BigInt(2),
    ownerName: "Priya Sharma",
    city: "Delhi",
    userId: samplePrincipal,
    businessName: "Sharma Healthcare Consultancy",
    isActive: true,
    averageRating: 4.8,
    state: "Delhi",
    isVerified: true,
    reviewCount: BigInt(45),
    categoryIds: [BigInt(3)],
  },
  {
    id: BigInt(3),
    ownerName: "Amit Singh",
    city: "Bangalore",
    userId: samplePrincipal,
    businessName: "Singh Education Hub",
    isActive: true,
    averageRating: 4.2,
    state: "Karnataka",
    isVerified: false,
    reviewCount: BigInt(12),
    categoryIds: [BigInt(4)],
  },
];

const samplePage: Page = {
  total: BigInt(3),
  page: BigInt(1),
  pageSize: BigInt(10),
  items: sampleProviders,
};

const sampleUser: User = {
  id: samplePrincipal,
  city: "Mumbai",
  name: "Rahul Gupta",
  createdAt: BigInt(Date.now()),
  role: Role.seeker,
  email: "rahul.gupta@example.com",
  state: "Maharashtra",
  phone: "+91-9876543210",
};

const sampleProvider: Provider = {
  id: BigInt(1),
  ownerName: "Rajesh Kumar",
  city: "Mumbai",
  userId: samplePrincipal,
  createdAt: BigInt(Date.now()),
  businessName: "Kumar Legal Associates",
  isActive: true,
  email: "rajesh@kumarlegals.com",
  state: "Maharashtra",
  isVerified: true,
  address: "123, Andheri West, Mumbai",
  bioEn: "Expert legal services with 15+ years of experience in civil and corporate law.",
  bioHi: "15+ वर्षों के अनुभव के साथ नागरिक और कॉर्पोरेट कानून में विशेषज्ञ कानूनी सेवाएं।",
  phone: "+91-9876543210",
  servicesOffered: [
    { title: "Legal Consultation", description: "Initial consultation on legal matters", availability: "Mon-Sat 10am-6pm", serviceId: BigInt(1), price: "₹500/hour" },
  ],
  serviceAreas: ["Mumbai", "Thane", "Navi Mumbai"],
  categoryIds: [BigInt(2)],
};

const sampleReviews: Review[] = [
  { id: BigInt(1), createdAt: BigInt(Date.now()), seekerId: samplePrincipal, comment: "Excellent service! Very professional and knowledgeable.", rating: BigInt(5), providerId: BigInt(1) },
  { id: BigInt(2), createdAt: BigInt(Date.now()), seekerId: samplePrincipal, comment: "Good experience overall. Resolved my case efficiently.", rating: BigInt(4), providerId: BigInt(1) },
];

const sampleInquiry: Inquiry = {
  id: BigInt(1),
  status: InquiryStatus.pending,
  serviceName: "Legal Consultation",
  createdAt: BigInt(Date.now()),
  seekerId: samplePrincipal,
  preferredContact: "phone",
  message: "I need help with property dispute resolution.",
  providerId: BigInt(1),
};

const sampleAdminStats: AdminStats = {
  totalSeekers: BigInt(1250),
  totalProviders: BigInt(348),
  totalCategories: BigInt(10),
  totalInquiries: BigInt(5670),
};

export const mockBackend: backendInterface = {
  addReview: async (_input) => ({ id: BigInt(3), createdAt: BigInt(Date.now()), seekerId: samplePrincipal, comment: _input.comment, rating: _input.rating, providerId: _input.providerId }),
  approveProvider: async (_id) => true,
  createCategory: async (input) => ({ id: BigInt(7), displayOrder: input.displayOrder, icon: input.icon, name: input.name, color: input.color, description: input.description, isActive: true }),
  createProviderProfile: async (_input) => sampleProvider,
  deleteCategory: async (_id) => true,
  disableProvider: async (_id) => true,
  getAdminStats: async () => sampleAdminStats,
  getCategory: async (_id) => sampleCategories[0],
  getInquiriesByProvider: async (_providerId) => [sampleInquiry],
  getMyInquiries: async () => [sampleInquiry],
  getMyProfile: async () => sampleUser,
  getMyProviderProfile: async () => sampleProvider,
  getMyReviews: async () => sampleReviews,
  getProvider: async (_id) => sampleProvider,
  getReviewsByProvider: async (_providerId) => sampleReviews,
  listAllCategories: async () => sampleCategories,
  listCategories: async () => sampleCategories,
  listProviders: async (_filter, _page, _pageSize) => samplePage,
  listUsers: async () => [sampleUser],
  registerUser: async (input) => ({ ...sampleUser, name: input.name, email: input.email, city: input.city, state: input.state, phone: input.phone }),
  seedSampleData: async () => true,
  setCategoryActive: async (_id, _isActive) => true,
  setUserRole: async (_userId, _role) => true,
  submitInquiry: async (input) => ({ id: BigInt(2), status: InquiryStatus.pending, serviceName: input.serviceName, createdAt: BigInt(Date.now()), seekerId: samplePrincipal, preferredContact: input.preferredContact, message: input.message, providerId: input.providerId }),
  updateCategory: async (_id, input) => ({ id: _id, displayOrder: input.displayOrder, icon: input.icon, name: input.name, color: input.color, description: input.description, isActive: true }),
  updateInquiryStatus: async (_id, status) => ({ ...sampleInquiry, status }),
  updateProviderProfile: async (_id, _input) => sampleProvider,
  updateUserProfile: async (input) => ({ ...sampleUser, name: input.name, email: input.email, city: input.city, state: input.state, phone: input.phone }),
};

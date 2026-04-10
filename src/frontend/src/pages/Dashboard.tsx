import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  Briefcase,
  ChevronRight,
  Clock,
  Edit2,
  MessageCircle,
  MessageSquare,
  Settings,
  ShieldAlert,
  Star,
  User,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ErrorMessage, LoadingSpinner } from "../components/ui/LoadingSpinner";
import StarRating from "../components/ui/StarRating";
import {
  useInquiriesByProvider,
  useMyInquiries,
  useMyProfile,
  useMyProviderProfile,
  useMyReviews,
  useUpdateUserProfile,
} from "../hooks/use-api";
import { useAuth } from "../hooks/use-auth";
import { useLanguage } from "../hooks/use-language";
import { INDIAN_STATES } from "../services/backend-api";
import { InquiryStatus, Role } from "../types";
import type { Inquiry, Review, User as UserType } from "../types";

// ─── Status badge config ─────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  InquiryStatus,
  {
    style: React.CSSProperties;
    icon: React.ReactNode;
    labelEn: string;
    labelHi: string;
  }
> = {
  [InquiryStatus.pending]: {
    style: {
      backgroundColor: "#FFF3E0",
      color: "#B45309",
      borderColor: "#F59E0B",
    },
    icon: <Clock size={12} />,
    labelEn: "Pending",
    labelHi: "प्रतीक्षारत",
  },
  [InquiryStatus.responded]: {
    style: {
      backgroundColor: "#E6F4EA",
      color: "#166534",
      borderColor: "#86EFAC",
    },
    icon: <MessageCircle size={12} />,
    labelEn: "Responded",
    labelHi: "जवाब मिला",
  },
  [InquiryStatus.closed]: {
    style: {},
    icon: <XCircle size={12} />,
    labelEn: "Closed",
    labelHi: "बंद",
  },
};

function StatusBadge({
  status,
  lang,
}: { status: InquiryStatus; lang: "en" | "hi" }) {
  const cfg = STATUS_CONFIG[status];
  const isClosedStatus = status === InquiryStatus.closed;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${isClosedStatus ? "bg-muted text-muted-foreground border-border" : ""}`}
      style={isClosedStatus ? {} : cfg.style}
    >
      {cfg.icon}
      {lang === "hi" ? cfg.labelHi : cfg.labelEn}
    </span>
  );
}

// ─── Profile Edit Form ────────────────────────────────────────────────────────

interface ProfileEditFormProps {
  user: UserType;
  lang: "en" | "hi";
  onClose: () => void;
}

function ProfileEditForm({ user, lang, onClose }: ProfileEditFormProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const updateProfile = useUpdateUserProfile();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile.mutate(
      { name, email, phone, state, city },
      {
        onSuccess: () => {
          toast.success(lang === "hi" ? "प्रोफाइल अपडेट हुई" : "Profile updated");
          onClose();
        },
        onError: () =>
          toast.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong"),
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="profile-edit-form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="edit-name">
            {lang === "hi" ? "पूरा नाम" : "Full Name"}
          </Label>
          <Input
            id="edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-ocid="edit-name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-email">{lang === "hi" ? "ईमेल" : "Email"}</Label>
          <Input
            id="edit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-ocid="edit-email"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-phone">{lang === "hi" ? "फोन" : "Phone"}</Label>
          <Input
            id="edit-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-ocid="edit-phone"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-state">{lang === "hi" ? "राज्य" : "State"}</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger id="edit-state" data-ocid="edit-state">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="edit-city">{lang === "hi" ? "शहर" : "City"}</Label>
          <Input
            id="edit-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            data-ocid="edit-city"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="outline" size="sm" onClick={onClose}>
          {lang === "hi" ? "रद्द करें" : "Cancel"}
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={updateProfile.isPending}
          data-ocid="save-profile-btn"
        >
          {updateProfile.isPending
            ? lang === "hi"
              ? "सहेज रहे हैं..."
              : "Saving..."
            : lang === "hi"
              ? "सहेजें"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

// ─── Inquiry Card ─────────────────────────────────────────────────────────────

function InquiryCard({
  inquiry,
  lang,
}: { inquiry: Inquiry; lang: "en" | "hi" }) {
  const date = new Date(
    Number(inquiry.createdAt) / 1_000_000,
  ).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <Card
      className="shadow-card hover:shadow-elevated transition-smooth"
      data-ocid="inquiry-row"
    >
      <CardContent className="p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <MessageSquare size={16} className="text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <p className="font-semibold text-sm text-foreground truncate">
              {inquiry.serviceName}
            </p>
            <StatusBadge status={inquiry.status} lang={lang} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {inquiry.message}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────

function ReviewCard({ review, lang }: { review: Review; lang: "en" | "hi" }) {
  const date = new Date(
    Number(review.createdAt) / 1_000_000,
  ).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <Card className="shadow-card" data-ocid="review-row">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <StarRating rating={Number(review.rating)} size="sm" />
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {review.comment}
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({
  icon,
  title,
  description,
  action,
  ocid,
}: {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  ocid?: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-14 text-center"
      data-ocid={ocid}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <p className="font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground mt-1 max-w-xs">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ─── Provider Inquiries Panel ────────────────────────────────────────────────

function ProviderInquiriesPanel({
  providerId,
  lang,
}: {
  providerId: bigint;
  lang: "en" | "hi";
}) {
  const { data: providerInquiries, isLoading } =
    useInquiriesByProvider(providerId);

  if (isLoading) return <LoadingSpinner />;
  if (!providerInquiries?.length) {
    return (
      <EmptyState
        icon="📬"
        title={lang === "hi" ? "कोई पूछताछ नहीं मिली" : "No inquiries received"}
        description={
          lang === "hi"
            ? "अभी तक किसी ने पूछताछ नहीं की है।"
            : "No one has sent you an inquiry yet."
        }
        ocid="empty-provider-inquiries"
      />
    );
  }

  return (
    <div className="space-y-3">
      {providerInquiries.map((inq) => (
        <InquiryCard key={inq.id.toString()} inquiry={inq} lang={lang} />
      ))}
    </div>
  );
}

// ─── Seeker Dashboard ────────────────────────────────────────────────────────

function SeekerDashboard({
  user,
  lang,
}: {
  user: UserType;
  lang: "en" | "hi";
}) {
  const [editingProfile, setEditingProfile] = useState(false);
  const { data: inquiries, isLoading: inquiriesLoading } = useMyInquiries();
  const { data: reviews, isLoading: reviewsLoading } = useMyReviews();

  return (
    <Tabs defaultValue="inquiries" className="w-full" data-ocid="seeker-tabs">
      <TabsList className="mb-6 w-full sm:w-auto">
        <TabsTrigger value="inquiries" data-ocid="tab-inquiries">
          <MessageSquare size={14} className="mr-1.5" />
          {lang === "hi" ? "पूछताछ" : "Inquiries"}
          {(inquiries?.length ?? 0) > 0 && (
            <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0">
              {inquiries!.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="reviews" data-ocid="tab-reviews">
          <Star size={14} className="mr-1.5" />
          {lang === "hi" ? "समीक्षाएं" : "Reviews"}
          {(reviews?.length ?? 0) > 0 && (
            <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0">
              {reviews!.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="profile" data-ocid="tab-profile">
          <User size={14} className="mr-1.5" />
          {lang === "hi" ? "प्रोफाइल" : "Profile"}
        </TabsTrigger>
      </TabsList>

      {/* Inquiries Tab */}
      <TabsContent value="inquiries">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            {lang === "hi" ? "मेरी पूछताछ" : "My Inquiries"}
          </h2>
        </div>
        {inquiriesLoading ? (
          <LoadingSpinner />
        ) : (inquiries?.length ?? 0) === 0 ? (
          <EmptyState
            icon="📭"
            title={lang === "hi" ? "अभी तक कोई पूछताछ नहीं" : "No inquiries yet"}
            description={
              lang === "hi"
                ? "सेवा प्रदाताओं से पूछताछ करें।"
                : "Browse services and send your first inquiry."
            }
            action={
              <Button asChild size="sm" data-ocid="browse-services-link">
                <Link
                  to="/services"
                  search={{
                    category: undefined,
                    state: undefined,
                    city: undefined,
                    search: undefined,
                    sort: undefined,
                  }}
                >
                  {lang === "hi" ? "सेवाएं देखें" : "Browse Services"}
                  <ChevronRight size={14} className="ml-1" />
                </Link>
              </Button>
            }
            ocid="empty-inquiries"
          />
        ) : (
          <div className="space-y-3">
            {inquiries!.map((inq) => (
              <motion.div
                key={inq.id.toString()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <InquiryCard inquiry={inq} lang={lang} />
              </motion.div>
            ))}
          </div>
        )}
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            {lang === "hi" ? "मेरी समीक्षाएं" : "My Reviews"}
          </h2>
        </div>
        {reviewsLoading ? (
          <LoadingSpinner />
        ) : (reviews?.length ?? 0) === 0 ? (
          <EmptyState
            icon="⭐"
            title={lang === "hi" ? "अभी तक कोई समीक्षा नहीं" : "No reviews yet"}
            description={
              lang === "hi"
                ? "सेवाओं का अनुभव लेकर समीक्षा लिखें।"
                : "Use a service and leave your first review."
            }
            ocid="empty-reviews"
          />
        ) : (
          <div className="space-y-3">
            {reviews!.map((rev) => (
              <motion.div
                key={rev.id.toString()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ReviewCard review={rev} lang={lang} />
              </motion.div>
            ))}
          </div>
        )}
      </TabsContent>

      {/* Profile Tab */}
      <TabsContent value="profile">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display">
                {lang === "hi" ? "मेरी प्रोफाइल" : "My Profile"}
              </CardTitle>
              {!editingProfile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProfile(true)}
                  data-ocid="edit-profile-btn"
                >
                  <Edit2 size={13} className="mr-1.5" />
                  {lang === "hi" ? "संपादित करें" : "Edit"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {editingProfile ? (
              <ProfileEditForm
                user={user}
                lang={lang}
                onClose={() => setEditingProfile(false)}
              />
            ) : (
              <ProfileDetails user={user} lang={lang} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// ─── Profile Details (read-only) ─────────────────────────────────────────────

function ProfileDetails({ user, lang }: { user: UserType; lang: "en" | "hi" }) {
  const fields = [
    { label: lang === "hi" ? "नाम" : "Name", value: user.name },
    { label: lang === "hi" ? "ईमेल" : "Email", value: user.email },
    { label: lang === "hi" ? "फोन" : "Phone", value: user.phone || "—" },
    { label: lang === "hi" ? "राज्य" : "State", value: user.state || "—" },
    { label: lang === "hi" ? "शहर" : "City", value: user.city || "—" },
  ];
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {fields.map((f) => (
        <div key={f.label}>
          <dt className="text-xs text-muted-foreground uppercase tracking-wide">
            {f.label}
          </dt>
          <dd className="mt-0.5 text-sm font-medium text-foreground">
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// ─── Provider Dashboard ───────────────────────────────────────────────────────

function ProviderDashboard({
  user,
  lang,
}: {
  user: UserType;
  lang: "en" | "hi";
}) {
  const [editingProfile, setEditingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { data: providerProfile, isLoading: providerLoading } =
    useMyProviderProfile();
  const { data: reviews, isLoading: reviewsLoading } = useMyReviews();

  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
      : 0;

  function handleEditProvider() {
    setEditingProfile(true);
    setActiveTab("profile");
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
      data-ocid="provider-tabs"
    >
      <TabsList className="mb-6 w-full sm:w-auto">
        <TabsTrigger value="overview" data-ocid="tab-overview">
          <Briefcase size={14} className="mr-1.5" />
          {lang === "hi" ? "अवलोकन" : "Overview"}
        </TabsTrigger>
        <TabsTrigger value="inquiries" data-ocid="tab-inquiries">
          <MessageSquare size={14} className="mr-1.5" />
          {lang === "hi" ? "पूछताछ" : "Inquiries"}
        </TabsTrigger>
        <TabsTrigger value="reviews" data-ocid="tab-reviews">
          <Star size={14} className="mr-1.5" />
          {lang === "hi" ? "समीक्षाएं" : "Reviews"}
        </TabsTrigger>
        <TabsTrigger value="profile" data-ocid="tab-profile">
          <User size={14} className="mr-1.5" />
          {lang === "hi" ? "प्रोफाइल" : "Profile"}
        </TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview">
        {providerLoading ? (
          <LoadingSpinner />
        ) : !providerProfile ? (
          <EmptyState
            icon="🏢"
            title={
              lang === "hi" ? "प्रदाता प्रोफाइल नहीं है" : "No provider profile"
            }
            description={
              lang === "hi"
                ? "अपनी सेवाएं जोड़ने के लिए प्रदाता प्रोफाइल बनाएं।"
                : "Create a provider profile to list your services."
            }
            action={
              <Button asChild size="sm" data-ocid="create-provider-link">
                <Link
                  to="/services"
                  search={{
                    category: undefined,
                    state: undefined,
                    city: undefined,
                    search: undefined,
                    sort: undefined,
                  }}
                >
                  {lang === "hi" ? "प्रोफाइल बनाएं" : "Create Profile"}
                </Link>
              </Button>
            }
            ocid="empty-provider-profile"
          />
        ) : (
          <div className="space-y-4">
            {/* Business Card */}
            <Card className="shadow-card" data-ocid="provider-profile-card">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-2xl">
                    {providerProfile.profileImage ? (
                      <img
                        src={providerProfile.profileImage}
                        alt={providerProfile.businessName}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      "🏢"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg text-foreground truncate">
                        {providerProfile.businessName}
                      </h3>
                      {providerProfile.isVerified ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                          <BadgeCheck size={12} className="mr-1" />
                          {lang === "hi" ? "सत्यापित" : "Verified"}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-amber-600 border-amber-300 shrink-0"
                          data-ocid="verification-status"
                        >
                          <ShieldAlert size={12} className="mr-1" />
                          {lang === "hi"
                            ? "सत्यापन लंबित"
                            : "Pending Verification"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {providerProfile.city}, {providerProfile.state}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <StarRating rating={avgRating} size="sm" />
                        <span className="text-sm font-semibold text-foreground">
                          {avgRating.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({reviews?.length ?? 0}{" "}
                          {lang === "hi" ? "समीक्षाएं" : "reviews"})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      data-ocid="view-provider-link"
                    >
                      <Link
                        to="/services/$providerId"
                        params={{ providerId: providerProfile.id.toString() }}
                      >
                        {lang === "hi" ? "देखें" : "View"}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleEditProvider}
                      data-ocid="edit-provider-btn"
                    >
                      <Edit2 size={13} className="mr-1" />
                      {lang === "hi" ? "संपादित करें" : "Edit"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services offered */}
            {providerProfile.servicesOffered?.length > 0 && (
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    {lang === "hi" ? "दी जाने वाली सेवाएं" : "Services Offered"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {providerProfile.servicesOffered.map((svc) => (
                      <div
                        key={svc.serviceId.toString()}
                        className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/40"
                        data-ocid="service-row"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground">
                            {svc.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {svc.description}
                          </p>
                        </div>
                        {svc.price && (
                          <span className="text-xs font-semibold text-primary whitespace-nowrap">
                            ₹{svc.price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </TabsContent>

      {/* Provider Inquiries Tab */}
      <TabsContent value="inquiries">
        <div className="mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            {lang === "hi" ? "मुझे मिली पूछताछ" : "Inquiries Received"}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {lang === "hi"
              ? "सेवा खोजने वालों की पूछताछ यहां दिखेगी।"
              : "Inquiries from service seekers appear here."}
          </p>
        </div>
        {providerLoading ? (
          <LoadingSpinner />
        ) : !providerProfile ? (
          <EmptyState
            icon="📬"
            title={
              lang === "hi" ? "प्रदाता प्रोफाइल नहीं है" : "No provider profile"
            }
            description={
              lang === "hi"
                ? "पूछताछ देखने के लिए पहले प्रदाता प्रोफाइल बनाएं।"
                : "Create a provider profile first to receive inquiries."
            }
            ocid="no-profile-for-inquiries"
          />
        ) : (
          <ProviderInquiriesPanel providerId={providerProfile.id} lang={lang} />
        )}
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews">
        <div className="mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            {lang === "hi" ? "प्राप्त समीक्षाएं" : "Reviews Received"}
          </h2>
        </div>
        {reviewsLoading ? (
          <LoadingSpinner />
        ) : (reviews?.length ?? 0) === 0 ? (
          <EmptyState
            icon="⭐"
            title={lang === "hi" ? "अभी तक कोई समीक्षा नहीं" : "No reviews yet"}
            description={
              lang === "hi"
                ? "जब लोग आपकी सेवा की समीक्षा करेंगे तो यहां दिखेंगी।"
                : "Reviews from clients will appear here."
            }
            ocid="empty-provider-reviews"
          />
        ) : (
          <div className="space-y-3">
            {reviews!.map((rev) => (
              <ReviewCard key={rev.id.toString()} review={rev} lang={lang} />
            ))}
          </div>
        )}
      </TabsContent>

      {/* Profile Tab */}
      <TabsContent value="profile">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display">
                {lang === "hi" ? "मेरी प्रोफाइल" : "My Profile"}
              </CardTitle>
              {!editingProfile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProfile(true)}
                  data-ocid="edit-profile-btn"
                >
                  <Edit2 size={13} className="mr-1.5" />
                  {lang === "hi" ? "संपादित करें" : "Edit"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {editingProfile ? (
              <ProfileEditForm
                user={user}
                lang={lang}
                onClose={() => setEditingProfile(false)}
              />
            ) : (
              <ProfileDetails user={user} lang={lang} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { lang } = useLanguage();
  const { isAuthenticated, isLoading: authLoading, user, login } = useAuth();
  const navigate = useNavigate();
  const { data: freshProfile } = useMyProfile();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/auth/$action", params: { action: "login" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading) return <LoadingSpinner fullPage />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="text-5xl">🔒</div>
          <h2 className="text-xl font-display font-bold text-foreground">
            {lang === "hi" ? "लॉगिन आवश्यक है" : "Login Required"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {lang === "hi"
              ? "डैशबोर्ड देखने के लिए कृपया लॉगिन करें।"
              : "Please log in to view your dashboard."}
          </p>
          <Button onClick={login} data-ocid="dashboard-login-btn">
            {lang === "hi" ? "लॉगिन करें" : "Log In"}
          </Button>
        </div>
      </div>
    );
  }

  const resolvedUser = freshProfile ?? user;
  if (!resolvedUser) return <LoadingSpinner fullPage />;

  const isProvider = resolvedUser.role === Role.provider;
  const isAdmin = resolvedUser.role === Role.admin;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                  {lang === "hi" ? "मेरा डैशबोर्ड" : "My Dashboard"}
                </h1>
                <Badge className="bg-primary/10 text-primary border-primary/30 capitalize">
                  {isAdmin
                    ? lang === "hi"
                      ? "एडमिन"
                      : "Admin"
                    : isProvider
                      ? lang === "hi"
                        ? "प्रदाता"
                        : "Provider"
                      : lang === "hi"
                        ? "सेवा खोजने वाले"
                        : "Seeker"}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                {lang === "hi" ? "स्वागत है," : "Welcome back,"}{" "}
                <span className="text-foreground font-semibold">
                  {resolvedUser.name}
                </span>{" "}
                👋
              </p>
            </div>
            {isAdmin && (
              <Button
                asChild
                variant="outline"
                size="sm"
                data-ocid="admin-panel-link"
              >
                <Link to="/admin">
                  <Settings size={14} className="mr-1.5" />
                  {lang === "hi" ? "एडमिन पैनल" : "Admin Panel"}
                  <ChevronRight size={14} className="ml-1" />
                </Link>
              </Button>
            )}
          </motion.div>

          {/* Admin banner */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-4 p-3 rounded-lg bg-primary/8 border border-primary/20 flex items-center gap-3"
            >
              <Settings size={16} className="text-primary shrink-0" />
              <p className="text-sm text-foreground">
                {lang === "hi"
                  ? "आप एडमिन हैं। प्लेटफॉर्म को प्रबंधित करने के लिए"
                  : "You have admin privileges. Manage the platform from the"}{" "}
                <Link
                  to="/admin"
                  className="font-medium text-primary underline underline-offset-2"
                  data-ocid="admin-inline-link"
                >
                  {lang === "hi" ? "एडमिन पैनल" : "Admin Panel"}
                </Link>{" "}
                {lang === "hi" ? "जाएं।" : ""}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <DashboardStats
            user={resolvedUser}
            lang={lang}
            isProvider={isProvider}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isProvider ? (
            <ProviderDashboard user={resolvedUser} lang={lang} />
          ) : (
            <SeekerDashboard user={resolvedUser} lang={lang} />
          )}
        </motion.div>
      </section>
    </div>
  );
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

function DashboardStats({
  user,
  lang,
  isProvider,
}: {
  user: UserType;
  lang: "en" | "hi";
  isProvider: boolean;
}) {
  const { data: inquiries } = useMyInquiries();
  const { data: reviews } = useMyReviews();
  const { data: providerProfile } = useMyProviderProfile();

  const providerAvgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
      : 0;

  const stats = isProvider
    ? [
        {
          icon: "🏢",
          value: providerProfile?.businessName ?? "—",
          label: lang === "hi" ? "व्यवसाय" : "Business",
        },
        {
          icon: "⭐",
          value: providerAvgRating.toFixed(1),
          label: lang === "hi" ? "औसत रेटिंग" : "Avg. Rating",
        },
        {
          icon: "💬",
          value: String(reviews?.length ?? 0),
          label: lang === "hi" ? "समीक्षाएं" : "Reviews",
        },
      ]
    : [
        {
          icon: "📋",
          value: String(inquiries?.length ?? 0),
          label: lang === "hi" ? "पूछताछ" : "Inquiries",
        },
        {
          icon: "⭐",
          value: String(reviews?.length ?? 0),
          label: lang === "hi" ? "समीक्षाएं" : "Reviews",
        },
        {
          icon: "📍",
          value: user.state || "—",
          label: lang === "hi" ? "राज्य" : "State",
        },
      ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-2.5 p-2 rounded-lg bg-card border border-border"
          data-ocid="dashboard-stat"
        >
          <span className="text-xl">{stat.icon}</span>
          <div className="min-w-0">
            <p className="font-bold text-sm text-foreground truncate">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

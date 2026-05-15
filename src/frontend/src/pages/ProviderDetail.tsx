import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Home,
  IndianRupee,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Smartphone,
  Star,
  User2,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import StarRating from "../components/ui/StarRating";
import {
  useAddReview,
  useCategories,
  useCheckContactAvailable,
  useProvider,
  useProviderClassVideos,
  useReviewsByProvider,
  useSubmitInquiry,
} from "../hooks/use-api";
import { useAuth } from "../hooks/use-auth";
import { useLanguage } from "../hooks/use-language";
import {
  CLASS_SUBCATEGORIES,
  formatVideoDate,
  getSubCategoryIcon,
  getSubCategoryLabel,
} from "../services/backend-api";
import type {
  ClassSubCategory,
  ClassVideo,
  InquiryInput,
  ReviewInput,
} from "../types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function maskName(name: string): string {
  const parts = name.trim().split(" ");
  return parts
    .map((p) => (p.length > 1 ? `${p[0]}${"*".repeat(p.length - 1)}` : p))
    .join(" ");
}

function formatDate(ns: bigint, lang: "en" | "hi"): string {
  const ms = Number(ns) / 1_000_000;
  return new Date(ms).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const contactIcons: Record<string, React.ReactNode> = {
  phone: <Phone size={15} />,
  email: <Mail size={15} />,
  whatsapp: <MessageCircle size={15} />,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

// ─── Sub-category badge colours ───────────────────────────────────────────────

const SUB_CAT_COLORS: Record<ClassSubCategory, string> = {
  yoga: "bg-purple-100 text-purple-700 border-purple-300",
  dhyan: "bg-violet-100 text-violet-700 border-violet-300",
  fitness: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300",
  coaching: "bg-indigo-100 text-indigo-700 border-indigo-300",
};

// ─── Video download helper (object-storage _downloadFile binding) ─────────────

function triggerVideoDownload(fileKey: string, title: string) {
  try {
    // Object-storage binding: _downloadFile is injected globally at runtime
    const global = window as unknown as Record<
      string,
      (key: string, filename: string) => void
    >;
    if (typeof global._downloadFile === "function") {
      global._downloadFile(fileKey, `${title}.mp4`);
    } else {
      // Fallback: open file key as a direct URL (works when object-storage serves via URL)
      const url = fileKey.startsWith("http")
        ? fileKey
        : `/api/storage/${fileKey}`;
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.mp4`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch {
    toast.error("Download failed. Please try again.");
  }
}

// ─── Classes Tab ──────────────────────────────────────────────────────────────

interface ClassesTabProps {
  providerId: string;
  lang: "en" | "hi";
}

function ClassesTab({ providerId, lang }: ClassesTabProps) {
  const { data: allVideos = [], isLoading } =
    useProviderClassVideos(providerId);
  const [activeFilter, setActiveFilter] = useState<ClassSubCategory | "all">(
    "all",
  );

  const activeVideos = allVideos.filter((v) => v.isActive);
  const filtered =
    activeFilter === "all"
      ? activeVideos
      : activeVideos.filter((v) => v.subCategory === activeFilter);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (activeVideos.length === 0) {
    return (
      <Card>
        <CardContent
          className="py-14 text-center space-y-3"
          data-ocid="classes-empty"
        >
          <div className="text-5xl opacity-50">🎬</div>
          <p className="text-muted-foreground text-sm font-medium">
            {lang === "hi"
              ? "अभी तक कोई क्लास वीडियो नहीं है"
              : "No class videos uploaded yet"}
          </p>
          <p className="text-xs text-muted-foreground">
            {lang === "hi"
              ? "इस प्रदाता ने अभी तक कोई वीडियो प्रकाशित नहीं किया है"
              : "This provider hasn't published any videos yet"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Purple section header */}
      <div className="flex items-center gap-2 pb-1">
        <div className="h-5 w-1 rounded-full bg-purple-500" />
        <h3 className="font-semibold text-foreground text-sm">
          {lang === "hi" ? "ऑनलाइन क्लासेस" : "Online Classes"}{" "}
          <span className="text-muted-foreground font-normal">
            ({activeVideos.length})
          </span>
        </h3>
      </div>

      {/* Sub-category filter chips */}
      <fieldset
        className="flex flex-wrap gap-2 border-0 p-0 m-0"
        aria-label={lang === "hi" ? "श्रेणी फ़िल्टर" : "Category filter"}
        data-ocid="classes-filter"
      >
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
            activeFilter === "all"
              ? "bg-purple-600 text-white border-purple-600"
              : "border-purple-300 text-purple-700 hover:bg-purple-50"
          }`}
          data-ocid="filter-all"
        >
          {lang === "hi" ? "सभी" : "All"}
        </button>
        {CLASS_SUBCATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat.value}
            onClick={() => setActiveFilter(cat.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              activeFilter === cat.value
                ? "bg-purple-600 text-white border-purple-600"
                : "border-purple-300 text-purple-700 hover:bg-purple-50"
            }`}
            data-ocid={`filter-${cat.value}`}
          >
            {cat.icon} {lang === "hi" ? cat.labelHi : cat.labelEn}
          </button>
        ))}
      </fieldset>

      {/* Video grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground text-sm">
              {lang === "hi"
                ? "इस श्रेणी में कोई वीडियो नहीं है"
                : "No videos in this category"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-ocid="classes-grid"
        >
          {filtered.map((video, idx) => (
            <VideoCard
              key={video.id.toString()}
              video={video}
              lang={lang}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────

interface VideoCardProps {
  video: ClassVideo;
  lang: "en" | "hi";
  index: number;
}

function VideoCard({ video, lang, index }: VideoCardProps) {
  const subCatLabel = getSubCategoryLabel(video.subCategory, lang);
  const subCatIcon = getSubCategoryIcon(video.subCategory);
  const uploadDate = formatVideoDate(video.uploadedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
    >
      <Card className="hover:shadow-md transition-shadow overflow-hidden border-purple-100 h-full flex flex-col">
        {/* Purple top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-violet-500" />

        {/* Video preview placeholder */}
        <div className="relative bg-gradient-to-br from-purple-50 to-violet-100 h-36 flex items-center justify-center shrink-0">
          <div className="w-12 h-12 rounded-full bg-purple-600/90 flex items-center justify-center shadow-lg">
            <Video size={20} className="text-white" />
          </div>
          {/* Sub-category badge overlay */}
          <div className="absolute bottom-2 left-2">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                SUB_CAT_COLORS[video.subCategory]
              }`}
            >
              {subCatIcon} {subCatLabel}
            </span>
          </div>
        </div>

        <CardContent className="p-3 flex flex-col flex-1 space-y-2">
          {/* Title */}
          <h4 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
            {video.title}
          </h4>

          {/* Description */}
          {video.description && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
              {video.description}
            </p>
          )}

          {/* Upload date */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={11} className="shrink-0 text-purple-400" />
            <span>
              {lang === "hi" ? "अपलोड:" : "Uploaded:"} {uploadDate}
            </span>
          </div>

          {/* Download button */}
          <Button
            size="sm"
            className="w-full mt-auto gap-1.5 bg-purple-600 hover:bg-purple-700 text-white border-0"
            onClick={() => triggerVideoDownload(video.fileKey, video.title)}
            data-ocid={`download-video-${video.id.toString()}`}
            aria-label={`${lang === "hi" ? "डाउनलोड करें" : "Download"}: ${video.title}`}
          >
            <Download size={13} />
            {lang === "hi" ? "डाउनलोड करें" : "Download Video"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ProviderDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border h-12" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hero card skeleton */}
        <Card className="overflow-hidden shadow-md">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Skeleton className="h-24 w-24 rounded-2xl shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-16 w-20 rounded-xl" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Card>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProviderDetailPage() {
  const { providerId } = useParams({ from: "/services/$providerId" });
  const { t, lang } = useLanguage();
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  const id = BigInt(providerId);
  const { data: provider, isLoading, isError, refetch } = useProvider(id);
  const { data: categories } = useCategories();
  const { data: reviews } = useReviewsByProvider(id);

  // Fetch class videos early to conditionally show the Classes tab
  const { data: classVideos = [] } = useProviderClassVideos(providerId);
  const hasActiveVideos = classVideos.some((v) => v.isActive);

  const submitInquiry = useSubmitInquiry();
  const addReview = useAddReview();

  // Compute current IST time as HH:MM for availability check
  const currentISTTime = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const { data: contactAvailable } = useCheckContactAvailable(
    id,
    currentISTTime,
  );

  const [inquiryForm, setInquiryForm] = useState<
    Omit<InquiryInput, "providerId">
  >({
    serviceName: "",
    message: "",
    preferredContact: "phone",
  });
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // Auto-redirect if provider not found after loading
  useEffect(() => {
    if (!isLoading && !isError && provider === null) {
      const timer = setTimeout(() => {
        navigate({
          to: "/services",
          search: {
            category: undefined,
            state: undefined,
            city: undefined,
            search: undefined,
            sort: undefined,
          },
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isError, provider, navigate]);

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) return <ProviderDetailSkeleton />;

  // ── Not found state ───────────────────────────────────────────────────────
  if (isError || provider === null || provider === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md space-y-5"
        >
          <div className="text-7xl">🔍</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {t("provider.notFound")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {lang === "hi"
                ? "यह प्रदाता मौजूद नहीं है या हटा दिया गया है। कुछ सेकंड में वापस जाया जाएगा।"
                : "This provider does not exist or has been removed. Redirecting shortly…"}
            </p>
          </div>
          <div className="flex gap-3 justify-center">
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
              <Button data-ocid="not-found-back">
                {lang === "hi" ? "सेवाएं देखें" : "Browse Services"}
              </Button>
            </Link>
            {isError && (
              <Button variant="outline" onClick={() => refetch()}>
                {t("common.retry")}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Derived data ──────────────────────────────────────────────────────────
  const initials = provider.businessName
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  const providerCategories = categories?.filter((c) =>
    provider.categoryIds.includes(c.id),
  );

  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length
      : 0;

  const hasReviewed =
    isAuthenticated &&
    user &&
    reviews?.some((r) => r.seekerId.toString() === user.id.toString());

  const isSeeker = user?.role === "seeker" || !user;

  // Contact visibility: hide phone/WhatsApp when availability is enabled AND currently unavailable
  const availabilityEnabled = provider.contactAvailabilityEnabled === true;
  const showContact = !availabilityEnabled || contactAvailable === true;
  const availFromStr = provider.availableFrom ?? "";
  const availToStr = provider.availableTo ?? "";

  // Tab count for classes badge
  const activeVideoCount = classVideos.filter((v) => v.isActive).length;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!inquiryForm.serviceName.trim() || !inquiryForm.message.trim()) return;
    try {
      await submitInquiry.mutateAsync({ ...inquiryForm, providerId: id });
      toast.success(t("inquiry.success"));
      setInquiryForm({
        serviceName: "",
        message: "",
        preferredContact: "phone",
      });
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      login();
      return;
    }
    if (reviewRating === 0) {
      toast.error(lang === "hi" ? "कृपया रेटिंग चुनें" : "Please select a rating");
      return;
    }
    try {
      const input: ReviewInput = {
        rating: BigInt(reviewRating),
        comment: reviewComment,
        providerId: id,
      };
      await addReview.mutateAsync(input);
      toast.success(t("review.success"));
      setReviewRating(0);
      setReviewComment("");
    } catch {
      toast.error(t("common.error"));
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb bar ────────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-sm">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Home size={13} />
            {lang === "hi" ? "होम" : "Home"}
          </Link>
          <ChevronRight size={13} className="text-muted-foreground/50" />
          <Link
            to="/services"
            search={{
              category: undefined,
              state: undefined,
              city: undefined,
              search: undefined,
              sort: undefined,
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.services")}
          </Link>
          <ChevronRight size={13} className="text-muted-foreground/50" />
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {provider.businessName}
          </span>
        </div>
      </div>

      {/* ── Back button (mobile) ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:hidden">
        <Link
          to="/services"
          search={{
            category: undefined,
            state: undefined,
            city: undefined,
            search: undefined,
            sort: undefined,
          }}
          className="inline-flex items-center gap-1.5 text-sm text-primary font-medium"
          data-ocid="back-to-services"
        >
          <ChevronLeft size={16} />
          {t("common.back")}
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* ── Provider hero card ─────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)}>
          <Card className="overflow-hidden shadow-md">
            {/* Tricolor accent strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="shrink-0">
                  <Avatar className="h-24 w-24 rounded-2xl border-2 border-primary/20 shadow-sm">
                    <AvatarImage
                      src={provider.profileImage}
                      alt={provider.businessName}
                    />
                    <AvatarFallback className="rounded-2xl bg-primary/10 text-primary font-display font-bold text-3xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-3">
                  {/* Name row */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight">
                          {provider.businessName}
                        </h1>
                        {provider.isVerified && (
                          <Badge className="gap-1 bg-secondary/15 text-secondary border border-secondary/30 shrink-0">
                            <BadgeCheck size={12} />
                            {t("services.verified")}
                          </Badge>
                        )}
                        {hasActiveVideos && (
                          <Badge className="gap-1 bg-purple-100 text-purple-700 border border-purple-300 shrink-0 text-[10px]">
                            <Video size={10} />
                            {lang === "hi"
                              ? "क्लासेस उपलब्ध"
                              : "Classes Available"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                        <User2 size={13} />
                        {provider.ownerName}
                      </div>
                    </div>

                    {/* Rating badge */}
                    <div
                      className="flex flex-col items-center bg-muted/60 rounded-xl px-4 py-2 border border-border shrink-0"
                      data-ocid="provider-rating"
                    >
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-primary text-primary" />
                        <span className="font-bold text-foreground text-lg leading-none">
                          {avgRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {reviews?.length ?? 0} {t("services.reviews")}
                      </span>
                    </div>
                  </div>

                  {/* Location + contact row */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin size={14} className="text-primary shrink-0" />
                      <span>
                        {provider.city}, {provider.state}
                      </span>
                    </div>
                    {showContact && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone size={14} className="text-secondary shrink-0" />
                        <a
                          href={`tel:${provider.phone}`}
                          className="hover:text-foreground transition-colors"
                        >
                          {provider.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail size={14} className="text-primary shrink-0" />
                      <a
                        href={`mailto:${provider.email}`}
                        className="hover:text-foreground transition-colors truncate max-w-[220px]"
                      >
                        {provider.email}
                      </a>
                    </div>
                  </div>

                  {/* Category badges */}
                  {providerCategories && providerCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {providerCategories.map((cat) => (
                        <Badge
                          key={cat.id.toString()}
                          variant="outline"
                          className="text-xs"
                          style={{ borderColor: cat.color, color: cat.color }}
                        >
                          {cat.icon} {lang === "hi" ? cat.name.hi : cat.name.en}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* CTA row */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button
                      size="sm"
                      onClick={() =>
                        document.getElementById("inquire-tab")?.click()
                      }
                      data-ocid="cta-contact-provider"
                    >
                      <MessageSquare size={14} className="mr-1.5" />
                      {lang === "hi" ? "संपर्क करें" : "Contact Provider"}
                    </Button>
                    {showContact && (
                      <a href={`tel:${provider.phone}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          data-ocid="cta-call-header"
                        >
                          <Phone size={14} className="mr-1.5" />
                          {lang === "hi" ? "कॉल करें" : "Call Now"}
                        </Button>
                      </a>
                    )}
                    {hasActiveVideos && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                        onClick={() =>
                          document.getElementById("classes-tab")?.click()
                        }
                        data-ocid="cta-view-classes"
                      >
                        <Video size={14} className="mr-1.5" />
                        {lang === "hi" ? "क्लासेस देखें" : "View Classes"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Two-column layout: main + sidebar ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* ── Main content (tabs) ──────────────────────────────────────── */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-0">
            <Tabs defaultValue="about">
              <TabsList
                className={`w-full grid mb-6 ${hasActiveVideos ? "grid-cols-5" : "grid-cols-4"}`}
              >
                <TabsTrigger value="about" data-ocid="tab-about">
                  {t("provider.about")}
                </TabsTrigger>
                <TabsTrigger value="services" data-ocid="tab-services">
                  {t("provider.services")}
                </TabsTrigger>
                {hasActiveVideos && (
                  <TabsTrigger
                    value="classes"
                    id="classes-tab"
                    data-ocid="tab-classes"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    {lang === "hi" ? "क्लासेस" : "Classes"}
                    <span className="ml-1.5 bg-purple-100 text-purple-700 rounded-full text-[10px] px-1.5 py-0.5 font-semibold data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      {activeVideoCount}
                    </span>
                  </TabsTrigger>
                )}
                <TabsTrigger value="reviews" data-ocid="tab-reviews">
                  {t("provider.reviews")}
                  {reviews && reviews.length > 0 && (
                    <span className="ml-1.5 bg-primary/15 text-primary rounded-full text-[10px] px-1.5 py-0.5 font-semibold">
                      {reviews.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="inquire"
                  id="inquire-tab"
                  data-ocid="tab-inquire"
                >
                  {t("provider.inquire")}
                </TabsTrigger>
              </TabsList>

              {/* ── About ───────────────────────────────────────────────── */}
              <TabsContent value="about" className="space-y-4">
                {/* English bio */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <User2 size={16} className="text-primary" />
                      <span>About Us</span>
                      <span className="text-muted-foreground font-normal text-sm">
                        — परिचय
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    {provider.bioEn ? (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          English
                        </p>
                        <p className="text-foreground leading-relaxed text-sm">
                          {provider.bioEn}
                        </p>
                      </div>
                    ) : null}
                    {provider.bioHi ? (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          हिंदी
                        </p>
                        <p className="text-foreground leading-relaxed text-sm text-hindi">
                          {provider.bioHi}
                        </p>
                      </div>
                    ) : null}
                    {!provider.bioEn && !provider.bioHi && (
                      <p className="text-muted-foreground text-sm italic">
                        {t("common.noData")}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Service areas */}
                {provider.serviceAreas.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <MapPin size={16} className="text-secondary" />
                        {t("provider.serviceAreas")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {provider.serviceAreas.map((area) => (
                          <Badge
                            key={area}
                            variant="secondary"
                            className="text-xs gap-1"
                          >
                            <MapPin size={10} />
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* ── Services Offered ────────────────────────────────────── */}
              <TabsContent value="services">
                {provider.servicesOffered.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center space-y-2">
                      <div className="text-4xl opacity-40">🛠️</div>
                      <p className="text-muted-foreground text-sm">
                        {lang === "hi"
                          ? "कोई सेवाएं सूचीबद्ध नहीं हैं"
                          : "No services listed yet"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {provider.servicesOffered.map((svc, idx) => (
                      <motion.div
                        key={svc.serviceId.toString()}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.07 }}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start gap-3">
                              <div className="flex-1 min-w-0 space-y-1">
                                <h4 className="font-semibold text-foreground truncate">
                                  {svc.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {svc.description}
                                </p>
                                {svc.availability && (
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Clock size={11} className="shrink-0" />
                                    {svc.availability}
                                  </div>
                                )}
                              </div>
                              {svc.price && (
                                <Badge className="shrink-0 gap-1 bg-primary/10 text-primary border-primary/30">
                                  <IndianRupee size={10} />
                                  {svc.price}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* ── Online Classes ───────────────────────────────────────── */}
              {hasActiveVideos && (
                <TabsContent value="classes">
                  <ClassesTab providerId={providerId} lang={lang} />
                </TabsContent>
              )}

              {/* ── Reviews ─────────────────────────────────────────────── */}
              <TabsContent value="reviews" className="space-y-4">
                {/* Write a review */}
                {isAuthenticated && isSeeker && !hasReviewed && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Star size={16} className="text-primary fill-primary" />
                        {t("provider.writeReview")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                          <Label className="text-sm mb-2 block">
                            {t("review.rating")}
                          </Label>
                          <StarRating
                            rating={reviewRating}
                            interactive
                            onChange={setReviewRating}
                            size="lg"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="review-comment"
                            className="text-sm mb-1 block"
                          >
                            {t("review.comment")}
                          </Label>
                          <Textarea
                            id="review-comment"
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder={
                              lang === "hi"
                                ? "अपना अनुभव साझा करें..."
                                : "Share your experience with this provider..."
                            }
                            rows={3}
                            data-ocid="review-comment"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={addReview.isPending || reviewRating === 0}
                          data-ocid="submit-review"
                          className="w-full sm:w-auto"
                        >
                          {addReview.isPending
                            ? t("common.loading")
                            : t("review.submit")}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {!isAuthenticated && (
                  <Card className="border-dashed border-primary/30">
                    <CardContent className="py-6 text-center space-y-3">
                      <p className="text-muted-foreground text-sm">
                        {lang === "hi"
                          ? "समीक्षा लिखने के लिए लॉग इन करें"
                          : "Log in to write a review"}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={login}
                        data-ocid="login-to-review"
                      >
                        {t("nav.login")}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Review list */}
                {(reviews ?? []).length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center space-y-2">
                      <Star
                        size={32}
                        className="mx-auto text-muted-foreground/30"
                      />
                      <p className="text-muted-foreground text-sm">
                        {lang === "hi"
                          ? "अभी तक कोई समीक्षा नहीं। पहले समीक्षा करें!"
                          : "No reviews yet. Be the first to review!"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3" data-ocid="reviews-list">
                    {(reviews ?? []).map((review, idx) => (
                      <motion.div
                        key={review.id.toString()}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                      >
                        <Card>
                          <CardContent className="p-4 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <StarRating
                                  rating={Number(review.rating)}
                                  size="sm"
                                />
                                <span className="text-sm font-medium text-foreground">
                                  {maskName(
                                    lang === "hi" ? "उपयोगकर्ता" : "User",
                                  )}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {formatDate(review.createdAt, lang)}
                              </span>
                            </div>
                            {review.comment && (
                              <p className="text-sm text-foreground/90 leading-relaxed">
                                {review.comment}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* ── Send Inquiry ─────────────────────────────────────────── */}
              <TabsContent value="inquire">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare size={16} className="text-primary" />
                      {t("inquiry.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {!isAuthenticated ? (
                      <div className="py-8 text-center space-y-4">
                        <p className="text-muted-foreground text-sm">
                          {lang === "hi"
                            ? "पूछताछ भेजने के लिए लॉग इन करें"
                            : "Please log in to send an inquiry"}
                        </p>
                        <Button onClick={login} data-ocid="login-to-inquire">
                          {t("nav.login")}
                        </Button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleInquirySubmit}
                        className="space-y-5"
                      >
                        <div>
                          <Label
                            htmlFor="service-name"
                            className="text-sm mb-1.5 block"
                          >
                            {t("inquiry.service")} *
                          </Label>
                          <input
                            id="service-name"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            value={inquiryForm.serviceName}
                            onChange={(e) =>
                              setInquiryForm({
                                ...inquiryForm,
                                serviceName: e.target.value,
                              })
                            }
                            placeholder={
                              lang === "hi"
                                ? "किस सेवा की जरूरत है?"
                                : "What service do you need?"
                            }
                            required
                            data-ocid="inquiry-service"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="inquiry-message"
                            className="text-sm mb-1.5 block"
                          >
                            {t("inquiry.message")} *
                          </Label>
                          <Textarea
                            id="inquiry-message"
                            value={inquiryForm.message}
                            onChange={(e) =>
                              setInquiryForm({
                                ...inquiryForm,
                                message: e.target.value,
                              })
                            }
                            placeholder={
                              lang === "hi"
                                ? "अपनी जरूरत विस्तार से बताएं..."
                                : "Describe your requirement in detail..."
                            }
                            rows={4}
                            required
                            data-ocid="inquiry-message"
                          />
                        </div>

                        {/* Preferred contact method */}
                        <div>
                          <Label className="text-sm mb-3 block">
                            {t("inquiry.contact")}
                          </Label>
                          <RadioGroup
                            value={inquiryForm.preferredContact}
                            onValueChange={(val) =>
                              setInquiryForm({
                                ...inquiryForm,
                                preferredContact: val,
                              })
                            }
                            className="grid grid-cols-3 gap-3"
                            data-ocid="inquiry-contact"
                          >
                            {(["phone", "email", "whatsapp"] as const).map(
                              (method) => (
                                <label
                                  key={method}
                                  htmlFor={`contact-${method}`}
                                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                                    inquiryForm.preferredContact === method
                                      ? "border-primary bg-primary/8 text-primary"
                                      : "border-border text-muted-foreground hover:border-primary/40"
                                  }`}
                                >
                                  <RadioGroupItem
                                    value={method}
                                    id={`contact-${method}`}
                                    className="sr-only"
                                  />
                                  <span className="text-current">
                                    {contactIcons[method]}
                                  </span>
                                  <span className="text-xs font-medium capitalize">
                                    {method === "whatsapp"
                                      ? "WhatsApp"
                                      : lang === "hi"
                                        ? method === "phone"
                                          ? "फोन"
                                          : "ईमेल"
                                        : method.charAt(0).toUpperCase() +
                                          method.slice(1)}
                                  </span>
                                </label>
                              ),
                            )}
                          </RadioGroup>
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={submitInquiry.isPending}
                          data-ocid="submit-inquiry"
                        >
                          {submitInquiry.isPending
                            ? t("common.loading")
                            : t("inquiry.submit")}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* ── Sidebar: contact details ─────────────────────────────────── */}
          <motion.div {...fadeUp(0.2)} className="space-y-4">
            {/* Unavailability message — shown when contact is hidden */}
            {!showContact && (
              <div
                className="rounded-xl border border-primary/30 bg-primary/8 px-4 py-3 space-y-1"
                data-ocid="unavailability-message"
              >
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-primary shrink-0" />
                  <p className="text-sm font-semibold text-foreground">
                    {lang === "hi"
                      ? "अभी उपलब्ध नहीं हैं"
                      : "Not available right now"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground pl-5">
                  {lang === "hi"
                    ? `सेवा प्रदाता ${availFromStr} से ${availToStr} IST तक उपलब्ध हैं`
                    : `Provider available from ${availFromStr} to ${availToStr} IST`}
                </p>
              </div>
            )}

            {/* Contact card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone size={15} className="text-primary" />
                  {t("provider.contact")}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {showContact ? (
                  <div className="flex items-start gap-3">
                    <Phone
                      size={14}
                      className="text-secondary shrink-0 mt-0.5"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {lang === "hi" ? "फोन" : "Phone"}
                      </p>
                      <a
                        href={`tel:${provider.phone}`}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {provider.phone}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                    <Clock size={13} className="text-primary shrink-0" />
                    <span>
                      {lang === "hi"
                        ? `संपर्क उपलब्ध: ${availFromStr} – ${availToStr} IST`
                        : `Contact available: ${availFromStr} – ${availToStr} IST`}
                    </span>
                  </div>
                )}

                <Separator />

                <div className="flex items-start gap-3">
                  <Mail size={14} className="text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {lang === "hi" ? "ईमेल" : "Email"}
                    </p>
                    <a
                      href={`mailto:${provider.email}`}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors break-all"
                    >
                      {provider.email}
                    </a>
                  </div>
                </div>

                {provider.address && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={14}
                        className="text-secondary shrink-0 mt-0.5"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {lang === "hi" ? "पता" : "Address"}
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">
                          {provider.address}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {lang === "hi" ? "स्थान" : "Location"}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {provider.city}, {provider.state}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card className="shadow-sm">
              <CardContent className="p-4 space-y-2.5">
                {showContact ? (
                  <>
                    <a href={`tel:${provider.phone}`} className="block">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        data-ocid="cta-call"
                      >
                        <Phone size={15} />
                        {lang === "hi" ? "कॉल करें" : "Call Now"}
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${provider.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-secondary/40 text-secondary hover:bg-secondary/10"
                        data-ocid="cta-whatsapp"
                      >
                        <Smartphone size={15} />
                        WhatsApp
                      </Button>
                    </a>
                  </>
                ) : (
                  <div
                    className="rounded-lg bg-primary/6 border border-primary/20 px-3 py-2.5 text-center space-y-1"
                    data-ocid="contact-hidden-notice"
                  >
                    <p className="text-xs font-semibold text-foreground">
                      {lang === "hi" ? "अभी उपलब्ध नहीं" : "Not available now"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "hi"
                        ? `${availFromStr} – ${availToStr} IST पर वापस आएं`
                        : `Come back at ${availFromStr} – ${availToStr} IST`}
                    </p>
                  </div>
                )}
                <a href={`mailto:${provider.email}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    data-ocid="cta-email"
                  >
                    <Mail size={15} />
                    {lang === "hi" ? "ईमेल करें" : "Send Email"}
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Classes quick-access card (sidebar) */}
            {hasActiveVideos && (
              <Card className="shadow-sm border-purple-200 bg-purple-50/50">
                <CardContent className="p-4 space-y-2.5">
                  <div className="flex items-center gap-2 mb-1">
                    <Video size={14} className="text-purple-600 shrink-0" />
                    <p className="text-sm font-semibold text-purple-800">
                      {lang === "hi" ? "ऑनलाइन क्लासेस" : "Online Classes"}
                    </p>
                    <span className="ml-auto text-xs bg-purple-200 text-purple-700 rounded-full px-2 py-0.5 font-medium">
                      {activeVideoCount}
                    </span>
                  </div>
                  <p className="text-xs text-purple-700/80">
                    {lang === "hi"
                      ? "योग, ध्यान, फिटनेस और कोचिंग वीडियो डाउनलोड करें"
                      : "Download Yoga, Meditation, Fitness & Coaching videos"}
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0 gap-1.5"
                    onClick={() =>
                      document.getElementById("classes-tab")?.click()
                    }
                    data-ocid="sidebar-view-classes"
                  >
                    <Download size={13} />
                    {lang === "hi" ? "क्लासेस देखें" : "View Classes"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Service areas chip (sidebar) */}
            {provider.serviceAreas.length > 0 && (
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
                    <MapPin size={13} />
                    {t("provider.serviceAreas")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {provider.serviceAreas.map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

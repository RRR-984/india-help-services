import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlarmClock,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit2,
  MessageCircle,
  MessageSquare,
  Settings,
  ShieldAlert,
  Star,
  Trash2,
  Upload,
  User,
  Video,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { ErrorMessage, LoadingSpinner } from "../components/ui/LoadingSpinner";
import StarRating from "../components/ui/StarRating";
import { useActor } from "../hooks/use-actor";
import {
  useAddClassVideo,
  useCreateProviderProfile,
  useDeleteClassVideo,
  useInquiriesByProvider,
  useMyClassVideos,
  useMyInquiries,
  useMyProfile,
  useMyProviderProfile,
  useMyReviews,
  useToggleClassVideoActive,
  useUpdateInquiryStatus,
  useUpdateProviderProfile,
  useUpdateUserProfile,
} from "../hooks/use-api";
import { useAuth } from "../hooks/use-auth";
import { useLanguage } from "../hooks/use-language";
import {
  CLASS_SUBCATEGORIES,
  INDIAN_STATES,
  formatVideoDate,
  getSubCategoryIcon,
  getSubCategoryLabel,
} from "../services/backend-api";
import type {
  ClassSubCategory,
  Inquiry,
  Review,
  User as UserType,
} from "../types";
import { InquiryStatus, Role } from "../types";

// ─── Status badge config ──────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  InquiryStatus,
  {
    colorClass: string;
    icon: React.ReactNode;
    labelEn: string;
    labelHi: string;
  }
> = {
  [InquiryStatus.pending]: {
    colorClass: "bg-primary/10 text-primary border-primary/30",
    icon: <Clock size={11} />,
    labelEn: "Pending",
    labelHi: "प्रतीक्षारत",
  },
  [InquiryStatus.responded]: {
    colorClass: "bg-secondary/10 text-secondary border-secondary/30",
    icon: <MessageCircle size={11} />,
    labelEn: "Responded",
    labelHi: "जवाब मिला",
  },
  [InquiryStatus.closed]: {
    colorClass: "bg-muted text-muted-foreground border-border",
    icon: <XCircle size={11} />,
    labelEn: "Closed",
    labelHi: "बंद",
  },
};

function StatusBadge({
  status,
  lang,
}: { status: InquiryStatus; lang: "en" | "hi" }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.colorClass}`}
    >
      {cfg.icon}
      {lang === "hi" ? cfg.labelHi : cfg.labelEn}
    </span>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

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

// ─── Profile Details (read-only) ──────────────────────────────────────────────

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

// ─── Profile Edit Form ────────────────────────────────────────────────────────

function ProfileEditForm({
  user,
  lang,
  onClose,
}: { user: UserType; lang: "en" | "hi"; onClose: () => void }) {
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

// ─── Incoming Inquiry Card (Provider) ─────────────────────────────────────────

function IncomingInquiryCard({
  inquiry,
  lang,
}: { inquiry: Inquiry; lang: "en" | "hi" }) {
  const updateStatus = useUpdateInquiryStatus();
  const date = new Date(
    Number(inquiry.createdAt) / 1_000_000,
  ).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function markStatus(status: InquiryStatus) {
    updateStatus.mutate(
      { id: inquiry.id, status },
      {
        onSuccess: () =>
          toast.success(lang === "hi" ? "स्थिति अपडेट हुई" : "Status updated"),
        onError: () =>
          toast.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong"),
      },
    );
  }

  return (
    <Card className="shadow-card" data-ocid="incoming-inquiry-row">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
            <MessageCircle size={16} className="text-secondary" />
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
        </div>
        {inquiry.status !== InquiryStatus.closed && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {inquiry.status === InquiryStatus.pending && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 border-secondary/40 text-secondary hover:bg-secondary/10"
                disabled={updateStatus.isPending}
                onClick={() => markStatus(InquiryStatus.responded)}
                data-ocid="mark-responded-btn"
              >
                <CheckCircle2 size={12} className="mr-1" />
                {lang === "hi" ? "जवाब दिया" : "Mark Responded"}
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7"
              disabled={updateStatus.isPending}
              onClick={() => markStatus(InquiryStatus.closed)}
              data-ocid="mark-closed-btn"
            >
              <XCircle size={12} className="mr-1" />
              {lang === "hi" ? "बंद करें" : "Mark Closed"}
            </Button>
          </div>
        )}
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

// ─── Provider Profile Form ─────────────────────────────────────────────────────

interface ProviderFormState {
  businessName: string;
  bioEn: string;
  bioHi: string;
  servicesOffered: string;
  state: string;
  city: string;
  phone: string;
}

function ProviderProfileForm({
  lang,
  initialData,
  providerId,
  onClose,
}: {
  lang: "en" | "hi";
  initialData?: ProviderFormState;
  providerId?: bigint;
  onClose?: () => void;
}) {
  const createProvider = useCreateProviderProfile();
  const updateProvider = useUpdateProviderProfile();
  const { user } = useAuth();

  const [form, setForm] = useState<ProviderFormState>(
    initialData ?? {
      businessName: "",
      bioEn: "",
      bioHi: "",
      servicesOffered: "",
      state: user?.state ?? "",
      city: user?.city ?? "",
      phone: user?.phone ?? "",
    },
  );

  function setField(field: keyof ProviderFormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function buildInput() {
    const servicesArr = form.servicesOffered
      .split("\n")
      .filter(Boolean)
      .map((line, idx) => ({
        serviceId: BigInt(idx + 1),
        title: line.trim(),
        description: "",
        availability: "Mon–Sat",
      }));
    return {
      businessName: form.businessName,
      ownerName: user?.name ?? "",
      email: user?.email ?? "",
      phone: form.phone,
      state: form.state,
      city: form.city,
      address: "",
      bioEn: form.bioEn,
      bioHi: form.bioHi,
      servicesOffered: servicesArr,
      serviceAreas: [form.city],
      categoryIds: [],
      profileImage: undefined as string | undefined,
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.businessName.trim()) {
      toast.error(
        lang === "hi" ? "व्यापार का नाम आवश्यक है" : "Business name required",
      );
      return;
    }
    try {
      if (providerId !== undefined) {
        await updateProvider.mutateAsync({
          id: providerId,
          input: buildInput(),
        });
        toast.success(lang === "hi" ? "प्रोफाइल अपडेट हुई" : "Profile updated!");
      } else {
        await createProvider.mutateAsync(buildInput());
        toast.success(
          lang === "hi" ? "प्रोफाइल बनाई गई!" : "Provider profile created!",
        );
      }
      onClose?.();
    } catch {
      toast.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong");
    }
  }

  const isPending = createProvider.isPending || updateProvider.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="provider-profile-form"
    >
      <div className="space-y-1.5">
        <Label htmlFor="pf-business">
          {lang === "hi" ? "व्यापार का नाम" : "Business Name"}
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input
          id="pf-business"
          placeholder={
            lang === "hi" ? "जैसे: शर्मा इलेक्ट्रिकल्स" : "e.g. Sharma Electricals"
          }
          value={form.businessName}
          onChange={(e) => setField("businessName", e.target.value)}
          required
          data-ocid="pf-business-name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pf-state">{lang === "hi" ? "राज्य" : "State"}</Label>
          <Select
            value={form.state}
            onValueChange={(v) => setField("state", v)}
          >
            <SelectTrigger id="pf-state" data-ocid="pf-state">
              <SelectValue
                placeholder={lang === "hi" ? "राज्य चुनें" : "Select state"}
              />
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
        <div className="space-y-1.5">
          <Label htmlFor="pf-city">{lang === "hi" ? "शहर" : "City"}</Label>
          <Input
            id="pf-city"
            value={form.city}
            onChange={(e) => setField("city", e.target.value)}
            data-ocid="pf-city"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="pf-phone">{lang === "hi" ? "फोन" : "Phone"}</Label>
          <Input
            id="pf-phone"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            data-ocid="pf-phone"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pf-services">
          {lang === "hi" ? "दी जाने वाली सेवाएं" : "Services Offered"}
          <span className="text-xs text-muted-foreground ml-1">
            ({lang === "hi" ? "एक प्रति पंक्ति" : "one per line"})
          </span>
        </Label>
        <Textarea
          id="pf-services"
          rows={3}
          placeholder={
            lang === "hi"
              ? "इलेक्ट्रिकल वायरिंग\nफैन इंस्टालेशन"
              : "Electrical wiring\nFan installation\nSwitch repair"
          }
          value={form.servicesOffered}
          onChange={(e) => setField("servicesOffered", e.target.value)}
          data-ocid="pf-services"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pf-bio-en">
          {lang === "hi" ? "परिचय (अंग्रेजी)" : "Bio (English)"}
        </Label>
        <Textarea
          id="pf-bio-en"
          rows={3}
          placeholder="Describe your experience and expertise..."
          value={form.bioEn}
          onChange={(e) => setField("bioEn", e.target.value)}
          data-ocid="pf-bio-en"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pf-bio-hi">
          {lang === "hi" ? "परिचय (हिंदी)" : "Bio (Hindi)"}
          <span className="text-muted-foreground text-xs ml-1">
            ({lang === "hi" ? "वैकल्पिक" : "optional"})
          </span>
        </Label>
        <Textarea
          id="pf-bio-hi"
          rows={2}
          placeholder="हिंदी में अपना परिचय लिखें..."
          value={form.bioHi}
          onChange={(e) => setField("bioHi", e.target.value)}
          data-ocid="pf-bio-hi"
        />
      </div>

      <div className="flex gap-2 justify-end pt-1">
        {onClose && (
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            {lang === "hi" ? "रद्द करें" : "Cancel"}
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          data-ocid="pf-save-btn"
        >
          {isPending
            ? lang === "hi"
              ? "सहेज रहे हैं..."
              : "Saving..."
            : providerId !== undefined
              ? lang === "hi"
                ? "अपडेट करें"
                : "Update Profile"
              : lang === "hi"
                ? "प्रोफाइल बनाएं"
                : "Create Profile"}
        </Button>
      </div>
    </form>
  );
}

// ─── Working Hours Card ───────────────────────────────────────────────────────

function WorkingHoursCard({
  lang,
  providerId,
  initialEnabled,
  initialFrom,
  initialTo,
}: {
  lang: "en" | "hi";
  providerId: bigint;
  initialEnabled: boolean;
  initialFrom: string;
  initialTo: string;
}) {
  const updateProvider = useUpdateProviderProfile();
  const { data: providerProfile } = useMyProviderProfile();

  const [enabled, setEnabled] = useState(initialEnabled);
  const [from, setFrom] = useState(initialFrom || "09:00");
  const [to, setTo] = useState(initialTo || "18:00");
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!providerProfile) return;
    const input = {
      businessName: providerProfile.businessName,
      ownerName: providerProfile.ownerName,
      email: providerProfile.email,
      phone: providerProfile.phone,
      state: providerProfile.state,
      city: providerProfile.city,
      address: providerProfile.address,
      bioEn: providerProfile.bioEn,
      bioHi: providerProfile.bioHi,
      servicesOffered: providerProfile.servicesOffered,
      serviceAreas: providerProfile.serviceAreas,
      categoryIds: providerProfile.categoryIds,
      profileImage: providerProfile.profileImage,
      contactAvailabilityEnabled: enabled,
      availableFrom: enabled ? from : "",
      availableTo: enabled ? to : "",
    };
    try {
      await updateProvider.mutateAsync({ id: providerId, input });
      setSaved(true);
      toast.success(
        lang === "hi" ? "उपलब्धता सेटिंग सहेजी गई" : "Availability saved",
      );
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong");
    }
  }

  return (
    <Card
      className="shadow-card border-primary/20"
      data-ocid="working-hours-card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display flex items-center gap-2">
          <AlarmClock size={16} className="text-primary" />
          {lang === "hi" ? "संपर्क समय सेटिंग" : "Working Hours"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <Label
              htmlFor="availability-toggle"
              className="text-sm font-medium cursor-pointer"
            >
              {lang === "hi"
                ? "संपर्क समय सक्षम करें"
                : "Enable contact availability hours"}
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lang === "hi"
                ? "वह समय सेट करें जब विजिटर आपकी संपर्क जानकारी देख सकें"
                : "Set hours when visitors can see your contact info"}
            </p>
          </div>
          <Switch
            id="availability-toggle"
            checked={enabled}
            onCheckedChange={setEnabled}
            data-ocid="availability-toggle"
            className="data-[state=checked]:bg-primary"
          />
        </div>

        {enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="avail-from" className="text-sm">
                {lang === "hi" ? "उपलब्ध से" : "Available from"}
              </Label>
              <Input
                id="avail-from"
                type="time"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                data-ocid="avail-from"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="avail-to" className="text-sm">
                {lang === "hi" ? "उपलब्ध तक" : "Available to"}
              </Label>
              <Input
                id="avail-to"
                type="time"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                data-ocid="avail-to"
              />
            </div>
          </motion.div>
        )}

        {!enabled && (
          <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
            {lang === "hi"
              ? "जब बंद हो: आपका फोन और WhatsApp हमेशा दिखेगा।"
              : "When off: your phone and WhatsApp are always visible to visitors."}
          </p>
        )}

        {saved && (
          <p className="text-xs text-secondary font-medium flex items-center gap-1.5">
            <CheckCircle2 size={12} />
            {lang === "hi"
              ? `सेटिंग सहेजी गई${enabled ? ` (${from} – ${to} IST)` : ""}`
              : `Settings saved${enabled ? ` (${from} – ${to} IST)` : ""}`}
          </p>
        )}

        <Button
          size="sm"
          onClick={handleSave}
          disabled={updateProvider.isPending}
          data-ocid="save-availability-btn"
          className="w-full sm:w-auto"
        >
          {updateProvider.isPending
            ? lang === "hi"
              ? "सहेज रहे हैं..."
              : "Saving..."
            : lang === "hi"
              ? "उपलब्धता सहेजें"
              : "Save availability"}
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Video Upload Form ─────────────────────────────────────────────────────────

function VideoUploadForm({
  lang,
  providerId,
  onUploaded,
}: {
  lang: "en" | "hi";
  providerId: string;
  onUploaded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState<ClassSubCategory>("yoga");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { actor } = useActor();
  const addClassVideo = useAddClassVideo();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error(lang === "hi" ? "शीर्षक आवश्यक है" : "Title is required");
      return;
    }
    if (!file) {
      toast.error(
        lang === "hi" ? "कृपया वीडियो चुनें" : "Please select a video file",
      );
      return;
    }
    if (!actor) {
      toast.error(lang === "hi" ? "कनेक्शन नहीं है" : "Not connected");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    try {
      // Read file as bytes
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Create ExternalBlob with progress tracking
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(Math.round(pct * 100));
      });

      // Use actor's internal _uploadFile (object-storage binding)
      const actorInternal = actor as unknown as Record<
        string,
        (b: ExternalBlob) => Promise<Uint8Array>
      >;
      let fileKey: string;
      if (typeof actorInternal._uploadFile === "function") {
        const resultBytes = await actorInternal._uploadFile(blob);
        fileKey = new TextDecoder().decode(resultBytes);
      } else {
        throw new Error("Upload not available");
      }

      await addClassVideo.mutateAsync({
        providerId,
        input: { title, description, subCategory, fileKey },
      });

      toast.success(
        lang === "hi"
          ? "वीडियो सफलतापूर्वक अपलोड हुआ! 🎉"
          : "Video uploaded successfully! 🎉",
      );
      setTitle("");
      setDescription("");
      setSubCategory("yoga");
      setFile(null);
      setUploadProgress(0);
      if (fileRef.current) fileRef.current.value = "";
      onUploaded();
    } catch (err) {
      console.error(err);
      toast.error(
        lang === "hi"
          ? "अपलोड विफल हुआ, पुनः प्रयास करें"
          : "Upload failed, please try again",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="video-upload-form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="vid-title">
            {lang === "hi"
              ? "वीडियो शीर्षक / Video Title"
              : "Video Title / वीडियो शीर्षक"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="vid-title"
            placeholder={
              lang === "hi"
                ? "जैसे: सुबह की योग दिनचर्या"
                : "e.g. Morning Yoga Routine"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isUploading}
            data-ocid="vid-title"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="vid-subcategory">
            {lang === "hi" ? "श्रेणी / Category" : "Category / श्रेणी"}
          </Label>
          <Select
            value={subCategory}
            onValueChange={(v) => setSubCategory(v as ClassSubCategory)}
            disabled={isUploading}
          >
            <SelectTrigger id="vid-subcategory" data-ocid="vid-subcategory">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CLASS_SUBCATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.icon} {lang === "hi" ? cat.labelHi : cat.labelEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="vid-file">
            {lang === "hi"
              ? "वीडियो फाइल / Video File"
              : "Video File / वीडियो फाइल"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="vid-file"
            type="file"
            accept="video/*"
            ref={fileRef}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={isUploading}
            className="cursor-pointer file:mr-2 file:text-xs file:font-medium file:bg-[oklch(var(--online-classes-accent)/0.1)] file:text-[oklch(var(--online-classes-accent))] file:border-0 file:rounded file:px-2 file:py-1"
            data-ocid="vid-file"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="vid-desc">
            {lang === "hi" ? "विवरण / Description" : "Description / विवरण"}
          </Label>
          <Textarea
            id="vid-desc"
            rows={2}
            placeholder={
              lang === "hi"
                ? "इस वीडियो के बारे में बताएं..."
                : "Describe what this video covers..."
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
            data-ocid="vid-desc"
          />
        </div>
      </div>

      {/* Upload progress */}
      {isUploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{lang === "hi" ? "अपलोड हो रहा है..." : "Uploading..."}</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress
            value={uploadProgress}
            className="h-2 bg-muted [&>div]:bg-[oklch(var(--online-classes-accent))]"
          />
        </motion.div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isUploading || !file || !title.trim()}
          className="bg-[oklch(var(--online-classes-accent))] text-[oklch(var(--online-classes-accent-foreground))] hover:bg-[oklch(var(--online-classes-accent)/0.9)]"
          data-ocid="vid-upload-btn"
        >
          <Upload size={15} className="mr-2" />
          {isUploading
            ? lang === "hi"
              ? "अपलोड हो रहा है..."
              : "Uploading..."
            : lang === "hi"
              ? "वीडियो अपलोड करें"
              : "Upload Video"}
        </Button>
      </div>
    </form>
  );
}

// ─── My Videos Section ────────────────────────────────────────────────────────

function MyVideosSection({
  lang,
  providerId,
}: {
  lang: "en" | "hi";
  providerId: string;
}) {
  const [showUpload, setShowUpload] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const { data: videos, isLoading, refetch } = useMyClassVideos(providerId);
  const deleteVideo = useDeleteClassVideo();
  const toggleActive = useToggleClassVideoActive();

  async function handleDelete(videoId: bigint) {
    if (
      !window.confirm(
        lang === "hi"
          ? "क्या आप इस वीडियो को हटाना चाहते हैं?"
          : "Are you sure you want to delete this video?",
      )
    )
      return;

    setDeletingId(videoId);
    try {
      await deleteVideo.mutateAsync({ videoId, providerId });
      toast.success(lang === "hi" ? "वीडियो हटा दिया गया" : "Video deleted");
    } catch {
      toast.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggle(videoId: bigint) {
    try {
      await toggleActive.mutateAsync({ videoId, providerId });
      toast.success(lang === "hi" ? "स्थिति अपडेट हुई" : "Status updated");
    } catch {
      toast.error(lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong");
    }
  }

  return (
    <Card
      className="shadow-card border-[oklch(var(--online-classes-accent)/0.25)]"
      data-ocid="my-videos-section"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[oklch(var(--online-classes-accent)/0.12)] flex items-center justify-center">
              <Video
                size={16}
                className="text-[oklch(var(--online-classes-accent))]"
              />
            </div>
            <div>
              <CardTitle className="text-base font-display">
                {lang === "hi" ? "मेरे वीडियो" : "My Videos"}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lang === "hi"
                  ? "ऑनलाइन क्लास वीडियो प्रबंधित करें"
                  : "Manage your online class videos"}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={showUpload ? "outline" : "default"}
            onClick={() => setShowUpload((v) => !v)}
            className={
              showUpload
                ? ""
                : "bg-[oklch(var(--online-classes-accent))] text-[oklch(var(--online-classes-accent-foreground))] hover:bg-[oklch(var(--online-classes-accent)/0.9)]"
            }
            data-ocid="toggle-upload-form-btn"
          >
            <Upload size={14} className="mr-1.5" />
            {showUpload
              ? lang === "hi"
                ? "बंद करें"
                : "Close"
              : lang === "hi"
                ? "नया वीडियो"
                : "Upload New"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Upload form */}
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border border-[oklch(var(--online-classes-accent)/0.3)] rounded-xl p-4 bg-[oklch(var(--online-classes-accent)/0.04)]"
            data-ocid="upload-form-panel"
          >
            <p className="text-sm font-semibold text-[oklch(var(--online-classes-accent))] mb-3 flex items-center gap-2">
              <Upload size={14} />
              {lang === "hi"
                ? "नया वीडियो अपलोड करें / Upload New Video"
                : "Upload New Video / नया वीडियो अपलोड करें"}
            </p>
            <VideoUploadForm
              lang={lang}
              providerId={providerId}
              onUploaded={() => {
                setShowUpload(false);
                refetch();
              }}
            />
          </motion.div>
        )}

        {/* Videos grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : !videos?.length ? (
          <EmptyState
            icon="🎥"
            title={lang === "hi" ? "अभी तक कोई वीडियो नहीं" : "No videos yet"}
            description={
              lang === "hi"
                ? "अपना पहला योग, ध्यान या कोचिंग वीडियो अपलोड करें।"
                : "Upload your first yoga, meditation, fitness or coaching video."
            }
            ocid="empty-videos"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {videos.map((video, i) => (
              <motion.div
                key={video.id.toString()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border border-border rounded-xl overflow-hidden bg-card hover:shadow-card transition-smooth"
                data-ocid="video-row"
              >
                {/* Video thumbnail area */}
                <div className="aspect-video bg-muted/60 relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[oklch(var(--online-classes-accent)/0.15)] flex items-center justify-center">
                    <Video
                      size={22}
                      className="text-[oklch(var(--online-classes-accent))]"
                    />
                  </div>
                  {/* Sub-category badge */}
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[oklch(var(--online-classes-accent)/0.15)] text-[oklch(var(--online-classes-accent))] border border-[oklch(var(--online-classes-accent)/0.3)]">
                      {getSubCategoryIcon(video.subCategory)}
                      {getSubCategoryLabel(video.subCategory, lang)}
                    </span>
                  </div>
                  {/* Active/inactive indicator */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                        video.isActive
                          ? "bg-secondary/15 text-secondary border-secondary/30"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {video.isActive
                        ? lang === "hi"
                          ? "सक्रिय"
                          : "Active"
                        : lang === "hi"
                          ? "निष्क्रिय"
                          : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Video info */}
                <div className="p-3 space-y-2">
                  <p className="font-semibold text-sm text-foreground line-clamp-1">
                    {video.title}
                  </p>
                  {video.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground/70">
                    {formatVideoDate(video.uploadedAt)}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    {/* Toggle active */}
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={video.isActive}
                        onCheckedChange={() => handleToggle(video.id)}
                        disabled={toggleActive.isPending}
                        className="data-[state=checked]:bg-[oklch(var(--online-classes-accent))]"
                        aria-label={
                          lang === "hi" ? "सक्रिय/निष्क्रिय करें" : "Toggle active"
                        }
                        data-ocid="toggle-video-active"
                      />
                      <span className="text-xs text-muted-foreground">
                        {video.isActive
                          ? lang === "hi"
                            ? "दिख रहा है"
                            : "Visible"
                          : lang === "hi"
                            ? "छुपा हुआ"
                            : "Hidden"}
                      </span>
                    </div>

                    {/* Delete */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                      disabled={
                        deletingId === video.id || deleteVideo.isPending
                      }
                      onClick={() => handleDelete(video.id)}
                      aria-label={
                        lang === "hi" ? "वीडियो हटाएं" : "Delete video"
                      }
                      data-ocid="delete-video-btn"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Provider Profile Tab Content ─────────────────────────────────────────────

function ProviderProfileTab({ lang }: { lang: "en" | "hi" }) {
  const [editing, setEditing] = useState(false);
  const { data: providerProfile, isLoading } = useMyProviderProfile();

  if (isLoading) return <LoadingSpinner />;

  if (!providerProfile) {
    return (
      <div>
        <div className="mb-5 p-4 rounded-xl bg-primary/6 border border-primary/20 flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {lang === "hi"
                ? "अपना व्यापार शुरू करें"
                : "Start offering your services"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lang === "hi"
                ? "प्रदाता प्रोफाइल बनाएं और हजारों ग्राहकों तक पहुंचें।"
                : "Create your provider profile and reach thousands of customers across India."}
            </p>
          </div>
        </div>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Briefcase size={16} className="text-primary" />
              {lang === "hi"
                ? "प्रदाता प्रोफाइल बनाएं"
                : "Create Provider Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProviderProfileForm lang={lang} />
          </CardContent>
        </Card>
      </div>
    );
  }

  const initialData: ProviderFormState = {
    businessName: providerProfile.businessName,
    bioEn: providerProfile.bioEn,
    bioHi: providerProfile.bioHi,
    servicesOffered: providerProfile.servicesOffered
      .map((s) => s.title)
      .join("\n"),
    state: providerProfile.state,
    city: providerProfile.city,
    phone: providerProfile.phone,
  };

  return (
    <div className="space-y-4">
      {/* Live banner */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/10 border border-secondary/30">
        <CheckCircle2 size={16} className="text-secondary shrink-0" />
        <p className="text-sm font-medium text-secondary">
          {lang === "hi" ? "आपकी प्रोफाइल लाइव है" : "Your profile is live"}
        </p>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="ml-auto text-xs h-7 text-secondary hover:bg-secondary/10"
        >
          <Link
            to="/services/$providerId"
            params={{ providerId: providerProfile.id.toString() }}
          >
            {lang === "hi" ? "देखें" : "View"}
            <ChevronRight size={12} className="ml-0.5" />
          </Link>
        </Button>
      </div>

      <Card className="shadow-card" data-ocid="provider-profile-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-display truncate">
                {providerProfile.businessName}
              </CardTitle>
              {providerProfile.isVerified ? (
                <Badge className="bg-secondary/10 text-secondary border-secondary/30 shrink-0">
                  <BadgeCheck size={12} className="mr-1" />
                  {lang === "hi" ? "सत्यापित" : "Verified"}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-primary border-primary/40 shrink-0"
                  data-ocid="verification-status"
                >
                  <ShieldAlert size={12} className="mr-1" />
                  {lang === "hi" ? "सत्यापन लंबित" : "Pending Verification"}
                </Badge>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(!editing)}
              data-ocid="edit-provider-btn"
            >
              <Edit2 size={13} className="mr-1.5" />
              {editing
                ? lang === "hi"
                  ? "रद्द करें"
                  : "Cancel"
                : lang === "hi"
                  ? "संपादित करें"
                  : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <ProviderProfileForm
              lang={lang}
              initialData={initialData}
              providerId={providerProfile.id}
              onClose={() => setEditing(false)}
            />
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {[
                {
                  label: lang === "hi" ? "शहर" : "City",
                  value: providerProfile.city,
                },
                {
                  label: lang === "hi" ? "राज्य" : "State",
                  value: providerProfile.state,
                },
                {
                  label: lang === "hi" ? "फोन" : "Phone",
                  value: providerProfile.phone,
                },
              ].map((f) => (
                <div key={f.label}>
                  <dt className="text-xs text-muted-foreground uppercase tracking-wide">
                    {f.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">
                    {f.value || "—"}
                  </dd>
                </div>
              ))}
              {providerProfile.bioEn && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wide">
                    {lang === "hi" ? "परिचय" : "Bio"}
                  </dt>
                  <dd className="mt-0.5 text-sm text-foreground leading-relaxed">
                    {providerProfile.bioEn}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </CardContent>
      </Card>

      {!editing && providerProfile.servicesOffered?.length > 0 && (
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
                    {svc.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {svc.description}
                      </p>
                    )}
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

      {/* Working Hours */}
      {!editing && (
        <WorkingHoursCard
          lang={lang}
          providerId={providerProfile.id}
          initialEnabled={providerProfile.contactAvailabilityEnabled ?? false}
          initialFrom={providerProfile.availableFrom ?? "09:00"}
          initialTo={providerProfile.availableTo ?? "18:00"}
        />
      )}

      {/* My Videos — always visible below profile */}
      <MyVideosSection lang={lang} providerId={providerProfile.id.toString()} />
    </div>
  );
}

// ─── Incoming Inquiries Panel ─────────────────────────────────────────────────

function IncomingInquiriesPanel({
  providerId,
  lang,
}: { providerId: bigint; lang: "en" | "hi" }) {
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
        <motion.div
          key={inq.id.toString()}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <IncomingInquiryCard inquiry={inq} lang={lang} />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Seeker Dashboard ─────────────────────────────────────────────────────────

function SeekerDashboard({
  user,
  lang,
}: { user: UserType; lang: "en" | "hi" }) {
  const [editingProfile, setEditingProfile] = useState(false);
  const { data: inquiries, isLoading: inquiriesLoading } = useMyInquiries();
  const { data: reviews, isLoading: reviewsLoading } = useMyReviews();

  return (
    <Tabs defaultValue="inquiries" className="w-full" data-ocid="seeker-tabs">
      <TabsList className="mb-6 w-full sm:w-auto flex-wrap h-auto gap-1">
        <TabsTrigger value="inquiries" data-ocid="tab-inquiries">
          <MessageSquare size={14} className="mr-1.5" />
          {lang === "hi" ? "पूछताछ" : "My Inquiries"}
          {(inquiries?.length ?? 0) > 0 && (
            <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0">
              {inquiries!.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="reviews" data-ocid="tab-reviews">
          <Star size={14} className="mr-1.5" />
          {lang === "hi" ? "समीक्षाएं" : "My Reviews"}
          {(reviews?.length ?? 0) > 0 && (
            <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0">
              {reviews!.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="profile" data-ocid="tab-profile">
          <User size={14} className="mr-1.5" />
          {lang === "hi" ? "प्रोफाइल" : "My Profile"}
        </TabsTrigger>
      </TabsList>

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
                  {lang === "hi" ? "सेवाएं देखें" : "Find a Provider"}
                  <ChevronRight size={14} className="ml-1" />
                </Link>
              </Button>
            }
            ocid="empty-inquiries"
          />
        ) : (
          <div className="space-y-3">
            {inquiries!.map((inq, i) => (
              <motion.div
                key={inq.id.toString()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <InquiryCard inquiry={inq} lang={lang} />
              </motion.div>
            ))}
          </div>
        )}
      </TabsContent>

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
            {reviews!.map((rev, i) => (
              <motion.div
                key={rev.id.toString()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ReviewCard review={rev} lang={lang} />
              </motion.div>
            ))}
          </div>
        )}
      </TabsContent>

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

// ─── Provider Dashboard ───────────────────────────────────────────────────────

function ProviderDashboard({
  user,
  lang,
}: { user: UserType; lang: "en" | "hi" }) {
  const [editingProfile, setEditingProfile] = useState(false);
  const { data: providerProfile, isLoading: providerLoading } =
    useMyProviderProfile();
  const { data: reviews, isLoading: reviewsLoading } = useMyReviews();

  return (
    <Tabs
      defaultValue="provider-profile"
      className="w-full"
      data-ocid="provider-tabs"
    >
      <TabsList className="mb-6 w-full sm:w-auto flex-wrap h-auto gap-1">
        <TabsTrigger value="provider-profile" data-ocid="tab-provider-profile">
          <Briefcase size={14} className="mr-1.5" />
          {lang === "hi" ? "प्रदाता प्रोफाइल" : "Provider Profile"}
        </TabsTrigger>
        <TabsTrigger value="inquiries" data-ocid="tab-inquiries">
          <MessageSquare size={14} className="mr-1.5" />
          {lang === "hi" ? "आई पूछताछ" : "Incoming Inquiries"}
        </TabsTrigger>
        <TabsTrigger value="reviews" data-ocid="tab-reviews">
          <Star size={14} className="mr-1.5" />
          {lang === "hi" ? "समीक्षाएं" : "Reviews"}
        </TabsTrigger>
        <TabsTrigger value="profile" data-ocid="tab-profile">
          <User size={14} className="mr-1.5" />
          {lang === "hi" ? "मेरी प्रोफाइल" : "My Profile"}
        </TabsTrigger>
      </TabsList>

      {/* Provider Profile Tab */}
      <TabsContent value="provider-profile">
        <div className="mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            {lang === "hi" ? "प्रदाता प्रोफाइल" : "Provider Profile"}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {lang === "hi"
              ? "अपनी व्यावसायिक जानकारी प्रबंधित करें।"
              : "Manage your business information and services."}
          </p>
        </div>
        <ProviderProfileTab lang={lang} />
      </TabsContent>

      {/* Incoming Inquiries Tab */}
      <TabsContent value="inquiries">
        <div className="mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            {lang === "hi" ? "मुझे मिली पूछताछ" : "Incoming Inquiries"}
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
          <IncomingInquiriesPanel providerId={providerProfile.id} lang={lang} />
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

      {/* My Profile Tab */}
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

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

function DashboardStats({
  lang,
  isProvider,
}: { user: UserType; lang: "en" | "hi"; isProvider: boolean }) {
  const { data: inquiries } = useMyInquiries();
  const { data: reviews } = useMyReviews();
  const { data: providerProfile } = useMyProviderProfile();

  const avgRating =
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
          value: avgRating.toFixed(1),
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
          value: avgRating > 0 ? avgRating.toFixed(1) : "—",
          label: lang === "hi" ? "औसत रेटिंग" : "Avg. Rating",
        },
        {
          icon: "💬",
          value: String(reviews?.length ?? 0),
          label: lang === "hi" ? "समीक्षाएं" : "Reviews",
        },
      ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="shadow-card text-center">
          <CardContent className="p-3">
            <p className="text-lg mb-0.5">{stat.icon}</p>
            <p className="font-display font-bold text-sm text-foreground truncate">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {stat.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;

  if (!user) {
    navigate({ to: "/" });
    return null;
  }

  const isProvider = user.role === Role.provider || user.role === Role.admin;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-[60vh]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <User size={20} className="text-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-xl text-foreground truncate">
              {lang === "hi" ? `नमस्ते, ${user.name}` : `Hello, ${user.name}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isProvider
                ? lang === "hi"
                  ? "प्रदाता डैशबोर्ड"
                  : "Provider Dashboard"
                : lang === "hi"
                  ? "उपयोगकर्ता डैशबोर्ड"
                  : "User Dashboard"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats user={user} lang={lang} isProvider={isProvider} />

      {/* Main content */}
      {isProvider ? (
        <ProviderDashboard user={user} lang={lang} />
      ) : (
        <SeekerDashboard user={user} lang={lang} />
      )}
    </div>
  );
}

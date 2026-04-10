import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Fingerprint,
  Info,
  MapPin,
  Phone,
  Shield,
  User,
  UserCheck,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Textarea } from "../components/ui/textarea";
import {
  useCreateProviderProfile,
  useMyProfile,
  useRegisterUser,
} from "../hooks/use-api";
import { useAuth } from "../hooks/use-auth";
import { useLanguage } from "../hooks/use-language";
import { INDIAN_STATES } from "../services/backend-api";
import type { UserInput } from "../types";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = "login" | "profile" | "provider-details" | "done";
type RoleChoice = "seeker" | "provider";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  role: RoleChoice;
}

interface ProviderFormData {
  businessName: string;
  servicesOffered: string;
  bioEn: string;
  bioHi: string;
}

const emptyProfile: ProfileFormData = {
  name: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  role: "seeker",
};

const emptyProvider: ProviderFormData = {
  businessName: "",
  servicesOffered: "",
  bioEn: "",
  bioHi: "",
};

// ─── Validation helpers ──────────────────────────────────────────────────────

function validateProfile(
  data: ProfileFormData,
  lang: "en" | "hi",
): Partial<Record<keyof ProfileFormData, string>> {
  const errors: Partial<Record<keyof ProfileFormData, string>> = {};
  if (!data.name.trim())
    errors.name = lang === "hi" ? "पूरा नाम आवश्यक है" : "Full name is required";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = lang === "hi" ? "वैध ईमेल आवश्यक है" : "Valid email is required";
  if (!data.phone.trim() || !/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, "")))
    errors.phone =
      lang === "hi" ? "वैध 10-अंकीय फोन नंबर" : "Valid 10-digit phone number";
  if (!data.state)
    errors.state = lang === "hi" ? "राज्य चुनें" : "Please select a state";
  if (!data.city.trim())
    errors.city = lang === "hi" ? "शहर आवश्यक है" : "City is required";
  return errors;
}

function validateProvider(
  data: ProviderFormData,
  lang: "en" | "hi",
): Partial<Record<keyof ProviderFormData, string>> {
  const errors: Partial<Record<keyof ProviderFormData, string>> = {};
  if (!data.businessName.trim())
    errors.businessName =
      lang === "hi" ? "व्यापार का नाम आवश्यक है" : "Business name is required";
  if (!data.servicesOffered.trim())
    errors.servicesOffered =
      lang === "hi" ? "सेवाएं दर्ज करें" : "Please describe your services";
  if (!data.bioEn.trim())
    errors.bioEn =
      lang === "hi" ? "अंग्रेजी में परिचय लिखें" : "English bio is required";
  return errors;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: Step }) {
  const stepOrder: Step[] = ["login", "profile", "provider-details", "done"];
  const visibleSteps = [
    { key: "login" as Step, label: "Login", labelHi: "लॉगिन" },
    { key: "profile" as Step, label: "Profile", labelHi: "प्रोफाइल" },
    { key: "done" as Step, label: "Done", labelHi: "पूर्ण" },
  ];
  const currentIdx = stepOrder.indexOf(step);

  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {visibleSteps.map((s, i) => {
        const sIdx = stepOrder.indexOf(s.key);
        const isActive =
          s.key === step ||
          (step === "provider-details" && s.key === "profile");
        const reallyDone =
          step === "done"
            ? sIdx < stepOrder.indexOf("done")
            : sIdx < currentIdx;
        return (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                reallyDone
                  ? "bg-secondary text-secondary-foreground"
                  : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {reallyDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            {i < visibleSteps.length - 1 && (
              <div
                className={`h-0.5 w-8 transition-smooth ${
                  reallyDone ? "bg-secondary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

function TricolorBar() {
  return (
    <div className="h-1 w-full flex">
      <div className="flex-1 bg-primary" />
      <div className="flex-1 bg-card" />
      <div className="flex-1 bg-secondary" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AuthPage() {
  const { action } = useParams({ from: "/auth/$action" });
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const {
    isAuthenticated,
    isLoading: authLoading,
    login,
    user,
    refetchUser,
  } = useAuth();
  const { data: myProfile, isLoading: profileLoading } = useMyProfile();
  const registerUser = useRegisterUser();
  const createProvider = useCreateProviderProfile();

  const [step, setStep] = useState<Step>("login");
  const [profileData, setProfileData] = useState<ProfileFormData>(emptyProfile);
  const [providerData, setProviderData] =
    useState<ProviderFormData>(emptyProvider);
  const [profileErrors, setProfileErrors] = useState<
    Partial<Record<keyof ProfileFormData, string>>
  >({});
  const [providerErrors, setProviderErrors] = useState<
    Partial<Record<keyof ProviderFormData, string>>
  >({});

  // Navigate on authentication state changes
  useEffect(() => {
    if (!isAuthenticated || profileLoading) return;
    if (myProfile) {
      if (action === "login") {
        navigate({ to: "/dashboard" });
      } else {
        setStep("done");
      }
    } else {
      setStep("profile");
    }
  }, [isAuthenticated, myProfile, profileLoading, action, navigate]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleProfileChange(field: keyof ProfileFormData, value: string) {
    setProfileData((p) => ({ ...p, [field]: value }));
    if (profileErrors[field])
      setProfileErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleProviderChange(field: keyof ProviderFormData, value: string) {
    setProviderData((p) => ({ ...p, [field]: value }));
    if (providerErrors[field])
      setProviderErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateProfile(profileData, lang);
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
    const input: UserInput = {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      state: profileData.state,
      city: profileData.city,
    };
    try {
      await registerUser.mutateAsync(input);
      await refetchUser();
      toast.success(
        lang === "hi" ? "प्रोफाइल सफलतापूर्वक बनाई गई!" : "Profile created!",
      );
      if (profileData.role === "provider") {
        setStep("provider-details");
      } else {
        setStep("done");
      }
    } catch {
      toast.error(t("common.error"));
    }
  }

  async function handleProviderSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateProvider(providerData, lang);
    if (Object.keys(errors).length > 0) {
      setProviderErrors(errors);
      return;
    }
    const ownerName = profileData.name || user?.name || "";
    const email = profileData.email || user?.email || "";
    const phone = profileData.phone || user?.phone || "";
    const state = profileData.state || user?.state || "";
    const city = profileData.city || user?.city || "";
    try {
      await createProvider.mutateAsync({
        businessName: providerData.businessName,
        ownerName,
        email,
        phone,
        state,
        city,
        address: "",
        bioEn: providerData.bioEn,
        bioHi: providerData.bioHi,
        servicesOffered: providerData.servicesOffered
          .split("\n")
          .filter(Boolean)
          .map((line, idx) => ({
            serviceId: BigInt(idx + 1),
            title: line.trim(),
            description: "",
            availability: "Mon–Sat",
          })),
        serviceAreas: [city],
        categoryIds: [],
        profileImage: undefined,
      });
      setStep("done");
      toast.success(
        lang === "hi" ? "प्रदाता प्रोफाइल बनाई गई!" : "Provider profile created!",
      );
    } catch {
      toast.error(t("common.error"));
    }
  }

  // ── Loading state ────────────────────────────────────────────────────────────

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">{t("auth.loggingIn")}</p>
        </div>
      </div>
    );
  }

  // ── Already has profile (login action) ──────────────────────────────────────

  if (isAuthenticated && myProfile && action === "login") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-secondary/40 shadow-elevated overflow-hidden">
            <TricolorBar />
            <CardHeader className="text-center pb-2 pt-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                <UserCheck className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                {lang === "hi" ? "आपकी प्रोफाइल" : "Your Profile"}
              </h2>
            </CardHeader>
            <CardContent className="space-y-4 pb-8">
              <div className="bg-muted/40 rounded-lg p-4 space-y-3">
                {(
                  [
                    {
                      Icon: User,
                      label: lang === "hi" ? "नाम" : "Name",
                      value: myProfile.name,
                    },
                    {
                      Icon: Phone,
                      label: lang === "hi" ? "फोन" : "Phone",
                      value: myProfile.phone,
                    },
                    {
                      Icon: MapPin,
                      label: lang === "hi" ? "स्थान" : "Location",
                      value: `${myProfile.city}, ${myProfile.state}`,
                    },
                  ] as const
                ).map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground min-w-0">
                      {label}:
                    </span>
                    <span className="font-medium text-foreground truncate">
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">
                    {lang === "hi" ? "भूमिका" : "Role"}:
                  </span>
                  <Badge
                    variant={
                      myProfile.role === "provider" ? "default" : "secondary"
                    }
                    className="capitalize"
                  >
                    {myProfile.role}
                  </Badge>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => navigate({ to: "/dashboard" })}
                data-ocid="auth-go-dashboard"
              >
                {lang === "hi" ? "डैशबोर्ड पर जाएं" : "Go to Dashboard"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ─── Main Auth flow ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-muted/20">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
        >
          {/* ── Login step ────────────────────────────────────────────────────── */}
          {step === "login" && (
            <Card className="border-2 border-primary/30 shadow-elevated overflow-hidden">
              <TricolorBar />
              <CardHeader className="text-center pt-8 pb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Fingerprint className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  {action === "register"
                    ? t("auth.registerTitle")
                    : t("auth.loginTitle")}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {lang === "hi"
                    ? "इंटरनेट आइडेंटिटी से सुरक्षित लॉगिन"
                    : "Sign in securely with Internet Identity"}
                </p>
              </CardHeader>

              <CardContent className="space-y-6 pb-8">
                {/* II explanation */}
                <div className="bg-muted/40 rounded-lg p-4 flex gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {lang === "hi"
                        ? "इंटरनेट आइडेंटिटी क्या है?"
                        : "What is Internet Identity?"}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === "hi"
                        ? "यह एक सुरक्षित, पासवर्ड-रहित लॉगिन प्रणाली है। आपकी पहचान सुरक्षित रहती है और कोई व्यक्तिगत डेटा साझा नहीं होता।"
                        : "A secure, password-free login built on blockchain. Your identity stays private — no personal data is shared with third parties."}
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {(
                    [
                      {
                        Icon: Shield,
                        label: lang === "hi" ? "100% सुरक्षित" : "100% Secure",
                      },
                      {
                        Icon: Fingerprint,
                        label: lang === "hi" ? "पासवर्ड नहीं" : "No Password",
                      },
                      {
                        Icon: CheckCircle2,
                        label: lang === "hi" ? "तुरंत एक्सेस" : "Instant Access",
                      },
                    ] as const
                  ).map(({ Icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/20"
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </span>
                  ))}
                </div>

                <Separator />

                <Button
                  size="lg"
                  className="w-full text-base font-semibold gap-2"
                  onClick={login}
                  disabled={authLoading}
                  data-ocid="auth-ii-login-btn"
                >
                  <Fingerprint className="w-5 h-5" />
                  {authLoading ? t("auth.loggingIn") : t("auth.loginWithII")}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  {lang === "hi"
                    ? "लॉगिन करके आप हमारी सेवा शर्तों से सहमत हैं"
                    : "By continuing, you agree to our Terms of Service"}
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── Profile step ──────────────────────────────────────────────────── */}
          {step === "profile" && (
            <Card className="border-2 border-primary/30 shadow-elevated overflow-hidden">
              <TricolorBar />
              <CardHeader className="pt-6 pb-2">
                <StepIndicator step={step} />
                <h1 className="text-xl font-display font-bold text-foreground text-center">
                  {lang === "hi"
                    ? "अपनी प्रोफाइल पूरी करें"
                    : "Complete Your Profile"}
                </h1>
                <p className="text-sm text-muted-foreground text-center">
                  {lang === "hi"
                    ? "आपकी जानकारी सुरक्षित रहेगी"
                    : "Your information is kept private and secure"}
                </p>
              </CardHeader>

              <CardContent className="pb-8">
                <form
                  onSubmit={handleProfileSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="p-name" className="text-sm font-medium">
                        {t("auth.name")}{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="p-name"
                        placeholder={
                          lang === "hi" ? "जैसे: राम शर्मा" : "e.g. Ramesh Sharma"
                        }
                        value={profileData.name}
                        onChange={(e) =>
                          handleProfileChange("name", e.target.value)
                        }
                        className={
                          profileErrors.name ? "border-destructive" : ""
                        }
                        data-ocid="auth-name-input"
                      />
                      <FieldError msg={profileErrors.name} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="p-email" className="text-sm font-medium">
                        {t("auth.email")}{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="p-email"
                        type="email"
                        placeholder="you@example.com"
                        value={profileData.email}
                        onChange={(e) =>
                          handleProfileChange("email", e.target.value)
                        }
                        className={
                          profileErrors.email ? "border-destructive" : ""
                        }
                        data-ocid="auth-email-input"
                      />
                      <FieldError msg={profileErrors.email} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="p-phone" className="text-sm font-medium">
                      {t("auth.phone")}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="p-phone"
                      type="tel"
                      placeholder={
                        lang === "hi"
                          ? "10-अंकीय मोबाइल नंबर"
                          : "10-digit mobile number"
                      }
                      value={profileData.phone}
                      maxLength={10}
                      onChange={(e) =>
                        handleProfileChange(
                          "phone",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      className={
                        profileErrors.phone ? "border-destructive" : ""
                      }
                      data-ocid="auth-phone-input"
                    />
                    <FieldError msg={profileErrors.phone} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        {t("auth.state")}{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={profileData.state}
                        onValueChange={(v) => handleProfileChange("state", v)}
                      >
                        <SelectTrigger
                          className={
                            profileErrors.state ? "border-destructive" : ""
                          }
                          data-ocid="auth-state-select"
                        >
                          <SelectValue
                            placeholder={
                              lang === "hi" ? "राज्य चुनें" : "Select state"
                            }
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
                      <FieldError msg={profileErrors.state} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="p-city" className="text-sm font-medium">
                        {t("auth.city")}{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="p-city"
                        placeholder={lang === "hi" ? "जैसे: मुंबई" : "e.g. Mumbai"}
                        value={profileData.city}
                        onChange={(e) =>
                          handleProfileChange("city", e.target.value)
                        }
                        className={
                          profileErrors.city ? "border-destructive" : ""
                        }
                        data-ocid="auth-city-input"
                      />
                      <FieldError msg={profileErrors.city} />
                    </div>
                  </div>

                  {/* Role selection cards */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {lang === "hi" ? "आप क्या हैं?" : "I am a..."}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(
                        [
                          {
                            value: "seeker" as RoleChoice,
                            Icon: User,
                            titleEn: "Service Seeker",
                            titleHi: "सेवा खोजने वाला",
                            descEn: "I need to find and hire service providers",
                            descHi: "मुझे सेवाएं खोजनी और लेनी हैं",
                          },
                          {
                            value: "provider" as RoleChoice,
                            Icon: Wrench,
                            titleEn: "Service Provider",
                            titleHi: "सेवा प्रदाता",
                            descEn: "I offer services and want clients",
                            descHi: "मैं सेवाएं देता/देती हूं",
                          },
                        ] as const
                      ).map(
                        ({ value, Icon, titleEn, titleHi, descEn, descHi }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleProfileChange("role", value)}
                            data-ocid={`auth-role-${value}`}
                            className={`p-4 rounded-xl border-2 text-left transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              profileData.role === value
                                ? value === "seeker"
                                  ? "border-primary bg-primary/5"
                                  : "border-secondary bg-secondary/5"
                                : "border-border hover:border-muted-foreground/40"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                  profileData.role === value
                                    ? value === "seeker"
                                      ? "bg-primary/15 text-primary"
                                      : "bg-secondary/15 text-secondary"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground">
                                  {lang === "hi" ? titleHi : titleEn}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                  {lang === "hi" ? descHi : descEn}
                                </p>
                              </div>
                            </div>
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-2"
                    disabled={registerUser.isPending}
                    data-ocid="auth-profile-submit"
                  >
                    {registerUser.isPending
                      ? lang === "hi"
                        ? "सहेजा जा रहा है..."
                        : "Saving..."
                      : profileData.role === "provider"
                        ? lang === "hi"
                          ? "आगे बढ़ें →"
                          : "Continue →"
                        : t("auth.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* ── Provider-details step ─────────────────────────────────────────── */}
          {step === "provider-details" && (
            <Card className="border-2 border-secondary/40 shadow-elevated overflow-hidden">
              <TricolorBar />
              <CardHeader className="pt-6 pb-2">
                <StepIndicator step={step} />
                <div className="flex items-center gap-2 justify-center mt-1">
                  <Building2 className="w-5 h-5 text-secondary" />
                  <h1 className="text-xl font-display font-bold text-foreground">
                    {lang === "hi" ? "व्यापार विवरण" : "Business Details"}
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {lang === "hi"
                    ? "अपने व्यापार की जानकारी भरें"
                    : "Tell clients about your business"}
                </p>
              </CardHeader>

              <CardContent className="pb-8">
                <form
                  onSubmit={handleProviderSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="prov-business"
                      className="text-sm font-medium"
                    >
                      {lang === "hi" ? "व्यापार का नाम" : "Business Name"}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="prov-business"
                      placeholder={
                        lang === "hi"
                          ? "जैसे: शर्मा इलेक्ट्रिकल्स"
                          : "e.g. Sharma Electricals"
                      }
                      value={providerData.businessName}
                      onChange={(e) =>
                        handleProviderChange("businessName", e.target.value)
                      }
                      className={
                        providerErrors.businessName ? "border-destructive" : ""
                      }
                      data-ocid="auth-business-name-input"
                    />
                    <FieldError msg={providerErrors.businessName} />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="prov-services"
                      className="text-sm font-medium"
                    >
                      {lang === "hi" ? "दी जाने वाली सेवाएं" : "Services Offered"}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Textarea
                      id="prov-services"
                      rows={3}
                      placeholder={
                        lang === "hi"
                          ? "हर सेवा एक नई लाइन में:\nइलेक्ट्रिकल वायरिंग\nफैन इंस्टालेशन"
                          : "One service per line:\nElectrical wiring\nFan installation\nSwitch repair"
                      }
                      value={providerData.servicesOffered}
                      onChange={(e) =>
                        handleProviderChange("servicesOffered", e.target.value)
                      }
                      className={
                        providerErrors.servicesOffered
                          ? "border-destructive"
                          : ""
                      }
                      data-ocid="auth-services-offered-input"
                    />
                    <FieldError msg={providerErrors.servicesOffered} />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="prov-bio-en"
                      className="text-sm font-medium"
                    >
                      {lang === "hi" ? "परिचय (अंग्रेजी)" : "Bio (English)"}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Textarea
                      id="prov-bio-en"
                      rows={3}
                      placeholder="Describe your experience and expertise in English..."
                      value={providerData.bioEn}
                      onChange={(e) =>
                        handleProviderChange("bioEn", e.target.value)
                      }
                      className={
                        providerErrors.bioEn ? "border-destructive" : ""
                      }
                      data-ocid="auth-bio-en-input"
                    />
                    <FieldError msg={providerErrors.bioEn} />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="prov-bio-hi"
                      className="text-sm font-medium"
                    >
                      {lang === "hi" ? "परिचय (हिंदी)" : "Bio (Hindi)"}
                      <span className="text-muted-foreground ml-1 text-xs">
                        ({lang === "hi" ? "वैकल्पिक" : "optional"})
                      </span>
                    </Label>
                    <Textarea
                      id="prov-bio-hi"
                      rows={2}
                      placeholder="हिंदी में अपना परिचय लिखें..."
                      value={providerData.bioHi}
                      onChange={(e) =>
                        handleProviderChange("bioHi", e.target.value)
                      }
                      data-ocid="auth-bio-hi-input"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep("profile")}
                      data-ocid="auth-provider-back"
                    >
                      {t("common.back")}
                    </Button>
                    <Button
                      type="submit"
                      className="flex-[2]"
                      disabled={createProvider.isPending}
                      data-ocid="auth-provider-submit"
                    >
                      {createProvider.isPending
                        ? lang === "hi"
                          ? "बन रहा है..."
                          : "Creating..."
                        : lang === "hi"
                          ? "प्रोफाइल बनाएं"
                          : "Create Profile"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* ── Done step ─────────────────────────────────────────────────────── */}
          {step === "done" && (
            <Card className="border-2 border-secondary/40 shadow-elevated overflow-hidden text-center">
              <TricolorBar />
              <CardContent className="py-12 px-8 space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-secondary/15 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    {lang === "hi" ? "सफलतापूर्वक पंजीकृत!" : "You're all set!"}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {lang === "hi"
                      ? "आपका खाता बन गया है। अब आप पूरे भारत में सेवाएं खोज सकते हैं।"
                      : "Your account is ready. Explore trusted services across India."}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate({ to: "/dashboard" })}
                  data-ocid="auth-done-dashboard"
                >
                  {lang === "hi" ? "डैशबोर्ड पर जाएं" : "Go to Dashboard"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() =>
                    navigate({
                      to: "/services",
                      search: {
                        category: undefined,
                        state: undefined,
                        city: undefined,
                        search: undefined,
                        sort: undefined,
                      },
                    })
                  }
                  data-ocid="auth-done-explore"
                >
                  {lang === "hi" ? "सेवाएं देखें" : "Browse Services"}
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

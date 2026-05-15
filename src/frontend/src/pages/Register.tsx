import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, UserCheck, Wrench } from "lucide-react";
import { useState } from "react";
import { useOpenRegisterUser } from "../hooks/use-api";
import { useCategories } from "../hooks/use-api";
import { useLanguage } from "../hooks/use-language";
import { INDIAN_STATES } from "../services/backend-api";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormRole = "seeker" | "provider";

interface FormState {
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  serviceCategory: string;
  role: FormRole;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  state?: string;
  city?: string;
  serviceCategory?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required / नाम आवश्यक है";
  if (!form.phone.trim()) {
    errors.phone = "Phone is required / फोन आवश्यक है";
  } else if (!/^\d{10}$/.test(form.phone.trim())) {
    errors.phone = "Enter 10-digit phone / 10 अंकों का नंबर दर्ज करें";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required / ईमेल आवश्यक है";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Invalid email / गलत ईमेल";
  }
  if (!form.state) errors.state = "Select state / राज्य चुनें";
  if (!form.city.trim()) errors.city = "City is required / शहर आवश्यक है";
  if (!form.serviceCategory)
    errors.serviceCategory = "Select category / श्रेणी चुनें";
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const { t, lang } = useLanguage();
  const { data: categories } = useCategories();
  const registerMutation = useOpenRegisterUser();

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    serviceCategory: "",
    role: "seeker",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const set = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registerMutation.mutate(
      {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        state: form.state,
        city: form.city.trim(),
        serviceCategory: form.serviceCategory,
        role: form.role === "provider" ? { provider: null } : { seeker: null },
      },
      {
        onSuccess: (result) => {
          if ("ok" in result) {
            setSuccess(true);
          } else {
            const errMsg = result.err as string;
            if (
              errMsg.toLowerCase().includes("phone") ||
              errMsg.toLowerCase().includes("duplicate")
            ) {
              setServerError(
                lang === "hi"
                  ? "यह फोन नंबर या ईमेल पहले से रजिस्टर है। / This phone or email is already registered."
                  : "This phone number or email is already registered. / यह फोन नंबर या ईमेल पहले से रजिस्टर है।",
              );
            } else {
              setServerError(
                lang === "hi"
                  ? `रजिस्ट्रेशन विफल: ${errMsg}`
                  : `Registration failed: ${errMsg}`,
              );
            }
          }
        },
        onError: () => {
          setServerError(
            lang === "hi"
              ? "कुछ गलत हुआ। कृपया पुनः प्रयास करें। / Something went wrong."
              : "Something went wrong. Please try again. / कुछ गलत हुआ।",
          );
        },
      },
    );
  };

  // ─── Success State ───────────────────────────────────────────────────────────

  if (success) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-background">
        <div
          className="w-full max-w-md text-center bg-card rounded-2xl border border-border shadow-card p-8 space-y-5"
          data-ocid="register-success"
        >
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
              <CheckCircle2 size={36} />
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            {lang === "hi" ? "रजिस्ट्रेशन सफल!" : "Registration Successful!"}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {lang === "hi"
              ? "आपका रजिस्ट्रेशन हो गया है। अब आप सेवाएं खोज सकते हैं और प्रदाताओं से संपर्क कर सकते हैं।"
              : "You have been successfully registered. You can now browse services and contact providers."}
          </p>
          <p className="text-xs text-muted-foreground">
            {lang === "hi"
              ? "आपका रजिस्ट्रेशन सफलतापूर्वक हो गया है!"
              : "Your registration is complete!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              className="flex-1 gradient-saffron-accent text-primary-foreground border-0"
              onClick={() => {
                window.location.href = "/services";
              }}
              data-ocid="success-browse-btn"
            >
              {lang === "hi" ? "सेवाएं देखें" : "Browse Services"}
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1"
              data-ocid="success-home-btn"
            >
              <Link to="/">{lang === "hi" ? "होम पर जाएं" : "Go to Home"}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Form ────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background py-10 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header card */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <span className="text-4xl" role="img" aria-label="Indian flag">
              🇮🇳
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            {lang === "hi" ? "रजिस्ट्रेशन करें" : "Register Now"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {lang === "hi"
              ? "अपनी जानकारी भरें और Indiahelpsarvice से जुड़ें"
              : "Fill in your details and join Indiahelpsarvice"}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
          {/* Role selector */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3">
              {lang === "hi" ? "आप क्या हैं? / I am a..." : "I am a..."}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, role: "seeker" }))}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                  form.role === "seeker"
                    ? "border-primary bg-primary/8 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted"
                }`}
                data-ocid="role-seeker-btn"
              >
                <UserCheck size={24} />
                <span className="text-xs font-semibold text-center leading-tight">
                  {lang === "hi"
                    ? "सेवा खोजने वाला\nService Seeker"
                    : "Service Seeker"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, role: "provider" }))}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                  form.role === "provider"
                    ? "border-primary bg-primary/8 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted"
                }`}
                data-ocid="role-provider-btn"
              >
                <Wrench size={24} />
                <span className="text-xs font-semibold text-center leading-tight">
                  {lang === "hi"
                    ? "सेवा देने वाला\nService Provider"
                    : "Service Provider"}
                </span>
              </button>
            </div>
          </div>

          {/* Server error */}
          {serverError && (
            <div
              className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
              role="alert"
              data-ocid="register-server-error"
            >
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-name">
                {t("auth.name")}{" "}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="reg-name"
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder={
                  lang === "hi" ? "अपना पूरा नाम लिखें" : "Enter your full name"
                }
                className={errors.name ? "border-destructive" : ""}
                data-ocid="reg-name-input"
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-phone">
                {t("auth.phone")}{" "}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="reg-phone"
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) =>
                  set("phone")(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder={
                  lang === "hi" ? "10 अंकों का नंबर" : "10-digit mobile number"
                }
                className={errors.phone ? "border-destructive" : ""}
                data-ocid="reg-phone-input"
                autoComplete="tel"
                maxLength={10}
              />
              {errors.phone && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-email">
                {t("auth.email")}{" "}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="reg-email"
                type="email"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder={lang === "hi" ? "ईमेल पता" : "your@email.com"}
                className={errors.email ? "border-destructive" : ""}
                data-ocid="reg-email-input"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* State + City row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="reg-state">
                  {t("auth.state")}{" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Select value={form.state} onValueChange={set("state")}>
                  <SelectTrigger
                    id="reg-state"
                    className={errors.state ? "border-destructive" : ""}
                    data-ocid="reg-state-select"
                  >
                    <SelectValue
                      placeholder={lang === "hi" ? "राज्य" : "State"}
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
                {errors.state && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.state}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-city">
                  {t("auth.city")}{" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="reg-city"
                  value={form.city}
                  onChange={(e) => set("city")(e.target.value)}
                  placeholder={lang === "hi" ? "शहर" : "City"}
                  className={errors.city ? "border-destructive" : ""}
                  data-ocid="reg-city-input"
                  autoComplete="address-level2"
                />
                {errors.city && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            {/* Service Category */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-category">
                {lang === "hi"
                  ? "सेवा श्रेणी / Service Category"
                  : "Service Category / सेवा श्रेणी"}{" "}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <Select
                value={form.serviceCategory}
                onValueChange={set("serviceCategory")}
              >
                <SelectTrigger
                  id="reg-category"
                  className={errors.serviceCategory ? "border-destructive" : ""}
                  data-ocid="reg-category-select"
                >
                  <SelectValue
                    placeholder={lang === "hi" ? "श्रेणी चुनें" : "Select category"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id.toString()} value={cat.name.en}>
                        {cat.icon} {cat.name.en} / {cat.name.hi}
                      </SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="Government">
                        🏛️ Government / सरकारी
                      </SelectItem>
                      <SelectItem value="Legal">⚖️ Legal / कानूनी</SelectItem>
                      <SelectItem value="Medical">
                        🏥 Medical / चिकित्सा
                      </SelectItem>
                      <SelectItem value="Education">
                        🎓 Education / शिक्षा
                      </SelectItem>
                      <SelectItem value="Financial">
                        💰 Financial / वित्तीय
                      </SelectItem>
                      <SelectItem value="Home">🏠 Home / घरेलू</SelectItem>
                      <SelectItem value="Technology">
                        💻 Technology / तकनीक
                      </SelectItem>
                      <SelectItem value="Travel">✈️ Travel / यात्रा</SelectItem>
                      <SelectItem value="Business">
                        💼 Business / व्यापार
                      </SelectItem>
                      <SelectItem value="NRI Help">
                        🌍 NRI Help / एनआरआई सहायता
                      </SelectItem>
                      <SelectItem value="House Maintenance">
                        🔧 House Maintenance / घर मरम्मत
                      </SelectItem>
                      <SelectItem value="Marriage">
                        💍 Marriage / विवाह
                      </SelectItem>
                      <SelectItem value="Events">🎉 Events / इवेंट</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              {errors.serviceCategory && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.serviceCategory}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full gradient-saffron-accent text-primary-foreground border-0 mt-2"
              disabled={registerMutation.isPending}
              data-ocid="register-submit-btn"
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  {lang === "hi" ? "रजिस्टर हो रहा है..." : "Registering..."}
                </>
              ) : lang === "hi" ? (
                "रजिस्टर करें / Register"
              ) : (
                "Register / रजिस्टर करें"
              )}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground mt-5">
            {lang === "hi" ? "पहले से अकाउंट है?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => window.history.back()}
              className="text-primary hover:underline font-medium"
            >
              {lang === "hi" ? "लॉग इन करें" : "Log In"}
            </button>
          </p>
        </div>

        {/* Info note */}
        <p className="text-center text-xs text-muted-foreground px-2">
          {lang === "hi"
            ? "रजिस्ट्रेशन करके आप हमारी सेवा शर्तों से सहमत होते हैं। आपकी जानकारी सुरक्षित रहेगी।"
            : "By registering you agree to our terms of service. Your information is kept secure."}
        </p>
      </div>
    </div>
  );
}

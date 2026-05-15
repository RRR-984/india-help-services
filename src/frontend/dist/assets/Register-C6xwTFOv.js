import { u as useLanguage, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, o as LoaderCircle } from "./index-DNcnJBsr.js";
import { I as Input, S as Select, a as SelectTrigger, b as SelectValue, d as SelectContent, e as SelectItem } from "./input-LiZhWAs2.js";
import { L as Label } from "./label-B_YRXDqu.js";
import { u as useCategories, J as useOpenRegisterUser } from "./use-api-Dj0wz_nq.js";
import { I as INDIAN_STATES } from "./backend-api-B2Sc0xPK.js";
import { C as CircleCheck } from "./circle-check-DvFln69C.js";
import { U as UserCheck } from "./user-check-DU6zHejb.js";
import { W as Wrench } from "./wrench-Dfe7_1t4.js";
import "./index-CF8YMB3f.js";
import "./index-hdPYc3Da.js";
import "./chevron-down-HilyGg4K.js";
function validateForm(form) {
  const errors = {};
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
function RegisterPage() {
  const { t, lang } = useLanguage();
  const { data: categories } = useCategories();
  const registerMutation = useOpenRegisterUser();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    serviceCategory: "",
    role: "seeker"
  });
  const [errors, setErrors] = reactExports.useState({});
  const [serverError, setServerError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(false);
  const set = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: void 0 }));
    setServerError(null);
  };
  const handleSubmit = (e) => {
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
        role: form.role === "provider" ? { provider: null } : { seeker: null }
      },
      {
        onSuccess: (result) => {
          if ("ok" in result) {
            setSuccess(true);
          } else {
            const errMsg = result.err;
            if (errMsg.toLowerCase().includes("phone") || errMsg.toLowerCase().includes("duplicate")) {
              setServerError(
                lang === "hi" ? "यह फोन नंबर या ईमेल पहले से रजिस्टर है। / This phone or email is already registered." : "This phone number or email is already registered. / यह फोन नंबर या ईमेल पहले से रजिस्टर है।"
              );
            } else {
              setServerError(
                lang === "hi" ? `रजिस्ट्रेशन विफल: ${errMsg}` : `Registration failed: ${errMsg}`
              );
            }
          }
        },
        onError: () => {
          setServerError(
            lang === "hi" ? "कुछ गलत हुआ। कृपया पुनः प्रयास करें। / Something went wrong." : "Something went wrong. Please try again. / कुछ गलत हुआ।"
          );
        }
      }
    );
  };
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "w-full max-w-md text-center bg-card rounded-2xl border border-border shadow-card p-8 space-y-5",
        "data-ocid": "register-success",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 36 }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: lang === "hi" ? "रजिस्ट्रेशन सफल!" : "Registration Successful!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: lang === "hi" ? "आपका रजिस्ट्रेशन हो गया है। अब आप सेवाएं खोज सकते हैं और प्रदाताओं से संपर्क कर सकते हैं।" : "You have been successfully registered. You can now browse services and contact providers." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "hi" ? "आपका रजिस्ट्रेशन सफलतापूर्वक हो गया है!" : "Your registration is complete!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 gradient-saffron-accent text-primary-foreground border-0",
                onClick: () => {
                  window.location.href = "/services";
                },
                "data-ocid": "success-browse-btn",
                children: lang === "hi" ? "सेवाएं देखें" : "Browse Services"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "flex-1",
                "data-ocid": "success-home-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: lang === "hi" ? "होम पर जाएं" : "Go to Home" })
              }
            )
          ] })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-5rem)] bg-background py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", role: "img", "aria-label": "Indian flag", children: "🇮🇳" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: lang === "hi" ? "रजिस्ट्रेशन करें" : "Register Now" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "hi" ? "अपनी जानकारी भरें और Indiahelpsarvice से जुड़ें" : "Fill in your details and join Indiahelpsarvice" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-3", children: lang === "hi" ? "आप क्या हैं? / I am a..." : "I am a..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setForm((p) => ({ ...p, role: "seeker" })),
              className: `flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${form.role === "seeker" ? "border-primary bg-primary/8 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted"}`,
              "data-ocid": "role-seeker-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 24 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-center leading-tight", children: lang === "hi" ? "सेवा खोजने वाला\nService Seeker" : "Service Seeker" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setForm((p) => ({ ...p, role: "provider" })),
              className: `flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${form.role === "provider" ? "border-primary bg-primary/8 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted"}`,
              "data-ocid": "role-provider-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { size: 24 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-center leading-tight", children: lang === "hi" ? "सेवा देने वाला\nService Provider" : "Service Provider" })
              ]
            }
          )
        ] })
      ] }),
      serverError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm",
          role: "alert",
          "data-ocid": "register-server-error",
          children: serverError
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-name", children: [
            t("auth.name"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": "true", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "reg-name",
              value: form.name,
              onChange: (e) => set("name")(e.target.value),
              placeholder: lang === "hi" ? "अपना पूरा नाम लिखें" : "Enter your full name",
              className: errors.name ? "border-destructive" : "",
              "data-ocid": "reg-name-input",
              autoComplete: "name"
            }
          ),
          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", role: "alert", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-phone", children: [
            t("auth.phone"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": "true", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "reg-phone",
              type: "tel",
              inputMode: "numeric",
              value: form.phone,
              onChange: (e) => set("phone")(e.target.value.replace(/\D/g, "").slice(0, 10)),
              placeholder: lang === "hi" ? "10 अंकों का नंबर" : "10-digit mobile number",
              className: errors.phone ? "border-destructive" : "",
              "data-ocid": "reg-phone-input",
              autoComplete: "tel",
              maxLength: 10
            }
          ),
          errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", role: "alert", children: errors.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-email", children: [
            t("auth.email"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": "true", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "reg-email",
              type: "email",
              value: form.email,
              onChange: (e) => set("email")(e.target.value),
              placeholder: lang === "hi" ? "ईमेल पता" : "your@email.com",
              className: errors.email ? "border-destructive" : "",
              "data-ocid": "reg-email-input",
              autoComplete: "email"
            }
          ),
          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", role: "alert", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-state", children: [
              t("auth.state"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": "true", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.state, onValueChange: set("state"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "reg-state",
                  className: errors.state ? "border-destructive" : "",
                  "data-ocid": "reg-state-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectValue,
                    {
                      placeholder: lang === "hi" ? "राज्य" : "State"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INDIAN_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
            ] }),
            errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", role: "alert", children: errors.state })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-city", children: [
              t("auth.city"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": "true", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "reg-city",
                value: form.city,
                onChange: (e) => set("city")(e.target.value),
                placeholder: lang === "hi" ? "शहर" : "City",
                className: errors.city ? "border-destructive" : "",
                "data-ocid": "reg-city-input",
                autoComplete: "address-level2"
              }
            ),
            errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", role: "alert", children: errors.city })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-category", children: [
            lang === "hi" ? "सेवा श्रेणी / Service Category" : "Service Category / सेवा श्रेणी",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": "true", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.serviceCategory,
              onValueChange: set("serviceCategory"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "reg-category",
                    className: errors.serviceCategory ? "border-destructive" : "",
                    "data-ocid": "reg-category-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectValue,
                      {
                        placeholder: lang === "hi" ? "श्रेणी चुनें" : "Select category"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories && categories.length > 0 ? categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: cat.name.en, children: [
                  cat.icon,
                  " ",
                  cat.name.en,
                  " / ",
                  cat.name.hi
                ] }, cat.id.toString())) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Government", children: "🏛️ Government / सरकारी" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Legal", children: "⚖️ Legal / कानूनी" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Medical", children: "🏥 Medical / चिकित्सा" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Education", children: "🎓 Education / शिक्षा" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Financial", children: "💰 Financial / वित्तीय" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Home", children: "🏠 Home / घरेलू" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Technology", children: "💻 Technology / तकनीक" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Travel", children: "✈️ Travel / यात्रा" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Business", children: "💼 Business / व्यापार" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "NRI Help", children: "🌍 NRI Help / एनआरआई सहायता" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "House Maintenance", children: "🔧 House Maintenance / घर मरम्मत" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Marriage", children: "💍 Marriage / विवाह" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Events", children: "🎉 Events / इवेंट" })
                ] }) })
              ]
            }
          ),
          errors.serviceCategory && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", role: "alert", children: errors.serviceCategory })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full gradient-saffron-accent text-primary-foreground border-0 mt-2",
            disabled: registerMutation.isPending,
            "data-ocid": "register-submit-btn",
            children: registerMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin mr-2" }),
              lang === "hi" ? "रजिस्टर हो रहा है..." : "Registering..."
            ] }) : lang === "hi" ? "रजिस्टर करें / Register" : "Register / रजिस्टर करें"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-5", children: [
        lang === "hi" ? "पहले से अकाउंट है?" : "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => window.history.back(),
            className: "text-primary hover:underline font-medium",
            children: lang === "hi" ? "लॉग इन करें" : "Log In"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground px-2", children: lang === "hi" ? "रजिस्ट्रेशन करके आप हमारी सेवा शर्तों से सहमत होते हैं। आपकी जानकारी सुरक्षित रहेगी।" : "By registering you agree to our terms of service. Your information is kept secure." })
  ] }) });
}
export {
  RegisterPage as default
};

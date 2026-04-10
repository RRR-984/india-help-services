import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, g as useParams, b as useNavigate, u as useLanguage, h as useAuth, P as Phone, M as MapPin, B as Button, k as ue } from "./index-CKeR-Ro-.js";
import { C as Card, b as CardHeader, a as CardContent, B as Badge } from "./card-lnFnQWO5.js";
import { I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./input-Mp3jGbSf.js";
import { L as Label } from "./label-CWNPGoQK.js";
import { S as Separator } from "./separator-BJ0gAKxi.js";
import { T as Textarea } from "./textarea-vLO6ldw2.js";
import { M as MotionConfigContext, i as isHTMLElement, h as useConstant, P as PresenceContext, j as usePresence, k as useIsomorphicLayoutEffect, L as LayoutGroupContext, l as useMyProfile, n as useRegisterUser, o as useCreateProviderProfile, m as motion } from "./use-api-CvM1d6Wo.js";
import { I as INDIAN_STATES } from "./backend-api-DxyZzRIE.js";
import { U as User } from "./user-CwVnJJ8s.js";
import { S as Shield } from "./shield-UekfEDQ3.js";
import { C as ChevronRight } from "./chevron-right-0XGpycnY.js";
import { C as CircleCheck } from "./circle-check-C8QNbI-f.js";
import { B as Building2 } from "./building-2-CSFzX-cO.js";
import "./index-CwpZ18Ca.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const Fingerprint = createLucideIcon("fingerprint", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
];
const Wrench = createLucideIcon("wrench", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  role: "seeker"
};
const emptyProvider = {
  businessName: "",
  servicesOffered: "",
  bioEn: "",
  bioHi: ""
};
function validateProfile(data, lang) {
  const errors = {};
  if (!data.name.trim())
    errors.name = lang === "hi" ? "पूरा नाम आवश्यक है" : "Full name is required";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = lang === "hi" ? "वैध ईमेल आवश्यक है" : "Valid email is required";
  if (!data.phone.trim() || !/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, "")))
    errors.phone = lang === "hi" ? "वैध 10-अंकीय फोन नंबर" : "Valid 10-digit phone number";
  if (!data.state)
    errors.state = lang === "hi" ? "राज्य चुनें" : "Please select a state";
  if (!data.city.trim())
    errors.city = lang === "hi" ? "शहर आवश्यक है" : "City is required";
  return errors;
}
function validateProvider(data, lang) {
  const errors = {};
  if (!data.businessName.trim())
    errors.businessName = lang === "hi" ? "व्यापार का नाम आवश्यक है" : "Business name is required";
  if (!data.servicesOffered.trim())
    errors.servicesOffered = lang === "hi" ? "सेवाएं दर्ज करें" : "Please describe your services";
  if (!data.bioEn.trim())
    errors.bioEn = lang === "hi" ? "अंग्रेजी में परिचय लिखें" : "English bio is required";
  return errors;
}
function StepIndicator({ step }) {
  const stepOrder = ["login", "profile", "provider-details", "done"];
  const visibleSteps = [
    { key: "login", label: "Login", labelHi: "लॉगिन" },
    { key: "profile", label: "Profile", labelHi: "प्रोफाइल" },
    { key: "done", label: "Done", labelHi: "पूर्ण" }
  ];
  const currentIdx = stepOrder.indexOf(step);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-4", children: visibleSteps.map((s, i) => {
    const sIdx = stepOrder.indexOf(s.key);
    const isActive = s.key === step || step === "provider-details" && s.key === "profile";
    const reallyDone = step === "done" ? sIdx < stepOrder.indexOf("done") : sIdx < currentIdx;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${reallyDone ? "bg-secondary text-secondary-foreground" : isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
          children: reallyDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : i + 1
        }
      ),
      i < visibleSteps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-0.5 w-8 transition-smooth ${reallyDone ? "bg-secondary" : "bg-border"}`
        }
      )
    ] }, s.key);
  }) });
}
function FieldError({ msg }) {
  if (!msg) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: msg });
}
function TricolorBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-1 w-full flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-card" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-secondary" })
  ] });
}
function AuthPage() {
  const { action } = useParams({ from: "/auth/$action" });
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const {
    isAuthenticated,
    isLoading: authLoading,
    login,
    user,
    refetchUser
  } = useAuth();
  const { data: myProfile, isLoading: profileLoading } = useMyProfile();
  const registerUser = useRegisterUser();
  const createProvider = useCreateProviderProfile();
  const [step, setStep] = reactExports.useState("login");
  const [profileData, setProfileData] = reactExports.useState(emptyProfile);
  const [providerData, setProviderData] = reactExports.useState(emptyProvider);
  const [profileErrors, setProfileErrors] = reactExports.useState({});
  const [providerErrors, setProviderErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
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
  function handleProfileChange(field, value) {
    setProfileData((p) => ({ ...p, [field]: value }));
    if (profileErrors[field])
      setProfileErrors((e) => ({ ...e, [field]: void 0 }));
  }
  function handleProviderChange(field, value) {
    setProviderData((p) => ({ ...p, [field]: value }));
    if (providerErrors[field])
      setProviderErrors((e) => ({ ...e, [field]: void 0 }));
  }
  async function handleProfileSubmit(e) {
    e.preventDefault();
    const errors = validateProfile(profileData, lang);
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
    const input = {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      state: profileData.state,
      city: profileData.city
    };
    try {
      await registerUser.mutateAsync(input);
      await refetchUser();
      ue.success(
        lang === "hi" ? "प्रोफाइल सफलतापूर्वक बनाई गई!" : "Profile created!"
      );
      if (profileData.role === "provider") {
        setStep("provider-details");
      } else {
        setStep("done");
      }
    } catch {
      ue.error(t("common.error"));
    }
  }
  async function handleProviderSubmit(e) {
    e.preventDefault();
    const errors = validateProvider(providerData, lang);
    if (Object.keys(errors).length > 0) {
      setProviderErrors(errors);
      return;
    }
    const ownerName = profileData.name || (user == null ? void 0 : user.name) || "";
    const email = profileData.email || (user == null ? void 0 : user.email) || "";
    const phone = profileData.phone || (user == null ? void 0 : user.phone) || "";
    const state = profileData.state || (user == null ? void 0 : user.state) || "";
    const city = profileData.city || (user == null ? void 0 : user.city) || "";
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
        servicesOffered: providerData.servicesOffered.split("\n").filter(Boolean).map((line, idx) => ({
          serviceId: BigInt(idx + 1),
          title: line.trim(),
          description: "",
          availability: "Mon–Sat"
        })),
        serviceAreas: [city],
        categoryIds: [],
        profileImage: void 0
      });
      setStep("done");
      ue.success(
        lang === "hi" ? "प्रदाता प्रोफाइल बनाई गई!" : "Provider profile created!"
      );
    } catch {
      ue.error(t("common.error"));
    }
  }
  if (authLoading || profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("auth.loggingIn") })
    ] }) });
  }
  if (isAuthenticated && myProfile && action === "login") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "w-full max-w-md",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-secondary/40 shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TricolorBar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-8 h-8 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: lang === "hi" ? "आपकी प्रोफाइल" : "Your Profile" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 pb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-4 space-y-3", children: [
              [
                {
                  Icon: User,
                  label: lang === "hi" ? "नाम" : "Name",
                  value: myProfile.name
                },
                {
                  Icon: Phone,
                  label: lang === "hi" ? "फोन" : "Phone",
                  value: myProfile.phone
                },
                {
                  Icon: MapPin,
                  label: lang === "hi" ? "स्थान" : "Location",
                  value: `${myProfile.city}, ${myProfile.state}`
                }
              ].map(({ Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground min-w-0", children: [
                  label,
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: value })
              ] }, label)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  lang === "hi" ? "भूमिका" : "Role",
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: myProfile.role === "provider" ? "default" : "secondary",
                    className: "capitalize",
                    children: myProfile.role
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full",
                onClick: () => navigate({ to: "/dashboard" }),
                "data-ocid": "auth-go-dashboard",
                children: [
                  lang === "hi" ? "डैशबोर्ड पर जाएं" : "Go to Dashboard",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                ]
              }
            )
          ] })
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4 py-12 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -16 },
      transition: { duration: 0.3 },
      className: "w-full max-w-lg",
      children: [
        step === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-primary/30 shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TricolorBar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pt-8 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "w-8 h-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: action === "register" ? t("auth.registerTitle") : t("auth.loginTitle") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: lang === "hi" ? "इंटरनेट आइडेंटिटी से सुरक्षित लॉगिन" : "Sign in securely with Internet Identity" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6 pb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-4 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: lang === "hi" ? "इंटरनेट आइडेंटिटी क्या है?" : "What is Internet Identity?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: lang === "hi" ? "यह एक सुरक्षित, पासवर्ड-रहित लॉगिन प्रणाली है। आपकी पहचान सुरक्षित रहती है और कोई व्यक्तिगत डेटा साझा नहीं होता।" : "A secure, password-free login built on blockchain. Your identity stays private — no personal data is shared with third parties." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: [
              {
                Icon: Shield,
                label: lang === "hi" ? "100% सुरक्षित" : "100% Secure"
              },
              {
                Icon: Fingerprint,
                label: lang === "hi" ? "पासवर्ड नहीं" : "No Password"
              },
              {
                Icon: CircleCheck,
                label: lang === "hi" ? "तुरंत एक्सेस" : "Instant Access"
              }
            ].map(({ Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
                  label
                ]
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "w-full text-base font-semibold gap-2",
                onClick: login,
                disabled: authLoading,
                "data-ocid": "auth-ii-login-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "w-5 h-5" }),
                  authLoading ? t("auth.loggingIn") : t("auth.loginWithII")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: lang === "hi" ? "लॉगिन करके आप हमारी सेवा शर्तों से सहमत हैं" : "By continuing, you agree to our Terms of Service" })
          ] })
        ] }),
        step === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-primary/30 shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TricolorBar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pt-6 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { step }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground text-center", children: lang === "hi" ? "अपनी प्रोफाइल पूरी करें" : "Complete Your Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: lang === "hi" ? "आपकी जानकारी सुरक्षित रहेगी" : "Your information is kept private and secure" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleProfileSubmit,
              noValidate: true,
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "p-name", className: "text-sm font-medium", children: [
                      t("auth.name"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "p-name",
                        placeholder: lang === "hi" ? "जैसे: राम शर्मा" : "e.g. Ramesh Sharma",
                        value: profileData.name,
                        onChange: (e) => handleProfileChange("name", e.target.value),
                        className: profileErrors.name ? "border-destructive" : "",
                        "data-ocid": "auth-name-input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: profileErrors.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "p-email", className: "text-sm font-medium", children: [
                      t("auth.email"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "p-email",
                        type: "email",
                        placeholder: "you@example.com",
                        value: profileData.email,
                        onChange: (e) => handleProfileChange("email", e.target.value),
                        className: profileErrors.email ? "border-destructive" : "",
                        "data-ocid": "auth-email-input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: profileErrors.email })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "p-phone", className: "text-sm font-medium", children: [
                    t("auth.phone"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "p-phone",
                      type: "tel",
                      placeholder: lang === "hi" ? "10-अंकीय मोबाइल नंबर" : "10-digit mobile number",
                      value: profileData.phone,
                      maxLength: 10,
                      onChange: (e) => handleProfileChange(
                        "phone",
                        e.target.value.replace(/\D/g, "")
                      ),
                      className: profileErrors.phone ? "border-destructive" : "",
                      "data-ocid": "auth-phone-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: profileErrors.phone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
                      t("auth.state"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: profileData.state,
                        onValueChange: (v) => handleProfileChange("state", v),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              className: profileErrors.state ? "border-destructive" : "",
                              "data-ocid": "auth-state-select",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                SelectValue,
                                {
                                  placeholder: lang === "hi" ? "राज्य चुनें" : "Select state"
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INDIAN_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: profileErrors.state })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "p-city", className: "text-sm font-medium", children: [
                      t("auth.city"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "p-city",
                        placeholder: lang === "hi" ? "जैसे: मुंबई" : "e.g. Mumbai",
                        value: profileData.city,
                        onChange: (e) => handleProfileChange("city", e.target.value),
                        className: profileErrors.city ? "border-destructive" : "",
                        "data-ocid": "auth-city-input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: profileErrors.city })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
                    lang === "hi" ? "आप क्या हैं?" : "I am a...",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                    {
                      value: "seeker",
                      Icon: User,
                      titleEn: "Service Seeker",
                      titleHi: "सेवा खोजने वाला",
                      descEn: "I need to find and hire service providers",
                      descHi: "मुझे सेवाएं खोजनी और लेनी हैं"
                    },
                    {
                      value: "provider",
                      Icon: Wrench,
                      titleEn: "Service Provider",
                      titleHi: "सेवा प्रदाता",
                      descEn: "I offer services and want clients",
                      descHi: "मैं सेवाएं देता/देती हूं"
                    }
                  ].map(
                    ({ value, Icon, titleEn, titleHi, descEn, descHi }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleProfileChange("role", value),
                        "data-ocid": `auth-role-${value}`,
                        className: `p-4 rounded-xl border-2 text-left transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${profileData.role === value ? value === "seeker" ? "border-primary bg-primary/5" : "border-secondary bg-secondary/5" : "border-border hover:border-muted-foreground/40"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${profileData.role === value ? value === "seeker" ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary" : "bg-muted text-muted-foreground"}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: lang === "hi" ? titleHi : titleEn }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: lang === "hi" ? descHi : descEn })
                          ] })
                        ] })
                      },
                      value
                    )
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    className: "w-full mt-2",
                    disabled: registerUser.isPending,
                    "data-ocid": "auth-profile-submit",
                    children: registerUser.isPending ? lang === "hi" ? "सहेजा जा रहा है..." : "Saving..." : profileData.role === "provider" ? lang === "hi" ? "आगे बढ़ें →" : "Continue →" : t("auth.submit")
                  }
                )
              ]
            }
          ) })
        ] }),
        step === "provider-details" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-secondary/40 shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TricolorBar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pt-6 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { step }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: lang === "hi" ? "व्यापार विवरण" : "Business Details" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: lang === "hi" ? "अपने व्यापार की जानकारी भरें" : "Tell clients about your business" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleProviderSubmit,
              noValidate: true,
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "prov-business",
                      className: "text-sm font-medium",
                      children: [
                        lang === "hi" ? "व्यापार का नाम" : "Business Name",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "prov-business",
                      placeholder: lang === "hi" ? "जैसे: शर्मा इलेक्ट्रिकल्स" : "e.g. Sharma Electricals",
                      value: providerData.businessName,
                      onChange: (e) => handleProviderChange("businessName", e.target.value),
                      className: providerErrors.businessName ? "border-destructive" : "",
                      "data-ocid": "auth-business-name-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: providerErrors.businessName })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "prov-services",
                      className: "text-sm font-medium",
                      children: [
                        lang === "hi" ? "दी जाने वाली सेवाएं" : "Services Offered",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "prov-services",
                      rows: 3,
                      placeholder: lang === "hi" ? "हर सेवा एक नई लाइन में:\nइलेक्ट्रिकल वायरिंग\nफैन इंस्टालेशन" : "One service per line:\nElectrical wiring\nFan installation\nSwitch repair",
                      value: providerData.servicesOffered,
                      onChange: (e) => handleProviderChange("servicesOffered", e.target.value),
                      className: providerErrors.servicesOffered ? "border-destructive" : "",
                      "data-ocid": "auth-services-offered-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: providerErrors.servicesOffered })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "prov-bio-en",
                      className: "text-sm font-medium",
                      children: [
                        lang === "hi" ? "परिचय (अंग्रेजी)" : "Bio (English)",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "prov-bio-en",
                      rows: 3,
                      placeholder: "Describe your experience and expertise in English...",
                      value: providerData.bioEn,
                      onChange: (e) => handleProviderChange("bioEn", e.target.value),
                      className: providerErrors.bioEn ? "border-destructive" : "",
                      "data-ocid": "auth-bio-en-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: providerErrors.bioEn })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "prov-bio-hi",
                      className: "text-sm font-medium",
                      children: [
                        lang === "hi" ? "परिचय (हिंदी)" : "Bio (Hindi)",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1 text-xs", children: [
                          "(",
                          lang === "hi" ? "वैकल्पिक" : "optional",
                          ")"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "prov-bio-hi",
                      rows: 2,
                      placeholder: "हिंदी में अपना परिचय लिखें...",
                      value: providerData.bioHi,
                      onChange: (e) => handleProviderChange("bioHi", e.target.value),
                      "data-ocid": "auth-bio-hi-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setStep("profile"),
                      "data-ocid": "auth-provider-back",
                      children: t("common.back")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "flex-[2]",
                      disabled: createProvider.isPending,
                      "data-ocid": "auth-provider-submit",
                      children: createProvider.isPending ? lang === "hi" ? "बन रहा है..." : "Creating..." : lang === "hi" ? "प्रोफाइल बनाएं" : "Create Profile"
                    }
                  )
                ] })
              ]
            }
          ) })
        ] }),
        step === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-secondary/40 shadow-elevated overflow-hidden text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TricolorBar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 px-8 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mx-auto rounded-full bg-secondary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: lang === "hi" ? "सफलतापूर्वक पंजीकृत!" : "You're all set!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "hi" ? "आपका खाता बन गया है। अब आप पूरे भारत में सेवाएं खोज सकते हैं।" : "Your account is ready. Explore trusted services across India." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "w-full",
                onClick: () => navigate({ to: "/dashboard" }),
                "data-ocid": "auth-done-dashboard",
                children: [
                  lang === "hi" ? "डैशबोर्ड पर जाएं" : "Go to Dashboard",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                className: "w-full",
                onClick: () => navigate({
                  to: "/services",
                  search: {
                    category: void 0,
                    state: void 0,
                    city: void 0,
                    search: void 0,
                    sort: void 0
                  }
                }),
                "data-ocid": "auth-done-explore",
                children: lang === "hi" ? "सेवाएं देखें" : "Browse Services"
              }
            )
          ] })
        ] })
      ]
    },
    step
  ) }) });
}
export {
  AuthPage as default
};

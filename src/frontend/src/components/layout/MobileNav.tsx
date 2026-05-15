import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useLanguage } from "../../hooks/use-language";
import { Role } from "../../types";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export default function MobileNav({ open, onClose, navLinks }: MobileNavProps) {
  const { t, lang, setLang } = useLanguage();
  const { isAuthenticated, user, login, logout } = useAuth();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  // Close on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleLogin = () => {
    login();
    onClose();
  };

  const allLinks = [
    ...navLinks,
    ...(isAuthenticated
      ? [{ label: t("nav.dashboard"), href: "/dashboard" }]
      : []),
    ...(isAuthenticated && user?.role === Role.admin
      ? [{ label: t("nav.admin"), href: "/admin" }]
      : []),
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
        onClick={onClose}
        onKeyUp={(e) => {
          if (e.key === "Enter") onClose();
        }}
        role="presentation"
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <dialog
        open
        className="fixed inset-y-0 right-0 z-50 w-72 bg-card shadow-elevated flex flex-col md:hidden m-0 p-0 border-0 h-full max-h-none"
        aria-label="Mobile navigation menu"
        data-ocid="mobile-nav"
      >
        {/* Tricolor strip */}
        <div className="h-1 w-full flex" aria-hidden="true">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-background border-y border-border" />
          <div className="flex-1 bg-secondary" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label="Indian flag">
              🇮🇳
            </span>
            <div>
              <span className="text-primary font-display font-bold text-base">
                India
              </span>
              <span className="text-secondary font-display font-bold text-base">
                {" "}
                Help
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Language toggle */}
        <div className="px-4 py-3 border-b border-border">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Toggle language"
            data-ocid="mobile-lang-toggle"
          >
            <span className="text-xs text-muted-foreground font-medium">
              Language / भाषा
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span
                className={
                  lang === "en"
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
                }
              >
                EN
              </span>
              <span className="text-border/60">|</span>
              <span
                className={`text-hindi ${lang === "hi" ? "text-primary font-bold" : "text-muted-foreground"}`}
              >
                हिं
              </span>
            </div>
          </button>
        </div>

        {/* Nav links */}
        <nav
          className="flex-1 overflow-y-auto py-3 px-3 space-y-1"
          aria-label="Mobile navigation"
        >
          {allLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentPath === link.href
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth actions */}
        <div className="p-4 border-t border-border space-y-2">
          {isAuthenticated ? (
            <>
              {user?.name && (
                <p
                  className="text-sm text-muted-foreground px-1 mb-2 truncate"
                  title={user.name}
                >
                  👤 {user.name}
                </p>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  logout();
                  onClose();
                }}
                data-ocid="mobile-logout-btn"
              >
                {t("nav.logout")}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogin}
                data-ocid="mobile-login-btn"
              >
                {t("nav.login")}
              </Button>
              <Button
                className="w-full gradient-saffron-accent text-primary-foreground border-0"
                asChild
                data-ocid="mobile-register-btn"
              >
                <Link to="/register" onClick={onClose}>
                  {t("nav.register")}
                </Link>
              </Button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

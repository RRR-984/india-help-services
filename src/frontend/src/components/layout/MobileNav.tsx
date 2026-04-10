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
  const { t } = useLanguage();
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
      />

      {/* Drawer panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-72 bg-card shadow-elevated flex flex-col md:hidden"
        data-ocid="mobile-nav"
      >
        {/* Tricolor strip */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-background border-y border-border" />
          <div className="flex-1 bg-secondary" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="flex items-center gap-1">
            <span className="text-primary font-display font-bold text-lg">
              India
            </span>
            <span className="text-secondary font-display font-bold text-lg">
              Help
            </span>
            <span className="text-foreground font-display font-semibold text-lg">
              Services
            </span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-md text-foreground hover:bg-muted"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav
          className="flex-1 overflow-y-auto py-4 px-4 space-y-1"
          aria-label="Mobile navigation"
        >
          {allLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentPath === link.href
                  ? "bg-primary/10 text-primary"
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
                <p className="text-sm text-muted-foreground px-1 mb-2 truncate">
                  {user.name}
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
                className="w-full"
                onClick={handleLogin}
                data-ocid="mobile-register-btn"
              >
                {t("nav.register")}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

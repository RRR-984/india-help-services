import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useLanguage } from "../../hooks/use-language";
import { Role } from "../../types";
import MobileNav from "./MobileNav";

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const { isAuthenticated, user, login, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.categories"), href: "/categories" },
  ];

  const handleLogin = () => {
    login();
  };

  const currentPath = router.state.location.pathname;

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-card"
        data-ocid="header"
      >
        {/* Indian tricolor strip */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-card" />
          <div className="flex-1 bg-secondary" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-primary font-display font-bold text-xl leading-none">
                  India
                </span>
                <span className="text-secondary font-display font-bold text-xl leading-none">
                  Help
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-foreground font-display font-semibold text-xl leading-none">
                  Services
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPath === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPath === "/dashboard"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {t("nav.dashboard")}
                </Link>
              )}
              {isAuthenticated && user?.role === Role.admin && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPath === "/admin"
                      ? "bg-secondary/10 text-secondary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {t("nav.admin")}
                </Link>
              )}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border text-xs font-semibold transition-smooth hover:bg-muted min-h-[44px] min-w-[44px] justify-center"
                aria-label="Toggle language"
                data-ocid="lang-toggle"
                type="button"
              >
                <span
                  className={
                    lang === "en" ? "text-primary" : "text-muted-foreground"
                  }
                >
                  EN
                </span>
                <span className="text-border">|</span>
                <span
                  className={
                    lang === "hi" ? "text-primary" : "text-muted-foreground"
                  }
                >
                  हिं
                </span>
              </button>

              {/* Auth buttons */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                    {user?.name ?? t("nav.profile")}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    data-ocid="logout-btn"
                  >
                    {t("nav.logout")}
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogin}
                    data-ocid="login-btn"
                  >
                    {t("nav.login")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleLogin}
                    data-ocid="register-btn"
                  >
                    {t("nav.register")}
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
                data-ocid="mobile-menu-btn"
                type="button"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}

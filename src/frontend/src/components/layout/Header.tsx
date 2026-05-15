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

  const currentPath = router.state.location.pathname;

  const isActive = (href: string) => currentPath === href;

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-card"
        data-ocid="header"
      >
        {/* Indian tricolor strip */}
        <div className="h-1 w-full flex" aria-hidden="true">
          <div className="flex-1 bg-primary" />
          <div
            className="flex-1 bg-background"
            style={{
              borderTop: "1px solid oklch(var(--border))",
              borderBottom: "1px solid oklch(var(--border))",
            }}
          />
          <div className="flex-1 bg-secondary" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group min-w-0"
              aria-label="Indiahelpsarvice - Home"
            >
              <span className="text-2xl" role="img" aria-label="Indian flag">
                🇮🇳
              </span>
              <div className="flex items-baseline gap-0 min-w-0">
                <span className="text-primary font-display font-bold text-lg leading-none">
                  India
                </span>
                <span className="text-secondary font-display font-bold text-lg leading-none">
                  help
                </span>
                <span className="text-foreground font-display font-semibold text-lg leading-none">
                  sarvice
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-0.5"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary font-semibold"
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
                    isActive("/dashboard")
                      ? "bg-primary/10 text-primary font-semibold"
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
                    isActive("/admin")
                      ? "bg-secondary/10 text-secondary font-semibold"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {t("nav.admin")}
                </Link>
              )}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Language toggle with flag accents */}
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold transition-smooth hover:bg-muted hover:border-primary/40 min-h-[36px] justify-center"
                aria-label={
                  lang === "en" ? "Switch to Hindi" : "Switch to English"
                }
                data-ocid="lang-toggle"
                type="button"
              >
                <span
                  className={`transition-colors ${lang === "en" ? "text-primary font-bold" : "text-muted-foreground"}`}
                >
                  EN
                </span>
                <span className="text-border/60 select-none">|</span>
                <span
                  className={`transition-colors text-hindi ${lang === "hi" ? "text-primary font-bold" : "text-muted-foreground"}`}
                >
                  हिं
                </span>
              </button>

              {/* Auth buttons — desktop */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <span
                    className="text-sm text-muted-foreground truncate max-w-[120px]"
                    title={user?.name}
                  >
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
                    onClick={login}
                    data-ocid="login-btn"
                  >
                    {t("nav.login")}
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="gradient-saffron-accent text-primary-foreground border-0"
                    data-ocid="register-btn"
                  >
                    <Link to="/register">{t("nav.register")}</Link>
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

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../../hooks/use-language";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  const quickLinks: Array<
    | { label: string; href: string; isStatic: true }
    | {
        label: string;
        to: "/auth/$action";
        params: { action: string };
        isStatic: false;
      }
  > = [
    { label: t("nav.home"), href: "/", isStatic: true },
    { label: t("nav.services"), href: "/services", isStatic: true },
    { label: t("nav.categories"), href: "/categories", isStatic: true },
    {
      label: t("nav.register"),
      to: "/auth/$action",
      params: { action: "register" },
      isStatic: false,
    },
  ];

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="text-primary font-display font-bold text-2xl">
                India
              </span>
              <span className="text-secondary font-display font-bold text-2xl">
                Help
              </span>
              <span className="text-foreground font-display font-semibold text-2xl">
                Services
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              {/* Indian flag emoji representation */}
              <span className="text-2xl" role="img" aria-label="Indian flag">
                🇮🇳
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                India Help Services
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.isStatic ? link.href : link.to}>
                  {link.isStatic ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      to={link.to}
                      params={link.params}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail size={14} className="mt-0.5 shrink-0 text-primary" />
                <span>support@indiahelp.in</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone size={14} className="mt-0.5 shrink-0 text-secondary" />
                <span>1800-XXX-HELP (Toll Free)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                <span>Serving all 28 States & 8 UTs of India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {year} India Help Services. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            {t("footer.built")}{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>

      {/* Indian flag color strip at bottom */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background border-y border-border" />
        <div className="flex-1 bg-secondary" />
      </div>
    </footer>
  );
}

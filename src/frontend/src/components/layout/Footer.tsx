import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../../hooks/use-language";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.services"), to: "/services" },
    { label: t("nav.categories"), to: "/categories" },
    { label: t("nav.register"), to: "/auth/register" },
  ];

  const serviceCategories = [
    { en: "Government", hi: "सरकारी" },
    { en: "Legal", hi: "कानूनी" },
    { en: "Medical", hi: "चिकित्सा" },
    { en: "Financial", hi: "वित्तीय" },
    { en: "Education", hi: "शिक्षा" },
  ];

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="Indian flag">
                🇮🇳
              </span>
              <div>
                <span className="text-primary font-display font-bold text-xl">
                  India
                </span>
                <span className="text-secondary font-display font-bold text-xl">
                  help
                </span>
                <span className="text-foreground font-display font-semibold text-xl">
                  sarvice
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin size={12} className="text-primary shrink-0" />
              {t("footer.servingIndia")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider accent-stripe">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider accent-stripe">
              Services / सेवाएं
            </h3>
            <ul className="space-y-2.5">
              {serviceCategories.map((cat) => (
                <li key={cat.en}>
                  <Link
                    to="/categories"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors"
                      aria-hidden="true"
                    />
                    <span>{cat.en}</span>
                    <span className="text-muted-foreground/60 text-hindi text-xs">
                      / {cat.hi}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider accent-stripe">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Mail
                  size={14}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>support@indiahelp.in</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Phone
                  size={14}
                  className="mt-0.5 shrink-0 text-secondary"
                  aria-hidden="true"
                />
                <div>
                  <div>1800-XXX-HELP</div>
                  <div className="text-xs text-muted-foreground/70">
                    (Toll Free / निःशुल्क)
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>New Delhi, India 🇮🇳</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {year} Indiahelpsarvice. {t("footer.allRightsReserved")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("footer.built")}{" "}
            <span className="text-primary font-medium">fifo bridge</span>
          </p>
        </div>
      </div>

      {/* Indian flag color strip at bottom */}
      <div className="h-1.5 w-full flex" aria-hidden="true">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background border-y border-border" />
        <div className="flex-1 bg-secondary" />
      </div>
    </footer>
  );
}

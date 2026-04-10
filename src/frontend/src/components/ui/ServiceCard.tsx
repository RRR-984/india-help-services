import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin } from "lucide-react";
import { useLanguage } from "../../hooks/use-language";
import type { Category, ProviderSummary } from "../../types";
import StarRating from "./StarRating";

interface ServiceCardProps {
  provider: ProviderSummary;
  categories?: Category[];
}

export default function ServiceCard({
  provider,
  categories,
}: ServiceCardProps) {
  const { lang, t } = useLanguage();

  const initials = provider.businessName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const primaryCategory = categories?.find(
    (c) =>
      provider.categoryIds[0] !== undefined && c.id === provider.categoryIds[0],
  );

  return (
    <Card
      className="group overflow-hidden hover:shadow-elevated transition-smooth border-border"
      data-ocid={`service-card-${provider.id}`}
    >
      {/* Top accent stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-secondary" />

      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-14 w-14 shrink-0 rounded-xl border-2 border-primary/20">
            <AvatarImage
              src={provider.profileImage}
              alt={provider.businessName}
            />
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-display font-bold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-foreground truncate text-base leading-tight">
                  {provider.businessName}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {provider.ownerName}
                </p>
              </div>
              {provider.isVerified && (
                <Badge
                  variant="secondary"
                  className="shrink-0 text-xs gap-1 bg-secondary/15 text-secondary border-secondary/30"
                >
                  <BadgeCheck size={11} />
                  {t("services.verified")}
                </Badge>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
              <MapPin size={11} className="shrink-0 text-primary" />
              <span className="truncate">
                {provider.city}, {provider.state}
              </span>
            </div>
          </div>
        </div>

        {/* Category + Rating row */}
        <div className="flex items-center justify-between mt-4 gap-2">
          {primaryCategory && (
            <Badge
              variant="outline"
              className="text-xs truncate max-w-[140px]"
              style={{
                borderColor: primaryCategory.color,
                color: primaryCategory.color,
              }}
            >
              {lang === "hi"
                ? primaryCategory.name.hi
                : primaryCategory.name.en}
            </Badge>
          )}
          <div className="flex items-center gap-1.5 ml-auto">
            <StarRating rating={provider.averageRating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({Number(provider.reviewCount)})
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-2 mt-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            data-ocid={`view-profile-${provider.id}`}
          >
            <Link
              to="/services/$providerId"
              params={{ providerId: provider.id.toString() }}
            >
              {t("services.viewProfile")}
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="flex-1 text-xs"
            data-ocid={`contact-now-${provider.id}`}
          >
            <Link
              to="/services/$providerId"
              params={{ providerId: provider.id.toString() }}
              hash="inquire"
            >
              {t("services.contactNow")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeMap = { sm: 12, md: 16, lg: 20 };

export default function StarRating({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
}: StarRatingProps) {
  const px = sizeMap[size];

  return (
    <div
      className="flex items-center gap-0.5"
      role={interactive ? "group" : "img"}
      aria-label={`Rating: ${rating.toFixed(1)} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = rating >= i + 1;
        const starKey = `star-${i + 1}`;

        if (interactive) {
          return (
            <label key={starKey} className="cursor-pointer">
              <input
                type="radio"
                name="star-rating"
                value={i + 1}
                checked={Math.round(rating) === i + 1}
                onChange={() => onChange?.(i + 1)}
                className="sr-only"
                aria-label={`Rate ${i + 1} stars`}
              />
              <Star
                size={px}
                className={
                  filled
                    ? "text-primary fill-primary"
                    : "text-muted-foreground/30 fill-transparent"
                }
              />
            </label>
          );
        }

        return (
          <Star
            key={starKey}
            size={px}
            className={
              filled
                ? "text-primary fill-primary"
                : "text-muted-foreground/30 fill-transparent"
            }
          />
        );
      })}
    </div>
  );
}

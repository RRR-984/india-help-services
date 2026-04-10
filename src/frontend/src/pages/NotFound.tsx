import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../hooks/use-language";

export default function NotFoundPage() {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-5 max-w-sm">
        <div className="text-7xl font-display font-bold text-primary/20">
          404
        </div>
        <div className="text-4xl">🔍</div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          {lang === "hi" ? "पेज नहीं मिला" : "Page Not Found"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {lang === "hi"
            ? "आप जो पेज खोज रहे हैं वह उपलब्ध नहीं है।"
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <Button asChild data-ocid="back-home">
          <Link to="/">{lang === "hi" ? "होम पर जाएं" : "Back to Home"}</Link>
        </Button>
      </div>
    </div>
  );
}

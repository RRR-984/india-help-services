import { Loader2 } from "lucide-react";
import { useLanguage } from "../../hooks/use-language";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  message?: string;
}

const sizeMap = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };

export function LoadingSpinner({
  size = "md",
  fullPage = false,
  message,
}: LoadingSpinnerProps) {
  const { t } = useLanguage();
  const msg = message ?? t("common.loading");

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className={`${sizeMap[size]} text-primary animate-spin`} />
          <p className="text-sm text-muted-foreground">{msg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 gap-3">
      <Loader2 className={`${sizeMap[size]} text-primary animate-spin`} />
      <span className="text-sm text-muted-foreground">{msg}</span>
    </div>
  );
}

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="text-4xl">⚠️</div>
      <div className="space-y-1">
        <p className="font-medium text-foreground">{t("common.error")}</p>
        {message && (
          <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
        )}
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
        >
          {t("common.retry")}
        </button>
      )}
    </div>
  );
}

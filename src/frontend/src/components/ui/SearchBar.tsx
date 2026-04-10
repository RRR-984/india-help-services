import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../hooks/use-language";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  debounceMs = 300,
  className = "",
  size = "md",
}: SearchBarProps) {
  const { t } = useLanguage();
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Sync external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(val);
    }, debounceMs);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  const inputHeight =
    size === "lg" ? "h-12" : size === "sm" ? "h-8 text-sm" : "h-10";

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        size={size === "sm" ? 14 : 16}
        className="absolute left-3 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder ?? t("common.search")}
        className={`pl-9 pr-8 ${inputHeight} bg-background border-input`}
        aria-label={placeholder ?? t("common.search")}
        data-ocid="search-input"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
          type="button"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle2,
  Database,
  Edit2,
  LayoutDashboard,
  MessageSquare,
  Plus,
  RefreshCw,
  Shield,
  Star,
  Tag,
  Trash2,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import {
  useAdminStats,
  useAllCategories,
  useApproveProvider,
  useCreateCategory,
  useDeleteCategory,
  useDisableProvider,
  useProviders,
  useSeedSampleData,
  useSetCategoryActive,
  useSetUserRole,
  useUpdateCategory,
  useUsers,
} from "../hooks/use-api";
import { useAuth } from "../hooks/use-auth";
import { useLanguage } from "../hooks/use-language";
import { Role } from "../types";
import type { Category, CategoryId, CategoryInput } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRESET_COLORS = [
  "#FF9933",
  "#138808",
  "#1E40AF",
  "#7C3AED",
  "#DC2626",
  "#059669",
  "#D97706",
  "#0891B2",
  "#BE185D",
  "#4338CA",
];

const EMPTY_CAT: CategoryInput = {
  name: { en: "", hi: "" },
  description: { en: "", hi: "" },
  icon: "🏛️",
  color: "#FF9933",
  displayOrder: BigInt(0),
};

// ─── Skeleton Stat Card ───────────────────────────────────────────────────────

function StatCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="w-10 h-10 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  sublabel: string;
  value: number | string;
  icon: React.ReactNode;
  colorClass: string;
  delay: number;
}

function StatCard({
  label,
  sublabel,
  value,
  icon,
  colorClass,
  delay,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
    >
      <Card className="overflow-hidden border border-border hover:shadow-card transition-smooth">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5 truncate">
                {label}
              </p>
              <p className="text-[11px] text-muted-foreground/70 mb-2 truncate">
                {sublabel}
              </p>
              <p className="text-3xl font-display font-bold text-foreground">
                {typeof value === "number" ? value.toLocaleString() : value}
              </p>
            </div>
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}
            >
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Category Form Dialog ─────────────────────────────────────────────────────

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  editTarget: Category | null;
  lang: "en" | "hi";
}

function CategoryDialog({
  open,
  onClose,
  editTarget,
  lang,
}: CategoryDialogProps) {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [form, setForm] = useState<CategoryInput>(EMPTY_CAT);

  useEffect(() => {
    if (editTarget) {
      setForm({
        name: editTarget.name,
        description: editTarget.description,
        icon: editTarget.icon,
        color: editTarget.color,
        displayOrder: editTarget.displayOrder,
      });
    } else {
      setForm(EMPTY_CAT);
    }
  }, [editTarget]);

  const isEdit = editTarget !== null;
  const isPending = createCategory.isPending || updateCategory.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateCategory.mutateAsync({ id: editTarget.id, input: form });
        toast.success(lang === "hi" ? "श्रेणी अपडेट हुई!" : "Category updated!");
      } else {
        await createCategory.mutateAsync(form);
        toast.success(lang === "hi" ? "श्रेणी बनाई गई!" : "Category created!");
      }
      onClose();
    } catch {
      toast.error(lang === "hi" ? "कुछ गलत हुआ।" : "Something went wrong.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="category-dialog"
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? lang === "hi"
                ? "श्रेणी संपादित करें"
                : "Edit Category"
              : lang === "hi"
                ? "नई श्रेणी जोड़ें"
                : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="cat-name-en">Name (English)</Label>
              <Input
                id="cat-name-en"
                value={form.name.en}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: { ...form.name, en: e.target.value },
                  })
                }
                placeholder="Government Services"
                required
                data-ocid="cat-name-en"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cat-name-hi">नाम (हिंदी)</Label>
              <Input
                id="cat-name-hi"
                value={form.name.hi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: { ...form.name, hi: e.target.value },
                  })
                }
                placeholder="सरकारी सेवाएं"
                required
                data-ocid="cat-name-hi"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="cat-desc-en">Description (English)</Label>
              <Textarea
                id="cat-desc-en"
                value={form.description.en}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: { ...form.description, en: e.target.value },
                  })
                }
                placeholder="Aadhaar, PAN, passports..."
                rows={2}
                data-ocid="cat-desc-en"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cat-desc-hi">विवरण (हिंदी)</Label>
              <Textarea
                id="cat-desc-hi"
                value={form.description.hi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: { ...form.description, hi: e.target.value },
                  })
                }
                placeholder="आधार, पैन, पासपोर्ट..."
                rows={2}
                data-ocid="cat-desc-hi"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="cat-icon">Icon (emoji)</Label>
              <Input
                id="cat-icon"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="🏛️"
                data-ocid="cat-icon"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cat-order">Display Order</Label>
              <Input
                id="cat-order"
                type="number"
                value={Number(form.displayOrder)}
                onChange={(e) =>
                  setForm({
                    ...form,
                    displayOrder: BigInt(e.target.value || "0"),
                  })
                }
                min={0}
                data-ocid="cat-order"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex items-center gap-3 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm({ ...form, color: c })}
                  className="w-7 h-7 rounded-full border-2 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{
                    backgroundColor: c,
                    borderColor: form.color === c ? "#000" : "transparent",
                    transform: form.color === c ? "scale(1.2)" : "scale(1)",
                  }}
                  aria-label={`Select color ${c}`}
                />
              ))}
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-7 h-7 rounded-full border-2 border-border cursor-pointer"
                title="Custom color"
                data-ocid="cat-color-picker"
              />
              <span className="text-xs text-muted-foreground font-mono">
                {form.color}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {lang === "hi" ? "रद्द करें" : "Cancel"}
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="cat-submit-btn"
            >
              {isPending
                ? lang === "hi"
                  ? "सहेजा जा रहा है..."
                  : "Saving..."
                : isEdit
                  ? lang === "hi"
                    ? "अपडेट करें"
                    : "Update"
                  : lang === "hi"
                    ? "जोड़ें"
                    : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
  variant?: "destructive" | "default";
}

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  isPending,
  variant = "destructive",
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent data-ocid="confirm-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className={
              variant === "destructive"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }
            data-ocid="confirm-action-btn"
          >
            {isPending ? "Processing..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Statistics Tab ────────────────────────────────────────────────────────────

function StatisticsTab({ lang }: { lang: "en" | "hi" }) {
  const { data: stats, isLoading } = useAdminStats();
  const { data: allProviders } = useProviders({}, BigInt(0), BigInt(200));
  const { data: users } = useUsers();
  const seedData = useSeedSampleData();
  const [showSeedConfirm, setShowSeedConfirm] = useState(false);

  const providerList = allProviders?.items ?? [];
  const pendingCount = providerList.filter(
    (p) => !p.isVerified && p.isActive,
  ).length;
  const verifiedCount = providerList.filter((p) => p.isVerified).length;
  const userCount = users?.length ?? 0;

  const statItems = [
    {
      label: lang === "hi" ? "कुल उपयोगकर्ता" : "Total Users",
      sublabel: lang === "hi" ? "पंजीकृत सदस्य" : "Registered members",
      value: isLoading ? "—" : userCount,
      icon: <Users size={20} />,
      colorClass: "bg-blue-500/10 text-blue-600",
    },
    {
      label: lang === "hi" ? "कुल प्रदाता" : "Total Providers",
      sublabel: lang === "hi" ? "सेवा प्रदाता" : "Service providers",
      value: isLoading ? "—" : Number(stats?.totalProviders ?? 0),
      icon: <UserCheck size={20} />,
      colorClass: "bg-primary/10 text-primary",
    },
    {
      label: lang === "hi" ? "कुल श्रेणियां" : "Total Categories",
      sublabel: lang === "hi" ? "सेवा श्रेणियां" : "Service categories",
      value: isLoading ? "—" : Number(stats?.totalCategories ?? 0),
      icon: <Tag size={20} />,
      colorClass: "bg-violet-500/10 text-violet-600",
    },
    {
      label: lang === "hi" ? "कुल पूछताछ" : "Total Inquiries",
      sublabel: lang === "hi" ? "ग्राहक सवाल" : "Customer inquiries",
      value: isLoading ? "—" : Number(stats?.totalInquiries ?? 0),
      icon: <MessageSquare size={20} />,
      colorClass: "bg-cyan-500/10 text-cyan-600",
    },
    {
      label: lang === "hi" ? "सेवा खोजने वाले" : "Service Seekers",
      sublabel: lang === "hi" ? "उपयोगकर्ता खोजकर्ता" : "Users seeking services",
      value: isLoading ? "—" : Number(stats?.totalSeekers ?? 0),
      icon: <BarChart3 size={20} />,
      colorClass: "bg-secondary/10 text-secondary",
    },
    {
      label: lang === "hi" ? "सत्यापित प्रदाता" : "Verified Providers",
      sublabel: lang === "hi" ? "मंजूर प्रदाता" : "Approved providers",
      value: isLoading ? "—" : verifiedCount,
      icon: <Star size={20} />,
      colorClass: "bg-primary/15 text-primary",
    },
    {
      label: lang === "hi" ? "मंजूरी बाकी" : "Pending Approvals",
      sublabel: lang === "hi" ? "समीक्षा की आवश्यकता" : "Awaiting review",
      value: isLoading ? "—" : pendingCount,
      icon: <RefreshCw size={20} />,
      colorClass: "bg-destructive/10 text-destructive",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["s1", "s2", "s3", "s4", "s5", "s6", "s7"] as const).map((k) => (
            <StatCardSkeleton key={k} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.07} />
          ))}
        </div>
      )}

      {/* Seed Data Section */}
      <Card className="border border-border bg-muted/30">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Database size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {lang === "hi" ? "सैंपल डेटा जोड़ें" : "Seed Sample Data"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lang === "hi"
                    ? "डेमो/परीक्षण के लिए नमूना श्रेणियां और प्रदाता जोड़ें"
                    : "Add sample categories and providers for demo/testing purposes"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSeedConfirm(true)}
              disabled={seedData.isPending}
              data-ocid="seed-data-btn"
              className="shrink-0"
            >
              {seedData.isPending ? (
                <>
                  <RefreshCw size={14} className="mr-2 animate-spin" />
                  {lang === "hi" ? "जोड़ा जा रहा है..." : "Seeding..."}
                </>
              ) : (
                <>
                  <Database size={14} className="mr-2" />
                  {lang === "hi" ? "सैंपल डेटा जोड़ें" : "Seed Sample Data"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showSeedConfirm}
        title={lang === "hi" ? "सैंपल डेटा जोड़ें?" : "Seed Sample Data?"}
        description={
          lang === "hi"
            ? "यह डेमो श्रेणियां और प्रदाता जोड़ेगा। मौजूदा डेटा प्रभावित नहीं होगा।"
            : "This will add demo categories and providers to the platform. Existing data will not be affected."
        }
        confirmLabel={lang === "hi" ? "जोड़ें" : "Seed Data"}
        onConfirm={async () => {
          setShowSeedConfirm(false);
          try {
            await seedData.mutateAsync();
            toast.success(
              lang === "hi"
                ? "सैंपल डेटा जोड़ा गया!"
                : "Sample data seeded successfully!",
            );
          } catch {
            toast.error(lang === "hi" ? "कुछ गलत हुआ।" : "Something went wrong.");
          }
        }}
        onCancel={() => setShowSeedConfirm(false)}
        isPending={seedData.isPending}
        variant="default"
      />
    </div>
  );
}

// ─── Categories Tab ────────────────────────────────────────────────────────────

function CategoriesTab({ lang }: { lang: "en" | "hi" }) {
  const { data: categories, isLoading } = useAllCategories();
  const deleteCategory = useDeleteCategory();
  const setCategoryActive = useSetCategoryActive();
  const [showDialog, setShowDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CategoryId | null>(null);

  const handleOpenAdd = () => {
    setEditTarget(null);
    setShowDialog(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditTarget(cat);
    setShowDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget === null) return;
    try {
      await deleteCategory.mutateAsync(deleteTarget);
      toast.success(lang === "hi" ? "श्रेणी हटा दी गई!" : "Category deleted!");
    } catch {
      toast.error(lang === "hi" ? "कुछ गलत हुआ।" : "Something went wrong.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="font-semibold text-foreground">
          {lang === "hi" ? "श्रेणियां प्रबंधित करें" : "Manage Categories"}
          {categories && (
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              ({categories.length})
            </span>
          )}
        </h2>
        <Button size="sm" onClick={handleOpenAdd} data-ocid="add-category-btn">
          <Plus size={14} className="mr-1.5" />
          {lang === "hi" ? "श्रेणी जोड़ें" : "Add Category"}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {(["r1", "r2", "r3", "r4", "r5"] as const).map((k) => (
            <Skeleton key={k} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "आइकन" : "Icon"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "नाम (EN)" : "Name (EN)"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap hidden sm:table-cell">
                  {lang === "hi" ? "नाम (HI)" : "Name (HI)"}
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground whitespace-nowrap hidden md:table-cell">
                  {lang === "hi" ? "क्रम" : "Order"}
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "स्थिति" : "Status"}
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "कार्रवाई" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {(categories ?? []).map((cat) => (
                <motion.tr
                  key={cat.id.toString()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`cat-row-${cat.id}`}
                >
                  <td className="px-4 py-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                      style={{ backgroundColor: `${cat.color}20` }}
                    >
                      {cat.icon}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap max-w-[160px] truncate">
                    {cat.name.en}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap max-w-[160px] truncate hidden sm:table-cell">
                    {cat.name.hi}
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground hidden md:table-cell">
                    {Number(cat.displayOrder)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={cat.isActive ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {cat.isActive
                        ? lang === "hi"
                          ? "सक्रिय"
                          : "Active"
                        : lang === "hi"
                          ? "निष्क्रिय"
                          : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setCategoryActive.mutate({
                            id: cat.id,
                            isActive: !cat.isActive,
                          })
                        }
                        aria-label={cat.isActive ? "Deactivate" : "Activate"}
                        data-ocid={`toggle-cat-${cat.id}`}
                        className="h-7 w-7 p-0"
                      >
                        {cat.isActive ? (
                          <XCircle
                            size={14}
                            className="text-muted-foreground"
                          />
                        ) : (
                          <CheckCircle2 size={14} className="text-secondary" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEdit(cat)}
                        aria-label="Edit"
                        data-ocid={`edit-cat-${cat.id}`}
                        className="h-7 w-7 p-0"
                      >
                        <Edit2 size={13} className="text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(cat.id)}
                        aria-label="Delete"
                        data-ocid={`delete-cat-${cat.id}`}
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {(categories ?? []).length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Tag size={32} className="opacity-30" />
                      <span>
                        {lang === "hi"
                          ? "कोई श्रेणी नहीं मिली"
                          : "No categories found"}
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <CategoryDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        editTarget={editTarget}
        lang={lang}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title={lang === "hi" ? "श्रेणी हटाएं?" : "Delete Category?"}
        description={
          lang === "hi"
            ? "यह क्रिया उलटी नहीं की जा सकती। यह श्रेणी स्थायी रूप से हटा दी जाएगी।"
            : "This action cannot be undone. The category will be permanently removed."
        }
        confirmLabel={lang === "hi" ? "हटाएं" : "Delete"}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteCategory.isPending}
      />
    </div>
  );
}

// ─── Providers Tab ─────────────────────────────────────────────────────────────

type ProviderFilter = "pending" | "active" | "disabled";

function ProvidersTab({ lang }: { lang: "en" | "hi" }) {
  const { data: providersPage, isLoading } = useProviders(
    {},
    BigInt(0),
    BigInt(200),
  );
  const { data: categories } = useAllCategories();
  const approveProvider = useApproveProvider();
  const disableProvider = useDisableProvider();
  const [activeFilter, setActiveFilter] = useState<ProviderFilter>("pending");
  const [disableTarget, setDisableTarget] = useState<bigint | null>(null);

  const catMap = new Map(
    (categories ?? []).map((c) => [c.id.toString(), c.name]),
  );
  const providers = providersPage?.items ?? [];

  const pendingProviders = providers.filter((p) => !p.isVerified && p.isActive);
  const activeProviders = providers.filter((p) => p.isVerified && p.isActive);
  const disabledProviders = providers.filter((p) => !p.isActive);

  const filteredProviders =
    activeFilter === "pending"
      ? pendingProviders
      : activeFilter === "active"
        ? activeProviders
        : disabledProviders;

  const handleDisableConfirm = async () => {
    if (disableTarget === null) return;
    try {
      await disableProvider.mutateAsync(disableTarget);
      toast.success(
        lang === "hi" ? "प्रदाता अक्षम किया गया!" : "Provider disabled!",
      );
    } catch {
      toast.error(lang === "hi" ? "कुछ गलत हुआ।" : "Something went wrong.");
    } finally {
      setDisableTarget(null);
    }
  };

  const filterTabs: {
    key: ProviderFilter;
    labelEn: string;
    labelHi: string;
    count: number;
  }[] = [
    {
      key: "pending",
      labelEn: "Pending Approval",
      labelHi: "मंजूरी बाकी",
      count: pendingProviders.length,
    },
    {
      key: "active",
      labelEn: "Active",
      labelHi: "सक्रिय",
      count: activeProviders.length,
    },
    {
      key: "disabled",
      labelEn: "Disabled",
      labelHi: "अक्षम",
      count: disabledProviders.length,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">
          {lang === "hi" ? "प्रदाता प्रबंधित करें" : "Manage Providers"}
          {providers.length > 0 && (
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              ({providers.length} {lang === "hi" ? "कुल" : "total"})
            </span>
          )}
        </h2>
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-2 mb-4 flex-wrap"
        data-ocid="provider-filter-tabs"
      >
        {filterTabs.map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            data-ocid={`provider-filter-${tab.key}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth border ${
              activeFilter === tab.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {lang === "hi" ? tab.labelHi : tab.labelEn}
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                activeFilter === tab.key
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {(["p1", "p2", "p3", "p4", "p5"] as const).map((k) => (
            <Skeleton key={k} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "व्यापार का नाम" : "Business Name"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap hidden sm:table-cell">
                  {lang === "hi" ? "स्वामी" : "Owner"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap hidden md:table-cell">
                  {lang === "hi" ? "श्रेणी" : "Category"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap hidden lg:table-cell">
                  {lang === "hi" ? "राज्य / शहर" : "State / City"}
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "स्थिति" : "Status"}
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "कार्रवाई" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {filteredProviders.map((p) => (
                <tr
                  key={p.id.toString()}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`provider-row-${p.id}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground max-w-[160px] truncate whitespace-nowrap">
                    {p.businessName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden sm:table-cell">
                    {p.ownerName}
                  </td>
                  <td className="px-4 py-3 max-w-[120px] whitespace-nowrap hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {p.categoryIds.length > 0
                        ? (catMap.get(p.categoryIds[0].toString())?.en ?? "—")
                        : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap hidden lg:table-cell">
                    {p.state}, {p.city}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.isVerified ? (
                      <Badge variant="secondary" className="text-xs">
                        {lang === "hi" ? "सत्यापित" : "Verified"}
                      </Badge>
                    ) : !p.isActive ? (
                      <Badge variant="destructive" className="text-xs">
                        {lang === "hi" ? "अक्षम" : "Disabled"}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        {lang === "hi" ? "समीक्षाधीन" : "Pending"}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {activeFilter === "pending" && !p.isVerified && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs px-2 text-secondary border-secondary/40 hover:bg-secondary/10"
                          onClick={() => approveProvider.mutate(p.id)}
                          disabled={approveProvider.isPending}
                          data-ocid={`approve-${p.id}`}
                        >
                          <CheckCircle2 size={12} className="mr-1" />
                          {lang === "hi" ? "मंजूर करें" : "Approve"}
                        </Button>
                      )}
                      {activeFilter === "active" && p.isActive && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs px-2 text-destructive hover:text-destructive"
                          onClick={() => setDisableTarget(p.id)}
                          data-ocid={`disable-${p.id}`}
                        >
                          <XCircle size={12} className="mr-1" />
                          {lang === "hi" ? "अक्षम करें" : "Disable"}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProviders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <UserCheck size={32} className="opacity-30" />
                      <span>
                        {lang === "hi"
                          ? "कोई प्रदाता नहीं मिला"
                          : "No providers found"}
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={disableTarget !== null}
        title={lang === "hi" ? "प्रदाता अक्षम करें?" : "Disable Provider?"}
        description={
          lang === "hi"
            ? "यह प्रदाता प्रोफाइल को निष्क्रिय कर देगा। आप इसे बाद में सक्रिय कर सकते हैं।"
            : "This will deactivate the provider profile. You can reactivate it later."
        }
        confirmLabel={lang === "hi" ? "अक्षम करें" : "Disable"}
        onConfirm={handleDisableConfirm}
        onCancel={() => setDisableTarget(null)}
        isPending={disableProvider.isPending}
      />
    </div>
  );
}

// ─── Users Tab ─────────────────────────────────────────────────────────────────

function UsersTab({ lang }: { lang: "en" | "hi" }) {
  const { data: users, isLoading } = useUsers();
  const setUserRole = useSetUserRole();
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [roleTarget, setRoleTarget] = useState<{
    userId: string;
    name: string;
  } | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>(Role.seeker);

  const filteredUsers =
    roleFilter === "all"
      ? (users ?? [])
      : (users ?? []).filter((u) => String(u.role) === roleFilter);

  const handleRoleChange = async () => {
    if (!roleTarget) return;
    try {
      const userObj = (users ?? []).find(
        (u) => u.id.toString() === roleTarget.userId,
      );
      if (!userObj) return;
      await setUserRole.mutateAsync({ userId: userObj.id, role: selectedRole });
      toast.success(lang === "hi" ? "भूमिका अपडेट हुई!" : "Role updated!");
    } catch {
      toast.error(lang === "hi" ? "कुछ गलत हुआ।" : "Something went wrong.");
    } finally {
      setRoleTarget(null);
    }
  };

  const roleBadgeVariant = (
    role: string,
  ): "destructive" | "secondary" | "default" | "outline" => {
    if (role === "admin") return "destructive";
    if (role === "provider") return "secondary";
    return "default";
  };

  const roleFilterOptions: {
    value: "all" | Role;
    labelEn: string;
    labelHi: string;
  }[] = [
    { value: "all", labelEn: "All Users", labelHi: "सभी उपयोगकर्ता" },
    { value: Role.admin, labelEn: "Admins", labelHi: "एडमिन" },
    { value: Role.provider, labelEn: "Providers", labelHi: "प्रदाता" },
    { value: Role.seeker, labelEn: "Seekers", labelHi: "खोजकर्ता" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h2 className="font-semibold text-foreground">
          {lang === "hi" ? "उपयोगकर्ता प्रबंधित करें" : "Manage Users"}
          {users && (
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              ({filteredUsers.length}
              {roleFilter !== "all" && ` / ${users.length}`})
            </span>
          )}
        </h2>

        {/* Role filter */}
        <div className="flex gap-1.5 flex-wrap" data-ocid="user-role-filter">
          {roleFilterOptions.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => setRoleFilter(opt.value)}
              data-ocid={`filter-role-${opt.value}`}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth border ${
                roleFilter === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {lang === "hi" ? opt.labelHi : opt.labelEn}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {(["u1", "u2", "u3", "u4", "u5", "u6"] as const).map((k) => (
            <Skeleton key={k} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "नाम" : "Name"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap hidden sm:table-cell">
                  {lang === "hi" ? "ईमेल" : "Email"}
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "भूमिका" : "Role"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap hidden md:table-cell">
                  {lang === "hi" ? "राज्य / शहर" : "State / City"}
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "कार्रवाई" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {filteredUsers.map((u) => (
                <tr
                  key={u.id.toString()}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`user-row-${u.id}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate whitespace-nowrap hidden sm:table-cell">
                    {u.email || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={roleBadgeVariant(String(u.role))}
                      className="text-xs capitalize"
                    >
                      {String(u.role)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap hidden md:table-cell">
                    {u.state && u.city
                      ? `${u.state}, ${u.city}`
                      : u.state || u.city || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs px-2"
                        onClick={() => {
                          setRoleTarget({
                            userId: u.id.toString(),
                            name: u.name,
                          });
                          setSelectedRole(u.role as Role);
                        }}
                        data-ocid={`set-role-${u.id}`}
                      >
                        <Shield size={11} className="mr-1" />
                        {lang === "hi" ? "भूमिका बदलें" : "Set Role"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users size={32} className="opacity-30" />
                      <span>
                        {lang === "hi"
                          ? "कोई उपयोगकर्ता नहीं मिला"
                          : "No users found"}
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Set Role Dialog */}
      <Dialog
        open={roleTarget !== null}
        onOpenChange={(o) => !o && setRoleTarget(null)}
      >
        <DialogContent className="max-w-sm" data-ocid="set-role-dialog">
          <DialogHeader>
            <DialogTitle>
              {lang === "hi" ? "भूमिका सेट करें" : "Set User Role"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              {lang === "hi"
                ? `${roleTarget?.name} की भूमिका बदलें:`
                : `Change role for ${roleTarget?.name}:`}
            </p>
            <Select
              value={String(selectedRole)}
              onValueChange={(v) => setSelectedRole(v as Role)}
            >
              <SelectTrigger data-ocid="role-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Role.seeker}>
                  {lang === "hi" ? "सेवा खोजने वाला" : "Seeker"}
                </SelectItem>
                <SelectItem value={Role.provider}>
                  {lang === "hi" ? "सेवा प्रदाता" : "Provider"}
                </SelectItem>
                <SelectItem value={Role.admin}>
                  {lang === "hi" ? "एडमिन" : "Admin"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleTarget(null)}>
              {lang === "hi" ? "रद्द करें" : "Cancel"}
            </Button>
            <Button
              onClick={handleRoleChange}
              disabled={setUserRole.isPending}
              data-ocid="confirm-role-btn"
            >
              {setUserRole.isPending
                ? lang === "hi"
                  ? "अपडेट हो रहा है..."
                  : "Updating..."
                : lang === "hi"
                  ? "सहेजें"
                  : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { t, lang } = useLanguage();
  const { isAuthenticated, isLoading: authLoading, user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isAuthenticated && user && user.role !== Role.admin) {
      navigate({ to: "/dashboard" });
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  if (authLoading) return <LoadingSpinner fullPage />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 max-w-sm"
        >
          <div className="text-5xl">🔐</div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            {lang === "hi" ? "एडमिन एक्सेस आवश्यक" : "Admin Access Required"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {lang === "hi"
              ? "इस पेज को देखने के लिए कृपया लॉगिन करें।"
              : "Please log in to access this page."}
          </p>
          <Button onClick={login} data-ocid="admin-login-btn">
            {t("nav.login")}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (user?.role !== Role.admin) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-saffron-accent flex items-center justify-center shadow-card">
              <LayoutDashboard size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                {lang === "hi" ? "एडमिन कंट्रोल पैनल" : "Admin Control Panel"}
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lang === "hi"
                  ? "Indiahelpsarvice का प्रबंधन करें"
                  : "Manage Indiahelpsarvice platform"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs defaultValue="statistics" data-ocid="admin-tabs">
          <div className="overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="mb-6 h-10 w-max min-w-full sm:w-auto">
              <TabsTrigger
                value="statistics"
                className="gap-1.5 text-xs sm:text-sm"
                data-ocid="tab-statistics"
              >
                <BarChart3 size={14} />
                {lang === "hi" ? "आंकड़े" : "Statistics"}
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="gap-1.5 text-xs sm:text-sm"
                data-ocid="tab-categories"
              >
                <Tag size={14} />
                {lang === "hi" ? "श्रेणियां" : "Categories"}
              </TabsTrigger>
              <TabsTrigger
                value="providers"
                className="gap-1.5 text-xs sm:text-sm"
                data-ocid="tab-providers"
              >
                <UserCheck size={14} />
                {lang === "hi" ? "प्रदाता" : "Providers"}
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="gap-1.5 text-xs sm:text-sm"
                data-ocid="tab-users"
              >
                <Users size={14} />
                {lang === "hi" ? "उपयोगकर्ता" : "Users"}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="statistics">
            <StatisticsTab lang={lang} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesTab lang={lang} />
          </TabsContent>

          <TabsContent value="providers">
            <ProvidersTab lang={lang} />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab lang={lang} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle2,
  Edit2,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Plus,
  RefreshCw,
  Shield,
  Tag,
  Trash2,
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

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

function StatCard({ label, value, icon, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="overflow-hidden border border-border">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {label}
              </p>
              <p className="text-3xl font-display font-bold text-foreground">
                {value.toLocaleString()}
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}18`, color }}
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

  const isPending = createCategory.isPending || updateCategory.isPending;

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
          {/* Names */}
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

          {/* Descriptions */}
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

          {/* Icon, Order */}
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

          {/* Color */}
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

// ─── Confirm Delete Dialog ────────────────────────────────────────────────────

interface ConfirmDeleteProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}

function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  isPending,
}: ConfirmDeleteProps) {
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
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-ocid="confirm-action-btn"
          >
            {isPending ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Dashboard Tab ─────────────────────────────────────────────────────────────

function DashboardTab({ lang }: { lang: "en" | "hi" }) {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading)
    return (
      <div className="py-8">
        <LoadingSpinner />
      </div>
    );
  if (!stats) return null;

  const statItems = [
    {
      label: lang === "hi" ? "कुल प्रदाता" : "Total Providers",
      value: Number(stats.totalProviders),
      icon: <BarChart3 size={18} />,
      color: "#FF9933",
    },
    {
      label: lang === "hi" ? "सेवा खोजने वाले" : "Service Seekers",
      value: Number(stats.totalSeekers),
      icon: <Users size={18} />,
      color: "#138808",
    },
    {
      label: lang === "hi" ? "श्रेणियां" : "Categories",
      value: Number(stats.totalCategories),
      icon: <Tag size={18} />,
      color: "#1E40AF",
    },
    {
      label: lang === "hi" ? "पूछताछ" : "Inquiries",
      value: Number(stats.totalInquiries),
      icon: <MessageSquare size={18} />,
      color: "#7C3AED",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {lang === "hi" ? "प्लेटफॉर्म अवलोकन" : "Platform Overview"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              {[
                {
                  label: lang === "hi" ? "कुल प्रदाता" : "Total Providers",
                  val: Number(stats.totalProviders),
                },
                {
                  label: lang === "hi" ? "सेवा खोजने वाले" : "Service Seekers",
                  val: Number(stats.totalSeekers),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-semibold font-display text-foreground">
                    {row.val.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                {
                  label: lang === "hi" ? "श्रेणियां" : "Categories",
                  val: Number(stats.totalCategories),
                },
                {
                  label: lang === "hi" ? "पूछताछ" : "Inquiries",
                  val: Number(stats.totalInquiries),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-semibold font-display text-foreground">
                    {row.val.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
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
          <Plus size={14} className="mr-1" />
          {lang === "hi" ? "श्रेणी जोड़ें" : "Add Category"}
        </Button>
      </div>

      {isLoading ? (
        <div className="py-8">
          <LoadingSpinner />
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
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "नाम (HI)" : "Name (HI)"}
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground whitespace-nowrap">
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
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap max-w-[160px] truncate">
                    {cat.name.hi}
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">
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
                    {lang === "hi"
                      ? "कोई श्रेणी नहीं मिली"
                      : "No categories found"}
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
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteCategory.isPending}
      />
    </div>
  );
}

// ─── Providers Tab ─────────────────────────────────────────────────────────────

function ProvidersTab({ lang }: { lang: "en" | "hi" }) {
  const { data: providersPage, isLoading } = useProviders(
    {},
    BigInt(0),
    BigInt(100),
  );
  const { data: categories } = useAllCategories();
  const approveProvider = useApproveProvider();
  const disableProvider = useDisableProvider();
  const [disableTarget, setDisableTarget] = useState<bigint | null>(null);

  const catMap = new Map(
    (categories ?? []).map((c) => [c.id.toString(), c.name]),
  );

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

  const providers = providersPage?.items ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">
          {lang === "hi" ? "प्रदाता प्रबंधित करें" : "Manage Providers"}
          {providers.length > 0 && (
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              ({providers.length})
            </span>
          )}
        </h2>
      </div>

      {isLoading ? (
        <div className="py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "व्यापार का नाम" : "Business Name"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "स्वामी" : "Owner"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "श्रेणी" : "Category"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "राज्य / शहर" : "State / City"}
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "सत्यापित" : "Verified"}
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "सक्रिय" : "Active"}
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "कार्रवाई" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {providers.map((p) => (
                <tr
                  key={p.id.toString()}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground max-w-[160px] truncate whitespace-nowrap">
                    {p.businessName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {p.ownerName}
                  </td>
                  <td className="px-4 py-3 max-w-[120px] whitespace-nowrap">
                    {p.categoryIds.length > 0 ? (
                      <span className="text-xs text-muted-foreground">
                        {catMap.get(p.categoryIds[0].toString())?.en ?? "—"}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {p.state}, {p.city}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={p.isVerified ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {p.isVerified
                        ? lang === "hi"
                          ? "हां"
                          : "Yes"
                        : lang === "hi"
                          ? "नहीं"
                          : "No"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={p.isActive ? "default" : "outline"}
                      className="text-xs"
                    >
                      {p.isActive
                        ? lang === "hi"
                          ? "सक्रिय"
                          : "Active"
                        : lang === "hi"
                          ? "निष्क्रिय"
                          : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {!p.isVerified && (
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
                      {p.isActive && (
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
              {providers.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    {lang === "hi"
                      ? "कोई प्रदाता नहीं मिला"
                      : "No providers found"}
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
  const [roleTarget, setRoleTarget] = useState<{
    userId: string;
    name: string;
  } | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>(Role.seeker);

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

  const roleColors: Record<string, string> = {
    admin: "destructive",
    provider: "secondary",
    seeker: "default",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">
          {lang === "hi" ? "उपयोगकर्ता प्रबंधित करें" : "Manage Users"}
          {users && (
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              ({users.length})
            </span>
          )}
        </h2>
      </div>

      {isLoading ? (
        <div className="py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "नाम" : "Name"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "ईमेल" : "Email"}
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "भूमिका" : "Role"}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "राज्य / शहर" : "State / City"}
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">
                  {lang === "hi" ? "कार्रवाई" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {(users ?? []).map((u) => (
                <tr
                  key={u.id.toString()}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate whitespace-nowrap">
                    {u.email || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={
                        (roleColors[String(u.role)] as
                          | "destructive"
                          | "secondary"
                          | "default") ?? "outline"
                      }
                      className="text-xs capitalize"
                    >
                      {String(u.role)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
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
              {(users ?? []).length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    {lang === "hi"
                      ? "कोई उपयोगकर्ता नहीं मिला"
                      : "No users found"}
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
  const seedData = useSeedSampleData();

  // Redirect non-admins to /dashboard
  useEffect(() => {
    if (!authLoading && isAuthenticated && user && user.role !== Role.admin) {
      navigate({ to: "/dashboard" });
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  if (authLoading) return <LoadingSpinner fullPage />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
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
        </div>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground flex items-center gap-2">
                <LayoutDashboard size={26} className="text-primary" />
                {t("admin.title")}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === "hi"
                  ? "India Help Services का प्रबंधन करें"
                  : "Manage India Help Services platform"}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => seedData.mutate()}
              disabled={seedData.isPending}
              data-ocid="seed-data-btn"
              className="self-start sm:self-auto"
            >
              {seedData.isPending ? (
                <>
                  <RefreshCw size={14} className="mr-2 animate-spin" />
                  {lang === "hi" ? "जोड़ा जा रहा है..." : "Seeding..."}
                </>
              ) : (
                <>
                  <FileText size={14} className="mr-2" />
                  {lang === "hi" ? "सैंपल डेटा जोड़ें" : "Seed Sample Data"}
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" data-ocid="admin-tabs">
          <div className="overflow-x-auto pb-1">
            <TabsList className="mb-6 h-10">
              <TabsTrigger
                value="dashboard"
                className="gap-1.5 text-xs sm:text-sm"
                data-ocid="tab-dashboard"
              >
                <LayoutDashboard size={14} />
                {lang === "hi" ? "डैशबोर्ड" : "Dashboard"}
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
                <BarChart3 size={14} />
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

          <TabsContent value="dashboard">
            <DashboardTab lang={lang} />
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

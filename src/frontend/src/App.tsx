import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/layout/Layout";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Lazy-load pages
const HomePage = lazy(() => import("./pages/Home"));
const ServicesPage = lazy(() => import("./pages/Services"));
const ProviderDetailPage = lazy(() => import("./pages/ProviderDetail"));
const CategoriesPage = lazy(() => import("./pages/Categories"));
const AuthPage = lazy(() => import("./pages/Auth"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const AdminPage = lazy(() => import("./pages/Admin"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const RegisterPage = lazy(() => import("./pages/Register"));

function PageLoader() {
  return <LoadingSpinner fullPage />;
}

// ─── Routes ──────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <LanguageProvider>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </LanguageProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServicesPage />
    </Suspense>
  ),
  validateSearch: (search: Record<string, string>) => ({
    category: search.category as string | undefined,
    state: search.state as string | undefined,
    city: search.city as string | undefined,
    search: search.search as string | undefined,
    sort: search.sort as string | undefined,
  }),
});

const providerDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/$providerId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProviderDetailPage />
    </Suspense>
  ),
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CategoriesPage />
    </Suspense>
  ),
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/$action",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthPage />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RegisterPage />
    </Suspense>
  ),
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NotFoundPage />
    </Suspense>
  ),
});

// ─── Router ──────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  providerDetailRoute,
  categoriesRoute,
  authRoute,
  registerRoute,
  dashboardRoute,
  adminRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

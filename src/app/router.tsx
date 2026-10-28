import { lazy } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import { MitraLayout } from "@/components/layout/mitra-layout"
import { AdminLayout } from "@/components/layout/admin-layout"

// Lazy page imports
const LandingPage = lazy(() => import("@/pages/public/landing").then((m) => ({ default: m.LandingPage })))
const DiscoveryPage = lazy(() => import("@/pages/events/discovery").then((m) => ({ default: m.DiscoveryPage })))
const EventDetailPage = lazy(() => import("@/pages/events/[slug]").then((m) => ({ default: m.EventDetailPage })))
const CheckoutPage = lazy(() => import("@/pages/checkout/[id]").then((m) => ({ default: m.CheckoutPage })))
const PaymentPage = lazy(() => import("@/pages/checkout/payment").then((m) => ({ default: m.PaymentPage })))
const OrderHistoryPage = lazy(() => import("@/pages/user/order-history").then((m) => ({ default: m.OrderHistoryPage })))
const LoginPage = lazy(() => import("@/pages/auth/login").then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import("@/pages/auth/register").then((m) => ({ default: m.RegisterPage })))
const AccountSettingsPage = lazy(() => import("@/pages/user/account-settings").then((m) => ({ default: m.AccountSettingsPage })))
const PersonalSitePage = lazy(() => import("@/pages/user/[username]").then((m) => ({ default: m.PersonalSitePage })))
const PartnerDashboardPage = lazy(() => import("@/pages/mitra/dashboard").then((m) => ({ default: m.PartnerDashboardPage })))
const PartnerDetailPage = lazy(() => import("@/pages/mitra/[slug]").then((m) => ({ default: m.PartnerDetailPage })))
const MitraAnalyticsPage = lazy(() => import("@/pages/mitra/analytics"))
const MitraParticipantsPage = lazy(() => import("@/pages/mitra/participants"))
const MitraSettingsPage = lazy(() => import("@/pages/mitra/settings"))
const MitraEventsPage = lazy(() => import("@/pages/mitra/events").then((m) => ({ default: m.MitraEventsPage })))
const AdminDashboardPage = lazy(() => import("@/pages/admin/dashboard").then((m) => ({ default: m.AdminDashboardPage })))
const AdminUsersPage = lazy(() => import("@/pages/admin/users").then((m) => ({ default: m.AdminUsersPage })))
const AdminEventsPage = lazy(() => import("@/pages/admin/events").then((m) => ({ default: m.AdminEventsPage })))
const AdminAnalyticsPage = lazy(() => import("@/pages/admin/analytics").then((m) => ({ default: m.AdminAnalyticsPage })))
const AdminSettingsPage = lazy(() => import("@/pages/admin/settings").then((m) => ({ default: m.AdminSettingsPage })))
const NotFoundPage = lazy(() => import("@/pages/system/not-found").then((m) => ({ default: m.NotFoundPage })))
const CoursesDiscoveryPage = lazy(() => import("@/pages/courses/discovery").then((m) => ({ default: m.CoursesDiscoveryPage })))
const CourseDetailPage = lazy(() => import("@/pages/courses/[slug]").then((m) => ({ default: m.CourseDetailPage })))
const LazyMitraNewEvent = lazy(() => import("@/pages/mitra/new-event").then((m) => ({ default: m.MitraNewEventPage })))
const UserDashboardPage = lazy(() => import("@/pages/user/dashboard").then((m) => ({ default: m.UserDashboardPage })))
const PeopleDiscoveryPage = lazy(() => import("@/pages/people/discovery").then((m) => ({ default: m.PeopleDiscoveryPage })))
const PersonProfilePage = lazy(() => import("@/pages/people/[username]").then((m) => ({ default: m.PersonProfilePage })))

function PageSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <PageSkeleton />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "events", element: <DiscoveryPage /> },
      { path: "events/:slug", element: <EventDetailPage /> },
      { path: "courses", element: <CoursesDiscoveryPage /> },
      { path: "courses/:slug", element: <CourseDetailPage /> },
      { path: "people", element: <PeopleDiscoveryPage /> },
      { path: "my/:username", element: <PersonProfilePage /> },
      { path: "my", element: <UserDashboardPage /> },
      { path: "checkout/:id", element: <CheckoutPage /> },
      { path: "checkout/payment/:id", element: <PaymentPage /> },
      { path: "order", element: <OrderHistoryPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "account", element: <AccountSettingsPage /> },
      { path: "u/:username", element: <PersonalSitePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/mitra",
    element: <MitraLayout />,
    children: [
      { index: true, element: <PartnerDashboardPage /> },
      { path: ":slug", element: <PartnerDetailPage /> },
      { path: "analytics", element: <MitraAnalyticsPage /> },
      { path: "participants", element: <MitraParticipantsPage /> },
      { path: "settings", element: <MitraSettingsPage /> },
      { path: "new-event", element: <LazyMitraNewEvent /> },
      { path: "events", element: <MitraEventsPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "events", element: <AdminEventsPage /> },
      { path: "analytics", element: <AdminAnalyticsPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter
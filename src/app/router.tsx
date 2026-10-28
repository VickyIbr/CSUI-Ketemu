import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import { LandingPage } from "@/pages/public/landing"
import { DiscoveryPage } from "@/features/events/discovery"
import { EventDetailPage } from "@/features/events/event-detail"
import { CheckoutPage } from "@/features/checkout/checkout"
import { PaymentPage } from "@/features/checkout/payment"
import { OrderHistoryPage } from "@/pages/user/order-history"
import { LoginPage } from "@/pages/auth/login"
import { RegisterPage } from "@/pages/auth/register"
import { AccountSettingsPage } from "@/pages/user/account-settings"
import { PersonalSitePage } from "@/pages/user/personal-site"
import { PartnerDashboardPage } from "@/pages/mitra/partner-dashboard"
import { NotFoundPage } from "@/pages/system/not-found"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "events", element: <DiscoveryPage /> },
      { path: "events/:slug", element: <EventDetailPage /> },
      { path: "checkout/:id", element: <CheckoutPage /> },
      { path: "payment/:id", element: <PaymentPage /> },
      { path: "order", element: <OrderHistoryPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "account", element: <AccountSettingsPage /> },
      { path: "u/:username", element: <PersonalSitePage /> },
      { path: "mitra", element: <PartnerDashboardPage /> },
      { path: "mitra/:slug", element: <PartnerDashboardPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
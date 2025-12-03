import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "./constants.js";
import { MainLayout } from "../components/layout/MainLayout.jsx";
import { LoginPage } from "../features/auth/pages/LoginPage.jsx";
import { RegisterPage } from "../features/auth/pages/RegisterPage.jsx";
import { SignIn } from "../pages/auth/SignIn.jsx";
import { ForgotPassword } from "../pages/auth/ForgotPassword.jsx";
import { OtpVerification } from "../pages/auth/OtpVerification.jsx";
import { ResetPassword } from "../pages/auth/ResetPassword.jsx";
import { ChatPage } from "../features/chat/components/ChatPage.jsx";
import { GoogleCallback } from "../pages/auth/GoogleCallback.jsx";

import { UsersPage } from "../features/users/pages/UsersPage.jsx";
import { AgentsPage } from "../features/agents/pages/AgentsPage.jsx";
import { DashboardPage } from "../pages/DashboardPage.jsx";
import { RolesPage } from "../features/roles/pages/RolesPage.jsx";
import { TeamUnitsPage } from "../features/team-units/pages/TeamUnitsPage.jsx";
import { PropertyProvider } from "../features/property/context/PropertyContext.jsx";
import { PropertiesList } from "../features/property/components/PropertiesList.jsx";
import { AddPropertyWizard } from "../features/property/components/AddPropertyWizard.jsx";
import { BulkImport } from "../features/property/components/BulkImport.jsx";
import { AssetsRegistry } from "../features/property/components/AssetsRegistry.jsx";
import { ComplianceOverview } from "../features/property/components/ComplianceOverview.jsx";
import { AlertsCenter } from "../features/property/components/AlertsCenter.jsx";
import { SystemConsole } from "../features/property/components/SystemConsole.jsx";
import { SettingsPage } from "../pages/SettingsPage.jsx";
import { TenantsPage } from "../pages/TenantsPage.jsx";
import { MaintenancePage } from "../pages/MaintenancePage.jsx";
import { FilesPage } from "../pages/FilesPage.jsx";
import { CommunicationPage } from "../pages/CommunicationPage.jsx";

export const router = createBrowserRouter([
  // Root redirect to signin
  {
    path: "/",
    element: <Navigate to={ROUTES.SIGNIN} replace />,
  },
  // Auth Pages
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNIN,
    element: <SignIn />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.OTP_VERIFICATION,
    element: <OtpVerification />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.GOOGLE_CALLBACK,
    element: <GoogleCallback />,
  },
  // Routes with MainLayout
  {
    path: ROUTES.DASHBOARD,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: ROUTES.CHAT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ChatPage />,
      },
    ],
  },
  {
    path: ROUTES.USERS,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
    ],
  },
  {
    path: ROUTES.ROLES,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <RolesPage />,
      },
    ],
  },
  {
    path: ROUTES.TEAM_UNITS,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TeamUnitsPage />,
      },
    ],
  },
  {
    path: ROUTES.AGENTS,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <AgentsPage />,
      },
    ],
  },
  {
    path: ROUTES.PROPERTIES,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PropertyProvider>
            <PropertiesList />
            <SystemConsole />
          </PropertyProvider>
        ),
      },
    ],
  },
  {
    path: ROUTES.ADD_PROPERTY,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PropertyProvider>
            <AddPropertyWizard />
            <SystemConsole />
          </PropertyProvider>
        ),
      },
    ],
  },
  {
    path: ROUTES.BULK_IMPORT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PropertyProvider>
            <BulkImport />
            <SystemConsole />
          </PropertyProvider>
        ),
      },
    ],
  },
  {
    path: ROUTES.ASSETS,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PropertyProvider>
            <AssetsRegistry />
            <SystemConsole />
          </PropertyProvider>
        ),
      },
    ],
  },
  {
    path: ROUTES.COMPLIANCE,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PropertyProvider>
            <ComplianceOverview />
            <SystemConsole />
          </PropertyProvider>
        ),
      },
    ],
  },
  {
    path: ROUTES.ALERTS,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PropertyProvider>
            <AlertsCenter />
            <SystemConsole />
          </PropertyProvider>
        ),
      },
    ],
  },
  {
    path: ROUTES.SETTINGS,
    element: (
        <MainLayout />
    ),
    children: [
      {
        index: true,
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/Tentants",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TenantsPage />,
      },
    ],
  },
  {
    path: "/Maintenance",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MaintenancePage />,
      },
    ],
  },
  {
    path: "/Files",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <FilesPage />,
      },
    ],
  },
  {
    path: "/Communication",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CommunicationPage />,
      },
    ],
  },
  // Catch-all redirect
  {
    path: "*",
    element: <Navigate to={ROUTES.SIGNIN} replace />,
  },
]);

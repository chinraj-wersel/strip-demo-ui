import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar.jsx";
import { Header } from "./Header.jsx";
import { MobileMenu } from "./MobileMenu.jsx";
import { useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";

export const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isMobile } = useResponsive();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="stripe-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        className="hidden lg:flex"
        onNavigate={() => setMobileOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
      />

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />

      <Header
        onMenuClick={() => setMobileOpen(true)}
        onSidebarToggle={() => setSidebarCollapsed((prev) => !prev)}
        sidebarCollapsed={sidebarCollapsed}
      />

      <div
        className={cn(
          "stripe-main-container",
          sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
        )}
      >
        <main className="stripe-main-content">
          <div className="stripe-content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

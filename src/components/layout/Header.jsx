import { useEffect, useState, useRef } from "react";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  Plus,
  Grid3X3,
  Settings,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export const Header = ({ onMenuClick, onSidebarToggle, sidebarCollapsed }) => {
  const [mounted, setMounted] = useState(false);
  const [testMode, setTestMode] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* ============================================
          TEST MODE BANNER - EXACT STRIPE MATCH
          Height: 40px | Background: #ff5722
          ============================================ */}
      <div className="stripe-test-banner">
        <span className="test-mode-label">Test mode</span>
        <span className="test-mode-message">
          You're using test data. To accept payments, complete your business profile.
        </span>
        <a href="#" className="test-mode-link">
          Complete profile
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ============================================
          MAIN HEADER - EXACT STRIPE MATCH
          Height: 56px | Background: #ffffff
          ============================================ */}
      <header
        className={cn(
          "stripe-header",
          sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
        )}
      >
        <div className="stripe-header-inner">
          {/* LEFT SECTION */}
          <div className="stripe-header-left">
            {/* Hamburger Menu - Mobile only */}
            <button
              type="button"
              onClick={onMenuClick}
              className="stripe-mobile-menu-btn"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar - EXACT Stripe style */}
            <div className="stripe-header-search">
              <Search className="stripe-search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="stripe-search-input"
              />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="stripe-header-right">
            {/* Test Mode Toggle - EXACT Stripe toggle */}
            

            {/* Apps Grid Icon */}
            <button className="stripe-header-icon-btn" aria-label="Apps">
              <Grid3X3 className="w-[18px] h-[18px]" />
            </button>

            {/* Help Icon */}
            <button className="stripe-header-icon-btn" aria-label="Help">
              <HelpCircle className="w-[18px] h-[18px]" />
            </button>

            {/* Notifications Bell Icon */}
            <button className="stripe-header-icon-btn" aria-label="Notifications">
              <Bell className="w-[18px] h-[18px]" />
            </button>

            {/* Settings Icon */}
            <button className="stripe-header-icon-btn" aria-label="Settings">
              <Settings className="w-[18px] h-[18px]" />
            </button>

            {/* Add New Button - Purple circle */}
            <button className="stripe-add-btn" aria-label="Add new">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </button>

            {/* Setup Guide Button with Progress Ring */}
            <button className="stripe-setup-btn">
              <span>Setup guide</span>
              <div className="setup-progress">
                <svg className="progress-ring" viewBox="0 0 20 20">
                  <circle
                    className="progress-ring-bg"
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    strokeWidth="2"
                  />
                  <circle
                    className="progress-ring-fill"
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="50.27"
                    strokeDashoffset="25.13"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

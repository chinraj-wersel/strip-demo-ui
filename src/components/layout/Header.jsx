import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  Plus,
  Settings,
  ExternalLink,
  FileText,
  RefreshCw,
  Link2,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { SetupGuide } from "./SetupGuide";
import { Assistant } from "./Assistant";
import { ROUTES } from "@/app/constants";

export const Header = ({ onMenuClick, onSidebarToggle, sidebarCollapsed }) => {
  const [mounted, setMounted] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationTab, setNotificationTab] = useState('unread');
  const addMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close add menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target)) {
        setShowAddMenu(false);
      }
    };
    if (showAddMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddMenu]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const addMenuItems = [
    { icon: FileText, label: 'Invoice', shortcut: 'c i', link: '/invoices/new' },
    { icon: RefreshCw, label: 'Subscription', shortcut: 'c s', link: '/subscriptions/new' },
    { icon: Link2, label: 'Payment link', shortcut: 'c l', link: '/payment-links/new' },
    { icon: CreditCard, label: 'Payment', shortcut: 'c p', link: '/payments/new' },
  ];

  return (
    <>
      {/* ============================================
          TEST MODE BANNER - EXACT STRIPE MATCH
          Height: 40px | Background: #ff5722
          ============================================ */}
      {/* <div className="stripe-test-banner">
        <span className="test-mode-label">Test mode</span>
        <span className="test-mode-message">
          You're using test data. To accept payments, complete your business profile.
        </span>
        <a href="#" className="test-mode-link">
          Complete profile
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div> */}

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
            {/* Apps Grid Icon - Stripe style 2x2 grid with plus */}
            <button className="stripe-header-icon-btn stripe-apps-btn" aria-label="Apps">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 2x2 Grid of rounded squares */}
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
                {/* Plus sign badge */}
                <circle cx="15" cy="3" r="3" fill="#635bff"/>
                <path d="M15 1.5V4.5M13.5 3H16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Help Icon */}
            <button 
              className={cn("stripe-header-icon-btn", showAssistant && "active")}
              aria-label="Help"
              onClick={() => setShowAssistant(!showAssistant)}
            >
              <HelpCircle className="w-[18px] h-[18px]" />
            </button>

            {/* Notifications Bell Icon with Popup */}
            <div className="stripe-notifications-wrapper" ref={notificationsRef}>
              <button 
                className={cn("stripe-header-icon-btn", showNotifications && "active")}
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-[18px] h-[18px]" />
              </button>

              {/* Notifications Popup */}
              {showNotifications && (
                <div className="stripe-notifications-popup">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button className="notifications-preferences-btn">View preferences</button>
                  </div>
                  
                  <div className="notifications-tabs">
                    <button 
                      className={cn("notifications-tab", notificationTab === 'unread' && "active")}
                      onClick={() => setNotificationTab('unread')}
                    >
                      Unread
                    </button>
                    <button 
                      className={cn("notifications-tab", notificationTab === 'all' && "active")}
                      onClick={() => setNotificationTab('all')}
                    >
                      All
                    </button>
                  </div>

                  <div className="notifications-content">
                    <p className="notifications-empty-title">You're all up to date</p>
                    <p className="notifications-empty-text">There are no new notifications at the moment.</p>
                  </div>

                  <div className="notifications-footer">
                    <Link to="/notifications" className="notifications-view-all" onClick={() => setShowNotifications(false)}>
                      View all
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Icon */}
            <button 
              className="stripe-header-icon-btn" 
              aria-label="Settings"
              onClick={() => navigate(ROUTES.SETTINGS)}
            >
              <Settings className="w-[18px] h-[18px]" />
            </button>

            {/* Add New Button - Purple circle with dropdown */}
            <div className="stripe-add-wrapper" ref={addMenuRef}>
              <button 
                className={cn("stripe-add-btn", showAddMenu && "active")}
                aria-label="Add new"
                onClick={() => setShowAddMenu(!showAddMenu)}
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </button>

              {/* Add Menu Popup */}
              {showAddMenu && (
                <div className="stripe-add-menu">
                  {addMenuItems.map((item, index) => (
                    <Link 
                      key={index} 
                      to={item.link}
                      className="stripe-add-menu-item"
                      onClick={() => setShowAddMenu(false)}
                    >
                      <item.icon className="stripe-add-menu-icon" />
                      <span className="stripe-add-menu-label">{item.label}</span>
                      <span className="stripe-add-menu-shortcut">{item.shortcut}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Setup Guide Button with Progress Ring */}
            <button 
              className={cn("stripe-setup-btn", showSetupGuide && "active")}
              onClick={() => setShowSetupGuide(!showSetupGuide)}
            >
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

      {/* Setup Guide Popup */}
      <SetupGuide 
        isOpen={showSetupGuide} 
        onClose={() => setShowSetupGuide(false)} 
      />

      {/* Assistant Chat Popup */}
      <Assistant
        isOpen={showAssistant}
        onClose={() => setShowAssistant(false)}
      />
    </>
  );
};

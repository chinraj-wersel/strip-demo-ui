import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/app/constants";
import {
  Home,
  Wallet,
  ArrowLeftRight,
  Users,
  Package,
  FileText,
  CreditCard,
  Receipt,
  BarChart3,
  MoreHorizontal,
  Code2,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  Plus,
  Settings,
  Building2,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import "./Sidebar.css";

const NAVIGATION = [
  {
    label: "MAIN",
    items: [
      {
        title: "Dashboard",
        icon: Home,
        href: ROUTES.DASHBOARD,
      },
      {
        title: "Properties",
        icon: Building2,
        href: ROUTES.PROPERTIES,
      },
      {
        title: "Balances",
        icon: Wallet,
        href: ROUTES.ASSETS,
      },
      {
        title: "Transactions",
        icon: ArrowLeftRight,
        href: ROUTES.COMPLIANCE,
      },
      {
        title: "Customers",
        icon: Users,
        href: ROUTES.USERS || "/users",
      },
      {
        title: "Product catalog",
        icon: Package,
        href: "/products",
      },
    ],
  },
  {
    label: "Shortcuts",
    items: [
      {
        title: "Billing overview",
        icon: FileText,
        href: ROUTES.ALERTS,
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        title: "Payments",
        icon: CreditCard,
        href: "#",
        children: [
          { title: "Payment links", href: "#" },
          { title: "Invoices", href: "#" },
          { title: "Checkout", href: "#" },
        ],
      },
      {
        title: "Billing",
        icon: Receipt,
        href: "#",
        children: [
          { title: "Subscriptions", href: "#" },
          { title: "Pricing tables", href: "#" },
          { title: "Customer portal", href: "#" },
        ],
      },
      {
        title: "Reporting",
        icon: BarChart3,
        href: "#",
        children: [
          { title: "Reports", href: "#" },
          { title: "Revenue recognition", href: "#" },
        ],
      },
      {
        title: "More",
        icon: MoreHorizontal,
        href: "#",
        children: [
          { title: "Connect", href: "#" },
          { title: "Identity", href: "#" },
          { title: "Radar", href: "#" },
        ],
      },
    ],
  },
];

// Tooltip Component for collapsed state
const Tooltip = ({ children, text, collapsed }) => {
  if (!collapsed) return children;

  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip-content">{text}</div>
    </div>
  );
};

// Business Selector Component
const BusinessSelector = ({ collapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (collapsed) {
    return (
      <Tooltip text="New business" collapsed={collapsed}>
        <div className="business-selector collapsed">
          <button className="business-avatar-btn">
            <div className="business-avatar">
              <span>N</span>
            </div>
          </button>
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="business-selector" ref={dropdownRef}>
      <button
        className="business-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="business-avatar">
          <span>N</span>
        </div>
        <span className="business-name">New business</span>
        <ChevronDown className={`business-chevron ${isOpen ? 'open' : ''}`} />
      </button>
      {isOpen && (
        <div className="business-dropdown">
          <div className="business-dropdown-item active">
            <div className="business-avatar small">
              <span>N</span>
            </div>
            <span>New business</span>
          </div>
          <div className="business-dropdown-divider" />
          <button className="business-dropdown-item add-new">
            <Plus className="w-4 h-4" />
            <span>New account</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Search Component
const SidebarSearch = ({ collapsed }) => {
  if (collapsed) {
    return (
      <Tooltip text="Search" collapsed={collapsed}>
        <button className="sidebar-search collapsed">
          <Search className="sidebar-search-icon" />
        </button>
      </Tooltip>
    );
  }

  return (
    <div className="sidebar-search">
      <Search className="sidebar-search-icon" />
      <span className="sidebar-search-placeholder">Search</span>
    </div>
  );
};

// Navigation Link Component
const NavLink = ({ item, active, onNavigate, collapsed, hasChildren, isExpanded, onToggle }) => {
  const Icon = item.icon;

  const content = hasChildren ? (
    <button
      type="button"
      onClick={onToggle}
      className={`stripe-nav-link ${active ? "active" : ""} ${collapsed ? "collapsed" : ""} ${hasChildren ? "has-children" : ""}`}
    >
      <Icon className="stripe-nav-icon" />
      {!collapsed && (
        <>
          <span className="stripe-nav-text">{item.title}</span>
          <ChevronDown className={`stripe-nav-chevron ${isExpanded ? 'open' : ''}`} />
        </>
      )}
    </button>
  ) : (
    <Link
      to={item.href}
      onClick={onNavigate}
      className={`stripe-nav-link ${active ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <Icon className="stripe-nav-icon" />
      {!collapsed && <span className="stripe-nav-text">{item.title}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip text={item.title} collapsed={collapsed}>
        {content}
      </Tooltip>
    );
  }

  return content;
};

// Sub Link Component
const SubLink = ({ child, active, onNavigate, collapsed }) => {
  return (
    <Link
      to={child.href}
      onClick={onNavigate}
      className={`stripe-sublink ${active ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <span className="stripe-sublink-text">{child.title}</span>
    </Link>
  );
};

// Menu Item Wrapper Component
const MenuItemWrapper = ({ item, location, collapsed, openItems, toggleAccordion, handleNavigate }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = openItems.has(item.title);

  return (
    <div className="stripe-item-wrapper">
      <NavLink
        item={item}
        active={location.pathname === item.href || (hasChildren && item.children?.some(child => location.pathname === child.href))}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        onToggle={() => toggleAccordion(item.title)}
      />
      {hasChildren && isExpanded && !collapsed && (
        <div className="stripe-sublinks">
          {item.children.map((child) => (
            <SubLink
              key={child.title}
              child={child}
              active={location.pathname === child.href}
              onNavigate={handleNavigate}
              collapsed={collapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({
  className = "",
  onNavigate,
  showCloseButton = false,
  onClose,
  collapsed = false,
  onToggleCollapse,
  variant = "desktop",
}) => {
  const location = useLocation();
  const [openItems, setOpenItems] = useState(new Set());

  const navSections = useMemo(() => {
    return NAVIGATION;
  }, []);

  // Initialize open items based on current pathname
  useEffect(() => {
    const newOpenItems = new Set();
    navSections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children) {
          const hasActiveChild = item.children.some(
            (child) => location.pathname === child.href
          );
          const isParentActive = location.pathname === item.href;
          if (hasActiveChild || isParentActive) {
            newOpenItems.add(item.title);
          }
        }
      });
    });
    setOpenItems(newOpenItems);
  }, [location.pathname, navSections]);

  const toggleAccordion = (itemTitle) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  const handleNavigate = () => {
    if (typeof onNavigate === "function") {
      onNavigate();
    }
  };

  const sidebarClasses = `stripe-sidebar ${collapsed ? "collapsed" : "expanded"} ${className}`.trim();

  return (
    <aside
      className={sidebarClasses}
      data-collapsed={collapsed || undefined}
      data-variant={variant}
    >
      {/* Business Selector */}
      <BusinessSelector collapsed={collapsed} />

      {/* Search */}
      <SidebarSearch collapsed={collapsed} />

      {/* Navigation */}
      <div className={`stripe-sidebar-scroll ${collapsed ? "collapsed" : ""}`}>
        <div className="stripe-sidebar-sections">
          {navSections.map((section, sectionIndex) => (
            <div key={section.label} className="stripe-sidebar-section">
              {!collapsed && section.label !== "MAIN" && (
                <p className="stripe-section-label">{section.label}</p>
              )}
              <div className="stripe-nav-links">
                {section.items.map((item) => (
                  <MenuItemWrapper
                    key={item.title}
                    item={item}
                    location={location}
                    collapsed={collapsed}
                    openItems={openItems}
                    toggleAccordion={toggleAccordion}
                    handleNavigate={handleNavigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Developers Section at Bottom */}
        <div className="stripe-developers-section">
          {collapsed ? (
            <Tooltip text="Developers" collapsed={collapsed}>
              <Link to="#" className="stripe-nav-link developers collapsed">
                <Code2 className="stripe-nav-icon" />
              </Link>
            </Tooltip>
          ) : (
            <Link to="#" className="stripe-nav-link developers">
              <Code2 className="stripe-nav-icon" />
              <span className="stripe-nav-text">Developers</span>
            </Link>
          )}
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <div className="stripe-sidebar-toggle">
        <button
          className="stripe-toggle-btn"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="stripe-toggle-icon" />
          ) : (
            <PanelLeftClose className="stripe-toggle-icon" />
          )}
        </button>
      </div>
    </aside>
  );
};

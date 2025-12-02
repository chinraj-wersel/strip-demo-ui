import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/app/constants";
import { useToast } from "@/hooks/use-toast";
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
  DollarSign,
  Wrench,
  Folder,
  MessageSquare,
  HelpCircle,
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
        title: "Properties & Units",
        icon: Building2,
        href: ROUTES.PROPERTIES,
        children: [
          { title: "All Properties", href: "/properties/all" },
          { title: "Units", href: "/properties/units" },
          { title: "Property Groups", href: "/properties/groups" },
          { title: "Property Types", href: "/properties/types" },
          { title: "Amenities", href: "/properties/amenities" },
          { title: "Property Documents", href: "/properties/documents" },
          { title: "Property Settings", href: "/properties/settings" },
        ],
      },
      {
        title: "Financials",
        icon: DollarSign,
        href: ROUTES.ASSETS,
      },
      {
        title: "Tenants",
        icon: Users,
        href: ROUTES.USERS || "/users",
      },
      {
        title: "Maintenance",
        icon: Wrench,
        href: "/maintenance",
      },
      {
        title: "Files",
        icon: Folder,
        href: "/files",
      },
      {
        title: "Communication",
        icon: MessageSquare,
        href: "/communication",
      },
    ],
  },
];
 
// Tooltip Component for collapsed state
const Tooltip = ({ children, text, collapsed }) => {
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const wrapperRef = useRef(null);
 
  useEffect(() => {
    if (!collapsed && wrapperRef.current) {
      const updatePosition = () => {
        if (wrapperRef.current) {
          const rect = wrapperRef.current.getBoundingClientRect();
          setTooltipPosition({
            left: rect.right + 12,
            top: rect.top + rect.height / 2,
          });
        }
      };
 
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
 
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [collapsed]);
 
  if (!collapsed) return children;
 
  return (
    <div
      className="tooltip-wrapper"
      ref={wrapperRef}
      onMouseEnter={() => {
        if (wrapperRef.current) {
          const rect = wrapperRef.current.getBoundingClientRect();
          setTooltipPosition({
            left: rect.right + 12,
            top: rect.top + rect.height / 2,
          });
        }
      }}
    >
      {children}
      {tooltipPosition && (
        <div
          className="tooltip-content"
          style={{
            left: `${tooltipPosition.left}px`,
            top: `${tooltipPosition.top}px`,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};
 
// Inline Toast Component for menu items
const InlineToast = ({ message, position, onClose }) => {
  if (!message) return null;
 
  return (
    <div
      className="inline-toast"
      style={{
        position: 'fixed',
        left: `${position.right + 10}px`,
        top: `${position.top}px`,
        zIndex: 9999,
        backgroundColor: 'var(--background)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '8px 12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        animation: 'fadeIn 0.2s ease-in',
      }}
    >
      {message}
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
const NavLink = ({ item, active, onNavigate, collapsed, hasChildren, isExpanded, onToggle, onMenuClick }) => {
  const Icon = item.icon;
  const linkRef = useRef(null);
 
  const handleClick = (e) => {
    if (onMenuClick && linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      onMenuClick(item.title, rect);
    }
    if (onNavigate) {
      onNavigate();
    }
  };
 
  const content = hasChildren ? (
    <Link
      ref={linkRef}
      to={item.href}
      onClick={(e) => {
        if (onMenuClick && linkRef.current) {
          const rect = linkRef.current.getBoundingClientRect();
          onMenuClick(item.title, rect);
        }
        if (onNavigate) {
          onNavigate();
        }
      }}
      className={`stripe-nav-link ${active ? "active" : ""} ${collapsed ? "collapsed" : ""} ${hasChildren ? "has-children" : ""}`}
    >
      <Icon className="stripe-nav-icon" />
      {!collapsed && (
        <>
          <span className="stripe-nav-text">{item.title}</span>
          <ChevronRight className="stripe-nav-chevron" style={{ width: '16px', height: '16px', marginLeft: 'auto' }} />
        </>
      )}
    </Link>
  ) : (
    <Link
      ref={linkRef}
      to={item.href}
      onClick={handleClick}
      className={`stripe-nav-link ${active ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <Icon className="stripe-nav-icon" />
      {!collapsed && <span className="stripe-nav-text">{item.title}</span>}
    </Link>
  );
 
  // Don't show tooltip if item has children (submenu) - dropdown will show instead
  if (collapsed && !hasChildren) {
    return (
      <Tooltip text={item.title} collapsed={collapsed}>
        {content}
      </Tooltip>
    );
  }
 
  return content;
};
 
// Sub Link Component
const SubLink = ({ child, active, onNavigate, collapsed, onMenuClick }) => {
  const linkRef = useRef(null);
 
  const handleClick = (e) => {
    if (onMenuClick && linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      onMenuClick(child.title, rect);
    }
    if (onNavigate) {
      onNavigate();
    }
  };
 
  return (
    <Link
      ref={linkRef}
      to={child.href}
      onClick={handleClick}
      className={`stripe-sublink ${active ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <span className="stripe-sublink-text">{child.title}</span>
    </Link>
  );
};
 
// Menu Item Wrapper Component
const MenuItemWrapper = ({ item, location, collapsed, openItems, toggleAccordion, handleNavigate, onMenuClick }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = openItems.has(item.title);
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
 
  useEffect(() => {
    if (isHovered && wrapperRef.current && hasChildren) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.top,
        left: rect.right,
      });
    }
  }, [isHovered, hasChildren, collapsed]);
 
  return (
    <div
      className="stripe-item-wrapper"
      ref={wrapperRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink
        item={item}
        active={location.pathname === item.href || (hasChildren && item.children?.some(child => location.pathname === child.href))}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        onToggle={() => toggleAccordion(item.title)}
        onMenuClick={onMenuClick}
      />
      {/* Hover dropdown menu - works in both expanded and collapsed states */}
      {hasChildren && isHovered && (
        <div
          className="stripe-hover-dropdown"
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.children.map((child) => (
            <Link
              key={child.title}
              to={child.href}
              onClick={(e) => {
                if (onMenuClick && wrapperRef.current) {
                  const rect = wrapperRef.current.getBoundingClientRect();
                  onMenuClick(child.title, rect);
                }
                if (handleNavigate) {
                  handleNavigate();
                }
              }}
              className={`stripe-dropdown-item ${location.pathname === child.href ? 'active' : ''}`}
            >
              {child.title}
            </Link>
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
  const { toast } = useToast();
  const [inlineToast, setInlineToast] = useState({ message: null, position: null });
 
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
 
  const handleMenuClick = (menuTitle, rect) => {
    if (rect) {
      // Show inline toast near the clicked icon
      // setInlineToast({
      //   message: `Navigating to ${menuTitle}`,
      //   position: rect,
      // });
     
      // Hide toast after 2 seconds
      setTimeout(() => {
        setInlineToast({ message: null, position: null });
      }, 2000);
    } else {
      // Fallback to default toast
      // toast({
      //   title: "Navigation",
      //   description: `Navigating to ${menuTitle}`,
      // });
    }
  };
 
  const sidebarClasses = `stripe-sidebar ${collapsed ? "collapsed" : "expanded"} ${className}`.trim();
 
  return (
    <>
      {inlineToast.message && (
        <InlineToast
          message={inlineToast.message}
          position={inlineToast.position}
          onClose={() => setInlineToast({ message: null, position: null })}
        />
      )}
      <aside
        className={sidebarClasses}
        data-collapsed={collapsed || undefined}
        data-variant={variant}
      >
      {/* Business Selector */}
      <BusinessSelector collapsed={collapsed} />
 
      {/* Search */}
      {/* <SidebarSearch collapsed={collapsed} /> */}
 
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
                    onMenuClick={handleMenuClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
 
        {/* Help Section at Bottom */}
        <div className="stripe-developers-section">
          {collapsed ? (
            <Tooltip text="Help" collapsed={collapsed}>
              <Link
                to="#"
                className="stripe-nav-link developers collapsed"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleMenuClick("Help", rect);
                }}
              >
                <HelpCircle className="stripe-nav-icon" />
              </Link>
            </Tooltip>
          ) : (
            <Link
              to="#"
              className="stripe-nav-link developers"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                handleMenuClick("Help", rect);
              }}
            >
              <HelpCircle className="stripe-nav-icon" />
              <span className="stripe-nav-text">Help</span>
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
    </>
  );
};
 
 
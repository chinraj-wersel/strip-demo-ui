import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/app/constants";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Switch } from "@/components/ui/switch";
import {
  LayoutGrid,
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
  ChevronsLeft,
  Search,
  Plus,
  Settings,
  Building2,
  DollarSign,
  Wrench,
  Folder,
  MessageSquare,
  HelpCircle,
  LogOut,
  Info,
  User,
} from "lucide-react";
import "./Sidebar.css";
 
const NAVIGATION = [
  {
    label: "MAIN",
    items: [
      {
        title: "Dashboard",
        icon: LayoutGrid,
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
        icon: FileText,
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
 
// Toggle Button with Toast Component
const ToggleButtonWithToast = ({ collapsed, onToggleCollapse }) => {
  const { toast } = useToast();

  const handleMouseEnter = () => {
    toast({
      title: collapsed ? "Expand sidebar" : "Collapse sidebar",
      // description: collapsed ? "Click to expand the sidebar" : "Click to collapse the sidebar",
    });
  };

  return (
    <button
      className={`xperty-toggle-btn ${collapsed ? "collapsed" : ""}`}
      onClick={onToggleCollapse}
      onMouseEnter={handleMouseEnter}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <ChevronsLeft className="xperty-toggle-icon" />
    </button>
  );
};

// Business Selector Component
const BusinessSelector = ({ collapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testMode, setTestMode] = useState(true);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 13,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const handleSignOut = () => {
    logout();
    setIsOpen(false);
  };

  const userName = user ? `${user.first_name || 'VIGNESH'} ${user.last_name || 'M'}` : 'VIGNESH M';

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
        ref={buttonRef}
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
        <div 
          className="business-dropdown"
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width:"220px",
          }}
        >
          {/* Business Header */}
          <div className="business-dropdown-header">
            <div className="business-dropdown-avatar">
              <span>NB</span>
            </div>
            <div className="business-dropdown-name">New business</div>
          </div>

          {/* Exit Test Mode Button */}
          {/* {testMode && (
            <button className="business-exit-test-mode" onClick={() => setTestMode(false)}>
              Exit test mode
            </button>
          )} */}

          {/* Menu Options */}
          <div className="business-dropdown-menu">
            <Link 
              to={ROUTES.SETTINGS} 
              className="business-dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            {/* <div className="business-dropdown-item business-dropdown-toggle">
              <span>Test mode</span>
              <Switch
                checked={testMode}
                onCheckedChange={setTestMode}
                className="data-[state=checked]:bg-[#ff5722]"
              />
            </div> */}

            {/* <button className="business-dropdown-item">
              <Plus className="w-4 h-4" />
              <span>Create account</span>
            </button> */}
          </div>

          {/* Separator */}
          <div className="business-dropdown-divider" />

          {/* User Actions */}
          <div className="business-dropdown-menu">
            <div className="business-dropdown-item business-dropdown-user">
              <User className="w-4 h-4" />
              <span>{userName}</span>
              <Info className="w-3.5 h-3.5 text-slate-400 ml-auto" />
            </div>

            <button className="business-dropdown-item" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
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
      className={`xperty-nav-link ${active ? "active" : ""} ${collapsed ? "collapsed" : ""} ${hasChildren ? "has-children" : ""}`}
    >
      <Icon className="xperty-nav-icon" />
      {!collapsed && (
        <>
          <span className="xperty-nav-text">{item.title}</span>
          <ChevronRight className="xperty-nav-chevron" style={{ width: '16px', height: '16px', marginLeft: 'auto' }} />
        </>
      )}
    </Link>
  ) : (
    <Link
      ref={linkRef}
      to={item.href}
      onClick={handleClick}
      className={`xperty-nav-link ${active ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <Icon className="xperty-nav-icon" />
      {!collapsed && <span className="xperty-nav-text">{item.title}</span>}
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
      className={`xperty-sublink ${active ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <span className="xperty-sublink-text">{child.title}</span>
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
      className="xperty-item-wrapper"
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
          className="xperty-hover-dropdown"
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
              className={`xperty-dropdown-item ${location.pathname === child.href ? 'active' : ''}`}
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
 
  const sidebarClasses = `xperty-sidebar ${collapsed ? "collapsed" : "expanded"} ${className}`.trim();
 
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
        {/* Main Wrapper Div */}
        <div className="xperty-sidebar-main">
          {/* Sidebar Content */}
          <div className="xperty-sidebar-content">
            {/* Business Selector */}
            <BusinessSelector collapsed={collapsed} />

            {/* Search */}
            {/* <SidebarSearch collapsed={collapsed} /> */}

            {/* Navigation */}
            <div className={`xperty-sidebar-scroll ${collapsed ? "collapsed" : ""}`}>
              <div className="xperty-sidebar-sections">
                {navSections.map((section, sectionIndex) => (
                  <div key={section.label} className="xperty-sidebar-section">
                    {!collapsed && section.label !== "MAIN" && (
                      <p className="xperty-section-label">{section.label}</p>
                    )}
                    <div className="xperty-nav-links">
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
            </div>

            {/* Help Section at Bottom */}
            <div className="xperty-developers-section">
              {collapsed ? (
                <Tooltip text="Help" collapsed={collapsed}>
                  <Link
                    to="#"
                    className="xperty-nav-link developers collapsed"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      handleMenuClick("Help", rect);
                    }}
                  >
                    <HelpCircle className="xperty-nav-icon" />
                  </Link>
                </Tooltip>
              ) : (
                <Link
                  to="#"
                  className="xperty-nav-link developers"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleMenuClick("Help", rect);
                  }}
                >
                  <HelpCircle className="xperty-nav-icon" />
                  <span className="xperty-nav-text">Help</span>
                </Link>
              )}
            </div>
          </div>

          {/* Collapse Toggle Button - Right Edge */}
          <div className="xperty-sidebar-toggle">
            <ToggleButtonWithToast
              collapsed={collapsed}
              onToggleCollapse={onToggleCollapse}
            />
          </div>
        </div>
      </aside>
    </>
  );
};
 
 
import React from 'react';
import {
  User,
  Mail,
  Terminal,
  Store,
  Lock,
  Gauge,
  FileText,
  FlaskConical,
  Star,
  Receipt,
  Landmark,
  Wallet,
  Shield,
  Code2,
  Plus,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './SettingsPage.css';

const SettingsItem = ({ icon: Icon, title, description, to = "#", isSpecial = false }) => (
  <Link to={to} className={`settings-item ${isSpecial ? 'special' : ''}`}>
    <div className={`settings-item-icon ${isSpecial ? 'special' : ''}`}>
      <Icon className="settings-icon-svg" />
    </div>
    <div className="settings-item-content">
      <h2 className="settings-item-title">{title}</h2>
      <p className="settings-item-description">{description}</p>
    </div>
  </Link>
);

const SettingsSection = ({ title, children }) => (
  <div className="settings-section">
    {title && <h2 className="settings-section-title"><span>{title}</span></h2>}
    <div className="settings-section-grid">
      {children}
    </div>
  </div>
);

export const SettingsPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-content">
        {/* Personal settings */}
        <SettingsSection title="Personal settings">
          <SettingsItem
            icon={User}
            title="Personal details"
            description="Contact information, password, authentication methods, and your active sessions."
          />
          <SettingsItem
            icon={Mail}
            title="Communication preferences"
            description="Customize the emails, SMS, and push notifications you receive."
          />
          <SettingsItem
            icon={Terminal}
            title="Developers"
            description="Workbench, developer tools, and more."
          />
        </SettingsSection>

        {/* Account settings */}
        <SettingsSection title="Account settings">
          <SettingsItem
            icon={Store}
            title="Business"
            description="Account details, account health, public info, payouts, legal entity, custom domains, and more."
          />
          <SettingsItem
            icon={Lock}
            title="Team and security"
            description="Team members, roles, account security, authorized apps, and shared resources."
          />
          <SettingsItem
            icon={Gauge}
            title="Your plans"
            description="Manage how you pay for Stripe services."
          />
          <SettingsItem
            icon={FileText}
            title="Compliance and documents"
            description="PCI compliance, documents, and legacy exports."
          />
          <SettingsItem
            icon={FlaskConical}
            title="Account features and previews"
            description="View your account features and product previews."
          />
          <SettingsItem
            icon={Star}
            title="Perks"
            description="Discounts on tools to run your startup."
          />
        </SettingsSection>

        {/* Product settings */}
        <SettingsSection title="Product settings">
          <SettingsItem
            icon={Receipt}
            title="Billing"
            description="Subscriptions, invoices, quotes, and customer portal."
          />
          <SettingsItem
            icon={Landmark}
            title="Financial Connections"
            description="Appearance, featured institutions, optimizations, and usage details."
          />
          <SettingsItem
            icon={Wallet}
            title="Payments"
            description="Checkout, payment methods, currency conversion, and more."
          />
          <SettingsItem
            icon={Shield}
            title="Radar"
            description="Manage fraud protection and customization capabilities for your account."
          />
          <SettingsItem
            icon={Code2}
            title="Sigma"
            description="Manage your Sigma features."
          />
          <SettingsItem
            icon={Plus}
            title="Discover more features"
            description="Boost revenue, manage finances, and more."
            isSpecial={true}
          />
        </SettingsSection>

        {/* Footer Links */}
        <div className="settings-footer">
          <button className="settings-footer-link">Share feedback</button>
          <span className="settings-footer-separator">·</span>
          <button className="settings-footer-link">Keyboard shortcuts</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Building2, 
  Building, 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  Play,
  Star,
  Zap,
  BarChart3,
  FileCheck,
  Users,
  Clock,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/app/constants";

// Landlord profile types with features
const LANDLORD_PROFILES = {
  individual: {
    id: 'individual',
    label: 'Individual Landlord',
    icon: Home,
    features: [
      'Step-by-step compliance guidance',
      'Simple tenant onboarding wizard',
      'Automated AST & deposit protection',
      'Peace of mind with document vault'
    ],
    cta: 'Start with my first tenancy'
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio Builder',
    icon: Building2,
    features: [
      'Bulk property management tools',
      'Portfolio-wide compliance tracking',
      'Advanced analytics & reporting',
      'Multi-property tenant management'
    ],
    cta: 'Scale my portfolio'
  },
  institutional: {
    id: 'institutional',
    label: 'Institutional PM',
    icon: Building,
    features: [
      'Enterprise-grade security & compliance',
      'Custom workflow automation',
      'Dedicated account management',
      'API integration & white-label options'
    ],
    cta: 'Request enterprise demo'
  },
  compliance: {
    id: 'compliance',
    label: 'Compliance-First',
    icon: Shield,
    features: [
      'Automated compliance monitoring',
      'Certificate expiration alerts',
      'Regulatory requirement tracking',
      'Audit-ready documentation'
    ],
    cta: 'Ensure my compliance'
  }
};

export const LandingPage = () => {
  const [selectedProfile, setSelectedProfile] = useState('individual');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const currentProfile = LANDLORD_PROFILES[selectedProfile];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Xperty
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <a href="#features" className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                Features
              </a>
              <a href="#profiles" className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                Solutions
              </a>
              <a href="#pricing" className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                Pricing
              </a>
              <a href="#testimonials" className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                Testimonials
              </a>
            </nav>
            
            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium"
                onClick={() => navigate(ROUTES.SIGNIN)}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-4 px-4">
            <nav className="flex flex-col gap-2">
              <a href="#features" className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Features</a>
              <a href="#profiles" className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Solutions</a>
              <a href="#pricing" className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Pricing</a>
            </nav>
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button variant="outline" className="w-full" onClick={() => navigate(ROUTES.SIGNIN)}>Sign In</Button>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600" onClick={() => navigate(ROUTES.REGISTER)}>Start Free Trial</Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-28 lg:pt-40 pb-20 lg:pb-32 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              Property management,
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                tailored to your kind of landlord.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              See all your properties in one live portfolio dashboard. Automate compliance, manage tenants, and grow your rental business with confidence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="h-14 px-8 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-base"
                onClick={() => navigate(ROUTES.SIGNIN)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-400">4.9/5 from 2,000+ reviews</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-500">No credit card required • 14-day free trial • Cancel anytime</p>
            </div>
          </div>

        </div>
      </section>


      {/* Profile Selection Section */}
      <section id="profiles" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 rounded-full text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-4">
              Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              Select your property management profile
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Choose the option that best describes your property management needs
            </p>
          </div>
          
          {/* Profile Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.values(LANDLORD_PROFILES).map((profile) => {
              const Icon = profile.icon;
              const isSelected = selectedProfile === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-full border-2 transition-all text-sm font-medium ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {profile.label}
                </button>
              );
            })}
          </div>
          
          {/* Features Card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 lg:p-10 shadow-xl shadow-slate-900/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentProfile.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                <Button 
                  size="lg"
                  className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/25"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  {currentProfile.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 rounded-full text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-4">
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Everything you need to manage properties
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              From compliance tracking to tenant management, we provide all the tools you need to run a successful rental business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: BarChart3,
                title: 'Portfolio Dashboard',
                description: 'View all your properties, tenants, and compliance status in one unified dashboard with real-time updates.',
                color: 'indigo'
              },
              {
                icon: Shield,
                title: 'Compliance Tracking',
                description: 'Automated alerts for certificate expirations, inspections, and regulatory requirements.',
                color: 'emerald'
              },
              {
                icon: FileCheck,
                title: 'Document Vault',
                description: 'Securely store and manage all property documents with easy access and sharing.',
                color: 'purple'
              },
              {
                icon: Users,
                title: 'Tenant Management',
                description: 'Streamline tenant onboarding, rent collection, and communication in one place.',
                color: 'amber'
              },
              {
                icon: Clock,
                title: 'Maintenance Tracking',
                description: 'Log and track maintenance requests with automated contractor notifications.',
                color: 'rose'
              },
              {
                icon: Zap,
                title: 'Automation',
                description: 'Automate repetitive tasks like rent reminders, compliance checks, and reporting.',
                color: 'cyan'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                indigo: 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400',
                emerald: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400',
                purple: 'bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400',
                amber: 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400',
                rose: 'bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400',
                cyan: 'bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400',
              };
              return (
                <div 
                  key={index} 
                  className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${colorClasses[feature.color]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl p-10 lg:p-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 border border-white rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white rounded-full"></div>
            </div>
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-white text-center">
              {[
                { value: '10K+', label: 'Properties Managed' },
                { value: '5K+', label: 'Happy Landlords' },
                { value: '99.9%', label: 'Uptime SLA' },
                { value: '24/7', label: 'Support Available' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-indigo-200 text-sm lg:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Ready to simplify your property management?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
              Join thousands of landlords who trust Xperty to manage their properties. Start your free trial today — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="h-14 px-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-base shadow-xl shadow-indigo-500/25"
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="h-14 px-10 border-2 font-semibold text-base"
                onClick={() => navigate(ROUTES.SIGNIN)}
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Xperty</span>
              </div>
              <p className="text-slate-400 text-sm">
                The modern property management platform for landlords who want to grow.
              </p>
            </div>
            
            {/* Links */}
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Updates'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Resources', links: ['Documentation', 'Help Center', 'Community', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Bottom */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 Xperty. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

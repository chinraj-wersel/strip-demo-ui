import React, { useState, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/constants';
import {
  Building2,
  Users,
  ShieldAlert,
  Plus,
  Upload,
  Moon,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  Settings2,
  Lightbulb,
  Zap,
  Bell,
  Activity,
  DollarSign,
  ClipboardList
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardCustomizer, DEFAULT_LAYOUT } from './DashboardCustomizer';
 
const STORAGE_KEY = 'propertyDashboardLayout:v1';
 
export const PropertyDashboard = () => {
  const { portfolio, addLog } = useProperty();
  const navigate = useNavigate();
  const [layoutConfig, setLayoutConfig] = useState(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('main');
 
  // Load configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      try {
        setLayoutConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse dashboard config", e);
        setLayoutConfig(DEFAULT_LAYOUT);
      }
    } else {
      // First time user
      setLayoutConfig(DEFAULT_LAYOUT);
      setIsCustomizerOpen(true);
    }
  }, []);
 
  const handleSaveConfig = (newConfig) => {
    setLayoutConfig(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  };
 
  if (!layoutConfig) return null; // or a loading spinner
 
  const totalProps = portfolio.length;
  const activeProps = portfolio.filter(p => p.status === 'Active').length;
  const occupancyRate = totalProps > 0 ? Math.round((activeProps / totalProps) * 100) : 0;
  const issues = 3;
 
  const handleNightlyScan = () => {
    addLog("Starting nightly compliance scan...");
    setTimeout(() => {
      addLog("Event: COMPLIANCE_EXPIRY_ALERT. 3 alerts generated.", 'success');
    }, 2000);
  };
 
  // Widget Renderers
  const renderWidget = (id) => {
    switch (id) {
      // Main
      case 'alerts':
        return (
          <Card key="alerts" className="lg:col-span-2 h-full flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none rounded-2xl overflow-hidden">
            <CardHeader className="bg-card/50 backdrop-blur-sm border-b border-border shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Compliance & Asset Updates</CardTitle>
                  <CardDescription>Latest updates from your property portfolio compliance system.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 bg-card flex-1 min-h-[400px]">
              <ScrollArea className="h-full p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-red-100 bg-red-50/30 transition-colors hover:bg-red-50/50">
                    <div className="p-2 bg-red-100 rounded-full shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-red-900">Certificate Expired</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">High Priority</span>
                      </div>
                      <p className="text-sm text-red-800 mt-1">
                        Fire Alarm System at <span className="font-medium">456 Queen Road</span> has expired!
                      </p>
                      <p className="text-xs text-red-600 mt-2 flex items-center"><Activity className="h-3 w-3 mr-1" /> 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-yellow-100 bg-yellow-50/30 transition-colors hover:bg-yellow-50/50">
                    <div className="p-2 bg-yellow-100 rounded-full shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-yellow-900">Certificate Expiring Soon</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Medium Priority</span>
                      </div>
                      <p className="text-sm text-yellow-800 mt-1">
                        Emergency Lighting at <span className="font-medium">456 Queen Road</span> expires in 45 days.
                      </p>
                      <p className="text-xs text-yellow-600 mt-2 flex items-center"><Activity className="h-3 w-3 mr-1" /> 5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/30 transition-colors hover:bg-blue-50/50">
                    <div className="p-2 bg-blue-100 rounded-full shrink-0">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-blue-900">Lease Renewal Due</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Asset</span>
                      </div>
                      <p className="text-sm text-blue-800 mt-1">
                        Lease for <span className="font-medium">Unit 304</span> is up for renewal in 60 days.
                      </p>
                      <p className="text-xs text-blue-600 mt-2 flex items-center"><Activity className="h-3 w-3 mr-1" /> Today</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-green-100 bg-green-50/30 transition-colors hover:bg-green-50/50">
                    <div className="p-2 bg-green-100 rounded-full shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-green-900">Rent Received</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Info</span>
                      </div>
                      <p className="text-sm text-green-800 mt-1">
                        Rent payment received for <span className="font-medium">123 High Street</span>.
                      </p>
                      <p className="text-xs text-green-600 mt-2 flex items-center"><Activity className="h-3 w-3 mr-1" /> Yesterday</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );
 
      // Sidebar
      case 'quickActions':
        return (
          <Card key="quickActions" className="shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none rounded-2xl overflow-hidden bg-card">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 p-6">
              <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 border-border hover:border-primary/20 hover:bg-primary/5 transition-all group" onClick={() => navigate(ROUTES.ADD_PROPERTY)}>
                <div className="bg-primary/10 p-2.5 rounded-xl mr-4 group-hover:bg-primary group-hover:text-white transition-colors"><Plus className="h-5 w-5 text-primary group-hover:text-white" /></div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Add New Property</div>
                  <div className="text-xs text-muted-foreground">Register a new unit</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 border-border hover:border-blue-200 hover:bg-blue-50 transition-all group" onClick={() => navigate(ROUTES.BULK_IMPORT)}>
                <div className="bg-blue-50 p-2.5 rounded-xl mr-4 group-hover:bg-blue-500 group-hover:text-white transition-colors"><Upload className="h-5 w-5 text-blue-600 group-hover:text-white" /></div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Bulk Import</div>
                  <div className="text-xs text-muted-foreground">Upload CSV/Excel</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 border-border hover:border-purple-200 hover:bg-purple-50 transition-all group" onClick={handleNightlyScan}>
                <div className="bg-purple-50 p-2.5 rounded-xl mr-4 group-hover:bg-purple-500 group-hover:text-white transition-colors"><Moon className="h-5 w-5 text-purple-600 group-hover:text-white" /></div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Run Nightly Scan</div>
                  <div className="text-xs text-muted-foreground">Check compliance</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        );
      case 'pendingRequests':
        return (
          <Card key="pendingRequests" className="shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none rounded-2xl overflow-hidden bg-card">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-orange-500" />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="p-4 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm text-foreground">Leaking Tap</span>
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">New</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Unit 4B • Reported today</p>
                </div>
                <div className="p-4 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm text-foreground">Key Replacement</span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">In Progress</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Unit 12 • Reported yesterday</p>
                </div>
                <div className="p-4 text-center">
                  <Button variant="link" size="sm" className="text-primary h-auto p-0">View All Requests</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };
 
  // Check if dashboard is empty
  const isEmpty =
    (layoutConfig.regions?.main?.length || 0) === 0 &&
    (layoutConfig.regions?.sidebar?.length || 0) === 0;
 
  return (
    <div className="space-y-8 p-8 bg-background min-h-screen font-sans">
      <DashboardCustomizer
        open={isCustomizerOpen}
        onOpenChange={setIsCustomizerOpen}
        initialConfig={layoutConfig}
        onSave={handleSaveConfig}
        defaultTab={activeTab}
      />
 
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-border bg-background -mx-6 -mt-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <h1 className="text-base font-medium text-foreground">Dashboard</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { setActiveTab('main'); setIsCustomizerOpen(true); }} className="text-muted-foreground hover:text-primary">
            <Settings2 className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>
 
      {/* Stats Grid - Premium Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Properties */}
        <div className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-muted blur-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
              <h3 className="mt-2 text-3xl font-bold text-foreground">{totalProps}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground shadow-sm">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span className="font-medium">+2</span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        </div>
 
        {/* Compliance Issues */}
        <div className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-red-50 blur-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Compliance Issues</p>
              <h3 className="mt-2 text-3xl font-bold text-red-600">{issues}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 shadow-sm">
              <ShieldAlert className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600 font-medium">
            <AlertCircle className="mr-1 h-4 w-4" />
            Requires attention
          </div>
        </div>
 
        {/* Revenue Overview (Replaces System Status) */}
        <div className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-emerald-50 blur-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="mt-2 text-3xl font-bold text-foreground">$45,250</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span className="font-medium">+12%</span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        </div>
 
        {/* Active Tenancies */}
        <div className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-green-50 blur-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Tenancies</p>
              <h3 className="mt-2 text-3xl font-bold text-foreground">{activeProps}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 shadow-sm">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span className="font-medium">{occupancyRate}%</span>
            <span className="ml-1 text-muted-foreground">Occupancy Rate</span>
          </div>
        </div>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 h-full flex flex-col">
          {(layoutConfig.regions?.main?.length || 0) > 0 ? (
            layoutConfig.regions.main.map(id => renderWidget(id))
          ) : (
            <div className="h-full min-h-[400px] rounded-3xl border-[3px] border-dashed border-border bg-muted/50 flex flex-col items-center justify-center text-center p-12 hover:bg-muted transition-colors group cursor-pointer" onClick={() => { setActiveTab('main'); setIsCustomizerOpen(true); }}>
              <div className="h-16 w-16 bg-card rounded-2xl shadow-sm border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-8 w-8 text-primary/80" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Customize Your View</h3>
              <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
                This space is empty. Add widgets like "Compliance Updates" to track your most important metrics here.
              </p>
              <Button variant="outline" className="border-border hover:border-primary hover:text-primary bg-card px-8">
                Add Widget
              </Button>
            </div>
          )}
        </div>
 
        {/* Sidebar */}
        <div className="space-y-6 h-full flex flex-col">
          {(layoutConfig.regions?.sidebar?.length || 0) > 0 ? (
            layoutConfig.regions.sidebar.map(id => renderWidget(id))
          ) : (
            <div className="h-full min-h-[400px] rounded-3xl border-[3px] border-dashed border-border bg-muted/50 flex flex-col items-center justify-center text-center p-12 hover:bg-muted transition-colors group cursor-pointer" onClick={() => { setActiveTab('sidebar'); setIsCustomizerOpen(true); }}>
              <div className="h-16 w-16 bg-card rounded-2xl shadow-sm border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-8 w-8 text-primary/80" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Add Sidebar Widgets</h3>
              <p className="text-muted-foreground max-w-xs mb-8 leading-relaxed">
                Quick actions and pending requests can be pinned here for easy access.
              </p>
              <Button variant="outline" className="border-border hover:border-primary hover:text-primary bg-card px-8">
                Add Widget
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
const ActivityIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
 
 
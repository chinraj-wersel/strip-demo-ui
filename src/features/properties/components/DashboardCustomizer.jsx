import React, { useState, useEffect } from 'react';
import {
    X,
    Settings2,
    LayoutDashboard,
    DollarSign,
    Users,
    Building2,
    AlertCircle,
    BarChart3,
    Activity,
    Calendar,
    FileText,
    Wrench,
    TrendingUp,
    PieChart,
    Clock,
    CheckCircle2,
    GripVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import './DashboardCustomizer.css';

// All available widgets
export const AVAILABLE_WIDGETS = [
    {
        id: 'kpi-revenue',
        name: 'Total Revenue',
        description: 'Shows total revenue with trend indicator',
        icon: DollarSign,
        category: 'KPI Cards',
        size: 'small',
    },
    {
        id: 'kpi-occupancy',
        name: 'Occupancy Rate',
        description: 'Current occupancy percentage across all properties',
        icon: Users,
        category: 'KPI Cards',
        size: 'small',
    },
    {
        id: 'kpi-properties',
        name: 'Total Properties',
        description: 'Number of properties in portfolio',
        icon: Building2,
        category: 'KPI Cards',
        size: 'small',
    },
    {
        id: 'kpi-issues',
        name: 'Active Issues',
        description: 'Current open maintenance issues',
        icon: AlertCircle,
        category: 'KPI Cards',
        size: 'small',
    },
    {
        id: 'chart-revenue',
        name: 'Revenue Overview',
        description: 'Monthly revenue bar chart',
        icon: BarChart3,
        category: 'Charts',
        size: 'large',
    },
    {
        id: 'recent-activity',
        name: 'Recent Activity',
        description: 'Latest activities and updates',
        icon: Activity,
        category: 'Activity',
        size: 'medium',
    },
    {
        id: 'stats-leases',
        name: 'Leases Expiring Soon',
        description: 'Upcoming lease expirations',
        icon: Calendar,
        category: 'Quick Stats',
        size: 'small',
    },
    {
        id: 'stats-vacant',
        name: 'Vacant Units',
        description: 'Units ready for listing',
        icon: Building2,
        category: 'Quick Stats',
        size: 'small',
    },
    {
        id: 'stats-maintenance',
        name: 'Maintenance Requests',
        description: 'Open maintenance tickets',
        icon: Wrench,
        category: 'Quick Stats',
        size: 'small',
    },
    {
        id: 'chart-occupancy',
        name: 'Occupancy Trend',
        description: 'Occupancy rate over time',
        icon: TrendingUp,
        category: 'Charts',
        size: 'medium',
    },
    {
        id: 'chart-distribution',
        name: 'Property Distribution',
        description: 'Property types pie chart',
        icon: PieChart,
        category: 'Charts',
        size: 'medium',
    },
    {
        id: 'upcoming-tasks',
        name: 'Upcoming Tasks',
        description: 'Scheduled inspections and tasks',
        icon: Clock,
        category: 'Activity',
        size: 'medium',
    },
];

const STORAGE_KEY = 'xperty-dashboard-widgets';

export function DashboardCustomizer({ isOpen, onClose, selectedWidgets, onSave }) {
    const [localSelection, setLocalSelection] = useState(selectedWidgets || []);

    useEffect(() => {
        setLocalSelection(selectedWidgets || []);
    }, [selectedWidgets, isOpen]);

    const toggleWidget = (widgetId) => {
        setLocalSelection(prev => {
            if (prev.includes(widgetId)) {
                return prev.filter(id => id !== widgetId);
            }
            return [...prev, widgetId];
        });
    };

    const selectAll = () => {
        setLocalSelection(AVAILABLE_WIDGETS.map(w => w.id));
    };

    const clearAll = () => {
        setLocalSelection([]);
    };

    const handleSave = () => {
        onSave(localSelection);
        onClose();
    };

    // Group widgets by category
    const groupedWidgets = AVAILABLE_WIDGETS.reduce((acc, widget) => {
        if (!acc[widget.category]) {
            acc[widget.category] = [];
        }
        acc[widget.category].push(widget);
        return acc;
    }, {});

    if (!isOpen) return null;

    return (
        <div className="customizer-overlay" onClick={onClose}>
            <div className="customizer-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="customizer-header">
                    <div className="customizer-header-left">
                        <Settings2 className="w-5 h-5 text-indigo-600" />
                        <div>
                            <h2 className="customizer-title">Customize Dashboard</h2>
                            <p className="customizer-subtitle">Select the widgets you want to display</p>
                        </div>
                    </div>
                    <button className="customizer-close-btn" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="customizer-actions">
                    <Button variant="outline" size="sm" onClick={selectAll}>
                        Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearAll}>
                        Clear All
                    </Button>
                    <span className="customizer-count">
                        {localSelection.length} of {AVAILABLE_WIDGETS.length} selected
                    </span>
                </div>

                {/* Widget Grid */}
                <div className="customizer-content">
                    {Object.entries(groupedWidgets).map(([category, widgets]) => (
                        <div key={category} className="customizer-category">
                            <h3 className="customizer-category-title">{category}</h3>
                            <div className="customizer-widgets-grid">
                                {widgets.map(widget => {
                                    const isSelected = localSelection.includes(widget.id);
                                    const Icon = widget.icon;
                                    return (
                                        <div
                                            key={widget.id}
                                            className={cn(
                                                "customizer-widget-card",
                                                isSelected && "selected"
                                            )}
                                            onClick={() => toggleWidget(widget.id)}
                                        >
                                            <div className="widget-card-header">
                                                <div className={cn(
                                                    "widget-icon-box",
                                                    isSelected ? "bg-indigo-100" : "bg-slate-100"
                                                )}>
                                                    <Icon className={cn(
                                                        "w-4 h-4",
                                                        isSelected ? "text-indigo-600" : "text-slate-500"
                                                    )} />
                                                </div>
                                                <div className={cn(
                                                    "widget-checkbox",
                                                    isSelected && "checked"
                                                )}>
                                                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                                                </div>
                                            </div>
                                            <h4 className="widget-card-title">{widget.name}</h4>
                                            <p className="widget-card-desc">{widget.description}</p>
                                            <span className={cn(
                                                "widget-size-badge",
                                                widget.size === 'large' && "size-large",
                                                widget.size === 'medium' && "size-medium"
                                            )}>
                                                {widget.size}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="customizer-footer">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
                        Save Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Helper to load saved widgets
export function loadSavedWidgets() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

// Helper to save widgets
export function saveWidgets(widgets) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
    } catch (e) {
        console.error('Failed to save widgets:', e);
    }
}


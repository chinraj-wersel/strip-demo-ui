import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Save,
    RotateCcw,
    Plus,
    Check,
    Bell,
    Zap,
    ClipboardList,
    LayoutDashboard,
    PanelRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
 
export const WIDGET_DEFINITIONS = {
    alerts: {
        label: 'Compliance & Asset Updates',
        region: 'main',
        description: 'Track compliance expiries and property asset activity',
        icon: Bell
    },
    quickActions: {
        label: 'Quick Actions',
        region: 'sidebar',
        description: 'Shortcuts to common tasks',
        icon: Zap
    },
    pendingRequests: {
        label: 'Pending Requests',
        region: 'sidebar',
        description: 'Track maintenance and tenant requests',
        icon: ClipboardList
    }
};
 
export const DEFAULT_LAYOUT = {
    layoutVersion: 2,
    regions: {
        main: [],
        sidebar: []
    }
};
 
export const DashboardCustomizer = ({ open, onOpenChange, initialConfig, onSave, defaultTab = 'main' }) => {
    const [config, setConfig] = useState(initialConfig || DEFAULT_LAYOUT);
 
    // Reset local state when modal opens with new props
    useEffect(() => {
        if (open) {
            setConfig(initialConfig || DEFAULT_LAYOUT);
        }
    }, [open, initialConfig]);
 
    const toggleWidget = (region, widgetId) => {
        setConfig(prev => {
            const regionList = prev.regions[region] || [];
            const isVisible = regionList.includes(widgetId);
 
            let newRegionList;
            if (isVisible) {
                // Hide it
                newRegionList = regionList.filter(id => id !== widgetId);
            } else {
                // Show it (append to end)
                newRegionList = [...regionList, widgetId];
            }
 
            return {
                ...prev,
                regions: {
                    ...prev.regions,
                    [region]: newRegionList
                }
            };
        });
    };
 
    const handleSave = () => {
        onSave(config);
        onOpenChange(false);
    };
 
    const handleReset = () => {
        setConfig(DEFAULT_LAYOUT);
    };
 
    const renderWidgetCard = (widget, regionName) => {
        const isVisible = (config.regions[regionName] || []).includes(widget.id);
        const Icon = widget.icon;
 
        return (
            <div
                key={widget.id}
                onClick={() => toggleWidget(regionName, widget.id)}
                className={cn(
                    "relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 group overflow-hidden",
                    isVisible
                        ? "border-primary/50 bg-primary/5 shadow-md shadow-primary/10"
                        : "border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-gray-200/50"
                )}
            >
                <div className={cn(
                    "absolute top-0 right-0 p-2 rounded-bl-2xl transition-colors duration-300",
                    isVisible ? "bg-primary text-white" : "bg-gray-50 text-gray-300 group-hover:text-primary"
                )}>
                    {isVisible ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
 
                <div className="flex items-start gap-4">
                    <div className={cn(
                        "p-3 rounded-xl transition-all duration-300 shrink-0",
                        isVisible ? "bg-white text-primary shadow-sm" : "bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className={cn("font-semibold text-sm mb-1 transition-colors", isVisible ? "text-primary" : "text-gray-900")}>
                            {widget.label}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {widget.description}
                        </p>
                    </div>
                </div>
            </div>
        );
    };
 
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                    <DialogTitle className="text-2xl font-bold tracking-tight">Customize Dashboard</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Manage your workspace layout and widgets
                    </DialogDescription>
                </DialogHeader>
 
                <div className="flex-1 overflow-hidden p-6">
                    <Tabs defaultValue={defaultTab} className="h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="main" className="flex items-center gap-2">
                                <LayoutDashboard className="h-4 w-4" />
                                Main Content
                                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                    {(config.regions.main || []).length}
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="sidebar" className="flex items-center gap-2">
                                <PanelRight className="h-4 w-4" />
                                Sidebar
                                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                    {(config.regions.sidebar || []).length}
                                </span>
                            </TabsTrigger>
                        </TabsList>
 
                        <TabsContent value="main" className="flex-1 mt-0 h-full overflow-hidden">
                            <ScrollArea className="h-full pr-4">
                                <div className="space-y-4">
                                    {Object.entries(WIDGET_DEFINITIONS)
                                        .filter(([_, def]) => def.region === 'main')
                                        .map(([id, def]) => renderWidgetCard({ id, ...def }, 'main'))}
                                    {Object.entries(WIDGET_DEFINITIONS).filter(([_, def]) => def.region === 'main').length === 0 && (
                                        <div className="text-center py-12 text-muted-foreground">
                                            No widgets available for this section.
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>
 
                        <TabsContent value="sidebar" className="flex-1 mt-0 h-full overflow-hidden">
                            <ScrollArea className="h-full pr-4">
                                <div className="space-y-4">
                                    {Object.entries(WIDGET_DEFINITIONS)
                                        .filter(([_, def]) => def.region === 'sidebar')
                                        .map(([id, def]) => renderWidgetCard({ id, ...def }, 'sidebar'))}
                                    {Object.entries(WIDGET_DEFINITIONS).filter(([_, def]) => def.region === 'sidebar').length === 0 && (
                                        <div className="text-center py-12 text-muted-foreground">
                                            No widgets available for this section.
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
 
                <DialogFooter className="p-6 pt-4 border-t border-gray-100 bg-white/80 backdrop-blur-md">
                    <div className="flex justify-between w-full items-center">
                        <Button variant="ghost" onClick={handleReset} className="text-muted-foreground hover:text-red-600 hover:bg-red-50">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset Default
                        </Button>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-200">Cancel</Button>
                            <Button onClick={handleSave} className="bg-primary shadow-lg shadow-primary/25 hover:shadow-primary/40">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
 
 
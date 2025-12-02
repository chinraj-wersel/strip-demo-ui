import React, { useMemo } from 'react';
import { useProperty } from '@/features/property/context/PropertyContext';
import { PageHeader } from '@/components/ui/page-header';
import {
    LayoutDashboard,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    Building2,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function DashboardOverview() {
    const { portfolio } = useProperty();

    // Calculate Real Metrics
    const metrics = useMemo(() => {
        if (!portfolio) return { revenue: 0, properties: 0, units: 0, occupancy: 0 };

        const properties = portfolio.length;
        let totalUnits = 0;
        let occupiedUnits = 0;
        let totalRevenue = 0;

        portfolio.forEach(p => {
            const pUnits = p.units || [];
            totalUnits += pUnits.length;
            occupiedUnits += pUnits.filter(u => u.status === 'Occupied').filter(Boolean).length;

            // Calculate revenue (mock if missing)
            const pRevenue = pUnits.reduce((sum, u) => sum + (parseFloat(u.rent) || 0), 0);
            totalRevenue += pRevenue > 0 ? pRevenue : (Math.random() * 5000 + 2000);
        });

        const occupancy = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

        return {
            revenue: totalRevenue,
            properties,
            units: totalUnits,
            occupancy
        };
    }, [portfolio]);

    // Mock Trend Data
    const trends = {
        revenue: 12.5,
        occupancy: 4.2,
        properties: 2,
        units: 8
    };

    return (
        <div>
            <PageHeader
                icon={LayoutDashboard}
                title="Dashboard"
                showSearch={false}
            />

            <div className="max-w-[1600px] mx-auto mt-4 px-8 space-y-8">

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <KpiCard
                        title="Total Revenue"
                        value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(metrics.revenue)}
                        trend={trends.revenue}
                        icon={DollarSign}
                        trendLabel="from last month"
                    />
                    <KpiCard
                        title="Occupancy Rate"
                        value={`${metrics.occupancy}%`}
                        trend={trends.occupancy}
                        icon={Users}
                        trendLabel="from last month"
                    />
                    <KpiCard
                        title="Total Properties"
                        value={metrics.properties}
                        trend={trends.properties}
                        icon={Building2}
                        trendLabel="new this month"
                        valuePrefix="+"
                    />
                    <KpiCard
                        title="Active Issues"
                        value="3"
                        trend={-2}
                        icon={AlertCircle}
                        trendLabel="from last week"
                        inverseTrend // Negative trend is good for issues
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Revenue Chart */}
                    <Card className="lg:col-span-2 shadow-sm border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-slate-900">Revenue Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full flex items-end justify-between gap-2 pt-4">
                                {[65, 59, 80, 81, 56, 55, 40, 70, 75, 85, 90, 95].map((height, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                                        <div className="relative w-full bg-slate-100 rounded-t-md overflow-hidden h-[250px] flex items-end">
                                            <div
                                                className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 rounded-t-md"
                                                style={{ height: `${height}%` }}
                                            >
                                                {/* Tooltip */}
                                                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity whitespace-nowrap z-10">
                                                    ${(height * 1200).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500 font-medium">
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-slate-900">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { title: 'New Lease Signed', desc: 'Unit 4B - Highland Towers', time: '2 hours ago', icon: Users, color: 'bg-green-100 text-green-600' },
                                    { title: 'Maintenance Request', desc: 'Leaking faucet - Unit 12A', time: '5 hours ago', icon: AlertCircle, color: 'bg-amber-100 text-amber-600' },
                                    { title: 'Rent Payment Received', desc: '$2,400 - Unit 3C', time: '1 day ago', icon: DollarSign, color: 'bg-indigo-100 text-indigo-600' },
                                    { title: 'Property Inspection', desc: 'Scheduled for Sunset Apts', time: '2 days ago', icon: Building2, color: 'bg-slate-100 text-slate-600' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className={cn("h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0", item.color)}>
                                            <item.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium text-slate-900 leading-none">{item.title}</p>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                        <span className="text-xs text-slate-400">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-6 text-xs h-9">
                                View All Activity
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsRowCard
                        label="Leases Expiring Soon"
                        value="5"
                        desc="Next 30 days"
                        color="border-l-4 border-l-amber-500"
                    />
                    <StatsRowCard
                        label="Vacant Units"
                        value={metrics.units - Math.round((metrics.occupancy / 100) * metrics.units)}
                        desc="Ready for listing"
                        color="border-l-4 border-l-red-500"
                    />
                    <StatsRowCard
                        label="Maintenance Requests"
                        value="12"
                        desc="3 Urgent"
                        color="border-l-4 border-l-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, trend, icon: Icon, trendLabel, inverseTrend, valuePrefix }) {
    const isPositive = trend > 0;
    const isGood = inverseTrend ? !isPositive : isPositive;

    return (
        <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className={cn("p-2 rounded-lg bg-slate-50")}>
                        <Icon className="h-5 w-5 text-slate-500" />
                    </div>
                    {trend !== 0 && (
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                            isGood ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                        )}>
                            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-bold text-slate-900">
                            {valuePrefix}{value}
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{trendLabel}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function StatsRowCard({ label, value, desc, color }) {
    return (
        <Card className={cn("shadow-sm border-slate-200", color)}>
            <CardContent className="p-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="text-xs text-slate-400">{desc}</p>
                </div>
                <span className="text-2xl font-bold text-slate-900">{value}</span>
            </CardContent>
        </Card>
    );
}

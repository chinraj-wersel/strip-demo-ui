import { PropertyProvider } from "@/features/property/context/PropertyContext";
import { DashboardOverview } from "@/features/properties/components/DashboardOverview";
import { SystemConsole } from "@/features/property/components/SystemConsole";

export const DashboardPage = () => {
  return (
    <PropertyProvider>
      <DashboardOverview />
      <SystemConsole />
    </PropertyProvider>
  );
};


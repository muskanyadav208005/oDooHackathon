import KPICards from "@/components/dashboard/KPICards";
import FleetChart from "@/components/dashboard/FleetChart";
import RecentTrips from "@/components/dashboard/RecentTrips";

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <KPICards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <FleetChart />

        <RecentTrips />

      </div>

    </div>
  );
}
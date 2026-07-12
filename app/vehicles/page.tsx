import VehicleTable from "@/components/vehicles/VehicleTable";
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function VehiclesPage() {
  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Vehicles
        </h1>

        <AddVehicleDialog />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />

        <Input
          placeholder="Search vehicles..."
          className="pl-10"
        />
      </div>

      <VehicleTable />

    </div>
  );
}
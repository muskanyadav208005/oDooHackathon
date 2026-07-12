import TripTable from "@/components/trips/TripTable";
import AddTripDialog from "@/components/trips/AddTripDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


export default function TripsPage() {
  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Trips
        </h1>

        <AddTripDialog />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />

        <Input
          placeholder="Search trips..."
          className="pl-10"
        />
      </div>

      <TripTable />

    </div>
  );
}
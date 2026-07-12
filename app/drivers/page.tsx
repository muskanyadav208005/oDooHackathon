import DriverTable from "@/components/driver/DriverTable";
import AddDriverDialog from "@/components/driver/AddDriverDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function DriversPage() {
  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Drivers
        </h1>

        <AddDriverDialog />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />

        <Input
          placeholder="Search drivers..."
          className="pl-10"
        />
      </div>

      <DriverTable />

    </div>
  );
}
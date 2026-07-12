"use client";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VehicleForm() {
  return (
    <form className="space-y-4">

      <Input placeholder="Registration Number" />

      <Input placeholder="Vehicle Name" />

      <Input placeholder="Vehicle Type" />

      <Input
        type="number"
        placeholder="Maximum Load (kg)"
      />

      <Input
        type="number"
        placeholder="Odometer"
      />

      <Input
        type="number"
        placeholder="Acquisition Cost"
      />
      <Select>
  <SelectTrigger>
    <SelectValue placeholder="Vehicle Status" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="available">Available</SelectItem>
    <SelectItem value="trip">On Trip</SelectItem>
    <SelectItem value="maintenance">Maintenance</SelectItem>
  </SelectContent>
</Select>

      <Button className="w-full">
        Save Vehicle
      </Button>


    </form>
  );
}
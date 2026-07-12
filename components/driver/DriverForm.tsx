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

export default function DriverForm() {
  return (
    <form className="space-y-4">

      

      <Input placeholder="Driver Name" />
      <Input placeholder="Phone Number" />
      <Input placeholder="Email Address" />

      <Input placeholder="Driver License Number" />

      <Input
        type="date"
        placeholder="Expiry Date"
      />
      <Select>
  <SelectTrigger>
    <SelectValue placeholder="Driver Status" />
  </SelectTrigger>

 <SelectContent>
  <SelectItem value="Available">Available</SelectItem>
  <SelectItem value="Off Duty">Off Duty</SelectItem>
  <SelectItem value="Suspended">Suspended</SelectItem>
</SelectContent>
</Select>

      <Button className="w-full">
        Save Driver
      </Button>


    </form>
  );
}
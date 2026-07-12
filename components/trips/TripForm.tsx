"use client";
import { drivers } from "@/data/drivers";
import { vehicles } from "@/data/vehicles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

export default function TripForm() {
  return (
    <form className="space-y-4">

      
      <Select>
  <SelectTrigger>
    <SelectValue placeholder="Select Vehicle" />
  </SelectTrigger>

  <SelectContent>
    {vehicles.map((vehicle) => (
      <SelectItem
        key={vehicle.registrationNumber}
        value={vehicle.registrationNumber}
      >
        {vehicle.registrationNumber}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
      <Select>
  <SelectTrigger>
    <SelectValue placeholder="Select Driver" />
  </SelectTrigger>

  <SelectContent>
    {drivers.map((driver) => (
      <SelectItem
        key={driver.id}
        value={driver.name}
      >
        {driver.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

      <Input placeholder="Pickup Location" />
      <Input placeholder="Destination" />
      <Input type="number" placeholder="Cargo Weight (kg)" />
      <Input type="number" placeholder="Distance (km)" />
      <Input type="number" placeholder="Revenue (Rupees)" /> 


      
      

    <Select>
        <SelectTrigger>
            <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
        
        <SelectItem value="Dispatched">Dispatched</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
        <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
    </Select>
    <Textarea placeholder="Delivery Notes (Optional)" />

      <Button className="w-full">
        Save Trip
      </Button>


    </form>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TripForm() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);

  const [vehicle, setVehicle] = useState("");
  const [driver, setDriver] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [distance, setDistance] = useState("");
  const [revenue, setRevenue] = useState("");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
  }, []);

  async function fetchVehicles() {
    const { data } = await supabase.from("vehicles").select("*");
    if (data) setVehicles(data);
  }

  async function fetchDrivers() {
    const { data } = await supabase.from("drivers").select("*");
    if (data) setDrivers(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("trips").insert([
      {
        vehicle_id: vehicle,
        driver_id: driver,
        origin,
        destination,
        cargo_weight: Number(cargoWeight),
        distance: Number(distance),
        estimated_revenue: Number(revenue),
        status,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Trip Added Successfully");
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Select onValueChange={(v:any)=>setVehicle(String(v))}>
        <SelectTrigger>
          <SelectValue placeholder="Select Vehicle"/>
        </SelectTrigger>

        <SelectContent>
          {vehicles.map((v)=>(
            <SelectItem key={v.id} value={v.id}>
              {v.registration_number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(v:any)=>setDriver(String(v))}>
        <SelectTrigger>
          <SelectValue placeholder="Select Driver"/>
        </SelectTrigger>

        <SelectContent>
          {drivers.map((d)=>(
            <SelectItem key={d.id} value={d.id}>
              {d.license_number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Origin"
        value={origin}
        onChange={(e)=>setOrigin(e.target.value)}
      />

      <Input
        placeholder="Destination"
        value={destination}
        onChange={(e)=>setDestination(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Cargo Weight"
        value={cargoWeight}
        onChange={(e)=>setCargoWeight(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Distance"
        value={distance}
        onChange={(e)=>setDistance(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Estimated Revenue"
        value={revenue}
        onChange={(e)=>setRevenue(e.target.value)}
      />

      <Select onValueChange={(v:any)=>setStatus(String(v))}>
        <SelectTrigger>
          <SelectValue placeholder="Status"/>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Draft">Draft</SelectItem>
          <SelectItem value="Dispatched">Dispatched</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Button className="w-full">
        Save Trip
      </Button>

    </form>
  );
}
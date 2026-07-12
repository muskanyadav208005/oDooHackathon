"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DriverForm() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [expiry, setExpiry] = useState("");
  const [status, setStatus] = useState("Available");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("drivers").insert([
      {
        license_number: licenseNumber,
        phone,
        license_expiry: expiry,
        status,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Driver Added Successfully");
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Input
        placeholder="License Number"
        value={licenseNumber}
        onChange={(e)=>setLicenseNumber(e.target.value)}
      />

      <Input
        placeholder="Phone"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />

      <Input
        type="date"
        value={expiry}
        onChange={(e)=>setExpiry(e.target.value)}
      />

      <Select onValueChange={(v:any)=>setStatus(String(v))}>
        <SelectTrigger>
          <SelectValue placeholder="Status"/>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Available">Available</SelectItem>
          <SelectItem value="On Trip">On Trip</SelectItem>
          <SelectItem value="Off Duty">Off Duty</SelectItem>
          <SelectItem value="Suspended">Suspended</SelectItem>
        </SelectContent>

      </Select>

      <Button type="submit" className="w-full">
  Save Driver
</Button>

    </form>
  );
}
"use client";


import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DriverTable() {
  const [drivers,setDrivers]=useState<any[]>([]);

    useEffect(()=>{
    fetchDrivers();
    },[]);

    async function fetchDrivers(){
    const {data,error}=await supabase
    .from("drivers")
    .select("*");

    if(error){
    console.log(error);
    return;
    }

    setDrivers(data);
    }
  
    return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            
            <TableHead>Driver Name</TableHead>
            <TableHead>Contact Details</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Expiry Date</TableHead>
            
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
  {drivers.map((driver) => (
    <TableRow key={driver.id}>

      {/* No name column in drivers table */}
      <TableCell>-</TableCell>

      <TableCell>{driver.phone}</TableCell>

      <TableCell>{driver.license_number}</TableCell>

      <TableCell>{driver.license_expiry}</TableCell>

      <TableCell>
        <Badge
          className={
            driver.status === "Available"
              ? "bg-green-500"
              : driver.status === "On Trip"
              ? "bg-blue-500"
              : driver.status === "Off Duty"
              ? "bg-yellow-500 text-black"
              : "bg-red-500"
          }
        >
          {driver.status}
        </Badge>
      </TableCell>

      <TableCell className="flex justify-end gap-2">
        <Button variant="outline" size="icon">
          <Pencil size={16} />
        </Button>

        <Button variant="destructive" size="icon">
          <Trash2 size={16} />
        </Button>
      </TableCell>

    </TableRow>
  ))}
</TableBody>
      </Table>
    </div>
  );
}
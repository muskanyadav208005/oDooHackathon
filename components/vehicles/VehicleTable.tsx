"use client";

import { vehicles } from "@/data/vehicles";
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

export default function VehicleTable() {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Registration</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Max Load</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.registrationNumber}</TableCell>

              <TableCell>{vehicle.vehicleName}</TableCell>

              <TableCell>{vehicle.type}</TableCell>

              <TableCell>{vehicle.maxLoad} kg</TableCell>

              <TableCell>
                <Badge
                    className={
                    vehicle.status === "Available"
                    ? "bg-green-500"
                    : vehicle.status === "On Trip"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }
                >{vehicle.status}</Badge>
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
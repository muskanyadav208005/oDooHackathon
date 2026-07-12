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
import { drivers } from "@/data/drivers";

export default function DriverTable() {
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
             

              <TableCell>{driver.name}</TableCell>

              <TableCell>{driver.phone}</TableCell>

              <TableCell>{driver.licenseNumber}</TableCell>

              <TableCell>{driver.expiry}</TableCell>

              <TableCell>
                <Badge
                    className={
                    driver.status === "Available"
                    ? "bg-green-500"
                    : driver.status === "On Trip"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }
                >{driver.status}</Badge>
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
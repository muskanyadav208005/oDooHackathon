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
import { trips } from "@/data/trips";

export default function TripTable() {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            
            <TableHead>Trip ID</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
             

              <TableCell>{trip.id}</TableCell>

              <TableCell>{trip.vehicle}</TableCell>

              <TableCell>{trip.driver}</TableCell>

              <TableCell>{trip.pickup}</TableCell>

              <TableCell>{trip.destination}</TableCell>

              <TableCell>
                <Badge
                   className={
                            trip.status === "Completed"
                            ? "bg-green-500"
                            : trip.status === "Dispatched"
                            ? "bg-blue-500"
                            : trip.status === "Draft"
                            ? "bg-yellow-500 text-black"
                            : "bg-red-500"
                        }
                >{trip.status}</Badge>
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
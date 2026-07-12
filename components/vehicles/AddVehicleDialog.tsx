"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import VehicleForm from "./VehicleForm";

export default function AddVehicleDialog() {
  return (
    <Dialog>

      <DialogTrigger
  render={
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add Vehicle
    </Button>
  }
/>

      <DialogContent className="max-w-xl">

        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
        </DialogHeader>

        <VehicleForm />

      </DialogContent>

    </Dialog>
  );
}
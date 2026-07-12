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
import TripForm from "./TripForm";

export default function AddTripDialog() {
  return (
    <Dialog>

      <DialogTrigger
  render={
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add Trip
    </Button>
  }
/>

      <DialogContent className="max-w-xl">

        <DialogHeader>
          <DialogTitle>Add Trip</DialogTitle>
        </DialogHeader>

        <TripForm />

      </DialogContent>

    </Dialog>
  );
}
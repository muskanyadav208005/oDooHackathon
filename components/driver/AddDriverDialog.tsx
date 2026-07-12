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
import DriverForm from "./DriverForm";

export default function AddDriverDialog() {
  return (
    <Dialog>

      <DialogTrigger
  render={
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add Driver
    </Button>
  }
/>

      <DialogContent className="max-w-xl">

        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
        </DialogHeader>

        <DriverForm />

      </DialogContent>

    </Dialog>
  );
}
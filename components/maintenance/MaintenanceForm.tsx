"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";

const maintenanceSchema = z.object({
  vehicle_id: z.string().min(1, "Please select a vehicle"),
  description: z.string().min(3, "Please describe the issue"),
  cost: z.string().min(1, "Cost is required"),
});

type MaintenanceFormValues = z.infer<typeof maintenanceSchema>;

export default function MaintenanceForm({ onLogSuccess }: { onLogSuccess: () => void }) {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVehicles() {
      // Rule: Retired or already In Shop vehicles cannot be selected
      const { data } = await supabase
        .from("vehicles")
        .select("*")
        .neq("status", "Retired")
        .neq("status", "In Shop");
      if (data) setVehicles(data);
    }
    fetchVehicles();
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceSchema),
  });

  const onSubmit = async (data: MaintenanceFormValues) => {
    setLoading(true);
    try {
      // 1. Insert repair log into database
      const { error: logError } = await supabase
        .from("maintenancelogs")
        .insert([{ 
          vehicle_id: data.vehicle_id, 
          description: data.description,
          cost: Number(data.cost),
          status: "Open" 
        }]);

      if (logError) throw logError;

      // 2. Business Rule: Automatically switch vehicle status to 'In Shop'
      const { error: vehicleError } = await supabase
        .from("vehicles")
        .update({ status: "In Shop" })
        .eq("registrationnum", data.vehicle_id);

      if (vehicleError) throw vehicleError;

      alert("Vehicle successfully sent to Maintenance. Status updated to 'In Shop'!");
      reset();
      onLogSuccess();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-900">
      <h3 className="text-lg font-bold text-slate-800 font-sans">Log Maintenance Ticket</h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Select Active Vehicle</label>
        <select {...register("vehicle_id")} className="w-full p-2 border border-slate-300 rounded text-sm bg-white">
          <option value="">-- Select Vehicle --</option>
          {vehicles.map((v) => (
            <option key={v.registrationnum} value={v.registrationnum}>
              {v.registrationnum}
            </option>
          ))}
        </select>
        {errors.vehicle_id && <p className="text-red-500 text-xs mt-1">{errors.vehicle_id.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Issue Description</label>
        <input type="text" {...register("description")} placeholder="e.g., Oil change & filter replacement" className="w-full p-2 border border-slate-300 rounded text-sm" />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Cost ($)</label>
        <input type="number" {...register("cost")} placeholder="0" className="w-full p-2 border border-slate-300 rounded text-sm" />
        {errors.cost && <p className="text-red-500 text-xs mt-1">{errors.cost.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white p-2 font-medium text-sm rounded transition">
        {loading ? "Processing..." : "Send Vehicle to Shop"}
      </button>
    </form>
  );
}
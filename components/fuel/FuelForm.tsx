"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";

const fuelSchema = z.object({
  vehicle_id: z.string().min(1, "Please select a vehicle"),
  liters: z.string().min(1, "Liters quantity is required"),
  cost: z.string().min(1, "Total cost amount is required"),
});

type FuelFormValues = z.infer<typeof fuelSchema>;

export default function FuelForm({ onLogSuccess }: { onLogSuccess: () => void }) {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVehicles() {
      const { data } = await supabase.from("vehicles").select("*");
      if (data) setVehicles(data);
    }
    fetchVehicles();
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FuelFormValues>({
    resolver: zodResolver(fuelSchema),
  });

  const onSubmit = async (data: FuelFormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("fuellogs").insert([
        {
          vehicle_id: data.vehicle_id,
          liters: Number(data.liters),
          cost: Number(data.cost),
          logged_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      alert("Fuel log successfully recorded!");
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
      <h3 className="text-lg font-bold text-slate-800">Refuel Transaction</h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Registration</label>
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
        <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Volume (Liters)</label>
        <input type="number" step="0.01" {...register("liters")} placeholder="0.00" className="w-full p-2 border border-slate-300 rounded text-sm" />
        {errors.liters && <p className="text-red-500 text-xs mt-1">{errors.liters.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Total Cost ($)</label>
        <input type="number" step="0.01" {...register("cost")} placeholder="0.00" className="w-full p-2 border border-slate-300 rounded text-sm" />
        {errors.cost && <p className="text-red-500 text-xs mt-1">{errors.cost.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white p-2 font-medium text-sm rounded transition">
        {loading ? "Saving..." : "Log Fuel Purchase"}
      </button>
    </form>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";

const expenseSchema = z.object({
  trip_id: z.string().min(1, "Please select a Trip ID"),
  category: z.string().min(1, "Please select a category"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(3, "Please enter a brief description"),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export default function ExpenseForm({ onLogSuccess }: { onLogSuccess: () => void }) {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTrips() {
      // Fetch recent trips to link the expense to
      const { data } = await supabase.from("trips").select("id, status");
      if (data) setTrips(data);
    }
    fetchTrips();
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = async (data: ExpenseFormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("expenses").insert([
        {
          trip_id: data.trip_id,
          category: data.category,
          amount: Number(data.amount),
          description: data.description,
          logged_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      alert("Expense successfully logged!");
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
      <h3 className="text-lg font-bold text-slate-800 font-sans">Log Incident Expense</h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Associated Trip ID</label>
        <select {...register("trip_id")} className="w-full p-2 border border-slate-300 rounded text-sm bg-white">
          <option value="">-- Select Trip --</option>
          {trips.map((t) => (
            <option key={t.id} value={t.id}>
              Trip #{t.id.slice(0, 8)}... ({t.status})
            </option>
          ))}
        </select>
        {errors.trip_id && <p className="text-red-500 text-xs mt-1">{errors.trip_id.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Expense Type</label>
        <select {...register("category")} className="w-full p-2 border border-slate-300 rounded text-sm bg-white">
          <option value="">-- Choose Category --</option>
          <option value="Toll">Toll Fees</option>
          <option value="Permit">Border Permits</option>
          <option value="Food">Driver Allowance</option>
          <option value="Fine">Traffic Fine</option>
          <option value="Other">Miscellaneous</option>
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount ($)</label>
        <input type="number" step="0.01" {...register("amount")} placeholder="0.00" className="w-full p-2 border border-slate-300 rounded text-sm" />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Reason / Description</label>
        <input type="text" {...register("description")} placeholder="e.g., Highway toll taxes" className="w-full p-2 border border-slate-300 rounded text-sm" />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white p-2 font-medium text-sm rounded transition">
        {loading ? "Saving..." : "Record Expense"}
      </button>
    </form>
  );
}
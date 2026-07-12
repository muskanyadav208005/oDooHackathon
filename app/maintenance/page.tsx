"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import MaintenanceForm from "../../components/maintenance/MaintenanceForm";

export default function MaintenancePage() {
  const [logs, setLogs] = useState<any[]>([]);

  async function fetchActiveLogs() {
    const { data } = await supabase
      .from("maintenancelogs")
      .select("*")
      .eq("status", "Open");
    if (data) setLogs(data);
  }

  useEffect(() => {
    fetchActiveLogs();
  }, []);

  const handleCloseMaintenance = async (logId: string, vehicleId: string) => {
    // 1. Close maintenance ticket
    await supabase.from("maintenancelogs").update({ status: "Closed" }).eq("id", logId);
    
    // 2. Business Rule: Restore vehicle back to Available
    await supabase.from("vehicles").update({ status: "Available" }).eq("registrationnum", vehicleId);
    
    alert("Maintenance complete! Vehicle is now Available for trips.");
    fetchActiveLogs();
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <MaintenanceForm onLogSuccess={fetchActiveLogs} />
      </div>
      
      <div className="md:col-span-2 bg-slate-900 rounded-lg p-6 border border-slate-800">
        <h2 className="text-xl font-bold mb-4 text-emerald-400">Vehicles Currently In Shop</h2>
        {logs.length === 0 ? (
          <p className="text-slate-400 text-sm">No vehicles under repair currently.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-800 rounded-md flex justify-between items-center border border-slate-700">
                <div>
                  <p className="font-bold text-amber-400">Vehicle: {log.vehicle_id}</p>
                  <p className="text-xs text-slate-400">Ticket Status: {log.status}</p>
                </div>
                <button 
                  onClick={() => handleCloseMaintenance(log.id, log.vehicle_id)} 
                  className="bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs px-3 py-2 rounded text-white transition"
                >
                  Complete & Release
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
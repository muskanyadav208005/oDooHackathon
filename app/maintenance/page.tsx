"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import MaintenanceForm from "@/components/maintenance/MaintenanceForm";

export default function MaintenancePage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

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
    // 1. Close the maintenance ticket
    await supabase.from("maintenancelogs").update({ status: "Closed" }).eq("id", logId);
    // 2. Revert vehicle status back to Available
    await supabase.from("vehicles").update({ status: "Available" }).eq("registrationnum", vehicleId);
    
    alert("Maintenance complete! Vehicle is now Available for fleet dispatch.");
    fetchActiveLogs();
  };

  const filteredLogs = logs.filter((log) =>
    log.vehicle_id.toLowerCase().includes(search.toLowerCase()) ||
    log.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar Panel Layout Component */}
      <aside className="w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-white text-xl font-bold">
            <span>🚚</span> TransitOps
          </div>
          <nav className="space-y-2 text-sm">
            <a href="/dashboard" className="block p-2 hover:bg-slate-800 rounded">Dashboard</a>
            <a href="/vehicles" className="block p-2 hover:bg-slate-800 rounded">Vehicles</a>
            <a href="/drivers" className="block p-2 hover:bg-slate-800 rounded">Drivers</a>
            <a href="/trips" className="block p-2 hover:bg-slate-800 rounded">Trips</a>
            <a href="/maintenance" className="block p-2 bg-slate-800 text-white font-semibold rounded">Maintenance</a>
            <a href="/fuel" className="block p-2 hover:bg-slate-800 rounded">Fuel</a>
            <a href="/expenses" className="block p-2 hover:bg-slate-800 rounded">Expenses</a>
            <a href="/reports" className="block p-2 hover:bg-slate-800 rounded">Reports</a>
          </nav>
        </div>
        <div className="text-xs text-slate-500">v1.0.0</div>
      </aside>

      {/* Main Framework View Panel */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">TransitOps Dashboard</h1>
          <span className="text-sm font-semibold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">Admin</span>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900">Maintenance & Garage Management</h2>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1 shadow transition"
          >
            {showForm ? "✕ Close Form" : "+ Add Maintenance Log"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className={`${showForm ? "lg:col-span-2" : "lg:col-span-3"} bg-white border border-slate-200 rounded-xl p-6 shadow-sm`}>
            
            {/* Search Filter input fields */}
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search active garage tickets..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 pl-9 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                    <th className="p-4">Vehicle Reg</th>
                    <th className="p-4">Reported Issue</th>
                    <th className="p-4">Estimated Cost</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-400">No vehicles are currently in the shop.</td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-medium text-slate-900">{log.vehicle_id}</td>
                        <td className="p-4 text-slate-500">{log.description || "N/A"}</td>
                        <td className="p-4 font-semibold text-slate-900">${log.cost || 0}</td>
                        <td className="p-4">
                          <span className="bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full text-xs">
                            In Shop
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => handleCloseMaintenance(log.id, log.vehicle_id)} 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3 py-1.5 rounded transition shadow-sm"
                          >
                            Complete & Release
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {showForm && (
            <div className="lg:col-span-1">
              <MaintenanceForm onLogSuccess={fetchActiveLogs} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
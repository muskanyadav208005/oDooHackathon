"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import FuelForm from "@/components/fuel/FuelForm";

export default function FuelPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function fetchFuelLogs() {
    const { data } = await supabase
      .from("fuellogs")
      .select("*")
      .order("logged_at", { ascending: false });
    if (data) setLogs(data);
  }

  useEffect(() => {
    fetchFuelLogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this log entry?")) {
      await supabase.from("fuellogs").delete().eq("id", id);
      fetchFuelLogs();
    }
  };

  const filteredLogs = logs.filter((log) =>
    log.vehicle_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* 1. Sidebar Panel Layout Component */}
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
            <a href="/maintenance" className="block p-2 hover:bg-slate-800 rounded">Maintenance</a>
            <a href="/fuel" className="block p-2 bg-slate-800 text-white font-semibold rounded">Fuel</a>
            <a href="/expenses" className="block p-2 hover:bg-slate-800 rounded">Expenses</a>
            <a href="/reports" className="block p-2 hover:bg-slate-800 rounded">Reports</a>
          </nav>
        </div>
        <div className="text-xs text-slate-500">v1.0.0</div>
      </aside>

      {/* 2. Primary Layout Framework Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">TransitOps Dashboard</h1>
          <span className="text-sm font-semibold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">Admin</span>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900">Fuel Management</h2>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1 shadow transition"
          >
            {showForm ? "✕ Close Form" : "+ Add Fuel Log"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className={`${showForm ? "lg:col-span-2" : "lg:col-span-3"} bg-white border border-slate-200 rounded-xl p-6 shadow-sm`}>
            {/* Functional search bar component inside dashboard structure view context row element layout */}
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search vehicle logs..." 
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
                    <th className="p-4">Vehicle ID</th>
                    <th className="p-4">Volume</th>
                    <th className="p-4">Cost</th>
                    <th className="p-4">Price / Liter</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-400">No fuel records discovered.</td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-medium text-slate-900">{log.vehicle_id}</td>
                        <td className="p-4">{log.liters} L</td>
                        <td className="p-4 font-semibold">${log.cost}</td>
                        <td className="p-4 text-slate-500">
                          ${(log.cost / log.liters).toFixed(2)}/L
                        </td>
                        <td className="p-4 flex gap-2">
                          <button onClick={() => handleDelete(log.id)} className="p-1 text-red-500 hover:bg-red-50 rounded border border-transparent hover:border-red-200">
                            🗑️
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
              <FuelForm onLogSuccess={fetchFuelLogs} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
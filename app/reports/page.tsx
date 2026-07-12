"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ReportCards from "@/components/reports/ReportCards";

export default function ReportsPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [summary, setSummary] = useState({ totalRevenue: 0, totalFuel: 0, totalExpenses: 0, avgRoi: 0 });
  const [loading, setLoading] = useState(true);

  async function generateReportData() {
    setLoading(true);
    
    // 1. Fetch vehicles along with their preset acquisition costs
    const { data: fleet } = await supabase.from("vehicles").select("*");
    // 2. Fetch all trips to calculate total revenue per vehicle ($2.50 per km default)
    const { data: trips } = await supabase.from("trips").select("*").eq("status", "Completed");
    // 3. Fetch logs to aggregate expenses
    const { data: fuel } = await supabase.from("fuellogs").select("*");
    const { data: misc } = await supabase.from("expenses").select("*");

    if (!fleet) return setLoading(false);

    let calculatedRevenue = 0;
    let calculatedFuel = 0;
    let calculatedExpenses = 0;

    const fleetReport = fleet.map((vehicle: any) => {
      // Filter stats for this specific vehicle
      const vehicleTrips = trips?.filter(t => t.vehicle_id === vehicle.registrationnum) || [];
      const vehicleFuel = fuel?.filter(f => f.vehicle_id === vehicle.registrationnum) || [];
      const vehicleMisc = misc?.filter(e => e.vehicle_id === vehicle.registrationnum) || [];

      // Logic calculations: Revenue based on completed distance trip logs
      const revenue = vehicleTrips.reduce((acc, t) => acc + (t.distance * 2.5), 0);
      const fuelCost = vehicleFuel.reduce((acc, f) => acc + f.cost, 0);
      const maintenanceCost = vehicleMisc.reduce((acc, m) => acc + m.amount, 0);
      
      calculatedRevenue += revenue;
      calculatedFuel += fuelCost;
      calculatedExpenses += maintenanceCost;

      // Mandatory Hackathon ROI Equation: (Rev - (Maint + Fuel)) / Acquisition Cost * 100
      const acqCost = vehicle.acquisitioncost || 50000; // fallback if empty
      const roi = ((revenue - (maintenanceCost + fuelCost)) / acqCost) * 100;

      return {
        ...vehicle,
        revenue,
        fuelCost,
        maintenanceCost,
        roi
      };
    });

    const totalAcqCost = fleet.reduce((acc, v) => acc + (v.acquisitioncost || 50000), 0);
    const overallRoi = ((calculatedRevenue - (calculatedExpenses + calculatedFuel)) / totalAcqCost) * 100;

    setVehicles(fleetReport);
    setSummary({
      totalRevenue: calculatedRevenue,
      totalFuel: calculatedFuel,
      totalExpenses: calculatedExpenses,
      avgRoi: overallRoi || 0
    });
    setLoading(false);
  }

  useEffect(() => {
    generateReportData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar Panel Layout */}
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
            <a href="/fuel" className="block p-2 hover:bg-slate-800 rounded">Fuel</a>
            <a href="/expenses" className="block p-2 hover:bg-slate-800 rounded">Expenses</a>
            <a href="/reports" className="block p-2 bg-slate-800 text-white font-semibold rounded">Reports</a>
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
          <h2 className="text-3xl font-bold text-slate-900">Performance & ROI Reports</h2>
          <button 
            onClick={generateReportData}
            className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-sm transition shadow"
          >
            🔄 Refresh Metrics
          </button>
        </div>

        {loading ? (
          <p className="text-slate-500 text-sm">Aggregating fleet intelligence logs...</p>
        ) : (
          <>
            <ReportCards summary={summary} />

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Fleet Utilization & Yield Analytics</h3>
              <div className="overflow-x-auto rounded-lg border border-slate-100">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                      <th className="p-4">Registration</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Generated Revenue</th>
                      <th className="p-4">Fuel Costs</th>
                      <th className="p-4">Maintenance</th>
                      <th className="p-4">Net Asset ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {vehicles.map((v) => (
                      <tr key={v.registrationnum} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-medium text-slate-900">{v.registrationnum}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            v.status === "Available" ? "bg-green-100 text-green-800" :
                            v.status === "On Trip" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="p-4 text-emerald-600 font-medium">${v.revenue.toFixed(2)}</td>
                        <td className="p-4 text-slate-600">${v.fuelCost.toFixed(2)}</td>
                        <td className="p-4 text-slate-600">${v.maintenanceCost.toFixed(2)}</td>
                        <td className={`p-4 font-bold ${v.roi >= 0 ? "text-blue-600" : "text-rose-600"}`}>
                          {v.roi.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
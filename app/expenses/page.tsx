"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ExpenseForm from "@/components/expenses/ExpensesForm";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function fetchExpenses() {
    const { data } = await supabase
      .from("expenses")
      .select("*")
      .order("logged_at", { ascending: false });
    if (data) setExpenses(data);
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this expense record?")) {
      await supabase.from("expenses").delete().eq("id", id);
      fetchExpenses();
    }
  };

  const filteredExpenses = expenses.filter((e) =>
    e.category.toLowerCase().includes(search.toLowerCase()) ||
    e.trip_id.toLowerCase().includes(search.toLowerCase())
  );

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
            <a href="/expenses" className="block p-2 bg-slate-800 text-white font-semibold rounded">Expenses</a>
            <a href="/reports" className="block p-2 hover:bg-slate-800 rounded">Reports</a>
          </nav>
        </div>
        <div className="text-xs text-slate-500">v1.0.0</div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">TransitOps Dashboard</h1>
          <span className="text-sm font-semibold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">Admin</span>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900">Incident Expenses</h2>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1 shadow transition"
          >
            {showForm ? "✕ Close Form" : "+ Add Expense Log"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className={`${showForm ? "lg:col-span-2" : "lg:col-span-3"} bg-white border border-slate-200 rounded-xl p-6 shadow-sm`}>
            {/* Search filter utility */}
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search by category or Trip ID..." 
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
                    <th className="p-4">Trip ID</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-400">No matching incident logs tracked.</td>
                    </tr>
                  ) : (
                    filteredExpenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 text-xs font-mono text-slate-600">#{exp.trip_id.slice(0, 8)}...</td>
                        <td className="p-4">
                          <span className="bg-amber-100 text-amber-800 font-medium px-2.5 py-0.5 rounded-full text-xs">
                            {exp.category}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-red-600">${exp.amount}</td>
                        <td className="p-4 text-slate-500">{exp.description}</td>
                        <td className="p-4">
                          <button onClick={() => handleDelete(exp.id)} className="p-1 text-red-500 hover:bg-red-50 rounded transition">
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
              <ExpenseForm onLogSuccess={fetchExpenses} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
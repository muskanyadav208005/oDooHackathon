"use client";

export default function ReportCards({ summary }: { summary: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
        <p className="text-sm font-medium text-slate-500">Total Fleet Revenue</p>
        <p className="text-2xl font-bold text-emerald-600">${summary.totalRevenue.toLocaleString()}</p>
      </div>
      <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
        <p className="text-sm font-medium text-slate-500">Total Fuel Expenses</p>
        <p className="text-2xl font-bold text-red-500">${summary.totalFuel.toLocaleString()}</p>
      </div>
      <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
        <p className="text-sm font-medium text-slate-500">Maintenance & Incidentals</p>
        <p className="text-2xl font-bold text-amber-600">${summary.totalExpenses.toLocaleString()}</p>
      </div>
      <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
        <p className="text-sm font-medium text-slate-500">Average Fleet ROI</p>
        <p className={`text-2xl font-bold ${summary.avgRoi >= 0 ? "text-blue-600" : "text-rose-600"}`}>
          {summary.avgRoi.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">🚚 TransitOps</h1>

      <nav className="flex flex-col gap-4">
        <a href="/dashboard">Dashboard</a>
        <a href="/vehicles">Vehicles</a>
        <a href="/drivers">Drivers</a>
        <a href="/trips">Trips</a>
        <a href="/maintenance">Maintenance</a>
        <a href="/fuel">Fuel</a>
        <a href="/expenses">Expenses</a>
        <a href="/reports">Reports</a>
      </nav>
    </aside>
  );
}
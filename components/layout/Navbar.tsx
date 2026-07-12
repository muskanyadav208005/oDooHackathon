export default function Navbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">TransitOps Dashboard</h2>

      <div className="flex items-center gap-4">
        <span>Admin</span>
      </div>
    </header>
  );
}
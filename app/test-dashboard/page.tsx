import ComprehensiveDashboard from '../components/dashboard/ComprehensiveDashboard';

export default function TestDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Test Dashboard (No Auth Required)</h1>
        <ComprehensiveDashboard />
      </div>
    </div>
  );
}

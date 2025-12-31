import React from 'react';
import { Users, AlertTriangle, Activity, Database, Trash2, Eye } from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

const AdminDashboard = () => {
  // Mock Data
  const stats = [
    { label: "Total Reports", value: "1,248", icon: Database, color: "bg-blue-100 text-blue-600" },
    { label: "Active Users", value: "856", icon: Users, color: "bg-purple-100 text-purple-600" },
    { label: "Severe Alerts", value: "24", icon: AlertTriangle, color: "bg-red-100 text-red-600" },
    { label: "System Health", value: "98%", icon: Activity, color: "bg-green-100 text-green-600" },
  ];

  const recentReports = [
    { id: 1, user: "Alex Johnson", location: "Downtown", severity: "Severe", date: "Jan 15, 2024" },
    { id: 2, user: "Sarah Connor", location: "Riverside", severity: "Minor", date: "Jan 14, 2024" },
    { id: 3, user: "Mike Smith", location: "North District", severity: "Moderate", date: "Jan 14, 2024" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-secondary-500 text-sm">{stat.label}</p>
              <h4 className="text-2xl font-bold text-secondary-900">{stat.value}</h4>
            </div>
          </Card>
        ))}
      </div>

      {/* Reports Management */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Recent Submissions</h2>
          <button className="text-primary-600 text-sm font-medium hover:underline">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-secondary-400 text-sm border-b border-secondary-100">
              <tr>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Severity</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-secondary-50 last:border-0 hover:bg-secondary-50/50 transition">
                  <td className="py-4 font-medium text-secondary-900">{report.user}</td>
                  <td className="py-4 text-secondary-600">{report.location}</td>
                  <td className="py-4"><Badge severity={report.severity} /></td>
                  <td className="py-4 text-secondary-500">{report.date}</td>
                  <td className="py-4 flex justify-end gap-2">
                    <button className="p-2 hover:bg-primary-50 text-primary-600 rounded-lg transition"><Eye size={18} /></button>
                    <button className="p-2 hover:bg-danger-50 text-danger-500 rounded-lg transition"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
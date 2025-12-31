import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const History = () => {
  const [reports, setReports] = useState([]);

  // Fetch reports from MongoDB on load
  useEffect(() => {
    fetch('http://localhost:3000/reports')
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error("Failed to load reports:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Your Reports</h1>
          <p className="text-secondary-500 mt-1">Manage and view your past disaster analysis reports.</p>
        </div>
        <div className="flex gap-2">
            <Link to="/upload">
              <Button>+ New Upload</Button>
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.length === 0 && <p>No reports found. Go upload one!</p>}
        
        {reports.map((report) => (
          <Card key={report._id} className="p-0 overflow-hidden group cursor-pointer hover:shadow-md transition-all">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={report.imageUrl || "https://via.placeholder.com/300"} 
                alt={report.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              />
              <div className="absolute top-3 right-3">
                <Badge severity={report.severity} />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-secondary-500 mb-2">
                <Calendar size={14} />
                {new Date(report.createdAt).toLocaleDateString()}
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 truncate">{report.title}</h3>
              <p className="text-sm text-secondary-500 mb-4 line-clamp-2">
                {report.description}
              </p>
              <Link to={`/report/${report._id}`}>
                <Button variant="secondary" className="w-full py-2 text-sm">View Full Report</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;
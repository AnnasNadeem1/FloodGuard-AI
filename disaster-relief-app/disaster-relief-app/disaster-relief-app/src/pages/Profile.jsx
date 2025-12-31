import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, Calendar, LogOut } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myReports, setMyReports] = useState([]);

  useEffect(() => {
    // 1. Load User from Local Storage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
        navigate('/auth'); // Redirect if not logged in
        return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // 2. Fetch YOUR reports only
    fetch(`http://localhost:3000/reports/user/${parsedUser.id}`)
        .then(res => res.json())
        .then(data => setMyReports(data))
        .catch(err => console.error("Error loading user reports:", err));

  }, [navigate]);

  const handleLogout = () => {
      localStorage.removeItem('user');
      navigate('/');
  };

  if (!user) return <div className="p-10 text-center">Loading Profile...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Profile Header */}
      <Card className="mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary-600 to-primary-400"></div>
        <div className="relative pt-16 px-6 pb-6 flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center text-secondary-300">
            <User size={64} />
          </div>
          <div className="flex-1 text-center sm:text-left mb-2">
            <h1 className="text-2xl font-bold text-secondary-900">{user.name}</h1>
            <p className="text-secondary-500">Disaster Response Coordinator</p>
          </div>
          <Button variant="danger" className="mb-2" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Info */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-secondary-900 mb-4">About</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-secondary-600">
                <Mail size={18} />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-secondary-600">
                <MapPin size={18} />
                <span className="text-sm">Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-secondary-600">
                <Calendar size={18} />
                <span className="text-sm">Active Member</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-secondary-900 mb-4">Your Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 p-3 rounded-xl text-center">
                <h4 className="text-2xl font-bold text-primary-600">{myReports.length}</h4>
                <p className="text-xs text-primary-700">Reports Submitted</p>
              </div>
              <div className="bg-success-50 p-3 rounded-xl text-center">
                <h4 className="text-2xl font-bold text-success-600">
                    {myReports.filter(r => r.status === 'Verified').length}
                </h4>
                <p className="text-xs text-success-700">Verified</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-secondary-900">Recent Submissions</h2>
            <Link to="/history" className="text-primary-600 text-sm font-medium hover:underline">
              View All Global Reports
            </Link>
          </div>

          {myReports.length === 0 && (
             <p className="text-secondary-500">You haven't submitted any reports yet.</p>
          )}

          {myReports.slice(0, 3).map((report) => (
            <Card 
              key={report._id} 
              className="flex flex-col sm:flex-row gap-4 p-4 hover:bg-secondary-50 transition cursor-pointer group"
              onClick={() => navigate(`/report/${report._id}`)}
            >
              <div className="w-full sm:w-32 h-32 sm:h-24 bg-secondary-200 rounded-lg overflow-hidden">
                <img 
                  src={report.imageUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                  alt="Disaster"
                />
              </div>

              <div className="flex-1 py-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-secondary-900">
                    {report.title}
                  </h4>
                  <Badge severity={report.severity} />
                </div>

                <p className="text-sm text-secondary-500 mt-1">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm text-secondary-600 mt-2 line-clamp-1">
                  {report.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
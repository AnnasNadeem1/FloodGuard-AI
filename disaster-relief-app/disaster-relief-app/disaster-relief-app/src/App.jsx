import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar'; 

import Home from './pages/Home';
import Auth from './pages/Auth';
import UploadPortal from './pages/UploadPortal';
import History from './pages/History';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import ReportDetails from './pages/ReportDetail';
import Emergency from './pages/Emergency'; 
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary-50 flex flex-col font-sans text-secondary-900">
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<Home />} />
            {/* About / Learn More */}
            <Route path="/about" element={<About />} />
            {/* Report Details */}
            <Route path="/report/:id" element={<ReportDetails />} />
            
            {/* Authentication (Login/Register) */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Core Features */}
            <Route path="/upload" element={<UploadPortal />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/emergency" element={<Emergency />} />
            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Fallback: Redirect any unknown URL to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <footer className="bg-white border-t border-secondary-100 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-secondary-500 text-sm">
            <p>© 2024 FloodGuard AI. Empowering Disaster Response.</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// IMPORTANT: Add 'Phone' to the imports
import { Menu, X, Home, Upload, User, FileText, Mail, Droplet, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-primary-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Droplet size={16} className="text-white" aria-hidden="true" />
            </div>
            <span>FloodGuard AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-secondary-600 hover:text-primary-600 flex items-center gap-2">
              <Home size={16} /> Home
            </Link>
            <Link to="/upload" className="text-secondary-600 hover:text-primary-600 flex items-center gap-2">
              <Upload size={16} /> Analyze
            </Link>
            <Link to="/history" className="text-secondary-600 hover:text-primary-600 flex items-center gap-2">
              <FileText size={16} /> Reports
            </Link>
            
            {/* --- NEW EMERGENCY BUTTON --- */}
            <Link to="/emergency">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center gap-2 shadow-md shadow-red-500/30 animate-pulse">
                    <Phone size={16} /> Emergency
                </button>
            </Link>
            {/* ---------------------------- */}

            {/* User Logic */}
            {user ? (
               <Link to="/profile" className="flex items-center gap-2 pl-4 border-l border-secondary-200">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
               </Link>
            ) : (
               <Link to="/auth">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition flex items-center gap-2">
                      <User size={16} /> Login
                  </button>
               </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Show emergency icon on mobile header too */}
             <Link to="/emergency" className="text-red-600">
                <Phone size={24} />
             </Link>
             <button onClick={() => setIsOpen(!isOpen)} className="text-secondary-500">
               {isOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-secondary-100 p-4 space-y-4 shadow-lg">
          <Link to="/" className="block text-secondary-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/upload" className="block text-secondary-600" onClick={() => setIsOpen(false)}>Analyze</Link>
          <Link to="/history" className="block text-secondary-600" onClick={() => setIsOpen(false)}>Reports</Link>
          
          <Link to="/emergency" className="block text-red-600 font-bold" onClick={() => setIsOpen(false)}>
            Emergency Hotlines
          </Link>

          {user ? (
             <Link to="/profile" className="block text-primary-600 font-bold" onClick={() => setIsOpen(false)}>
               My Profile ({user.name})
             </Link>
          ) : (
             <Link to="/auth" className="block text-primary-600 font-bold" onClick={() => setIsOpen(false)}>
               Login
             </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
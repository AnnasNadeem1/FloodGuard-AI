import React from 'react';
import { Search } from 'lucide-react';

export const Input = ({ label, icon: Icon, type = "text", placeholder, className, ...props }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-secondary-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          className={`w-full rounded-xl border border-secondary-200 bg-white py-3 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-secondary-900 placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
};
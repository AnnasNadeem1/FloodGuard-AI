import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30",
    secondary: "bg-white text-secondary-900 border border-secondary-200 hover:bg-secondary-50",
    danger: "bg-danger-50 text-danger-700 hover:bg-danger-100",
    ghost: "bg-transparent text-secondary-500 hover:text-primary-600"
  };

  return (
    <button className={twMerge(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  // 1. ADD STATE: This holds the data the user types
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  // 2. ADD HANDLER: This updates state when you type
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button Clicked!");
    console.log("Form Data being sent:", formData);

    const endpoint = isLogin ? 'http://localhost:3000/auth/login' : 'http://localhost:3000/auth/register';

    try {
      // 3. SEND DATA: Actually talk to the backend
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Something went wrong');
        return;
      }

      // 4. SUCCESS: Save user and redirect
      if (isLogin) {
        alert('Login Successful! Welcome ' + data.user.name);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/profile'); 
      } else {
        alert('Account Created! Please Login.');
        setIsLogin(true); // Switch to login tab
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Is the backend running?');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 animate-fade-in-up shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-secondary-500 text-sm mt-2">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Join FloodGuard to start analyzing disaster data'}
          </p>
        </div>

        <div className="flex p-1 bg-secondary-50 rounded-xl mb-8 border border-secondary-100">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              isLogin ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-500 hover:text-secondary-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              !isLogin ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-500 hover:text-secondary-700'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            // 5. BIND INPUTS: We added name="..." and onChange={handleChange}
            <Input 
              label="Full Name" 
              name="fullName"
              placeholder="e.g. Alex Johnson" 
              icon={User} 
              onChange={handleChange}
            />
          )}
          
          <Input 
            label="Email Address" 
            name="email"
            type="email" 
            placeholder="name@company.com" 
            icon={Mail} 
            onChange={handleChange}
          />
          <Input 
            label="Password" 
            name="password"
            type="password" 
            placeholder="••••••••" 
            icon={Lock} 
            onChange={handleChange}
          />

          {isLogin && (
            <div className="flex justify-end">
              <Link to="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Forgot Password?
              </Link>
            </div>
          )}

          <Button type="submit" className="w-full mt-6">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
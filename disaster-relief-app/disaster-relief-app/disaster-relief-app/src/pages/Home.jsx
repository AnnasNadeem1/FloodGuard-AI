import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Activity, Image as ImageIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white border-b border-secondary-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6 border border-primary-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Live Disaster Analysis System
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-secondary-900 tracking-tight mb-6">
            AI-Powered <span className="text-primary-600">Flood Severity</span> Detection
          </h1>
          
          <p className="text-xl text-secondary-500 max-w-2xl mb-10 leading-relaxed">
            Instantly analyze disaster imagery to classify flood severity, estimate damage, and coordinate relief efforts with precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/auth">
              <Button className="w-full sm:w-auto text-lg px-8 py-4">
                Get Started
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-200/20 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary-300/20 blur-3xl"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900">How It Works</h2>
          <p className="text-secondary-500 mt-2">Advanced technology simplified for rapid response.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow border-secondary-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-600 mb-4">
              <ImageIcon size={24} />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Upload Imagery</h3>
            <p className="text-secondary-500 leading-relaxed">
              Drag and drop drone footage, satellite images, or photos directly from the field.
            </p>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow border-secondary-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-600 mb-4">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">AI Analysis</h3>
            <p className="text-secondary-500 leading-relaxed">
              Our Computer Vision model instantly classifies flood severity levels (Minor, Moderate, Severe).
            </p>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-secondary-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-600 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Actionable Reports</h3>
            <p className="text-secondary-500 leading-relaxed">
              Generate detailed damage reports automatically to aid decision-making.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
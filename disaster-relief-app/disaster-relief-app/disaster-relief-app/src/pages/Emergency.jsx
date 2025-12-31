import React from 'react';
import { Phone, AlertTriangle, ShieldAlert, HeartHandshake } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const Emergency = () => {
  const hotlines = [
    {
      name: "Rescue 1122",
      number: "1122",
      desc: "Ambulance, Fire, and General Rescue",
      icon: ShieldAlert,
      color: "bg-red-100 text-red-600 border-red-200"
    },
    {
      name: "NDMA Helpline",
      number: "051-111-157-157",
      desc: "National Disaster Management Authority",
      icon: AlertTriangle,
      color: "bg-orange-100 text-orange-600 border-orange-200"
    },
    {
      name: "Edhi Ambulance",
      number: "115",
      desc: "Nationwide Emergency Ambulance Service",
      icon: HeartHandshake,
      color: "bg-green-100 text-green-600 border-green-200"
    },
    {
      name: "Police Emergency",
      number: "15",
      desc: "Immediate Police Assistance",
      icon: Phone,
      color: "bg-blue-100 text-blue-600 border-blue-200"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-full mb-4">
          <AlertTriangle size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Emergency Hotlines</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Immediate contacts for flood relief and emergency services in Pakistan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {hotlines.map((hotline, index) => (
          <Card key={index} className="p-6 border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${hotline.color}`}>
                  <hotline.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{hotline.name}</h3>
                  <p className="text-sm text-gray-500">{hotline.desc}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <a href={`tel:${hotline.number}`}>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg">
                  <Phone size={20} /> Call {hotline.number}
                </Button>
              </a>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <h4 className="font-bold text-yellow-800 text-lg mb-2">Safety Tip</h4>
        <p className="text-yellow-700">
          In case of severe flooding, move to higher ground immediately. Do not attempt to walk or drive through floodwaters.
        </p>
      </div>
    </div>
  );
};

export default Emergency;
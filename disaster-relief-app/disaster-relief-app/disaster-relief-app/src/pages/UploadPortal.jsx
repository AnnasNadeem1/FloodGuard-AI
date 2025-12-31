import React, { useState } from 'react';
import { UploadCloud, File, X, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useNavigate } from 'react-router-dom';

const UploadPortal = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  // --- THE FIXED FUNCTION ---
  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      // Send the user's text description (or a default if empty)
      formData.append('text', description || "Flood context");

      // Call NestJS (which calls Python)
      const res = await fetch('http://localhost:3000/reports/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setAnalyzing(false);

      // --- FIX: Better Severity Logic ---
      let calculatedSeverity = "Minor"; // Default if unsure

      // Your Python API returns things like "Flooded (Severe)", "Flooded (Moderate)", or "Non-Flooded"
      const resultString = data.final_result || "";

      if (resultString.includes("Severe")) {
        calculatedSeverity = "Severe";
      } else if (resultString.includes("Moderate")) {
        calculatedSeverity = "Moderate";
      } else if (resultString.includes("Non-Flooded")) {
        calculatedSeverity = "None"; // Or keep it as "Minor" depending on preference
      }
      // ----------------------------------

      // Save the result from Python + the Image URL from NestJS
      setResult({
        summary: data.final_result,          
        severity: calculatedSeverity,        // <--- Using the fixed logic here
        confidence: (data.confidence * 100).toFixed(1) + "%",
        imageUrl: data.imageUrl,             
        raw: data                            
      });

    } catch (err) {
      console.error(err);
      setAnalyzing(false);
      alert("Error analyzing image. Ensure backend is running.");
    }
  };

 const handleSave = async () => {
    if (!result) return;

    // 1. Get User from Storage
    const userString = localStorage.getItem('user');
    
    // --- DEBUG LOGS ---
    console.log("Found User in Storage:", userString); 
    // ------------------

    if (!userString) {
        alert("You must be logged in to save a report!");
        navigate('/auth');
        return;
    }
    const user = JSON.parse(userString);

    // --- DEBUG LOGS ---
    console.log("User ID to be sent:", user.id); 
    // ------------------

    try {
      const reportData = {
        title: "Flood Report - " + new Date().toLocaleTimeString(),
        description: description || result.summary,
        severity: result.severity,
        confidence: result.confidence,
        imageUrl: result.imageUrl,
        location: "Detected by AI", 
        status: "Pending",
        ownerId: user.id // <--- THIS IS THE KEY FIELD
      };

      console.log("Sending Report Data:", reportData); // Check console for this!

      const res = await fetch('http://localhost:3000/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (res.ok) {
        alert('Report Saved Successfully!');
        navigate('/history');
      } else {
        const errorData = await res.json();
        console.error("Server Error:", errorData); // Print server error
        alert('Failed to save report.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-secondary-900">Analyze Disaster Image</h1>
        <p className="text-secondary-500 mt-2">Upload an image and description to detect flood severity.</p>
      </div>

      <Card className="mb-6">
        {!file ? (
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-primary-200 rounded-xl p-10 flex flex-col items-center justify-center bg-primary-50/50 hover:bg-primary-50 transition-colors cursor-pointer"
          >
            <div className="bg-primary-100 p-4 rounded-full mb-4">
              <UploadCloud className="text-primary-600 w-8 h-8" />
            </div>
            <p className="text-secondary-600 font-medium">Drag and drop an image here</p>
            <p className="text-secondary-400 text-sm mt-1">or</p>
            <label className="mt-4">
              <span className="bg-primary-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-700 transition">Choose File</span>
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>
        ) : (
          <div className="relative">
             <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
             <button 
               onClick={() => { setFile(null); setResult(null); }}
               className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md text-secondary-600 hover:text-danger-500"
             >
               <X size={20} />
             </button>
             <div className="mt-4 flex items-center gap-2 text-secondary-600">
               <File size={16} />
               <span className="text-sm font-medium">{file.name}</span>
             </div>
          </div>
        )}

        <textarea 
          className="w-full mt-6 p-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none bg-gray-100 text-gray-900"
          rows="3"
          placeholder="Describe the disaster context (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="mt-6">
          <Button 
            onClick={handleAnalyze} 
            disabled={!file || analyzing} 
            className="w-full"
          >
            {analyzing ? <><Loader2 className="animate-spin" /> Processing with AI...</> : "Analyze Image"}
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="animate-fade-in-up">
          <Card className={`border-l-4 ${result.severity === 'None' ? 'border-l-green-500' : 'border-l-danger-500'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">AI Analysis Results</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                  result.severity === 'None' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-danger-100 text-danger-700 border-danger-200'
                }`}>
                {result.severity}
              </span>
            </div>
            <p className="text-secondary-600 leading-relaxed mb-4">
              <strong>Prediction:</strong> {result.summary} <br/>
              <strong>Confidence:</strong> {result.confidence}
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" className="flex-1">Download Report</Button>
              <Button variant="primary" className="flex-1" onClick={handleSave}>Save to History</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UploadPortal;
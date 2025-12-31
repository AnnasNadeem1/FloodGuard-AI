import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Badge } from '../components/Badge'; // Make sure you have this component
import { Button } from '../components/Button'; // And this one

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific report using the ID from the URL
    fetch(`http://localhost:3000/reports/${id}`)
      .then(res => res.json())
      .then(data => {
        setReport(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching report:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading Report...</div>;
  if (!report) return <div className="p-10 text-center">Report not found.</div>;

  return (
    <div className="bg-[#F9FBFF] min-h-screen text-gray-800">
      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-4">
          <Link to="/history" className="text-sm text-primary-600 hover:underline">← Back to Reports</Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
        <p className="text-gray-600">
          Submitted on {new Date(report.createdAt).toLocaleString()}
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid lg:grid-cols-3 gap-10">
        {/* LEFT: IMAGE + SUMMARY */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <img
              src={report.imageUrl}
              alt={report.title}
              className="rounded-xl w-full object-cover"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold mb-4">Damage Summary</h3>
            <p className="text-gray-600 leading-relaxed">
              {report.description}
            </p>
          </div>
        </div>

        {/* RIGHT: AI ANALYSIS */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold mb-6">AI Analysis Results</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Flood Severity</p>
                <div className="mt-1">
                   <Badge severity={report.severity} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Confidence Level</p>
                <p className="font-semibold">{report.confidence || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-semibold">{report.status}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportDetails;
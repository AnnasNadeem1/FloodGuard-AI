import React, { useEffect, useState } from 'react';
import { Activity, Server, AlertTriangle, RefreshCw } from 'lucide-react';

const SystemStatus = () => {
	const [metrics, setMetrics] = useState({
		uptime: 99.8,
		avgResponseMs: 240,
		activeAlerts: 2,
		reportsProcessedToday: 1248,
	});

	const [lastUpdated, setLastUpdated] = useState(() => new Date());

	// simple mock updater to simulate live status
	useEffect(() => {
		const id = setInterval(() => {
			setMetrics((m) => ({
				uptime: Math.max(95, Math.min(99.99, +(m.uptime + (Math.random() - 0.5) * 0.05).toFixed(2))),
				avgResponseMs: Math.max(100, Math.round(m.avgResponseMs + (Math.random() - 0.5) * 20)),
				activeAlerts: Math.max(0, m.activeAlerts + (Math.random() > 0.9 ? 1 : 0) - (Math.random() > 0.95 ? 1 : 0)),
				reportsProcessedToday: m.reportsProcessedToday + Math.round(Math.random() * 5),
			}));
			setLastUpdated(new Date());
		}, 5000);

		return () => clearInterval(id);
	}, []);

	function refreshNow() {
		setMetrics((m) => ({ ...m, reportsProcessedToday: m.reportsProcessedToday + Math.round(Math.random() * 3) }));
		setLastUpdated(new Date());
	}

	const incidents = [
		{ id: 1, title: 'Image processing queue delay', severity: 'minor', time: '2m ago' },
		{ id: 2, title: 'Model inference spike', severity: 'major', time: '18m ago' },
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold">System Status</h1>
					<p className="text-sm text-secondary-500">Live overview of system health and recent incidents</p>
				</div>
				<div className="flex items-center gap-3">
					<button onClick={refreshNow} className="inline-flex items-center gap-2 px-3 py-2 bg-secondary-50 rounded-md hover:bg-secondary-100">
						<RefreshCw size={16} /> Refresh Now
					</button>
					<div className="text-sm text-secondary-500">Updated: {lastUpdated.toLocaleTimeString()}</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
					<Server className="text-primary-600" />
					<div>
						<div className="text-sm text-secondary-500">Uptime</div>
						<div className="text-xl font-bold">{metrics.uptime}%</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
					<Activity className="text-primary-600" />
					<div>
						<div className="text-sm text-secondary-500">Avg Response</div>
						<div className="text-xl font-bold">{metrics.avgResponseMs} ms</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
					<AlertTriangle className="text-primary-600" />
					<div>
						<div className="text-sm text-secondary-500">Active Alerts</div>
						<div className="text-xl font-bold">{metrics.activeAlerts}</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
					<div className="rounded-lg bg-primary-50 p-2">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h2a7 7 0 0 0 7 7h0" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12h-2a7 7 0 0 0-7-7h0" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
					</div>
					<div>
						<div className="text-sm text-secondary-500">Reports Processed</div>
						<div className="text-xl font-bold">{metrics.reportsProcessedToday}</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white rounded-2xl p-6 shadow-sm">
					<h3 className="font-bold mb-4">Recent Incidents</h3>
					<ul className="space-y-3">
						{incidents.map((it) => (
							<li key={it.id} className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<span className={`inline-block w-2.5 h-2.5 rounded-full ${it.severity === 'major' ? 'bg-red-600' : 'bg-yellow-400'}`}></span>
									<div>
										<div className="font-medium">{it.title}</div>
										<div className="text-sm text-secondary-500">{it.time}</div>
									</div>
								</div>
								<div className="text-sm text-secondary-500">View</div>
							</li>
						))}
					</ul>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-sm">
					<h3 className="font-bold mb-4">Health Timeline (mock)</h3>
					<div className="text-sm text-secondary-500 mb-3">This mini timeline shows recent changes to key metrics.</div>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<div className="text-sm">Uptime</div>
							<div className="font-medium">{metrics.uptime}%</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-sm">Avg Response</div>
							<div className="font-medium">{metrics.avgResponseMs} ms</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-sm">Active Alerts</div>
							<div className="font-medium">{metrics.activeAlerts}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SystemStatus;


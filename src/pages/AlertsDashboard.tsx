import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell, MapPin, Clock, ChevronRight, Filter } from 'lucide-react';
import { kenyaCounties, getRiskLevel } from '@/data/kenyaCounties';

interface Alert {
  id: string;
  county: string;
  type: 'threshold' | 'shift' | 'unusual';
  severity: 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const mockAlerts: Alert[] = [
  { id: '1', county: 'Mandera', type: 'threshold', severity: 'critical', message: 'Negative sentiment exceeded 70% threshold. Cross-border security concerns dominating discourse.', timestamp: '2024-01-15T14:30:00Z', resolved: false },
  { id: '2', county: 'Turkana', type: 'shift', severity: 'critical', message: 'Sudden 15% increase in CRI. Cattle rustling mentions surging in local languages.', timestamp: '2024-01-15T12:00:00Z', resolved: false },
  { id: '3', county: 'Wajir', type: 'threshold', severity: 'high', message: 'Clan conflict discussions intensifying. Negative sentiment at 55%.', timestamp: '2024-01-15T10:00:00Z', resolved: false },
  { id: '4', county: 'West Pokot', type: 'shift', severity: 'high', message: 'Banditry attack reports increasing. CRI rose by 10 points in 48 hours.', timestamp: '2024-01-14T22:00:00Z', resolved: false },
  { id: '5', county: 'Marsabit', type: 'unusual', severity: 'high', message: 'Unusual spike in drought-related negative sentiment. Inter-ethnic tensions rising.', timestamp: '2024-01-14T18:00:00Z', resolved: false },
  { id: '6', county: 'Baringo', type: 'shift', severity: 'high', message: 'Significant increase in security-related discussions. CRI trending upward.', timestamp: '2024-01-14T15:00:00Z', resolved: true },
  { id: '7', county: 'Garissa', type: 'threshold', severity: 'high', message: 'Negative sentiment rose above 50%. University security and refugee integration concerns.', timestamp: '2024-01-14T09:00:00Z', resolved: true },
  { id: '8', county: 'Narok', type: 'unusual', severity: 'high', message: 'Unexpected surge in land-related disputes during seasonal migration.', timestamp: '2024-01-13T20:00:00Z', resolved: true },
];

const AlertsDashboard = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high'>('all');

  const filtered = mockAlerts.filter(a => {
    if (filter === 'active' && a.resolved) return false;
    if (filter === 'resolved' && !a.resolved) return false;
    if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
    return true;
  });

  const activeCount = mockAlerts.filter(a => !a.resolved).length;
  const criticalCount = mockAlerts.filter(a => !a.resolved && a.severity === 'critical').length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Alerts', value: activeCount, color: 'text-risk-high' },
          { label: 'Critical', value: criticalCount, color: 'text-risk-critical' },
          { label: 'Resolved Today', value: mockAlerts.filter(a => a.resolved).length, color: 'text-risk-low' },
          { label: 'Counties Affected', value: new Set(mockAlerts.filter(a => !a.resolved).map(a => a.county)).size, color: 'text-accent' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {(['all', 'active', 'resolved'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="w-px h-5 bg-border mx-1" />
        {(['all', 'critical', 'high'] as const).map(f => (
          <button key={f} onClick={() => setSeverityFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${severityFilter === f ? 'bg-risk-high text-foreground' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'}`}>
            {f === 'all' ? 'All Severity' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {filtered.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card p-4 ${!alert.resolved && alert.severity === 'critical' ? 'border border-risk-critical/30' : ''} ${alert.resolved ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {alert.severity === 'critical' ? (
                  <AlertTriangle className="w-4 h-4 text-risk-critical animate-pulse" />
                ) : (
                  <Bell className="w-4 h-4 text-risk-high" />
                )}
                <span className="font-medium text-foreground">{alert.county}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${alert.severity === 'critical' ? 'bg-risk-critical/20 text-risk-critical' : 'bg-risk-high/20 text-risk-high'}`}>
                  {alert.severity}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{alert.type}</span>
              </div>
              {alert.resolved && <span className="text-xs text-risk-low">✓ Resolved</span>}
            </div>
            <p className="text-sm text-foreground/90 mb-2">{alert.message}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {new Date(alert.timestamp).toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertsDashboard;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';
import { kenyaCounties, getRiskLevel } from '@/data/kenyaCounties';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const riskClasses: Record<string, string> = {
  low: 'bg-risk-low/20 text-risk-low',
  medium: 'bg-risk-medium/20 text-risk-medium',
  high: 'bg-risk-high/20 text-risk-high',
  critical: 'bg-risk-critical/20 text-risk-critical',
};

const riskFills: Record<string, string> = {
  low: 'hsl(145,65%,42%)',
  medium: 'hsl(38,92%,50%)',
  high: 'hsl(0,75%,55%)',
  critical: 'hsl(0,85%,45%)',
};

const RiskIndex = () => {
  const [sortBy, setSortBy] = useState<'cri' | 'name' | 'change'>('cri');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = [...kenyaCounties].sort((a, b) => {
    const mul = sortDir === 'desc' ? -1 : 1;
    if (sortBy === 'cri') return (a.cri - b.cri) * mul;
    if (sortBy === 'change') return (Math.abs(a.recentChange) - Math.abs(b.recentChange)) * mul;
    return a.name.localeCompare(b.name) * mul;
  });

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortDir('desc'); }
  };

  const chartData = sorted.slice(0, 15).map(c => ({
    name: c.name.length > 10 ? c.name.slice(0, 10) + '…' : c.name,
    cri: c.cri,
    risk: getRiskLevel(c.cri),
  }));

  return (
    <div className="space-y-6">
      {/* Risk distribution summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Low Risk', count: kenyaCounties.filter(c => c.cri < 35).length, cls: 'text-risk-low' },
          { label: 'Moderate', count: kenyaCounties.filter(c => c.cri >= 35 && c.cri < 55).length, cls: 'text-risk-medium' },
          { label: 'High Risk', count: kenyaCounties.filter(c => c.cri >= 55 && c.cri < 75).length, cls: 'text-risk-high' },
          { label: 'Critical', count: kenyaCounties.filter(c => c.cri >= 75).length, cls: 'text-risk-critical' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`font-display font-bold text-2xl ${s.cls}`}>{s.count} counties</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4">
        <h3 className="font-display font-semibold text-foreground mb-4">Top 15 Counties by Risk</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,20%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={80} tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,25%,12%)', border: '1px solid hsl(220,15%,25%)', borderRadius: '8px' }} />
              <Bar dataKey="cri" radius={[0, 4, 4, 0]}>
                {chartData.map((d, i) => <Cell key={i} fill={riskFills[d.risk]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Rank</th>
                <th className="text-left px-4 py-3 cursor-pointer hover:text-foreground text-xs text-muted-foreground font-medium" onClick={() => toggleSort('name')}>
                  <span className="flex items-center gap-1">County <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left px-4 py-3 cursor-pointer hover:text-foreground text-xs text-muted-foreground font-medium" onClick={() => toggleSort('cri')}>
                  <span className="flex items-center gap-1">CRI Score <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Classification</th>
                <th className="text-left px-4 py-3 cursor-pointer hover:text-foreground text-xs text-muted-foreground font-medium" onClick={() => toggleSort('change')}>
                  <span className="flex items-center gap-1">Change <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium hidden md:table-cell">Neg. Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => {
                const risk = getRiskLevel(c.cri);
                return (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-2.5 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-2.5 font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${c.cri}%`, backgroundColor: riskFills[risk] }} />
                        </div>
                        <span className="font-medium text-foreground">{c.cri}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${riskClasses[risk]}`}>
                        {risk === 'low' ? 'Low Risk' : risk === 'medium' ? 'Moderate' : risk === 'high' ? 'High Risk' : 'Critical'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      {c.recentChange !== 0 && (
                        <span className={`flex items-center gap-1 text-xs ${c.recentChange > 0 ? 'text-risk-high' : 'text-risk-low'}`}>
                          {c.recentChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {c.recentChange > 0 ? '+' : ''}{c.recentChange}%
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground hidden md:table-cell">{c.sentiment.negative}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiskIndex;

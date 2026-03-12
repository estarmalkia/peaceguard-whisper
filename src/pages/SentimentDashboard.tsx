import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { kenyaCounties } from '@/data/kenyaCounties';

const timeSeriesData = [
  { day: 'Mon', positive: 42, neutral: 33, negative: 25 },
  { day: 'Tue', positive: 38, neutral: 35, negative: 27 },
  { day: 'Wed', positive: 35, neutral: 30, negative: 35 },
  { day: 'Thu', positive: 40, neutral: 28, negative: 32 },
  { day: 'Fri', positive: 33, neutral: 32, negative: 35 },
  { day: 'Sat', positive: 30, neutral: 35, negative: 35 },
  { day: 'Sun', positive: 36, neutral: 30, negative: 34 },
];

const tooltipStyle = {
  backgroundColor: 'hsl(220,25%,12%)',
  border: '1px solid hsl(220,15%,25%)',
  borderRadius: '8px',
};

const SentimentDashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = [
    { id: 'all', label: 'All Kenya' },
    { id: 'coast', label: 'Coast' },
    { id: 'central', label: 'Central' },
    { id: 'rift-valley', label: 'Rift Valley' },
    { id: 'western', label: 'Western' },
    { id: 'eastern', label: 'Eastern' },
    { id: 'north-eastern', label: 'North Eastern' },
    { id: 'nyanza', label: 'Nyanza' },
    { id: 'nairobi', label: 'Nairobi' },
  ];

  const countyComparison = kenyaCounties
    .slice(0, 12)
    .map(c => ({
      name: c.name.length > 8 ? c.name.slice(0, 8) + '…' : c.name,
      positive: c.sentiment.positive,
      neutral: c.sentiment.neutral,
      negative: c.sentiment.negative,
    }));

  const avgSentiment = {
    positive: Math.round(kenyaCounties.reduce((s, c) => s + c.sentiment.positive, 0) / kenyaCounties.length),
    neutral: Math.round(kenyaCounties.reduce((s, c) => s + c.sentiment.neutral, 0) / kenyaCounties.length),
    negative: Math.round(kenyaCounties.reduce((s, c) => s + c.sentiment.negative, 0) / kenyaCounties.length),
  };

  const pieData = [
    { name: 'Positive', value: avgSentiment.positive },
    { name: 'Neutral', value: avgSentiment.neutral },
    { name: 'Negative', value: avgSentiment.negative },
  ];
  const pieColors = ['hsl(145,65%,42%)', 'hsl(200,20%,50%)', 'hsl(0,75%,55%)'];

  return (
    <div className="space-y-6">
      {/* Region filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {regions.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedRegion(r.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedRegion === r.id ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Sentiment Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Positive', value: avgSentiment.positive, emoji: '🙂', color: 'text-sentiment-positive' },
          { label: 'Neutral', value: avgSentiment.neutral, emoji: '😐', color: 'text-sentiment-neutral' },
          { label: 'Negative', value: avgSentiment.negative, emoji: '😡', color: 'text-sentiment-negative' },
        ].map(s => (
          <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-4 text-center">
            <span className="text-2xl">{s.emoji}</span>
            <p className={`font-display font-bold text-2xl ${s.color}`}>{s.value}%</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Time Series */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <h3 className="font-display font-semibold text-foreground mb-4">Sentiment Trends (7 Days)</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData}>
                <defs>
                  <linearGradient id="posG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145,65%,42%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(145,65%,42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="negG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0,75%,55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0,75%,55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,20%)" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="positive" stroke="hsl(145,65%,42%)" strokeWidth={2} fill="url(#posG)" />
                <Area type="monotone" dataKey="neutral" stroke="hsl(200,20%,50%)" strokeWidth={2} fillOpacity={0} />
                <Area type="monotone" dataKey="negative" stroke="hsl(0,75%,55%)" strokeWidth={2} fill="url(#negG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <h3 className="font-display font-semibold text-foreground mb-4">Sentiment Distribution</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={5} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* County Comparison */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-4">
        <h3 className="font-display font-semibold text-foreground mb-4">County Sentiment Comparison</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,20%)" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill="hsl(145,65%,42%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="neutral" stackId="a" fill="hsl(200,20%,50%)" />
              <Bar dataKey="negative" stackId="a" fill="hsl(0,75%,55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default SentimentDashboard;

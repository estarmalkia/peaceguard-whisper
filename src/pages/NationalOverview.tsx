import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { Users, MessageSquare, TrendingUp, TrendingDown, MapPin, Activity } from 'lucide-react';
import { kenyaCounties } from '@/data/kenyaCounties';

const NationalOverview = () => {
  const totalPopulation = kenyaCounties.reduce((s, c) => s + c.population, 0);
  const avgSentiment = {
    positive: Math.round(kenyaCounties.reduce((s, c) => s + c.sentiment.positive, 0) / kenyaCounties.length),
    neutral: Math.round(kenyaCounties.reduce((s, c) => s + c.sentiment.neutral, 0) / kenyaCounties.length),
    negative: Math.round(kenyaCounties.reduce((s, c) => s + c.sentiment.negative, 0) / kenyaCounties.length),
  };

  const topEngaged = [...kenyaCounties]
    .sort((a, b) => b.topTopics.reduce((s, t) => s + t.mentions, 0) - a.topTopics.reduce((s, t) => s + t.mentions, 0))
    .slice(0, 8);

  const biggestShifts = [...kenyaCounties]
    .sort((a, b) => Math.abs(b.recentChange) - Math.abs(a.recentChange))
    .slice(0, 6);

  const pieData = [
    { name: 'Positive', value: avgSentiment.positive },
    { name: 'Neutral', value: avgSentiment.neutral },
    { name: 'Negative', value: avgSentiment.negative },
  ];
  const pieColors = ['hsl(145, 65%, 42%)', 'hsl(200, 20%, 50%)', 'hsl(0, 75%, 55%)'];

  const riskDistribution = [
    { risk: 'Low', count: kenyaCounties.filter(c => c.cri < 35).length },
    { risk: 'Medium', count: kenyaCounties.filter(c => c.cri >= 35 && c.cri < 55).length },
    { risk: 'High', count: kenyaCounties.filter(c => c.cri >= 55 && c.cri < 75).length },
    { risk: 'Critical', count: kenyaCounties.filter(c => c.cri >= 75).length },
  ];
  const riskColors = ['hsl(145, 65%, 42%)', 'hsl(38, 92%, 50%)', 'hsl(0, 75%, 55%)', 'hsl(0, 85%, 45%)'];

  const totalMentions = kenyaCounties.reduce((s, c) => s + c.topTopics.reduce((ss, t) => ss + t.mentions, 0), 0);

  const statCards = [
    { label: 'Total Counties', value: '47', icon: MapPin, color: 'text-primary' },
    { label: 'Feedback Collected', value: totalMentions.toLocaleString(), icon: MessageSquare, color: 'text-info' },
    { label: 'Active Alerts', value: kenyaCounties.filter(c => c.cri >= 65).length.toString(), icon: Activity, color: 'text-risk-high' },
    { label: 'Population Covered', value: `${(totalPopulation / 1_000_000).toFixed(1)}M`, icon: Users, color: 'text-accent' },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="font-display font-bold text-2xl text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Sentiment Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <h3 className="font-display font-semibold text-foreground mb-4">National Sentiment Overview</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220,25%,12%)', border: '1px solid hsl(220,15%,25%)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-sm">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                <span className="text-muted-foreground">{d.name}: {d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-4">
          <h3 className="font-display font-semibold text-foreground mb-4">Risk Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,20%)" />
                <XAxis dataKey="risk" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220,25%,12%)', border: '1px solid hsl(220,15%,25%)', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {riskDistribution.map((_, i) => <Cell key={i} fill={riskColors[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Engaged & Biggest Shifts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-4">
          <h3 className="font-display font-semibold text-foreground mb-4">Top Engaged Counties</h3>
          <div className="space-y-2">
            {topEngaged.map((c, i) => {
              const mentions = c.topTopics.reduce((s, t) => s + t.mentions, 0);
              return (
                <div key={c.id} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-5">#{i + 1}</span>
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{mentions.toLocaleString()} mentions</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-4">
          <h3 className="font-display font-semibold text-foreground mb-4">Biggest Sentiment Shifts</h3>
          <div className="space-y-2">
            {biggestShifts.map(c => (
              <div key={c.id} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-foreground">{c.name}</span>
                <div className={`flex items-center gap-1 text-sm font-medium ${c.recentChange > 0 ? 'text-risk-high' : 'text-risk-low'}`}>
                  {c.recentChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {c.recentChange > 0 ? '+' : ''}{c.recentChange}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NationalOverview;

import { motion } from 'framer-motion';
import { FileBarChart, TrendingUp, TrendingDown, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Initiative {
  id: string;
  name: string;
  county: string;
  startDate: string;
  status: 'active' | 'completed' | 'planned';
  sentimentBefore: number;
  sentimentAfter: number;
  criBefore: number;
  criAfter: number;
  description: string;
}

const initiatives: Initiative[] = [
  { id: '1', name: 'Wajir Peace Dialogue', county: 'Wajir', startDate: '2023-11-01', status: 'active', sentimentBefore: 18, sentimentAfter: 30, criBefore: 78, criAfter: 75, description: 'Community elder-led peace dialogues to address clan conflicts.' },
  { id: '2', name: 'Makueni Healthcare Program', county: 'Makueni', startDate: '2023-06-15', status: 'completed', sentimentBefore: 35, sentimentAfter: 48, criBefore: 45, criAfter: 34, description: 'Universal healthcare pilot program with community clinics.' },
  { id: '3', name: 'Turkana Water Project', county: 'Turkana', startDate: '2023-09-01', status: 'active', sentimentBefore: 12, sentimentAfter: 15, criBefore: 82, criAfter: 78, description: 'Borehole drilling and water distribution infrastructure.' },
  { id: '4', name: 'Nakuru Anti-Hate Campaign', county: 'Nakuru', startDate: '2023-12-01', status: 'active', sentimentBefore: 25, sentimentAfter: 35, criBefore: 65, criAfter: 58, description: 'Social media counter-narrative campaign in multiple languages.' },
  { id: '5', name: 'Mombasa Youth Employment', county: 'Mombasa', startDate: '2023-08-01', status: 'completed', sentimentBefore: 38, sentimentAfter: 45, criBefore: 42, criAfter: 35, description: 'Vocational training and job placement for at-risk youth.' },
  { id: '6', name: 'Marsabit Conflict Resolution', county: 'Marsabit', startDate: '2024-01-01', status: 'planned', sentimentBefore: 20, sentimentAfter: 20, criBefore: 68, criAfter: 68, description: 'Inter-ethnic mediation through traditional justice mechanisms.' },
];

const trendData = [
  { month: 'Jul', avgCRI: 52, interventions: 2 },
  { month: 'Aug', avgCRI: 50, interventions: 3 },
  { month: 'Sep', avgCRI: 48, interventions: 4 },
  { month: 'Oct', avgCRI: 47, interventions: 4 },
  { month: 'Nov', avgCRI: 45, interventions: 5 },
  { month: 'Dec', avgCRI: 44, interventions: 5 },
  { month: 'Jan', avgCRI: 43, interventions: 6 },
];

const statusColors = {
  active: 'bg-info/20 text-info',
  completed: 'bg-risk-low/20 text-risk-low',
  planned: 'bg-secondary text-muted-foreground',
};

const PolicyImpact = () => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Initiatives', value: initiatives.filter(i => i.status === 'active').length, icon: Clock, color: 'text-info' },
          { label: 'Completed', value: initiatives.filter(i => i.status === 'completed').length, icon: CheckCircle2, color: 'text-risk-low' },
          { label: 'Avg CRI Reduction', value: '-4.5', icon: TrendingDown, color: 'text-risk-low' },
          { label: 'Counties Covered', value: new Set(initiatives.map(i => i.county)).size, icon: MapPin, color: 'text-accent' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4">
        <h3 className="font-display font-semibold text-foreground mb-4">Impact Trend Over Time</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,20%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,25%,12%)', border: '1px solid hsl(220,15%,25%)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="avgCRI" stroke="hsl(165,60%,45%)" strokeWidth={2} dot={{ fill: 'hsl(165,60%,45%)' }} name="Avg CRI" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Initiatives */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">Initiatives</h3>
        {initiatives.map((init, i) => {
          const sentimentChange = init.sentimentAfter - init.sentimentBefore;
          const criChange = init.criAfter - init.criBefore;
          return (
            <motion.div
              key={init.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-display font-semibold text-foreground">{init.name}</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {init.county} • Started {init.startDate}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[init.status]}`}>{init.status}</span>
              </div>
              <p className="text-sm text-foreground/80 mb-4">{init.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-secondary/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground">Pos. Sentiment Before</p>
                  <p className="font-display font-semibold text-foreground">{init.sentimentBefore}%</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground">Pos. Sentiment After</p>
                  <p className={`font-display font-semibold ${sentimentChange > 0 ? 'text-risk-low' : 'text-foreground'}`}>{init.sentimentAfter}%</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground">CRI Before</p>
                  <p className="font-display font-semibold text-foreground">{init.criBefore}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground">CRI After</p>
                  <p className={`font-display font-semibold ${criChange < 0 ? 'text-risk-low' : 'text-foreground'}`}>{init.criAfter}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PolicyImpact;

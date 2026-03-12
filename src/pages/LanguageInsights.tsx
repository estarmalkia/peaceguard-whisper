import { motion } from 'framer-motion';
import { Languages, Globe2, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { sentimentDictionary } from '@/data/sentimentDictionary';

const languageDistribution = [
  { name: 'English', value: 35, color: 'hsl(200,80%,55%)' },
  { name: 'Kiswahili', value: 30, color: 'hsl(145,65%,42%)' },
  { name: 'Sheng', value: 15, color: 'hsl(280,60%,55%)' },
  { name: 'Kikamba', value: 8, color: 'hsl(38,92%,50%)' },
  { name: 'Dholuo', value: 5, color: 'hsl(0,75%,55%)' },
  { name: 'Kikuyu', value: 4, color: 'hsl(165,60%,45%)' },
  { name: 'Other', value: 3, color: 'hsl(215,15%,55%)' },
];

const sentimentByLanguage = [
  { lang: 'English', positive: 40, neutral: 35, negative: 25 },
  { lang: 'Kiswahili', positive: 38, neutral: 30, negative: 32 },
  { lang: 'Sheng', positive: 30, neutral: 25, negative: 45 },
  { lang: 'Kikamba', positive: 45, neutral: 30, negative: 25 },
  { lang: 'Dholuo', positive: 25, neutral: 30, negative: 45 },
  { lang: 'Kikuyu', positive: 42, neutral: 33, negative: 25 },
];

const regionalPatterns = [
  { region: 'Coast', primary: 'Kiswahili', secondary: 'Mijikenda', usage: '45% Kiswahili' },
  { region: 'Central', primary: 'Kikuyu', secondary: 'English', usage: '40% Kikuyu' },
  { region: 'Rift Valley', primary: 'Kalenjin', secondary: 'Kiswahili', usage: '35% Kalenjin' },
  { region: 'Western', primary: 'Luhya', secondary: 'English', usage: '38% Luhya' },
  { region: 'Nyanza', primary: 'Dholuo', secondary: 'Kiswahili', usage: '42% Dholuo' },
  { region: 'Eastern', primary: 'Kikamba', secondary: 'Kiswahili', usage: '35% Kikamba' },
  { region: 'North Eastern', primary: 'Somali', secondary: 'Kiswahili', usage: '55% Somali' },
  { region: 'Nairobi', primary: 'Sheng', secondary: 'English', usage: '30% Sheng' },
];

const tooltipStyle = {
  backgroundColor: 'hsl(220,25%,12%)',
  border: '1px solid hsl(220,15%,25%)',
  borderRadius: '8px',
};

const sentimentColors: Record<string, string> = {
  positive: 'bg-sentiment-positive/20 text-sentiment-positive',
  neutral: 'bg-sentiment-neutral/20 text-sentiment-neutral',
  negative: 'bg-sentiment-negative/20 text-sentiment-negative',
};

const LanguageInsights = () => {
  const groupedDict = sentimentDictionary.reduce((acc, entry) => {
    if (!acc[entry.language]) acc[entry.language] = [];
    acc[entry.language].push(entry);
    return acc;
  }, {} as Record<string, typeof sentimentDictionary>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Language Distribution Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-primary" /> Language Distribution
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={languageDistribution} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {languageDistribution.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sentiment by Language */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" /> Sentiment by Language
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentByLanguage}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,20%)" />
                <XAxis dataKey="lang" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 10 }} />
                <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Bar dataKey="positive" stackId="a" fill="hsl(145,65%,42%)" />
                <Bar dataKey="neutral" stackId="a" fill="hsl(200,20%,50%)" />
                <Bar dataKey="negative" stackId="a" fill="hsl(0,75%,55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Regional Language Patterns */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-4">
        <h3 className="font-display font-semibold text-foreground mb-4">Regional Language Patterns</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {regionalPatterns.map(r => (
            <div key={r.region} className="bg-secondary/50 rounded-lg p-3">
              <p className="font-medium text-foreground text-sm">{r.region}</p>
              <p className="text-xs text-muted-foreground mt-1">Primary: {r.primary}</p>
              <p className="text-xs text-muted-foreground">Secondary: {r.secondary}</p>
              <p className="text-xs text-primary mt-1">{r.usage}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Local Sentiment Dictionary */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-4">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Languages className="w-4 h-4 text-primary" /> Local Sentiment Dictionary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(groupedDict).map(([lang, entries]) => (
            <div key={lang} className="bg-secondary/30 rounded-lg p-3">
              <h4 className="font-medium text-foreground capitalize mb-2">{lang}</h4>
              <div className="space-y-1.5">
                {entries.map(e => (
                  <div key={e.word} className="flex items-center justify-between">
                    <span className="text-sm text-foreground font-medium">{e.word}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${sentimentColors[e.sentiment]}`}>{e.sentiment}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageInsights;

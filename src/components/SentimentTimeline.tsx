import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Sample sentiment data over time
const sentimentData = [
  { time: '00:00', positive: 45, neutral: 35, negative: 20 },
  { time: '04:00', positive: 42, neutral: 38, negative: 20 },
  { time: '08:00', positive: 38, neutral: 32, negative: 30 },
  { time: '12:00', positive: 35, neutral: 30, negative: 35 },
  { time: '16:00', positive: 32, neutral: 28, negative: 40 },
  { time: '20:00', positive: 30, neutral: 32, negative: 38 },
  { time: 'Now', positive: 33, neutral: 30, negative: 37 },
];

interface SentimentTimelineProps {
  countyName?: string;
}

const SentimentTimeline = ({ countyName }: SentimentTimelineProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-4 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-foreground">
            Sentiment Timeline
          </h3>
          <p className="text-xs text-muted-foreground">
            {countyName ? `${countyName} - Last 24 hours` : 'National - Last 24 hours'}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-sentiment-positive"></div>
            <span className="text-muted-foreground">Positive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-sentiment-neutral"></div>
            <span className="text-muted-foreground">Neutral</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-sentiment-negative"></div>
            <span className="text-muted-foreground">Negative</span>
          </div>
        </div>
      </div>

      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sentimentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145, 65%, 42%)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(145, 65%, 42%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(200, 20%, 50%)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(200, 20%, 50%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 75%, 55%)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(0, 75%, 55%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(220, 15%, 20%)' }}
              tickLine={{ stroke: 'hsl(220, 15%, 20%)' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(220, 15%, 20%)' }}
              tickLine={{ stroke: 'hsl(220, 15%, 20%)' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(220, 25%, 12%)',
                border: '1px solid hsl(220, 15%, 25%)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
              labelStyle={{ color: 'hsl(210, 20%, 95%)' }}
            />
            <Area 
              type="monotone" 
              dataKey="positive" 
              stackId="1"
              stroke="hsl(145, 65%, 42%)" 
              strokeWidth={2}
              fill="url(#positiveGradient)" 
            />
            <Area 
              type="monotone" 
              dataKey="neutral" 
              stackId="1"
              stroke="hsl(200, 20%, 50%)" 
              strokeWidth={2}
              fill="url(#neutralGradient)" 
            />
            <Area 
              type="monotone" 
              dataKey="negative" 
              stackId="1"
              stroke="hsl(0, 75%, 55%)" 
              strokeWidth={2}
              fill="url(#negativeGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SentimentTimeline;

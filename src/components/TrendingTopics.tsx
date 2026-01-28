import { motion } from 'framer-motion';
import { Hash, TrendingUp, AlertTriangle, MessageSquare } from 'lucide-react';

interface Topic {
  topic: string;
  language: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  severity: 'low' | 'medium' | 'high';
  mentions: number;
  change: number;
}

const trendingTopics: Topic[] = [
  { topic: "Cost of living protests", language: "English", sentiment: "negative", severity: "high", mentions: 5600, change: 45 },
  { topic: "Bondo land issue", language: "Dholuo", sentiment: "negative", severity: "high", mentions: 4200, change: 78 },
  { topic: "Cross-border security", language: "Somali", sentiment: "negative", severity: "high", mentions: 4100, change: 12 },
  { topic: "Cattle rustling", language: "Turkana", sentiment: "negative", severity: "high", mentions: 3500, change: 25 },
  { topic: "Land disputes", language: "Kikuyu", sentiment: "negative", severity: "high", mentions: 3800, change: 35 },
  { topic: "Tourism recovery", language: "Kiswahili", sentiment: "positive", severity: "low", mentions: 2800, change: -15 },
  { topic: "Tech hub growth", language: "English", sentiment: "positive", severity: "low", mentions: 2100, change: 8 },
];

const topHashtags = [
  "#KenyaFirst", "#CostOfLiving", "#LandRights", "#PeaceBuilding", 
  "#Devolution", "#BorderSecurity", "#YouthEmployment", "#NyanzaPeace"
];

const TrendingTopics = () => {
  const getSentimentEmoji = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive': return '🙂';
      case 'neutral': return '😐';
      case 'negative': return '😡';
    }
  };

  const getSeverityClass = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'bg-risk-low/20 text-risk-low';
      case 'medium': return 'bg-risk-medium/20 text-risk-medium';
      case 'high': return 'bg-risk-high/20 text-risk-high';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-4 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Trending Topics
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">Live updates</span>
      </div>

      {/* Topics List */}
      <div className="flex-1 space-y-2 overflow-auto mb-4">
        {trendingTopics.slice(0, 5).map((topic, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2 hover:bg-secondary/70 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{getSentimentEmoji(topic.sentiment)}</span>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {topic.topic}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{topic.language}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {topic.mentions.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded ${getSeverityClass(topic.severity)}`}>
                {topic.severity}
              </span>
              {topic.change > 0 && (
                <span className="flex items-center gap-0.5 text-xs text-risk-high">
                  <TrendingUp className="w-3 h-3" />
                  +{topic.change}%
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hashtags */}
      <div className="border-t border-border pt-3">
        <div className="flex items-center gap-2 mb-2">
          <Hash className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Top Hashtags</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {topHashtags.map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingTopics;

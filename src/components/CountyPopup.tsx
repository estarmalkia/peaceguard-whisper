import { CountyData, getRiskLevel } from '@/data/kenyaCounties';
import { TrendingUp, TrendingDown, MessageCircle, AlertTriangle } from 'lucide-react';

interface CountyPopupProps {
  county: CountyData;
}

const CountyPopup = ({ county }: CountyPopupProps) => {
  const riskLevel = getRiskLevel(county.cri);
  const topThreeTopics = county.topTopics.slice(0, 3);

  const getRiskBadgeClass = () => {
    switch (riskLevel) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      case 'critical': return 'risk-critical';
    }
  };

  const getSentimentEmoji = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive': return '🙂';
      case 'neutral': return '😐';
      case 'negative': return '😡';
    }
  };

  return (
    <div className="glass-card p-4 min-w-[280px] max-w-[320px] shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-foreground">{county.name}</h3>
          <p className="text-xs text-muted-foreground">{county.nameSwahili}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getRiskBadgeClass()}`}>
            CRI: {county.cri}
          </span>
          {county.recentChange !== 0 && (
            <div className={`flex items-center gap-0.5 text-xs ${county.recentChange > 0 ? 'text-risk-high' : 'text-risk-low'}`}>
              {county.recentChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(county.recentChange)}%
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* Top Contributing Factors */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Top Risk Factors
          </p>
          <div className="space-y-1.5">
            {topThreeTopics.map((topic, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between bg-secondary/50 rounded-md px-2 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{getSentimentEmoji(topic.sentiment)}</span>
                  <div>
                    <p className="text-xs font-medium text-foreground">{topic.topic}</p>
                    <p className="text-[10px] text-muted-foreground">{topic.language}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  topic.severity === 'high' ? 'bg-risk-high/20 text-risk-high' :
                  topic.severity === 'medium' ? 'bg-risk-medium/20 text-risk-medium' :
                  'bg-risk-low/20 text-risk-low'
                }`}>
                  {topic.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Breakdown */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            Sentiment
          </p>
          <div className="flex h-2 rounded-full overflow-hidden bg-secondary">
            <div 
              className="bg-sentiment-positive transition-all duration-500"
              style={{ width: `${county.sentiment.positive}%` }}
            />
            <div 
              className="bg-sentiment-neutral transition-all duration-500"
              style={{ width: `${county.sentiment.neutral}%` }}
            />
            <div 
              className="bg-sentiment-negative transition-all duration-500"
              style={{ width: `${county.sentiment.negative}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
            <span>🙂 {county.sentiment.positive}%</span>
            <span>😐 {county.sentiment.neutral}%</span>
            <span>😡 {county.sentiment.negative}%</span>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground text-center">
          Click for detailed view
        </p>
      </div>
    </div>
  );
};

export default CountyPopup;

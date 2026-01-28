import { motion } from 'framer-motion';
import { X, MapPin, TrendingUp, TrendingDown, MessageCircle, Hash, AlertTriangle, Users, Clock, FileText } from 'lucide-react';
import { CountyData, getRiskLevel } from '@/data/kenyaCounties';
import { Language } from './LanguageToggle';

interface CountyDetailPanelProps {
  county: CountyData;
  language: Language;
  onClose: () => void;
}

const CountyDetailPanel = ({ county, language, onClose }: CountyDetailPanelProps) => {
  const riskLevel = getRiskLevel(county.cri);

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

  // AI-generated summary based on county data
  const getSummary = () => {
    const highSeverityTopics = county.topTopics.filter(t => t.severity === 'high');
    
    if (language === 'sw') {
      return {
        what: `Kaunti ya ${county.name} inaonyesha ${riskLevel === 'critical' ? 'hatari kubwa sana' : riskLevel === 'high' ? 'hatari kubwa' : riskLevel === 'medium' ? 'hatari ya wastani' : 'hatari ndogo'} ya migogoro. ${highSeverityTopics.length > 0 ? `Mada kuu za wasiwasi ni: ${highSeverityTopics.map(t => t.topic).join(', ')}.` : ''}`,
        why: `Hali hii inaathiri amani ya eneo na usalama wa wananchi. Kiwango cha hisia hasi (${county.sentiment.negative}%) kinahitaji kufuatiliwa kwa karibu.`,
        action: riskLevel === 'critical' || riskLevel === 'high' 
          ? 'Pendekezo: Kuandaa mkutano wa haraka wa kamati ya amani ya kaunti. Shirikisha viongozi wa jamii na wazee.'
          : 'Pendekezo: Endelea kufuatilia hali. Hakuna hatua ya haraka inayohitajika.'
      };
    }
    
    return {
      what: `${county.name} County is showing ${riskLevel === 'critical' ? 'critical' : riskLevel === 'high' ? 'elevated' : riskLevel === 'medium' ? 'moderate' : 'low'} conflict risk. ${highSeverityTopics.length > 0 ? `Key concerns include: ${highSeverityTopics.map(t => t.topic).join(', ')}.` : 'No major concerns identified.'}`,
      why: `This situation affects regional peace and citizen safety. The negative sentiment level (${county.sentiment.negative}%) requires close monitoring.`,
      action: riskLevel === 'critical' || riskLevel === 'high'
        ? 'Recommended: Convene urgent county peace committee meeting. Engage community leaders and elders.'
        : 'Recommended: Continue monitoring. No immediate action required.'
    };
  };

  const summary = getSummary();

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-50 overflow-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <h2 className="font-display font-bold text-xl text-foreground">{county.name}</h2>
              <p className="text-sm text-muted-foreground">{county.nameSwahili}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* CRI Badge */}
        <div className="flex items-center gap-3 mt-4">
          <div className={`px-4 py-2 rounded-lg font-display font-bold text-2xl ${getRiskBadgeClass()}`}>
            CRI: {county.cri}
          </div>
          {county.recentChange !== 0 && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${county.recentChange > 0 ? 'bg-risk-high/20 text-risk-high' : 'bg-risk-low/20 text-risk-low'}`}>
              {county.recentChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {county.recentChange > 0 ? '+' : ''}{county.recentChange}% {language === 'sw' ? 'mabadiliko' : 'change'}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">{language === 'sw' ? 'Idadi ya Watu' : 'Population'}</span>
            </div>
            <p className="font-display font-semibold text-foreground">
              {county.population.toLocaleString()}
            </p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs">{language === 'sw' ? 'Sasisho la Mwisho' : 'Last Updated'}</span>
            </div>
            <p className="font-display font-semibold text-foreground text-sm">
              {new Date(county.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Sentiment Breakdown */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">
              {language === 'sw' ? 'Uchanganuzi wa Hisia' : 'Sentiment Breakdown'}
            </h3>
          </div>
          <div className="h-3 rounded-full overflow-hidden bg-secondary flex">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${county.sentiment.positive}%` }}
              className="bg-sentiment-positive"
            />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${county.sentiment.neutral}%` }}
              className="bg-sentiment-neutral"
            />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${county.sentiment.negative}%` }}
              className="bg-sentiment-negative"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>🙂 {county.sentiment.positive}%</span>
            <span>😐 {county.sentiment.neutral}%</span>
            <span>😡 {county.sentiment.negative}%</span>
          </div>
        </div>

        {/* Top Topics */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">
              {language === 'sw' ? 'Mada Zinazoendelea' : 'Top Topics'}
            </h3>
          </div>
          <div className="space-y-2">
            {county.topTopics.map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-secondary/50 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getSentimentEmoji(topic.sentiment)}</span>
                    <span className="font-medium text-foreground">{topic.topic}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    topic.severity === 'high' ? 'bg-risk-high/20 text-risk-high' :
                    topic.severity === 'medium' ? 'bg-risk-medium/20 text-risk-medium' :
                    'bg-risk-low/20 text-risk-low'
                  }`}>
                    {topic.severity}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{topic.language}</span>
                  <span>•</span>
                  <span>{topic.mentions.toLocaleString()} {language === 'sw' ? 'kutajwa' : 'mentions'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hashtags */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">
              {language === 'sw' ? 'Hashtagi Maarufu' : 'Active Hashtags'}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {county.hashtags.map((tag) => (
              <span 
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className={`rounded-lg p-4 ${riskLevel === 'critical' || riskLevel === 'high' ? 'bg-risk-high/10 border border-risk-high/30' : 'bg-secondary/50'}`}>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-foreground">
              {language === 'sw' ? 'Muhtasari wa AI' : 'AI Summary'}
            </h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'sw' ? '📍 Nini Kimetokea?' : '📍 What Happened?'}
              </p>
              <p className="text-foreground">{summary.what}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'sw' ? '⚠️ Kwa Nini ni Muhimu?' : '⚠️ Why It Matters?'}
              </p>
              <p className="text-foreground">{summary.why}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'sw' ? '✅ Hatua Zinazopendekezwa' : '✅ Recommended Actions'}
              </p>
              <p className="text-foreground font-medium">{summary.action}</p>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          {language === 'sw' ? '📄 Pakua Ripoti ya Kaunti' : '📄 Download County Report'}
        </button>
      </div>
    </motion.div>
  );
};

export default CountyDetailPanel;

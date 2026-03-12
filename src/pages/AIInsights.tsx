import { motion } from 'framer-motion';
import { Brain, TrendingUp, TrendingDown, Lightbulb, AlertTriangle, ThumbsUp, MapPin } from 'lucide-react';
import { kenyaCounties } from '@/data/kenyaCounties';

interface Insight {
  id: string;
  type: 'pattern' | 'rising_concern' | 'positive' | 'recommendation';
  title: string;
  description: string;
  counties: string[];
  severity: 'info' | 'warning' | 'critical';
}

const insights: Insight[] = [
  {
    id: '1', type: 'pattern', title: 'Cross-border security concerns intensifying',
    description: 'A consistent pattern of increasing negative sentiment around security has been detected across Mandera, Wajir, and Garissa counties over the past 14 days. Social media mentions of "border raids" and "Al-Shabaab" have increased by 35%.',
    counties: ['Mandera', 'Wajir', 'Garissa'], severity: 'critical',
  },
  {
    id: '2', type: 'rising_concern', title: 'Cattle rustling discourse spiking in Rift Valley',
    description: 'Turkana, West Pokot, Samburu, and Baringo counties show a 40% increase in cattle rustling-related discussions, primarily in local languages. This correlates with seasonal migration patterns.',
    counties: ['Turkana', 'West Pokot', 'Samburu', 'Baringo'], severity: 'warning',
  },
  {
    id: '3', type: 'positive', title: 'Peace dialogue yielding results in Wajir',
    description: 'Following community peace dialogues organized last week, positive sentiment in Wajir increased by 12%. Mentions of "amani" (peace) and "mazungumzo" (dialogue) are trending positively.',
    counties: ['Wajir'], severity: 'info',
  },
  {
    id: '4', type: 'pattern', title: 'Land dispute narratives correlating with political activity',
    description: 'An emerging pattern shows land dispute discussions intensifying in Nakuru, Narok, and Trans-Nzoia counties, coinciding with upcoming local political campaigns. Historical data suggests this pattern preceded the 2017 tensions.',
    counties: ['Nakuru', 'Narok', 'Trans-Nzoia'], severity: 'warning',
  },
  {
    id: '5', type: 'recommendation', title: 'Deploy peace messaging in North Eastern region',
    description: 'Based on rising CRI trends, AI recommends deploying targeted peace messaging campaigns in Somali and Kiswahili across Mandera, Wajir, and Garissa counties. Community elder engagement should be prioritized.',
    counties: ['Mandera', 'Wajir', 'Garissa'], severity: 'critical',
  },
  {
    id: '6', type: 'positive', title: 'Makueni model gaining positive traction',
    description: 'Makueni county\'s universal healthcare and fruit farming initiatives continue to generate strong positive sentiment (48% positive). Other counties are referencing this as a model for development.',
    counties: ['Makueni'], severity: 'info',
  },
  {
    id: '7', type: 'recommendation', title: 'Monitor Sheng sentiment in urban centers',
    description: 'Increasing use of coded Sheng expressions in Nairobi and Mombasa to discuss governance issues. Standard sentiment models may misclassify these — local dictionary enhancement recommended.',
    counties: ['Nairobi', 'Mombasa'], severity: 'warning',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'pattern': return Brain;
    case 'rising_concern': return TrendingUp;
    case 'positive': return ThumbsUp;
    case 'recommendation': return Lightbulb;
    default: return Brain;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'pattern': return 'Pattern Detected';
    case 'rising_concern': return 'Rising Concern';
    case 'positive': return 'Positive Signal';
    case 'recommendation': return 'AI Recommendation';
    default: return type;
  }
};

const AIInsights = () => {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Patterns Found', value: insights.filter(i => i.type === 'pattern').length, icon: Brain, color: 'text-info' },
          { label: 'Rising Concerns', value: insights.filter(i => i.type === 'rising_concern').length, icon: TrendingUp, color: 'text-risk-high' },
          { label: 'Positive Signals', value: insights.filter(i => i.type === 'positive').length, icon: ThumbsUp, color: 'text-risk-low' },
          { label: 'Recommendations', value: insights.filter(i => i.type === 'recommendation').length, icon: Lightbulb, color: 'text-accent' },
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

      {/* Insights */}
      <div className="space-y-4">
        {insights.map((insight, i) => {
          const Icon = getIcon(insight.type);
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-5 ${
                insight.severity === 'critical' ? 'border border-risk-critical/30' :
                insight.severity === 'warning' ? 'border border-risk-medium/20' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  insight.type === 'positive' ? 'bg-risk-low/20' :
                  insight.type === 'recommendation' ? 'bg-accent/20' :
                  insight.severity === 'critical' ? 'bg-risk-critical/20' : 'bg-risk-medium/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    insight.type === 'positive' ? 'text-risk-low' :
                    insight.type === 'recommendation' ? 'text-accent' :
                    insight.severity === 'critical' ? 'text-risk-critical' : 'text-risk-medium'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      insight.type === 'positive' ? 'bg-risk-low/20 text-risk-low' :
                      insight.type === 'recommendation' ? 'bg-accent/20 text-accent' :
                      'bg-risk-medium/20 text-risk-medium'
                    }`}>
                      {getTypeLabel(insight.type)}
                    </span>
                    {insight.severity === 'critical' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-risk-critical/20 text-risk-critical flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{insight.title}</h3>
                  <p className="text-sm text-foreground/80 mb-3">{insight.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {insight.counties.map(c => (
                      <span key={c} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsights;

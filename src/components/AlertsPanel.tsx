import { motion } from 'framer-motion';
import { AlertTriangle, Bell, ChevronRight, MapPin } from 'lucide-react';
import { kenyaCounties, getRiskLevel, CountyData } from '@/data/kenyaCounties';

interface AlertsPanelProps {
  onCountySelect: (county: CountyData) => void;
}

const AlertsPanel = ({ onCountySelect }: AlertsPanelProps) => {
  // Get counties with high/critical CRI
  const alertCounties = kenyaCounties
    .filter(c => c.cri >= 65)
    .sort((a, b) => b.cri - a.cri)
    .slice(0, 5);

  const getRiskBadgeClass = (cri: number) => {
    const level = getRiskLevel(cri);
    switch (level) {
      case 'critical': return 'risk-critical';
      case 'high': return 'risk-high';
      default: return 'risk-medium';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-4 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-4 h-4 text-risk-high" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-risk-high rounded-full animate-ping"></span>
          </div>
          <h3 className="font-display font-semibold text-foreground">
            Active Alerts
          </h3>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-risk-high/20 text-risk-high">
          {alertCounties.length} counties
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-auto">
        {alertCounties.map((county, idx) => {
          const topTopic = county.topTopics[0];
          const isCritical = county.cri >= 75;
          
          return (
            <motion.div
              key={county.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onCountySelect(county)}
              className={`relative rounded-lg px-3 py-3 cursor-pointer transition-all group ${
                isCritical 
                  ? 'bg-risk-high/10 border border-risk-high/30 hover:bg-risk-high/20 alert-pulse' 
                  : 'bg-secondary/50 hover:bg-secondary/70'
              }`}
            >
              {isCritical && (
                <div className="absolute inset-0 rounded-lg bg-risk-high/5 animate-pulse"></div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="font-medium text-foreground">{county.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${getRiskBadgeClass(county.cri)}`}>
                      CRI: {county.cri}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3 h-3 text-risk-high mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-foreground">{topTopic.topic}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {topTopic.language} • {topTopic.mentions.toLocaleString()} mentions
                    </p>
                  </div>
                </div>

                {isCritical && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-risk-high">
                    <span className="w-1.5 h-1.5 rounded-full bg-risk-high animate-pulse"></span>
                    Requires immediate attention
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="border-t border-border pt-3 mt-3">
        <button className="w-full text-center text-xs text-primary hover:text-primary/80 transition-colors">
          View all alerts →
        </button>
      </div>
    </motion.div>
  );
};

export default AlertsPanel;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal, TrendingUp, AlertTriangle, MessageSquare, Zap } from 'lucide-react';

interface WhatIfSimulatorProps {
  countyName?: string;
  baseCRI: number;
}

const WhatIfSimulator = ({ countyName = "National", baseCRI = 55 }: WhatIfSimulatorProps) => {
  const [hateSpeech, setHateSpeech] = useState(0);
  const [negativeSentiment, setNegativeSentiment] = useState(0);
  const [divisiveTopics, setDivisiveTopics] = useState(0);

  // Calculate projected CRI based on adjustments
  const calculateProjectedCRI = () => {
    const impact = (hateSpeech * 0.4) + (negativeSentiment * 0.35) + (divisiveTopics * 0.25);
    const projectedCRI = Math.min(100, Math.max(0, baseCRI + impact));
    return Math.round(projectedCRI);
  };

  const projectedCRI = calculateProjectedCRI();
  const criChange = projectedCRI - baseCRI;

  const getCRIRiskLevel = (cri: number) => {
    if (cri < 35) return { level: 'Low', color: 'text-risk-low', bg: 'bg-risk-low' };
    if (cri < 55) return { level: 'Medium', color: 'text-risk-medium', bg: 'bg-risk-medium' };
    if (cri < 75) return { level: 'High', color: 'text-risk-high', bg: 'bg-risk-high' };
    return { level: 'Critical', color: 'text-risk-critical', bg: 'bg-risk-critical' };
  };

  const baseRisk = getCRIRiskLevel(baseCRI);
  const projectedRisk = getCRIRiskLevel(projectedCRI);

  const getRecommendation = () => {
    if (projectedCRI >= 75) {
      return {
        en: "Urgent: Activate county peace committee. Deploy rapid response messaging. Engage community elders.",
        sw: "Dharura: Anzisha kamati ya amani ya kaunti. Tuma ujumbe wa majibu ya haraka. Shirikisha wazee wa jamii."
      };
    }
    if (projectedCRI >= 55) {
      return {
        en: "Recommended: Monitor social media closely. Prepare peace messaging. Alert local authorities.",
        sw: "Inashauriwa: Fuatilia mitandao ya kijamii kwa karibu. Andaa ujumbe wa amani. Arifu mamlaka za mitaa."
      };
    }
    return {
      en: "Continue monitoring. No immediate action required.",
      sw: "Endelea kufuatilia. Hakuna hatua ya haraka inayohitajika."
    };
  };

  const recommendation = getRecommendation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            What-If Simulator
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">{countyName}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-5">
          {/* Hate Speech */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-foreground flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-risk-high" />
                Hate Speech Volume
              </label>
              <span className="text-xs font-medium text-foreground">
                {hateSpeech > 0 ? `+${hateSpeech}%` : `${hateSpeech}%`}
              </span>
            </div>
            <Slider
              value={[hateSpeech]}
              onValueChange={(value) => setHateSpeech(value[0])}
              min={-30}
              max={50}
              step={5}
              className="cursor-pointer"
            />
          </div>

          {/* Negative Sentiment */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-foreground flex items-center gap-2">
                <MessageSquare className="w-3 h-3 text-risk-medium" />
                Negative Sentiment
              </label>
              <span className="text-xs font-medium text-foreground">
                {negativeSentiment > 0 ? `+${negativeSentiment}%` : `${negativeSentiment}%`}
              </span>
            </div>
            <Slider
              value={[negativeSentiment]}
              onValueChange={(value) => setNegativeSentiment(value[0])}
              min={-30}
              max={50}
              step={5}
              className="cursor-pointer"
            />
          </div>

          {/* Divisive Topics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-foreground flex items-center gap-2">
                <Zap className="w-3 h-3 text-accent" />
                Divisive Topics Frequency
              </label>
              <span className="text-xs font-medium text-foreground">
                {divisiveTopics > 0 ? `+${divisiveTopics}%` : `${divisiveTopics}%`}
              </span>
            </div>
            <Slider
              value={[divisiveTopics]}
              onValueChange={(value) => setDivisiveTopics(value[0])}
              min={-30}
              max={50}
              step={5}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Projection */}
        <div className="flex flex-col">
          {/* CRI Comparison */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Current</p>
              <div className={`text-3xl font-display font-bold ${baseRisk.color}`}>
                {baseCRI}
              </div>
              <p className={`text-xs ${baseRisk.color}`}>{baseRisk.level} Risk</p>
            </div>
            
            <motion.div
              animate={{ x: criChange !== 0 ? [0, 5, 0] : 0 }}
              transition={{ repeat: criChange !== 0 ? Infinity : 0, duration: 1 }}
              className="flex items-center"
            >
              <TrendingUp className={`w-6 h-6 ${criChange > 0 ? 'text-risk-high' : criChange < 0 ? 'text-risk-low' : 'text-muted-foreground'}`} />
            </motion.div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Projected</p>
              <motion.div
                key={projectedCRI}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-3xl font-display font-bold ${projectedRisk.color}`}
              >
                {projectedCRI}
              </motion.div>
              <p className={`text-xs ${projectedRisk.color}`}>{projectedRisk.level} Risk</p>
            </div>
          </div>

          {/* Change indicator */}
          {criChange !== 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center mb-3 text-sm font-medium ${criChange > 0 ? 'text-risk-high' : 'text-risk-low'}`}
            >
              {criChange > 0 ? '+' : ''}{criChange} points ({criChange > 0 ? '↑' : '↓'} {Math.abs(Math.round((criChange / baseCRI) * 100))}%)
            </motion.div>
          )}

          {/* Recommendation */}
          <div className={`flex-1 rounded-lg p-3 ${projectedCRI >= 75 ? 'bg-risk-high/10 border border-risk-high/30' : projectedCRI >= 55 ? 'bg-risk-medium/10 border border-risk-medium/30' : 'bg-secondary/50'}`}>
            <p className="text-xs font-medium text-foreground mb-2">📋 Recommended Actions:</p>
            <p className="text-xs text-foreground/90 mb-2">{recommendation.en}</p>
            <p className="text-xs text-muted-foreground italic">{recommendation.sw}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhatIfSimulator;

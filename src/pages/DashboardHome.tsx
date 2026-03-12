import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LeafletMap from '@/components/LeafletMap';
import SentimentTimeline from '@/components/SentimentTimeline';
import TrendingTopics from '@/components/TrendingTopics';
import AlertsPanel from '@/components/AlertsPanel';
import WhatIfSimulator from '@/components/WhatIfSimulator';
import CountyDetailPanel from '@/components/CountyDetailPanel';
import { kenyaCounties, CountyData } from '@/data/kenyaCounties';
import { Language } from '@/components/LanguageToggle';

interface DashboardHomeProps {
  language: Language;
}

const DashboardHome = ({ language }: DashboardHomeProps) => {
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(null);

  const handleCountySelect = (county: CountyData) => {
    setSelectedCounty(county);
  };

  const handleCloseDetail = () => {
    setSelectedCounty(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6">
        {/* Left Column - Map */}
        <div className="lg:col-span-5">
          <div className="glass-card p-2 md:p-4 h-[400px] sm:h-[500px] lg:h-[calc(100vh-140px)]">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <h2 className="font-display font-semibold text-sm md:text-base text-foreground">
                {language === 'sw' ? 'Ramani ya Hatari ya Kenya' : 'Kenya Risk Map'}
              </h2>
              <span className="text-[10px] md:text-xs text-muted-foreground">
                {language === 'sw' ? 'Bofya kaunti' : 'Click county for details'}
              </span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <LeafletMap
                counties={kenyaCounties}
                onCountySelect={handleCountySelect}
                selectedCounty={selectedCounty}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 space-y-3 md:space-y-4 lg:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            <div className="h-[260px] md:h-[280px]">
              <SentimentTimeline countyName={selectedCounty?.name} />
            </div>
            <div className="h-[260px] md:h-[280px]">
              <TrendingTopics />
            </div>
          </div>

          <div className="h-[260px] md:h-[280px]">
            <AlertsPanel onCountySelect={handleCountySelect} />
          </div>

          <WhatIfSimulator
            countyName={selectedCounty?.name || (language === 'sw' ? 'Kitaifa' : 'National')}
            baseCRI={selectedCounty?.cri || 55}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedCounty && (
          <CountyDetailPanel
            county={selectedCounty}
            language={language}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardHome;

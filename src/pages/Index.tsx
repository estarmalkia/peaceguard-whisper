import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import KenyaMap from '@/components/KenyaMap';
import SentimentTimeline from '@/components/SentimentTimeline';
import TrendingTopics from '@/components/TrendingTopics';
import AlertsPanel from '@/components/AlertsPanel';
import WhatIfSimulator from '@/components/WhatIfSimulator';
import CountyDetailPanel from '@/components/CountyDetailPanel';
import LanguageToggle, { Language } from '@/components/LanguageToggle';
import { kenyaCounties, CountyData } from '@/data/kenyaCounties';

const Index = () => {
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const handleCountySelect = (county: CountyData) => {
    setSelectedCounty(county);
  };

  const handleCloseDetail = () => {
    setSelectedCounty(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-20 right-6 z-40">
        <LanguageToggle language={language} onLanguageChange={setLanguage} />
      </div>

      {/* Main Dashboard Grid */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Column - Map */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="glass-card p-4 h-[500px] lg:h-[calc(100vh-200px)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-foreground">
                  {language === 'sw' ? 'Ramani ya Hatari ya Kenya' : 'Kenya Risk Map'}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {language === 'sw' ? 'Bofya kaunti kwa maelezo' : 'Click county for details'}
                </span>
              </div>
              <KenyaMap 
                counties={kenyaCounties}
                onCountySelect={handleCountySelect}
                selectedCounty={selectedCounty}
              />
            </div>
          </div>

          {/* Right Column - Charts & Panels */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4 lg:space-y-6">
            {/* Top Row - Sentiment & Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="h-[280px]">
                <SentimentTimeline countyName={selectedCounty?.name} />
              </div>
              <div className="h-[280px]">
                <TrendingTopics />
              </div>
            </div>

            {/* Middle Row - Alerts */}
            <div className="h-[280px]">
              <AlertsPanel onCountySelect={handleCountySelect} />
            </div>

            {/* Bottom Row - What-If Simulator */}
            <WhatIfSimulator 
              countyName={selectedCounty?.name || (language === 'sw' ? 'Kitaifa' : 'National')}
              baseCRI={selectedCounty?.cri || 55}
            />
          </div>
        </div>
      </div>

      {/* County Detail Slide-over Panel */}
      <AnimatePresence>
        {selectedCounty && (
          <CountyDetailPanel 
            county={selectedCounty}
            language={language}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

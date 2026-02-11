import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CountyData, getRiskLevel, getRiskColor } from '@/data/kenyaCounties';
import { countyPaths, kenyaOutlinePath } from '@/data/countyPaths';
import CountyPopup from './CountyPopup';

interface KenyaMapProps {
  counties: CountyData[];
  onCountySelect: (county: CountyData) => void;
  selectedCounty: CountyData | null;
}

const KenyaMap = ({ counties, onCountySelect, selectedCounty }: KenyaMapProps) => {
  const [hoveredCounty, setHoveredCounty] = useState<CountyData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Map counties to their paths
  const countyEntries = useMemo(() => {
    return counties
      .map(county => {
        const pathData = countyPaths[county.id];
        if (!pathData) return null;
        return { county, pathData };
      })
      .filter(Boolean) as { county: CountyData; pathData: typeof countyPaths[string] }[];
  }, [counties]);

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 480 560"
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCounty(null)}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 25%, 15%)" />
            <stop offset="100%" stopColor="hsl(220, 25%, 10%)" />
          </linearGradient>
        </defs>

        {/* Kenya outline background */}
        <path
          d={kenyaOutlinePath}
          fill="url(#mapGradient)"
          stroke="hsl(220, 15%, 25%)"
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* County shapes */}
        {countyEntries.map(({ county, pathData }) => {
          const isHovered = hoveredCounty?.id === county.id;
          const isSelected = selectedCounty?.id === county.id;
          const riskLevel = getRiskLevel(county.cri);

          return (
            <motion.path
              key={county.id}
              d={pathData.path}
              fill={getRiskColor(county.cri)}
              stroke={isSelected ? "hsl(165, 60%, 45%)" : isHovered ? "hsl(0, 0%, 100%)" : "hsl(220, 15%, 20%)"}
              strokeWidth={isSelected ? 2.5 : isHovered ? 1.5 : 0.5}
              className="county-hover cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered || isSelected ? 1 : 0.82,
                scale: isHovered ? 1.01 : 1,
              }}
              transition={{ duration: 0.15 }}
              filter={riskLevel === 'critical' ? "url(#glow)" : undefined}
              onMouseEnter={() => setHoveredCounty(county)}
              onMouseLeave={() => setHoveredCounty(null)}
              onClick={() => onCountySelect(county)}
            />
          );
        })}

        {/* County labels */}
        {countyEntries.map(({ county, pathData }) => (
          <text
            key={`label-${county.id}`}
            x={pathData.center.x}
            y={pathData.center.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-medium fill-foreground pointer-events-none select-none"
            fontSize="6"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
          >
            {pathData.label}
          </text>
        ))}
      </svg>

      {/* Hover Popup */}
      <AnimatePresence>
        {hoveredCounty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute pointer-events-none z-50 hidden md:block"
            style={{
              left: Math.min(mousePosition.x + 15, 200),
              top: mousePosition.y - 10,
            }}
          >
            <CountyPopup county={hoveredCounty} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 glass-card p-2 md:p-3">
        <p className="text-[10px] md:text-xs font-medium text-foreground mb-1.5">Conflict Risk Index</p>
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm bg-risk-low"></div>
            <span className="text-[9px] md:text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm bg-risk-medium"></div>
            <span className="text-[9px] md:text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm bg-risk-high"></div>
            <span className="text-[9px] md:text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm bg-risk-critical animate-pulse"></div>
            <span className="text-[9px] md:text-xs text-muted-foreground">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KenyaMap;

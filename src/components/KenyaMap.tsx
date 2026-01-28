import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CountyData, getRiskLevel, getRiskColor } from '@/data/kenyaCounties';
import CountyPopup from './CountyPopup';

interface KenyaMapProps {
  counties: CountyData[];
  onCountySelect: (county: CountyData) => void;
  selectedCounty: CountyData | null;
}

// Simplified Kenya county paths (representative shapes)
const countyPaths: Record<string, { path: string; center: { x: number; y: number } }> = {
  "mombasa": { 
    path: "M320,380 L335,375 L340,390 L330,400 L315,395 Z",
    center: { x: 327, y: 387 }
  },
  "nairobi": { 
    path: "M220,290 L245,285 L250,305 L240,315 L215,310 Z",
    center: { x: 232, y: 300 }
  },
  "kisumu": { 
    path: "M120,240 L150,235 L155,265 L140,275 L115,265 Z",
    center: { x: 135, y: 255 }
  },
  "nakuru": { 
    path: "M175,230 L210,220 L220,260 L200,275 L165,265 Z",
    center: { x: 192, y: 248 }
  },
  "uasin-gishu": { 
    path: "M135,180 L170,175 L175,210 L155,220 L130,210 Z",
    center: { x: 152, y: 197 }
  },
  "kiambu": { 
    path: "M215,260 L240,255 L245,280 L230,290 L210,285 Z",
    center: { x: 227, y: 272 }
  },
  "turkana": { 
    path: "M140,40 L200,30 L220,100 L190,140 L130,130 L120,70 Z",
    center: { x: 165, y: 85 }
  },
  "mandera": { 
    path: "M320,50 L370,40 L380,90 L350,120 L310,100 Z",
    center: { x: 345, y: 75 }
  },
  "wajir": { 
    path: "M300,120 L350,110 L360,170 L330,200 L290,180 Z",
    center: { x: 325, y: 155 }
  },
  "garissa": { 
    path: "M280,200 L330,190 L340,260 L310,290 L270,270 Z",
    center: { x: 305, y: 240 }
  },
  "machakos": { 
    path: "M240,300 L270,295 L280,340 L260,355 L235,345 Z",
    center: { x: 257, y: 325 }
  },
  "kakamega": { 
    path: "M100,200 L130,195 L135,230 L115,240 L95,230 Z",
    center: { x: 115, y: 215 }
  },
  "bungoma": { 
    path: "M85,175 L115,170 L120,200 L100,210 L80,200 Z",
    center: { x: 100, y: 188 }
  },
  "meru": { 
    path: "M260,200 L290,195 L295,235 L275,245 L255,235 Z",
    center: { x: 275, y: 218 }
  },
  "kilifi": { 
    path: "M305,330 L335,325 L345,370 L325,385 L300,375 Z",
    center: { x: 322, y: 350 }
  },
  "nyeri": { 
    path: "M225,225 L250,220 L255,250 L240,260 L220,255 Z",
    center: { x: 237, y: 240 }
  },
  "kericho": { 
    path: "M155,260 L180,255 L185,285 L165,295 L150,285 Z",
    center: { x: 167, y: 275 }
  },
  "baringo": { 
    path: "M175,160 L205,155 L210,195 L190,205 L170,195 Z",
    center: { x: 190, y: 178 }
  },
  "samburu": { 
    path: "M220,130 L260,120 L270,170 L245,185 L215,175 Z",
    center: { x: 242, y: 152 }
  },
  "laikipia": { 
    path: "M210,180 L245,175 L250,215 L230,225 L205,215 Z",
    center: { x: 227, y: 198 }
  }
};

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

  const getCountyPath = (countyId: string) => {
    return countyPaths[countyId]?.path || "";
  };

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 420 450"
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCounty(null)}
      >
        {/* Background glow effect */}
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
          d="M80,30 L380,30 L400,200 L360,350 L340,420 L280,430 L200,400 L120,380 L70,280 L60,150 Z"
          fill="url(#mapGradient)"
          stroke="hsl(220, 15%, 25%)"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* County shapes */}
        {counties.map((county) => {
          const pathData = getCountyPath(county.id);
          if (!pathData) return null;
          
          const isHovered = hoveredCounty?.id === county.id;
          const isSelected = selectedCounty?.id === county.id;
          const riskLevel = getRiskLevel(county.cri);
          
          return (
            <motion.path
              key={county.id}
              d={pathData}
              fill={getRiskColor(county.cri)}
              stroke={isSelected ? "hsl(165, 60%, 45%)" : isHovered ? "hsl(0, 0%, 100%)" : "hsl(220, 15%, 20%)"}
              strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
              className="county-hover cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isHovered || isSelected ? 1 : 0.85,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
              filter={riskLevel === 'critical' ? "url(#glow)" : undefined}
              onMouseEnter={() => setHoveredCounty(county)}
              onMouseLeave={() => setHoveredCounty(null)}
              onClick={() => onCountySelect(county)}
            />
          );
        })}

        {/* County labels */}
        {counties.map((county) => {
          const center = countyPaths[county.id]?.center;
          if (!center) return null;
          
          return (
            <text
              key={`label-${county.id}`}
              x={center.x}
              y={center.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[8px] font-medium fill-foreground pointer-events-none select-none"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            >
              {county.cri}
            </text>
          );
        })}
      </svg>

      {/* Hover Popup */}
      <AnimatePresence>
        {hoveredCounty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute pointer-events-none z-50"
            style={{
              left: mousePosition.x + 15,
              top: mousePosition.y - 10,
            }}
          >
            <CountyPopup county={hoveredCounty} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-card p-3">
        <p className="text-xs font-medium text-foreground mb-2">Conflict Risk Index</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-risk-low"></div>
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-risk-medium"></div>
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-risk-high"></div>
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-risk-critical animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KenyaMap;

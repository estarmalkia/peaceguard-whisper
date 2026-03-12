import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CountyData, getRiskLevel, kenyaCounties } from '@/data/kenyaCounties';

interface LeafletMapProps {
  counties: CountyData[];
  onCountySelect: (county: CountyData) => void;
  selectedCounty: CountyData | null;
}

const GEOJSON_URL = 'https://raw.githubusercontent.com/mikelmaron/kenya-election-data/master/data/counties.geojson';

const getRiskFillColor = (cri: number) => {
  if (cri >= 75) return 'hsl(0, 85%, 45%)';
  if (cri >= 55) return 'hsl(0, 75%, 55%)';
  if (cri >= 35) return 'hsl(38, 92%, 50%)';
  return 'hsl(145, 65%, 42%)';
};

const getRiskFillOpacity = (cri: number) => {
  if (cri >= 75) return 0.7;
  if (cri >= 55) return 0.6;
  if (cri >= 35) return 0.5;
  return 0.4;
};

const LeafletMap = ({ counties, onCountySelect, selectedCounty }: LeafletMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  // Fetch GeoJSON
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(data => setGeoJsonData(data))
      .catch(err => console.error('Failed to load Kenya GeoJSON:', err));
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [0.5, 37.9],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Add GeoJSON layer
  useEffect(() => {
    if (!mapInstanceRef.current || !geoJsonData) return;

    // Remove existing layer
    if (geoJsonLayerRef.current) {
      mapInstanceRef.current.removeLayer(geoJsonLayerRef.current);
    }

    const matchCounty = (featureName: string): CountyData | undefined => {
      const normalizedName = featureName?.toLowerCase().replace(/[^a-z]/g, '') || '';
      return counties.find(c => {
        const cName = c.name.toLowerCase().replace(/[^a-z]/g, '');
        return normalizedName.includes(cName) || cName.includes(normalizedName);
      });
    };

    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature) => {
        const countyName = feature?.properties?.COUNTY_NAM || feature?.properties?.NAME || feature?.properties?.name || '';
        const county = matchCounty(countyName);
        const cri = county?.cri || 30;
        const isSelected = selectedCounty && county?.id === selectedCounty.id;

        return {
          fillColor: getRiskFillColor(cri),
          fillOpacity: getRiskFillOpacity(cri),
          color: isSelected ? 'hsl(165, 60%, 45%)' : 'hsl(220, 15%, 30%)',
          weight: isSelected ? 3 : 1,
          opacity: 1,
        };
      },
      onEachFeature: (feature, layer) => {
        const countyName = feature?.properties?.COUNTY_NAM || feature?.properties?.NAME || feature?.properties?.name || 'Unknown';
        const county = matchCounty(countyName);
        
        if (county) {
          const riskLevel = getRiskLevel(county.cri);
          const riskLabel = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
          
          layer.bindTooltip(
            `<div style="font-family: 'Montserrat', sans-serif; padding: 4px;">
              <strong>${county.name}</strong><br/>
              <span style="font-size: 11px; color: #999;">${county.nameSwahili}</span><br/>
              <span style="font-size: 12px;">CRI: <strong>${county.cri}</strong> (${riskLabel})</span><br/>
              <span style="font-size: 11px;">😡 ${county.sentiment.negative}% negative</span>
            </div>`,
            { sticky: true, className: 'county-tooltip' }
          );
          
          layer.on({
            click: () => onCountySelect(county),
            mouseover: (e) => {
              const l = e.target;
              l.setStyle({
                fillOpacity: 0.85,
                weight: 2,
                color: '#fff',
              });
              l.bringToFront();
            },
            mouseout: (e) => {
              geoJsonLayer.resetStyle(e.target);
            },
          });
        }
      },
    });

    geoJsonLayer.addTo(mapInstanceRef.current);
    geoJsonLayerRef.current = geoJsonLayer;
  }, [geoJsonData, counties, selectedCounty, onCountySelect]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 glass-card p-2.5 z-[1000]">
        <p className="text-[10px] md:text-xs font-medium text-foreground mb-1.5">Conflict Risk Index</p>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: 'Low', cls: 'bg-risk-low' },
            { label: 'Medium', cls: 'bg-risk-medium' },
            { label: 'High', cls: 'bg-risk-high' },
            { label: 'Critical', cls: 'bg-risk-critical' },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-1">
              <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm ${cls}`} />
              <span className="text-[9px] md:text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { branches } from '@/lib/branches';
import type { Branch } from '@/lib/branches';

interface WorldMapProps {
  height?: string;
  onBranchSelect?: (branch: Branch) => void;
}

function regionColor(region: Branch['region']): string {
  switch (region) {
    case 'Asia': return '#1457e1';
    case 'Europe': return '#059669';
    case 'Americas': return '#f59e0b';
    case 'Middle East': return '#008dca';
    default: return '#515d77';
  }
}

export default function WorldMap({ height = '520px', onBranchSelect }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [30, 20],
      zoom: 2,
      minZoom: 2,
      worldCopyJump: true,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    branches.forEach((branch) => {
      const color = regionColor(branch.region);
      const markerHtml = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;">
          <span style="position:absolute;height:34px;width:34px;border-radius:9999px;background:${color};opacity:0.25;animation:leaflet-pulse 2.5s ease-out infinite;"></span>
          <span style="position:relative;height:14px;width:14px;border-radius:9999px;background:${color};border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></span>
        </div>`;

      const icon = L.divIcon({
        html: markerHtml,
        className: 'wwc-marker',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker([branch.lat, branch.lng], { icon }).addTo(map);

      const popupHtml = `
        <div style="min-width:180px">
          <p style="font-weight:600;font-size:0.95rem;color:#22262e;margin:0 0 2px">${branch.city}, ${branch.country}</p>
          <p style="font-size:0.75rem;color:#667490;margin:0 0 6px">${branch.region} Branch</p>
          <p style="font-size:0.75rem;color:#515d77;margin:0 0 2px">${branch.phone}</p>
          <p style="font-size:0.75rem;color:#1457e1;margin:0">${branch.email}</p>
        </div>`;
      marker.bindPopup(popupHtml);

      if (onBranchSelect) {
        marker.on('click', () => onBranchSelect(branch));
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onBranchSelect]);

  useEffect(() => {
    const styleId = 'wwc-leaflet-anim';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes leaflet-pulse {
          0% { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .wwc-marker { background: transparent !important; border: none !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return <div ref={containerRef} style={{ height }} className="w-full overflow-hidden rounded-2xl" />;
}

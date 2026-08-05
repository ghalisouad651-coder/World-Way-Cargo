import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PlaceholderImageProps {
  /** Category determines which curated Pexels photo is shown */
  category: ImageCategory;
  alt: string;
  className?: string;
  rounded?: string;
  aspect?: string;
}

export type ImageCategory =
  | 'hub'
  | 'port'
  | 'warehouse'
  | 'airfreight'
  | 'seafreight'
  | 'landfreight'
  | 'electronics'
  | 'tokyo'
  | 'newyork'
  | 'paris'
  | 'dubai'
  | 'hq'
  | 'team'
  | 'global';

// Curated Pexels photo IDs known to exist, relevant to each visual need.
const photoMap: Record<ImageCategory, string> = {
  hub: '8082/port-logistics-cargo-container-shipping', // pexels photo 8082 style id
  port: '2387873',
  warehouse: '/images/WhatsApp_Image_2026-08-05_at_11.59.58_AM.jpeg',
  airfreight: '2026324',
  seafreight: '2387873',
  landfreight: '93398',
  electronics: '356052',
  tokyo: '2506926',
  newyork: '8018629',
  paris: '2360890',
  dubai: '1470502',
  hq: '260686',
  team: '3184292',
  global: '20787',
};

function resolveSrc(value: string, w = 800): string {
  if (value.startsWith('/')) return value;
  return `https://images.pexels.com/photos/${value}/pexels-photo-${value}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export default function PlaceholderImage({
  category,
  alt,
  className = '',
  rounded = 'rounded-2xl',
  aspect = 'aspect-[4/3]',
}: PlaceholderImageProps) {
  const [errored, setErrored] = useState(false);
  const src = resolveSrc(photoMap[category] ?? photoMap.hub);

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary-100 via-ink-100 to-accent-100 ${aspect} ${rounded} ${className}`}
      >
        <div className="flex flex-col items-center gap-2 text-primary-700/60">
          <ImageIcon className="h-10 w-10" />
          <span className="text-xs font-semibold uppercase tracking-wide">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-ink-100 ${aspect} ${rounded} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}

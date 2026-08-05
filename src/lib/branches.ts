export interface Branch {
  city: string;
  country: string;
  region: 'Asia' | 'Europe' | 'Americas' | 'Middle East';
  lat: number;
  lng: number;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  whatsapp: string;
  imageQuery: string;
}

export const branches: Branch[] = [
  {
    city: 'Hamburg',
    country: 'Germany',
    region: 'Europe',
    lat: 53.5511,
    lng: 9.9937,
    phone: '+49 40 5582 9100',
    email: 'hamburg.hq@worldwaycargo.com',
    address: 'Hafen City Logistics Tower, Hamburg 20457, Germany',
    instagram: '@worldwaycargo.hamburg',
    tiktok: '@wwcargo.hamburg',
    facebook: '/worldwaycargo.hamburg',
    whatsapp: '+4915555829100',
    imageQuery: 'modern shipping port hamburg germany containers',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    lat: 35.6762,
    lng: 139.6503,
    phone: '+81 3 5288 7400',
    email: 'tokyo@worldwaycargo.com',
    address: 'Akihabara Freight Center, Chiyoda City, Tokyo 100-0005, Japan',
    instagram: '@worldwaycargo.tokyo',
    tiktok: '@wwcargo.tokyo',
    facebook: '/worldwaycargo.tokyo',
    whatsapp: '+819052887400',
    imageQuery: 'tokyo japan electronics district akihabara night',
  },
  {
    city: 'New York',
    country: 'United States',
    region: 'Americas',
    lat: 40.7128,
    lng: -74.006,
    phone: '+1 212 555 0188',
    email: 'newyork@worldwaycargo.com',
    address: 'World Trade Center Logistics Hub, New York, NY 10007, USA',
    instagram: '@worldwaycargo.ny',
    tiktok: '@wwcargo.ny',
    facebook: '/worldwaycargo.ny',
    whatsapp: '+12125550188',
    imageQuery: 'new york city skyline cargo port aerial',
  },
  {
    city: 'Paris',
    country: 'France',
    region: 'Europe',
    lat: 48.8566,
    lng: 2.3522,
    phone: '+33 1 70 18 55 00',
    email: 'paris@worldwaycargo.com',
    address: 'La Defense Business District, Paris 92400, France',
    instagram: '@worldwaycargo.paris',
    tiktok: '@wwcargo.paris',
    facebook: '/worldwaycargo.paris',
    whatsapp: '+33170185500',
    imageQuery: 'paris france la defense business district modern',
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    lat: 25.2048,
    lng: 55.2708,
    phone: '+971 4 555 9200',
    email: 'dubai@worldwaycargo.com',
    address: 'Jebel Ali Free Zone, Dubai 00000, UAE',
    instagram: '@worldwaycargo.dubai',
    tiktok: '@wwcargo.dubai',
    facebook: '/worldwaycargo.dubai',
    whatsapp: '+97145559200',
    imageQuery: 'dubai uae jebel ali port shipping containers',
  },
  {
    city: 'Shanghai',
    country: 'China',
    region: 'Asia',
    lat: 31.2304,
    lng: 121.4737,
    phone: '+86 21 5550 8800',
    email: 'shanghai@worldwaycargo.com',
    address: 'Pudong Cargo Terminal, Shanghai 200120, China',
    instagram: '@worldwaycargo.shanghai',
    tiktok: '@wwcargo.shanghai',
    facebook: '/worldwaycargo.shanghai',
    whatsapp: '+862155508800',
    imageQuery: 'shanghai china pudong port shipping containers aerial',
  },
  {
    city: 'Moscow',
    country: 'Russia',
    region: 'Europe',
    lat: 55.7558,
    lng: 37.6173,
    phone: '+7 495 555 3300',
    email: 'moscow@worldwaycargo.com',
    address: 'Moscow International Logistics Park, Moscow 125047, Russia',
    instagram: '@worldwaycargo.moscow',
    tiktok: '@wwcargo.moscow',
    facebook: '/worldwaycargo.moscow',
    whatsapp: '+74955553300',
    imageQuery: 'moscow russia freight logistics warehouse winter',
  },
  {
    city: 'São Paulo',
    country: 'Brazil',
    region: 'Americas',
    lat: -23.5505,
    lng: -46.6333,
    phone: '+55 11 5550 7700',
    email: 'saopaulo@worldwaycargo.com',
    address: 'Guarulhos Cargo Terminal, São Paulo 07000, Brazil',
    instagram: '@worldwaycargo.saopaulo',
    tiktok: '@wwcargo.saopaulo',
    facebook: '/worldwaycargo.saopaulo',
    whatsapp: '+551155507700',
    imageQuery: 'sao paulo brazil industrial cargo port aerial',
  },
];

export const headquarters = branches[0];

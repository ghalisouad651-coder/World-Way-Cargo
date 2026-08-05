import { useState, type ComponentType } from 'react';
import { MapPin, Mail, Phone, Instagram, Facebook, MessageCircle, Globe2, Building2, ArrowRight } from 'lucide-react';
import WorldMap from '@/components/WorldMap';
import { branches } from '@/lib/branches';
import type { Branch } from '@/lib/branches';
import { useI18n } from '@/lib/i18n';

interface BranchesPageProps {
  onNavigate: (path: string) => void;
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.73 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const regionColors: Record<Branch['region'], string> = {
  Asia: 'bg-primary-100 text-primary-700',
  Europe: 'bg-success-100 text-success-700',
  Americas: 'bg-warning-100 text-warning-700',
  'Middle East': 'bg-accent-100 text-accent-700',
};

export default function BranchesPage({ onNavigate }: BranchesPageProps) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<Branch | null>(null);

  const regions: Branch['region'][] = ['Europe', 'Asia', 'Americas', 'Middle East'];

  return (
    <div className="pt-[var(--header-height)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
        <div className="absolute inset-0 grid-radial opacity-20" />
        <div className="absolute -top-32 ltr:right-1/4 rtl:left-1/4 h-80 w-80 rounded-full bg-accent-600/30 blur-3xl" />
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-200">
              <Globe2 className="h-3.5 w-3.5" /> Branches & Logistics
            </span>
            <h1 className="reveal reveal-delay-1 mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance">
              Our Global <span className="text-primary-400">Footprint</span>
            </h1>
            <p className="reveal reveal-delay-2 mx-auto mt-5 max-w-2xl text-lg text-ink-300 text-pretty">
              Eight dedicated branches across four continents, each with local experts and a direct contact line. Tap any marker on the map to explore a location.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive map */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900">Interactive Branch Map</h2>
              <p className="text-sm text-ink-500">Click a marker to view branch details</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <span key={r} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${regionColors[r]}`}>
                  <span className="inline-block h-2 w-2 rounded-full bg-current" />
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <WorldMap height="560px" onBranchSelect={setSelected} />
            <div className="space-y-3">
              {branches.map((b) => (
                <button
                  key={b.city}
                  onClick={() => setSelected(b)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-start transition-all ${
                    selected?.city === b.city
                      ? 'border-primary-400 bg-primary-50 shadow-md'
                      : 'border-ink-100 bg-white hover:border-primary-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-100">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink-900">{b.city}, {b.country}</p>
                    <p className="truncate text-xs text-ink-500">{b.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${regionColors[b.region]}`}>
                    {b.region}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branch detail / list with unique emails */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">
              <Building2 className="h-3.5 w-3.5" /> Local Inquiries
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
              Every Branch, A Direct Line
            </h2>
            <p className="mt-4 text-ink-600 text-pretty">
              Each location has its own dedicated email for local inquiries. Reach the team that knows your region best.
            </p>
          </div>

          {selected && (
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-primary-200 bg-white p-6 shadow-lg sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink-900">{selected.city}, {selected.country}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-600">
                    <MapPin className="h-4 w-4 text-primary-500" /> {selected.address}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${regionColors[selected.region]}`}>
                  {selected.region}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-3 rounded-xl bg-ink-50 p-4 transition-colors hover:bg-primary-50">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Local Email</p>
                    <p className="truncate text-sm font-semibold text-ink-900">{selected.email}</p>
                  </div>
                </a>
                <a href={`tel:${selected.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 rounded-xl bg-ink-50 p-4 transition-colors hover:bg-primary-50">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Phone</p>
                    <p className="text-sm font-semibold text-ink-900">{selected.phone}</p>
                  </div>
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <SocialLink icon={Instagram} label="Instagram" href={`https://instagram.com/${selected.instagram}`} text={selected.instagram} />
                <SocialLink icon={TikTokIcon} label="TikTok" href={`https://tiktok.com/${selected.tiktok}`} text={selected.tiktok} />
                <SocialLink icon={Facebook} label="Facebook" href={`https://facebook.com${selected.facebook}`} text={selected.facebook} />
                <SocialLink icon={MessageCircle} label="WhatsApp" href={`https://wa.me/${selected.whatsapp.replace(/\D/g, '')}`} text="WhatsApp" />
              </div>
            </div>
          )}

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((b) => (
              <div key={b.city} className="card p-5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink-900">{b.city}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${regionColors[b.region]}`}>{b.region}</span>
                </div>
                <p className="text-xs text-ink-500">{b.country}</p>
                <a href={`mailto:${b.email}`} className="mt-3 flex items-center gap-2 text-xs font-medium text-primary-700 hover:underline">
                  <Mail className="h-3.5 w-3.5" />
                  {b.email}
                </a>
                <p className="mt-1.5 flex items-center gap-2 text-xs text-ink-500">
                  <Phone className="h-3.5 w-3.5" />
                  {b.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-x text-center">
          <p className="text-ink-600">Need to reach our main headquarters?</p>
          <button onClick={() => onNavigate('/contact')} className="btn-primary mt-4">
            {t.cta.contact}
            <ArrowRight className="h-4 w-4 ltr:ml-1 rtl:rotate-180 rtl:mr-1" />
          </button>
        </div>
      </section>
    </div>
  );
}

function SocialLink({ icon: Icon, label, href, text }: { icon: ComponentType<{ className?: string }>; label: string; href: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:border-primary-400 hover:text-primary-700"
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="truncate">{text}</span>
      <span className="sr-only">{label}</span>
    </a>
  );
}

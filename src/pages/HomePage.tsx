import { Plane, Ship, Truck, ShieldCheck, Globe2, Award, ArrowRight, Package, Clock, Users, Building2, TrendingUp } from 'lucide-react';
import TrackingBar from '@/components/TrackingBar';
import PlaceholderImage, { type ImageCategory } from '@/components/PlaceholderImage';
import { useI18n } from '@/lib/i18n';
import { branches } from '@/lib/branches';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const stats = [
  { icon: Clock, value: '2010', label: 'Founded' },
  { icon: Globe2, value: '40+', label: 'Countries Served' },
  { icon: Building2, value: '8', label: 'Global Branches' },
  { icon: Package, value: '1.2M+', label: 'Shipments Delivered' },
];

const services = [
  { icon: Plane, title: 'Air Freight', desc: 'Express electronics delivery in 2–5 days, worldwide.' },
  { icon: Ship, title: 'Sea Freight', desc: 'Cost-effective bulk shipping for large electronics orders.' },
  { icon: Truck, title: 'Land Freight', desc: 'Reliable road logistics connecting Europe and Asia.' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useI18n();

  const hubImages: { category: ImageCategory; alt: string }[] = [
    { category: 'hub', alt: 'Modern logistics hub' },
    { category: 'warehouse', alt: 'Automated warehouse facility' },
    { category: 'port', alt: 'International shipping port' },
    { category: 'airfreight', alt: 'Air cargo loading' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[calc(var(--header-height)+2rem)] pb-20 text-white lg:pt-[calc(var(--header-height)+4rem)]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/WorldWay_Carog.jpeg)' }}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-[1px]" />

        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-200 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-success-400" />
              Trusted Global Logistics Since 2010
            </span>
            <h1 className="reveal reveal-delay-1 mt-6 font-display text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Worldway<span className="text-primary-400">-cargo</span>
            </h1>
            <p className="reveal reveal-delay-2 mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-300 text-pretty">
              Worldway-cargo is a global leader in shipping electronics and accessories by air, sea, and land — fully insured, fully guaranteed, and tracked end-to-end.
            </p>
          </div>

          {/* Tracking bar */}
          <div className="reveal reveal-delay-3 mx-auto mt-10 max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
              <TrackingBar variant="hero" />
            </div>
            <p className="mt-3 text-center text-xs text-ink-400">
              Demo numbers: WWC2024001 · WWC2024002 · WWC2024003 · WWC2024004 · WWC2024005
            </p>
          </div>

          {/* Stats */}
          <div className="reveal reveal-delay-4 mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <s.icon className="mx-auto h-6 w-6 text-primary-400" />
                <p className="mt-2 font-display text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">
                <Users className="h-3.5 w-3.5" /> About Us
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl text-balance">
                Reliability You Can Build A Business On
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600 text-pretty">
                Founded in <strong className="text-ink-900">2010</strong>, Worldway-cargo began with a simple promise: deliver electronics and accessories safely, on time, and with total transparency. Over a decade later, that promise has made us a global leader in the electronics logistics space.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600 text-pretty">
                Headquartered in <strong className="text-ink-900">Hamburg, Germany</strong>, our network spans Asia, Europe, and the Americas — with dedicated branches in Tokyo, Shanghai, New York, Paris, Dubai, Moscow, and São Paulo. Wherever your electronics need to go, we've already mapped the route.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: ShieldCheck, text: 'Fully insured & guaranteed shipments' },
                  { icon: Award, text: 'ISO 9001 quality-certified operations' },
                  { icon: Globe2, text: 'Sourcing from China, USA, Russia, France & more' },
                  { icon: TrendingUp, text: 'End-to-end tracking on every package' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 rounded-xl bg-ink-50 p-3.5">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                    <span className="text-sm font-medium text-ink-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => onNavigate('/services')} className="btn-primary mt-8">
                {t.cta.learnMore}
                <ArrowRight className="h-4 w-4 ltr:ml-1 rtl:rotate-180 rtl:mr-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {hubImages.map((img, i) =>
                i === 0 ? (
                  <div key={i} className="overflow-hidden rounded-2xl aspect-[3/4]">
                    <img
                      src="/images/files_10772935-2026-07-26T22-26-34-522Z-SEA.jpg"
                      alt={img.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <PlaceholderImage
                    key={i}
                    category={img.category}
                    alt={img.alt}
                    className={i % 2 === 0 ? '' : 'translate-y-6'}
                    aspect="aspect-[3/4]"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Our Expertise</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
              Three Ways We Move Your Electronics
            </h2>
            <p className="mt-4 text-ink-600 text-pretty">
              Every shipment is handled by specialists in electronics and accessories, with options to match your budget and timeline.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="card group p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-600/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button onClick={() => onNavigate('/services')} className="btn-secondary">
              Explore All Services
              <ArrowRight className="h-4 w-4 ltr:ml-1 rtl:rotate-180 rtl:mr-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Global presence band */}
      <section className="py-20 lg:py-24">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-ink-950 px-8 py-14 text-white lg:px-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-200">
                  <Globe2 className="h-3.5 w-3.5" /> Global Presence
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl text-balance">
                  8 Branches. 4 Continents. One Standard of Excellence.
                </h2>
                <p className="mt-4 max-w-xl text-ink-200 text-pretty">
                  From Hamburg to Tokyo, Dubai to São Paulo — our branches bring local expertise to a global network. Every location meets the same ISO-certified standard.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {branches.map((b) => (
                    <span key={b.city} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90">
                      {b.city}
                    </span>
                  ))}
                </div>
                <button onClick={() => onNavigate('/branches')} className="btn-secondary mt-8 !border-white/20 !bg-white/10 !text-white hover:!bg-white/20">
                  View Branches Map
                  <ArrowRight className="h-4 w-4 ltr:ml-1 rtl:rotate-180 rtl:mr-1" />
                </button>
              </div>
              <PlaceholderImage category="global" alt="Global shipping network" className="border border-white/10" rounded="rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

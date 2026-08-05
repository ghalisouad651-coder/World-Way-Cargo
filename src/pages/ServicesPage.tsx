import { Plane, Ship, Truck, ShieldCheck, BadgeCheck, Globe2, PackageCheck, Factory, Zap, Clock, ArrowRight, Lock } from 'lucide-react';
import PlaceholderImage from '@/components/PlaceholderImage';
import { useI18n } from '@/lib/i18n';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

const shippingMethods = [
  {
    icon: Plane,
    title: 'Air Freight',
    tagline: 'Speed-first delivery',
    desc: 'When time matters most, our air freight service delivers electronics and accessories between major hubs in 2–5 business days. Ideal for high-value, time-sensitive cargo.',
    features: ['Express 2–5 day delivery', 'Real-time flight tracking', 'Priority customs clearance', 'Temperature-sensitive handling'],
    image: 'airfreight' as const,
  },
  {
    icon: Ship,
    title: 'Sea Freight',
    tagline: 'Scale & savings',
    desc: 'The most economical way to move bulk electronics orders. Full and less-than-container options with reliable 12–30 day transit on major trade lanes.',
    features: ['FCL & LCL container options', 'Best rates for bulk cargo', 'Consolidated shipping hubs', 'Full cargo insurance included'],
    image: 'seafreight' as const,
  },
  {
    icon: Truck,
    title: 'Land Freight',
    tagline: 'Regional reliability',
    desc: 'Door-to-door road logistics connecting our European and Asian branches. Flexible scheduling with full visibility from departure to arrival.',
    features: ['Door-to-door delivery', 'Cross-border expertise', 'Flexible scheduling', 'GPS-tracked vehicles'],
    image: 'landfreight' as const,
  },
];

const sourcingCountries = [
  { flag: '🇨🇳', country: 'China', specialty: 'Consumer electronics & components' },
  { flag: '🇺🇸', country: 'USA', specialty: 'Premium tech & accessories' },
  { flag: '🇷🇺', country: 'Russia', specialty: 'Industrial electronics' },
  { flag: '🇫🇷', country: 'France', specialty: 'Luxury & lifestyle tech' },
  { flag: '🇩🇪', country: 'Germany', specialty: 'Precision engineering' },
  { flag: '🇯🇵', country: 'Japan', specialty: 'Innovation & miniaturized tech' },
];

const guarantees = [
  { icon: ShieldCheck, title: 'Fully Insured', desc: 'Every shipment is covered from pickup to delivery — your goods are protected at every mile.' },
  { icon: BadgeCheck, title: 'Quality Guaranteed', desc: 'We source only the best electronics in the market. If it does not meet our standard, it does not ship.' },
  { icon: Lock, title: 'Warranty Backed', desc: 'All goods carry a full warranty. We stand behind every product we move.' },
  { icon: PackageCheck, title: 'Verified Sourcing', desc: 'Trusted supplier network across six continents with quality checks at every hub.' },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { t } = useI18n();

  return (
    <div className="pt-[var(--header-height)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
        <div className="absolute inset-0 grid-radial opacity-20" />
        <div className="absolute -top-32 ltr:left-1/4 rtl:right-1/4 h-80 w-80 rounded-full bg-primary-600/30 blur-3xl" />
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-200">
              <Zap className="h-3.5 w-3.5" /> Services
            </span>
            <h1 className="reveal reveal-delay-1 mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance">
              Electronics Logistics, <span className="text-primary-400">Done Right</span>
            </h1>
            <p className="reveal reveal-delay-2 mx-auto mt-5 max-w-2xl text-lg text-ink-300 text-pretty">
              Quality you can feel, warranty you can trust. We source the best electronics and accessories from around the world and ship them by air, sea, and land — fully guaranteed and insured.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping methods */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Shipping Methods</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
              Air, Sea, or Land — Built for Electronics
            </h2>
            <p className="mt-4 text-ink-600 text-pretty">
              We specialize in shipping electronics and accessories. Each method is optimized for the unique needs of high-value, sensitive cargo.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {shippingMethods.map((method, i) => (
              <div
                key={method.title}
                className={`grid items-center gap-8 rounded-3xl border border-ink-100 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-600/30">
                      <method.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink-900">{method.title}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{method.tagline}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink-600 text-pretty">{method.desc}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {method.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-700">
                          <BadgeCheck className="h-3.5 w-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                {method.image === 'seafreight' ? (
                  <div className="overflow-hidden rounded-3xl aspect-[16/10]">
                    <img
                      src="/images/files_10772935-2026-07-26T22-28-20-769Z-files_10772935-2026-07-26T22-26-34-522Z-SEA.jpg"
                      alt={method.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ) : (
                  <PlaceholderImage category={method.image} alt={method.title} rounded="rounded-3xl" aspect="aspect-[16/10]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">
                <Factory className="h-3.5 w-3.5" /> Global Sourcing
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
                The Best Electronics, Sourced Worldwide
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600 text-pretty">
                We do not just ship — we curate. Our sourcing teams in China, the USA, Russia, France, and beyond hand-select the best electronics and accessories the market has to offer, so your customers always receive quality they can trust.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {sourcingCountries.map((c) => (
                  <div key={c.country} className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-4">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <p className="font-semibold text-ink-900">{c.country}</p>
                      <p className="text-xs text-ink-500">{c.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img src="/images/WhatsApp_Image_2026-08-05_at_11.59.58_AM copy.jpeg" alt="Global sourcing port operations" className="w-full object-cover rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">
              <ShieldCheck className="h-3.5 w-3.5" /> Quality & Warranty
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
              The Best in the Market — Guaranteed
            </h2>
            <p className="mt-4 text-ink-600 text-pretty">
              Our goods are the best in the market, fully guaranteed, and fully insured. That is not a slogan — it is our operating standard.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div key={g.title} className="card group p-7 text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-600/5">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-600/25 transition-transform group-hover:scale-110">
                  <g.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-ink-950 px-8 py-14 text-center text-white lg:px-16 lg:py-20">
            <Clock className="mx-auto h-10 w-10 text-primary-300" />
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-balance">
              Ready to Ship With Confidence?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-200 text-pretty">
              Get a tailored quote in minutes. Tell us your service type, weight, origin, and destination — we handle the rest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => onNavigate('/faq')} className="btn-primary !bg-white !text-primary-700 hover:!bg-ink-100">
                {t.cta.quote}
                <ArrowRight className="h-4 w-4 ltr:ml-1 rtl:rotate-180 rtl:mr-1" />
              </button>
              <button onClick={() => onNavigate('/contact')} className="btn-secondary !border-white/20 !bg-white/10 !text-white hover:!bg-white/20">
                {t.cta.contact}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

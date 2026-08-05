import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Clock, Building2, Send, CheckCircle2 } from 'lucide-react';
import PlaceholderImage, { type ImageCategory } from '@/components/PlaceholderImage';
import { branches, headquarters } from '@/lib/branches';
import { useState } from 'react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.73 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const branchImages: { category: ImageCategory; city: string; localSrc?: string }[] = [
  { category: 'tokyo', city: 'Tokyo' },
  { category: 'newyork', city: 'New York', localSrc: '/images/files_10772935-2026-07-27T08-11-12-179Z-new_yorl.jpg' },
  { category: 'paris', city: 'Paris', localSrc: '/images/files_10772935-2026-07-27T08-09-38-795Z-WhatsApp_Image_2026-07-27_at_11.05.18_AM.jpg' },
  { category: 'dubai', city: 'Dubai' },
];

const hqSocials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/worldwaycargo', handle: '@worldwaycargo' },
  { Icon: TikTokIcon, label: 'TikTok', href: 'https://tiktok.com/@worldwaycargo', handle: '@worldwaycargo' },
  { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/worldwaycargo', handle: '/worldwaycargo' },
  { Icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${headquarters.whatsapp.replace(/\D/g, '')}`, handle: headquarters.whatsapp },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="pt-[var(--header-height)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
        <div className="absolute inset-0 grid-radial opacity-20" />
        <div className="absolute -top-32 ltr:left-1/3 rtl:right-1/3 h-80 w-80 rounded-full bg-primary-600/30 blur-3xl" />
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-200">
              <Mail className="h-3.5 w-3.5" /> Communication
            </span>
            <h1 className="reveal reveal-delay-1 mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance">
              Let's <span className="text-primary-400">Talk</span>
            </h1>
            <p className="reveal reveal-delay-2 mx-auto mt-5 max-w-2xl text-lg text-ink-300 text-pretty">
              Reach our main headquarters or any of our international branches directly. We respond within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* HQ + form */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* HQ info */}
            <div>
              <span className="section-eyebrow">
                <Building2 className="h-3.5 w-3.5" /> Main Headquarters
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
                Hamburg, Germany
              </h2>
              <p className="mt-4 text-ink-600 text-pretty">
                Our global headquarters coordinates every branch and shipment worldwide. Reach us any time through the channels below.
              </p>

              <div className="mt-6 space-y-3">
                <a href={`mailto:${headquarters.email}`} className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Email</p>
                    <p className="font-semibold text-ink-900">{headquarters.email}</p>
                  </div>
                </a>
                <a href={`tel:${headquarters.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-50 text-success-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Phone</p>
                    <p className="font-semibold text-ink-900">{headquarters.phone}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Address</p>
                    <p className="font-semibold text-ink-900">{headquarters.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning-50 text-warning-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Hours</p>
                    <p className="font-semibold text-ink-900">Mon–Fri 8:00–18:00 CET · 24/7 Support</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <h3 className="mt-8 text-sm font-semibold text-ink-900">Follow Worldway-cargo</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {hqSocials.map(({ Icon, label, href, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 transition-all hover:border-primary-400 hover:text-primary-700 hover:shadow-sm"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="card p-7 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-ink-900">Send a Message</h2>
              <p className="mt-1 text-sm text-ink-500">We'll get back to you within one business day.</p>

              {sent && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Message sent! We'll be in touch shortly.
                </div>
              )}

              <form onSubmit={submit} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* International branches table */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">
              <Building2 className="h-3.5 w-3.5" /> International Branches
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
              Branch Directory
            </h2>
            <p className="mt-4 text-ink-600 text-pretty">
              Contact numbers and social handles for every international branch.
            </p>
          </div>

          {/* Desktop table */}
          <div className="mt-12 hidden overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-5 py-4 text-start">City</th>
                    <th className="px-5 py-4 text-start">Country</th>
                    <th className="px-5 py-4 text-start">Phone</th>
                    <th className="px-5 py-4 text-start">Email</th>
                    <th className="px-5 py-4 text-start">Instagram</th>
                    <th className="px-5 py-4 text-start">WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {branches.map((b) => (
                    <tr key={b.city} className="transition-colors hover:bg-primary-50/40">
                      <td className="px-5 py-4 font-semibold text-ink-900">{b.city}</td>
                      <td className="px-5 py-4 text-ink-600">{b.country}</td>
                      <td className="px-5 py-4 text-ink-600 tabular-nums">{b.phone}</td>
                      <td className="px-5 py-4">
                        <a href={`mailto:${b.email}`} className="font-medium text-primary-700 hover:underline">{b.email}</a>
                      </td>
                      <td className="px-5 py-4 text-ink-600">{b.instagram}</td>
                      <td className="px-5 py-4 text-ink-600 tabular-nums">{b.whatsapp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="mt-8 space-y-3 lg:hidden">
            {branches.map((b) => (
              <div key={b.city} className="card p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink-900">{b.city}</h3>
                  <span className="text-xs text-ink-500">{b.country}</span>
                </div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-500">Phone</dt>
                    <dd className="font-medium text-ink-900 tabular-nums">{b.phone}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-ink-500">Email</dt>
                    <dd><a href={`mailto:${b.email}`} className="font-medium text-primary-700">{b.email}</a></dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-500">Instagram</dt>
                    <dd className="font-medium text-ink-900">{b.instagram}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-500">WhatsApp</dt>
                    <dd className="font-medium text-ink-900 tabular-nums">{b.whatsapp}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 diverse branch images */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">
              <MapPin className="h-3.5 w-3.5" /> Our Branches Worldwide
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
              From East to West, We're There
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {branchImages.map((img) => (
              <div key={img.city} className="group">
                {img.localSrc ? (
                  <div className="overflow-hidden aspect-[3/4] rounded-2xl">
                    <img src={img.localSrc} alt={`${img.city} branch`} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <PlaceholderImage category={img.category} alt={`${img.city} branch`} aspect="aspect-[3/4]" />
                )}
                <div className="mt-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  <p className="font-semibold text-ink-900">{img.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

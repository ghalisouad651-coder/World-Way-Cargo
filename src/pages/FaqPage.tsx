import { useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Lock, BadgeCheck, Clock, Headphones, Radar, Plane, Ship, Truck, Send, Loader2, CheckCircle2, HelpCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { QuoteRequest } from '@/lib/types';

const faqs = [
  {
    q: 'How long does shipping take?',
    a: 'It depends on the method. Air freight delivers electronics in 2–5 business days between major hubs. Sea freight runs 12–30 days for bulk orders. Land freight across Europe and Asia typically takes 3–8 days. You will see an estimated delivery date when you track your shipment.',
  },
  {
    q: 'How does your tracking technology work?',
    a: 'Every shipment receives a unique tracking number linked to a live database. From pickup to delivery, each checkpoint — origin facility, transit hubs, customs, out-for-delivery, and delivery — is logged with a timestamp and location. Enter your tracking number on the homepage to see the full timeline.',
  },
  {
    q: 'What is your customer support commitment?',
    a: 'We respond to every inquiry within one business day. Our live support chatbot is available 24/7 for instant answers, and each branch has a dedicated local email and phone line. For urgent shipment issues, our HQ team in Hamburg is reachable around the clock.',
  },
  {
    q: 'Are my goods insured?',
    a: 'Yes. Every shipment is fully insured from the moment of pickup to delivery. If anything happens in transit, you are covered. We are also ISO 9001 certified, meaning our quality processes are independently audited and verified.',
  },
  {
    q: 'What kind of products do you ship?',
    a: 'We specialize in electronics and accessories — from consumer gadgets and components to premium tech and industrial electronics. We source from China, the USA, Russia, France, Germany, Japan, and more, all backed by warranty.',
  },
  {
    q: 'Can I get a quote before shipping?',
    a: 'Absolutely. Use the Quick Quote form below to tell us your service type, weight, origin, and destination. Our team will send a tailored quote within one business day.',
  },
];

const trustBadges = [
  { icon: Award, title: 'ISO 9001 Certified', desc: 'Independently audited quality management systems across all branches.' },
  { icon: ShieldCheck, title: 'Fully Insured', desc: 'Every shipment covered from pickup to final delivery.' },
  { icon: Lock, title: 'Secure Handling', desc: 'Tamper-evident packaging and chain-of-custody tracking.' },
  { icon: BadgeCheck, title: 'Warranty Backed', desc: 'All sourced goods carry a full manufacturer warranty.' },
];

const serviceTypes = [
  { value: 'air', label: 'Air Freight', icon: Plane },
  { value: 'sea', label: 'Sea Freight', icon: Ship },
  { value: 'land', label: 'Land Freight', icon: Truck },
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<Omit<QuoteRequest, 'id' | 'status'>>({
    service_type: 'air',
    weight_kg: 0,
    origin: '',
    destination: '',
    customer_name: '',
    customer_email: '',
    notes: '',
  });

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quote.weight_kg <= 0 || !quote.origin.trim() || !quote.destination.trim()) {
      setError('Please fill in weight, origin, and destination.');
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        service_type: quote.service_type,
        weight_kg: quote.weight_kg,
        origin: quote.origin.trim(),
        destination: quote.destination.trim(),
        customer_name: quote.customer_name?.trim() || null,
        customer_email: quote.customer_email?.trim() || null,
        notes: quote.notes?.trim() || null,
        status: 'pending',
      };
      const { error: insertError } = await supabase.from('quote_requests').insert(payload).single();
      if (insertError) throw insertError;
      setSubmitted(true);
      setQuote({ service_type: 'air', weight_kg: 0, origin: '', destination: '', customer_name: '', customer_email: '', notes: '' });
    } catch {
      setError('Could not submit your quote request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[var(--header-height)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
        <div className="absolute inset-0 grid-radial opacity-20" />
        <div className="absolute -top-32 ltr:right-1/3 rtl:left-1/3 h-80 w-80 rounded-full bg-success-600/25 blur-3xl" />
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-200">
              <HelpCircle className="h-3.5 w-3.5" /> FAQ & Trust
            </span>
            <h1 className="reveal reveal-delay-1 mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance">
              Answers & <span className="text-primary-400">Assurance</span>
            </h1>
            <p className="reveal reveal-delay-2 mx-auto mt-5 max-w-2xl text-lg text-ink-300 text-pretty">
              Everything you need to know about shipping times, tracking, support, and the certifications that back every shipment.
            </p>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="card flex flex-col items-center p-7 text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-600/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-success-500 to-success-700 text-white shadow-lg shadow-success-600/25">
                  <badge.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{badge.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + pillars */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* FAQ accordion */}
            <div>
              <span className="section-eyebrow">
                <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
                Your Questions, Answered
              </h2>

              <div className="mt-8 space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-start"
                    >
                      <span className="font-semibold text-ink-900">{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-ink-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="border-t border-ink-100 px-5 py-4 text-sm leading-relaxed text-ink-600 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support pillars */}
            <div className="space-y-4">
              <div className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Shipping Times</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Air: 2–5 days · Sea: 12–30 days · Land: 3–8 days. Each shipment shows a live estimated delivery date.
                </p>
              </div>
              <div className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <Radar className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Tracking Technology</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Real-time database-backed tracking with timestamped checkpoints at every transit hub. Enter your number on the homepage.
                </p>
              </div>
              <div className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-50 text-success-600">
                  <Headphones className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Customer Support</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  24/7 live chat, one-business-day email responses, and a dedicated local line at every branch. You are never on your own.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote form */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-xl shadow-primary-600/5">
              <div className="bg-gradient-to-br from-primary-700 to-primary-900 px-8 py-8 text-white sm:px-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-200">
                  <Send className="h-3.5 w-3.5" /> Quick Quote
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl text-balance">
                  Get a Tailored Shipping Quote
                </h2>
                <p className="mt-2 text-sm text-primary-100 text-pretty">
                  Tell us what you are shipping. We will send a quote within one business day.
                </p>
              </div>

              <div className="p-8 sm:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center py-10 text-center animate-fade-in">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-600">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Quote Request Received!</h3>
                    <p className="mt-2 max-w-sm text-sm text-ink-600">
                      Thank you. Our logistics team will review your request and send a tailored quote to your email within one business day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary mt-6"
                    >
                      Submit Another Quote
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitQuote} className="space-y-5">
                    {/* Service type */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-ink-700">Service Type</label>
                      <div className="grid gap-2.5 sm:grid-cols-3">
                        {serviceTypes.map((s) => {
                          const active = quote.service_type === s.value;
                          return (
                            <button
                              key={s.value}
                              type="button"
                              onClick={() => setQuote({ ...quote, service_type: s.value })}
                              className={`flex items-center gap-2.5 rounded-xl border p-3.5 text-start transition-all ${
                                active
                                  ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20'
                                  : 'border-ink-200 bg-white text-ink-700 hover:border-primary-300'
                              }`}
                            >
                              <s.icon className="h-5 w-5" />
                              <span className="text-sm font-semibold">{s.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Weight (kg)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={quote.weight_kg || ''}
                        onChange={(e) => setQuote({ ...quote, weight_kg: parseFloat(e.target.value) || 0 })}
                        className="input-field"
                        placeholder="e.g. 12.5"
                      />
                    </div>

                    {/* Origin / Destination */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-ink-700">Origin</label>
                        <input
                          required
                          value={quote.origin}
                          onChange={(e) => setQuote({ ...quote, origin: e.target.value })}
                          className="input-field"
                          placeholder="e.g. Shanghai, China"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-ink-700">Destination</label>
                        <input
                          required
                          value={quote.destination}
                          onChange={(e) => setQuote({ ...quote, destination: e.target.value })}
                          className="input-field"
                          placeholder="e.g. Tokyo, Japan"
                        />
                      </div>
                    </div>

                    {/* Optional contact */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-ink-700">Your Name <span className="text-ink-400">(optional)</span></label>
                        <input
                          value={quote.customer_name ?? ''}
                          onChange={(e) => setQuote({ ...quote, customer_name: e.target.value })}
                          className="input-field"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-ink-700">Email <span className="text-ink-400">(optional)</span></label>
                        <input
                          type="email"
                          value={quote.customer_email ?? ''}
                          onChange={(e) => setQuote({ ...quote, customer_email: e.target.value })}
                          className="input-field"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Notes <span className="text-ink-400">(optional)</span></label>
                      <textarea
                        rows={3}
                        value={quote.notes ?? ''}
                        onChange={(e) => setQuote({ ...quote, notes: e.target.value })}
                        className="input-field resize-none"
                        placeholder="Any special handling or details..."
                      />
                    </div>

                    {error && (
                      <div className="rounded-xl bg-error-50 px-4 py-3 text-sm text-error-700">{error}</div>
                    )}

                    <button type="submit" disabled={submitting} className="btn-primary w-full">
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {submitting ? 'Submitting...' : 'Request Quote'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

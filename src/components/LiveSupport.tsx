import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface Msg { role: 'bot' | 'user'; text: string }

function botReply(input: string): string {
  const q = input.toLowerCase();
  if (/track|shipment|where|status/.test(q))
    return "You can track any shipment from the search bar at the top of our homepage — just enter your tracking number (e.g. WWC2024001) and you'll see a live status timeline.";
  if (/quote|price|cost|rate/.test(q))
    return "For a tailored quote, head to the FAQ & Trust page and fill out the Quick Quote form with your service type, weight, origin, and destination. Our team responds within one business day.";
  if (/air|plane|fast/.test(q))
    return "Air freight is our fastest option — ideal for electronics and accessories. Typical transit is 2–5 business days between major hubs.";
  if (/sea|ship|ocean|container/.test(q))
    return "Sea freight is the most economical for bulk electronics shipments. Transit usually runs 12–30 days depending on the route.";
  if (/land|truck|road/.test(q))
    return "Land freight connects our branches across Europe and Asia by road — great for regional electronics distribution.";
  if (/contact|phone|email|call/.test(q))
    return "You can reach our Hamburg HQ at +49 40 5582 9100 or hamburg.hq@worldwaycargo.com. We also have branches in Tokyo, New York, Paris, Dubai, and more — see the Contact page.";
  if (/insurance|guarantee|warranty/.test(q))
    return "Every shipment is fully insured and backed by our quality guarantee. We're ISO 9001 certified and your goods are covered from pickup to delivery.";
  if (/hi|hello|hey|salam|سلام/.test(q))
    return "Hello! I'm here to help with tracking, quotes, shipping options, and branch info. What do you need today?";
  return "Great question! I can help with shipment tracking, quotes, shipping methods (air/sea/land), insurance, and branch contacts. Could you tell me a bit more about what you need?";
}

export default function LiveSupport() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: t.liveSupport.greeting }]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    setMsgs([{ role: 'bot', text: t.liveSupport.greeting }]);
  }, [t.liveSupport.greeting]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'bot', text: botReply(text) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 ltr:right-5 rtl:left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-xl shadow-primary-600/40 transition-all hover:scale-105 hover:bg-primary-700"
        aria-label="Live support"
      >
        {!open && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary-500" />
        )}
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 ltr:right-5 rtl:left-5 z-40 flex h-[460px] max-h-[80vh] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-2xl animate-fade-up">
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-br from-primary-700 to-primary-900 px-4 py-3 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.liveSupport.title}</p>
              <p className="flex items-center gap-1.5 text-xs text-primary-100">
                <span className="inline-block h-2 w-2 rounded-full bg-success-400" />
                {t.liveSupport.status}
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg p-1 text-white/80 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-ink-50 p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-primary-600 text-white'
                      : 'rounded-bl-md bg-white text-ink-800 shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-ink-300 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-ink-300 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-ink-300" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={send} className="flex items-center gap-2 border-t border-ink-100 bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.liveSupport.placeholder}
              className="flex-1 rounded-xl border border-ink-200 bg-ink-50 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
            />
            <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white transition-colors hover:bg-primary-700" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

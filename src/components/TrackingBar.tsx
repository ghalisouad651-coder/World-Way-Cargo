import { useState } from 'react';
import { Search, Loader2, Package, AlertCircle, CheckCircle2, Truck, Plane, Ship, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';
import type { Shipment, ShipmentEvent } from '@/lib/types';

interface TrackingBarProps {
  variant?: 'hero' | 'compact';
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Package }> = {
  pending: { label: 'Pending', color: 'text-warning-700 bg-warning-100', icon: Clock },
  in_transit: { label: 'In Transit', color: 'text-primary-700 bg-primary-100', icon: Truck },
  out_for_delivery: { label: 'Out for Delivery', color: 'text-accent-700 bg-accent-100', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-success-700 bg-success-100', icon: CheckCircle2 },
};

const serviceIcons: Record<string, typeof Package> = { air: Plane, sea: Ship, land: Truck };

export default function TrackingBar({ variant = 'hero' }: TrackingBarProps) {
  const { t } = useI18n();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ shipment: Shipment; events: ShipmentEvent[] } | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = trackingNumber.trim().toUpperCase();
    if (!code) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data: shipment, error: qErr } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', code)
        .maybeSingle();

      if (qErr) throw qErr;
      if (!shipment) {
        setError(`No shipment found for "${code}". Try WWC2024001 – WWC2024005.`);
        setLoading(false);
        return;
      }

      const { data: events, error: eErr } = await supabase
        .from('shipment_events')
        .select('*')
        .eq('shipment_id', shipment.id)
        .order('event_time', { ascending: true });

      if (eErr) throw eErr;

      setResult({ shipment: shipment as Shipment, events: (events ?? []) as ShipmentEvent[] });
    } catch {
      setError('Could not reach the tracking database. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeResult = () => {
    setResult(null);
    setTrackingNumber('');
  };

  const isHero = variant === 'hero';

  return (
    <>
      <form
        onSubmit={handleTrack}
        className={`flex w-full flex-col gap-3 ${isHero ? 'sm:flex-row' : 'sm:flex-row'}`}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400 ltr:left-4 rtl:right-4" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number (e.g. WWC2024001)"
            className={`input-field ltr:pl-12 rtl:pr-12 ${isHero ? '!bg-white/95 backdrop-blur' : ''}`}
            aria-label="Tracking number"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {t.cta.track}
        </button>
      </form>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-error-50 px-4 py-3 text-sm text-error-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <TrackingResult result={result} onClose={closeResult} />
      )}
    </>
  );
}

function TrackingResult({
  result,
  onClose,
}: {
  result: { shipment: Shipment; events: ShipmentEvent[] };
  onClose: () => void;
}) {
  const { shipment, events } = result;
  const status = statusConfig[shipment.status] ?? statusConfig.pending;
  const StatusIcon = status.icon;
  const ServiceIcon = serviceIcons[shipment.service_type ?? ''] ?? Package;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-ink-100 bg-white/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
              <Package className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Tracking Number</p>
              <p className="font-display text-sm font-bold text-ink-900">{shipment.tracking_number}</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost !px-3" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Status + route */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink-50 p-4">
            <div className="flex items-center gap-2.5">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {status.label}
              </span>
              {shipment.service_type && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-ink-600">
                  <ServiceIcon className="h-3.5 w-3.5" />
                  {shipment.service_type} freight
                </span>
              )}
            </div>
            {shipment.estimated_delivery && (
              <p className="text-xs text-ink-500">
                Est. delivery: <span className="font-semibold text-ink-800">{new Date(shipment.estimated_delivery).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </p>
            )}
          </div>

          {/* Route */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="card p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Origin</p>
              <p className="mt-1 flex items-center gap-1.5 font-semibold text-ink-900">
                <MapPin className="h-4 w-4 text-primary-500" />
                {shipment.origin_city}
              </p>
              {shipment.origin_country && <p className="text-xs text-ink-500">{shipment.origin_country}</p>}
            </div>
            <div className="card p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Destination</p>
              <p className="mt-1 flex items-center gap-1.5 font-semibold text-ink-900">
                <MapPin className="h-4 w-4 text-success-500" />
                {shipment.destination_city}
              </p>
              {shipment.destination_country && <p className="text-xs text-ink-500">{shipment.destination_country}</p>}
            </div>
          </div>

          {shipment.recipient_name && (
            <p className="mt-3 text-sm text-ink-600">
              Recipient: <span className="font-medium text-ink-900">{shipment.recipient_name}</span>
              {shipment.weight_kg && <> · {shipment.weight_kg} kg</>}
            </p>
          )}

          {/* Timeline */}
          <h4 className="mt-6 text-sm font-semibold text-ink-900">Tracking History</h4>
          <ol className="mt-3 space-y-0">
            {events.map((ev, i) => {
              const evStatus = statusConfig[ev.status] ?? statusConfig.pending;
              const EvIcon = evStatus.icon;
              const isLast = i === events.length - 1;
              return (
                <li key={ev.id} className="relative flex gap-4 pb-5">
                  {!isLast && <span className="absolute top-9 bottom-0 w-px bg-ink-200 ltr:left-[15px] rtl:right-[15px]" />}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${evStatus.color} z-10`}>
                    <EvIcon className="h-4 w-4" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-ink-900">{ev.description}</p>
                    {ev.location && <p className="text-xs text-ink-500">{ev.location}</p>}
                    <p className="mt-0.5 text-xs text-ink-400">
                      {new Date(ev.event_time).toLocaleString('en', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

/*
# Seed sample shipments and tracking events

## Purpose
Populate the `shipments` and `shipment_events` tables with realistic demo data so
the "Track Your Shipment" feature on the homepage returns meaningful results
immediately. Visitors can try tracking numbers like WWC2024001, WWC2024002, etc.

## Changes
- Insert 5 sample shipments spanning air, sea, and land freight with varied statuses.
- Insert a timeline of events for each shipment so the tracking results page shows
  a full journey (picked up -> in transit -> customs -> out for delivery -> delivered).

## Notes
1. Uses ON CONFLICT DO NOTHING so re-running is safe and idempotent.
2. Tracking numbers are sequential and easy to remember for demo purposes.
3. Events are ordered by event_time to render a proper timeline.
*/

INSERT INTO shipments (tracking_number, recipient_name, origin_city, destination_city, origin_country, destination_country, status, service_type, weight_kg, estimated_delivery, created_at)
VALUES
  ('WWC2024001', 'Yuki Tanaka', 'Shanghai', 'Tokyo', 'China', 'Japan', 'in_transit', 'air', 12.5, '2026-08-02', now() - interval '4 days'),
  ('WWC2024002', 'Emily Carter', 'Hamburg', 'New York', 'Germany', 'United States', 'out_for_delivery', 'sea', 850.0, '2026-07-28', now() - interval '12 days'),
  ('WWC2024003', 'Sophie Dubois', 'Shenzhen', 'Paris', 'China', 'France', 'delivered', 'air', 3.2, '2026-07-22', now() - interval '8 days'),
  ('WWC2024004', 'Ahmed Al-Rashid', 'Moscow', 'Dubai', 'Russia', 'United Arab Emirates', 'pending', 'land', 1200.0, '2026-08-10', now() - interval '1 day'),
  ('WWC2024005', 'Carlos Mendez', 'Los Angeles', 'Sao Paulo', 'United States', 'Brazil', 'in_transit', 'air', 45.8, '2026-08-01', now() - interval '3 days')
ON CONFLICT (tracking_number) DO NOTHING;

INSERT INTO shipment_events (shipment_id, status, location, description, event_time)
SELECT s.id, v.status, v.location, v.description, v.event_time
FROM (VALUES
  ('WWC2024001', 'pending', 'Shanghai, China', 'Shipment registered and awaiting pickup', now() - interval '4 days'),
  ('WWC2024001', 'in_transit', 'Shanghai Pudong Airport', 'Departed origin facility - airborne to Tokyo', now() - interval '3 days'),
  ('WWC2024001', 'in_transit', 'Narita Airport, Tokyo', 'Arrived at destination airport, clearing customs', now() - interval '1 day'),
  ('WWC2024002', 'pending', 'Hamburg, Germany', 'Container loaded at Hamburg port', now() - interval '12 days'),
  ('WWC2024002', 'in_transit', 'Atlantic Ocean', 'Vessel in transit across Atlantic', now() - interval '7 days'),
  ('WWC2024002', 'in_transit', 'Port of New York', 'Container arrived, customs clearance in progress', now() - interval '2 days'),
  ('WWC2024002', 'out_for_delivery', 'New York Distribution Center', 'Out for delivery to recipient address', now() - interval '3 hours'),
  ('WWC2024003', 'pending', 'Shenzhen, China', 'Order received and packaged', now() - interval '8 days'),
  ('WWC2024003', 'in_transit', 'Hong Kong Airport', 'Air freight dispatched', now() - interval '7 days'),
  ('WWC2024003', 'in_transit', 'Charles de Gaulle, Paris', 'Arrived in France', now() - interval '6 days'),
  ('WWC2024003', 'delivered', 'Paris, France', 'Delivered to recipient - Sophie Dubois', now() - interval '4 days'),
  ('WWC2024004', 'pending', 'Moscow, Russia', 'Shipment registered, awaiting dispatch', now() - interval '1 day'),
  ('WWC2024005', 'pending', 'Los Angeles, USA', 'Package received at LA hub', now() - interval '3 days'),
  ('WWC2024005', 'in_transit', 'Miami International Airport', 'In transit via Miami cargo hub', now() - interval '1 day'),
  ('WWC2024005', 'in_transit', 'Sao Paulo, Brazil', 'Arrived in Brazil, customs processing', now() - interval '6 hours')
) AS v(tracking, status, location, description, event_time)
JOIN shipments s ON s.tracking_number = v.tracking
WHERE NOT EXISTS (
  SELECT 1 FROM shipment_events se WHERE se.shipment_id = s.id
);

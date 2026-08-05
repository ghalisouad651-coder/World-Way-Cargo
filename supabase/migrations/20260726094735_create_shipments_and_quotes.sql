/*
# Create shipments and quote_requests tables (single-tenant, no auth)

## Purpose
WorldWayCargo logistics website needs two tables:
1. `shipments` - powers the "Track Your Shipment" lookup on the homepage. Visitors
   enter a tracking number and see the shipment's status, origin, destination, and
   a timeline of events.
2. `quote_requests` - powers the "Quick Quote" form on the FAQ/Trust page. Visitors
   submit service type, weight, origin, and destination to request a shipping quote.

This is a single-tenant marketing site with no sign-in, so policies allow
anon + authenticated CRUD (data is intentionally public/shared).

## New Tables

### shipments
- `id` (uuid, primary key)
- `tracking_number` (text, unique, not null) - the public-facing code customers search for
- `recipient_name` (text) - who the shipment is addressed to
- `origin_city` (text, not null) - where it shipped from
- `destination_city` (text, not null) - where it is going
- `origin_country` (text) - country of origin
- `destination_country` (text) - destination country
- `status` (text, not null, default 'pending') - current state: pending/in_transit/out_for_delivery/delivered
- `service_type` (text) - air / sea / land
- `weight_kg` (numeric) - shipment weight
- `estimated_delivery` (date) - expected delivery date
- `created_at` (timestamptz, default now())

### shipment_events
- `id` (uuid, primary key)
- `shipment_id` (uuid, foreign key -> shipments, cascade delete)
- `status` (text, not null) - status at this event point
- `location` (text) - where the event happened
- `description` (text) - human-readable detail
- `event_time` (timestamptz, default now())

### quote_requests
- `id` (uuid, primary key)
- `service_type` (text, not null) - air / sea / land
- `weight_kg` (numeric, not null) - shipment weight
- `origin` (text, not null) - origin city/country
- `destination` (text, not null) - destination city/country
- `customer_name` (text) - optional contact name
- `customer_email` (text) - optional contact email
- `notes` (text) - optional extra details
- `status` (text, default 'pending') - quote processing status
- `created_at` (timestamptz, default now())

## Security
- RLS enabled on all three tables.
- anon + authenticated can SELECT, INSERT on all tables (public marketing site).
- UPDATE/DELETE disabled (no admin UI in this build; data is managed server-side).

## Notes
1. Seed data is inserted in a separate migration so re-running this one stays clean.
2. Tracking numbers are uppercase alphanumeric for easy typing.
*/

CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text UNIQUE NOT NULL,
  recipient_name text,
  origin_city text NOT NULL,
  destination_city text NOT NULL,
  origin_country text,
  destination_country text,
  status text NOT NULL DEFAULT 'pending',
  service_type text,
  weight_kg numeric,
  estimated_delivery date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shipment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id uuid NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status text NOT NULL,
  location text,
  description text,
  event_time timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text NOT NULL,
  weight_kg numeric NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  customer_name text,
  customer_email text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_shipments" ON shipments;
CREATE POLICY "anon_select_shipments" ON shipments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_shipments" ON shipments;
CREATE POLICY "anon_insert_shipments" ON shipments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_shipment_events" ON shipment_events;
CREATE POLICY "anon_select_shipment_events" ON shipment_events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_shipment_events" ON shipment_events;
CREATE POLICY "anon_insert_shipment_events" ON shipment_events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_quote_requests" ON quote_requests;
CREATE POLICY "anon_select_quote_requests" ON quote_requests FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;
CREATE POLICY "anon_insert_quote_requests" ON quote_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipment_events_shipment_id ON shipment_events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);

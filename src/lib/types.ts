export interface Shipment {
  id: string;
  tracking_number: string;
  recipient_name: string | null;
  origin_city: string;
  destination_city: string;
  origin_country: string | null;
  destination_country: string | null;
  status: string;
  service_type: string | null;
  weight_kg: number | null;
  estimated_delivery: string | null;
  created_at: string;
}

export interface ShipmentEvent {
  id: string;
  shipment_id: string;
  status: string;
  location: string | null;
  description: string | null;
  event_time: string;
}

export interface QuoteRequest {
  id?: string;
  service_type: string;
  weight_kg: number;
  origin: string;
  destination: string;
  customer_name?: string | null;
  customer_email?: string | null;
  notes?: string | null;
  status?: string;
}

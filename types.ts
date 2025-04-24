export interface tripData {
  id: string,
  tripPhoto: string,
  tripName: string,
  startDate: string,
  endDate: string,
  tripDates: TripDate[],
  centerId?: string,
  centerMap?: {
    lat: number,
    lng: number
  },
}

export type TripDate = {
  date: string,
  itinerary?: Itineraryitem[]
}

export type Poi ={ key: string, location: google.maps.LatLngLiteral }

export interface PlaceResultCardProps {
  displayName: string | null | undefined,
  primaryType: string | undefined | null,
  priceLevel: string | number | undefined | null ,
  rating: number | undefined | null,
  regularOpeningHours: google.maps.places.OpeningHours | google.maps.places.PlaceOpeningHours | undefined | null,
  photos: any,
  formattedAddress: string | null | undefined,
  formattedPhone: string | null | undefined,
  website: string | null | undefined,
  summary: string | null | undefined,
  explore?: boolean
}

export interface ItineraryFormData {
  length: "single-day" | "multi-day",
  startDate: string,
  endDate?: string,
  timeblock?: string,
  startTime?: string,
  endTime?: string,
  notes?: Note[]
}

export interface Itineraryitem {
  id: string,
  length: "single-day" | "multi-day",
  startDate: string,
  endDate?: string,
  timeblock?: string,
  startTime?: string,
  endTime?: string,
  notes?: Note[],
  place: PlaceResultCardProps
}

export type Note = {
  note: string,
  id: string
}

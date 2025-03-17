export interface tripData {
  id: string,
  tripPhoto: string,
  tripName: string,
  startDate: string,
  endDate: string,
  centerId?: string,
  centerMap?: {
    lat: number,
    lng: number
  }
}

export type Poi ={ key: string, location: google.maps.LatLngLiteral }

export interface PlaceResultCardProps {
  displayName: string | null | undefined,
  primaryType: string | undefined | null,
  priceLevel: string | number | undefined | null ,
  rating: number | undefined | null,
  regularOpeningHours: google.maps.places.OpeningHours | google.maps.places.PlaceOpeningHours | undefined | null,
  photos: any,
  formattedAddress: string | null | undefined
}
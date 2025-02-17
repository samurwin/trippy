export interface tripData {
  id: string,
  tripPhoto: string,
  tripName: string,
  startDate: string,
  endDate: string,
  centerMap?: {
    lat: number,
    lng: number
  }
}
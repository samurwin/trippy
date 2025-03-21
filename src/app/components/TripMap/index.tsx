import PoiMarkers from '../PoiMarkers';
import { useMarkers } from '@/app/trip/[trip-id]/MarkersContext';
import {Map, useMap} from '@vis.gl/react-google-maps';
const googleMapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID

interface TripMapProps {
  defaultCenter?: {
    lat: number,
    lng: number
  },
  mapWidth?: string,
  mapHeight?: string
}

export default function TripMap({ defaultCenter, mapWidth, mapHeight }:TripMapProps) {
  const map = useMap();
  const { markers } = useMarkers();
  
  return(
      <Map
          style={{width: mapWidth ? mapWidth : "0" , height: mapHeight ? mapHeight : "0"}}
          mapId={googleMapId}
          defaultZoom={10}
          defaultCenter={ defaultCenter ? defaultCenter : undefined }
          >
            {markers ? 
              <PoiMarkers pois={markers} />
            :null}
      </Map>  
  )
}


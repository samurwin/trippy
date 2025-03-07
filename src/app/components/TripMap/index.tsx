import PoiMarkers from '../PoiMarkers';

import {Map, useMap} from '@vis.gl/react-google-maps';
const googleMapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID

type Poi ={ key: string, location: google.maps.LatLngLiteral }
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
  const locations = ''
  return(
      <Map
          style={{width: mapWidth ? mapWidth : "0" , height: mapHeight ? mapHeight : "0"}}
          mapId={googleMapId}
          defaultZoom={12}
          defaultCenter={ defaultCenter ? defaultCenter : undefined }
          >
            {locations ? 
              <PoiMarkers pois={locations} />
            :null}
      </Map>  
  )
}


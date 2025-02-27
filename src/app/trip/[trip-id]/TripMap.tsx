
import PoiMarkers from '../../components/PoiMarkers';

import {Map, MapCameraChangedEvent, useMap} from '@vis.gl/react-google-maps';
const googleMapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID

type Poi ={ key: string, location: google.maps.LatLngLiteral }
interface TripMapProps {
  defaultCenter?: {
    lat: number,
    lng: number
  },
}

export default function TripMap({ defaultCenter }:TripMapProps) {
  const map = useMap();
  const locations = ''
  return(
      <Map
          style={{width: '100vw', height: '100vh'}}
          mapId={googleMapId}
          defaultZoom={12}
          defaultCenter={ defaultCenter ? defaultCenter : undefined }
          onCameraChanged={ (ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
          >
            {locations ? 
              <PoiMarkers pois={locations} />
            :null}
      </Map>  
  )
}


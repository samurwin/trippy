'use client';
import PoiMarkers from '../../components/PoiMarkers';
import React from 'react';

import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

const googleApiKey : any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const googleMapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID

type Poi ={ key: string, location: google.maps.LatLngLiteral }


export default function TripMap() {
  const locations = ''
  return(
    <APIProvider apiKey={googleApiKey} onLoad={() => console.log('Maps API has loaded.')}>
      <Map
          style={{width: '100vw', height: '100vh'}}
          mapId={googleMapId}
          defaultZoom={13}
          defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
          onCameraChanged={ (ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }>
            {locations ? 
              <PoiMarkers pois={locations} />
            :null}
      </Map>  
    </APIProvider>
  )
}


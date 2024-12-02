'use client';
import React from 'react';
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

const googelApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
if (!googelApiKey || typeof googelApiKey !== 'string') {
  throw new Error('Google Maps API key is missing or invalid.');
}

export default function TripMap() {
  return(
    <APIProvider apiKey={googelApiKey} onLoad={() => console.log('Maps API has loaded.')}>
      <Map
          style={{width: '100vw', height: '100vh'}}
          defaultZoom={13}
          defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
          onCameraChanged={ (ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }>
      </Map>  
    </APIProvider>
  )
}
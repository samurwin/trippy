'use client';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {createRoot} from "react-dom/client";

import {AdvancedMarker, Pin, useMap} from '@vis.gl/react-google-maps';
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import type {Marker} from '@googlemaps/markerclusterer';
type Poi ={ key: string, location: google.maps.LatLngLiteral }

const PoiMarkers = (props: {pois: Poi[]}) => {

  const map = useMap();
  const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // create an instance of MarkerClusterer and pass it the instance of the Map
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({map});
    }
  }, [map]);

  // updates the clusterer when the marker list changes:
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers(prev => {
      if (marker) {
        return {...prev, [key]: marker};
      } else {
        const newMarkers = {...prev};
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          ref={marker => setMarkerRef(marker, poi.key)}
        >    
          <Pin background={'#30B6BE'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;
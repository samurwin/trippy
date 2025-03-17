"use client"
import { useState, useEffect } from 'react'
import { useTrip } from '../TripContext';
import { useMarkers } from '../MarkersContext';
import styles from '@/styles/trip.module.css'
import { formatDate } from '../../../../utils'
import ExploreCategory from '@/app/components/ExploreCategory'
import AutoCompleteSearch from '@/app/components/AutoCompleteSearch';
import TripHeader from '../../../components/TripHeader'
import PlaceResultCard from '../../../components/PlaceResultCard'
import { PlaceResultCardProps, Poi } from '../../../../../types';

import { useMap } from '@vis.gl/react-google-maps'

export default function Explore(){
  // trip info context
  const { trip } = useTrip();
  // map markers context
  const { setMarkers } = useMarkers();
  // google map context
  const map = useMap();

  // SEARCH RESULTS
  const [autoComplete, setAutoComplete] = useState<google.maps.places.PlaceResult | null>(null)
  const [locations, setLocations] = useState<google.maps.places.Place[] | null>(null)
  // create results state to keep results in the same format
  const [results, setResults] = useState<PlaceResultCardProps[]>()

  // set results to locations in PlaceResultCardProps format
  // add markers to the map
  useEffect(() => {
    if(!map || !locations)  return
    console.log('---locations---')
    let newResults: PlaceResultCardProps[] = []
    let newMarkers: Poi[] = []
    locations.forEach((location)=>{
      newResults.push({
        displayName: location.displayName,
        primaryType: location.primaryType,
        priceLevel: location.priceLevel,
        rating: location.rating,
        regularOpeningHours: location.regularOpeningHours,
        photos: location.photos,
        formattedAddress: location.formattedAddress
      })
      if(location.location){
        newMarkers.push({
          key: location.id,
          location: {
            lat: location.location.lat(),
            lng: location.location.lng()
          }
        })
      }
    })
    setResults(newResults);
    setMarkers(newMarkers);
  },[map, locations])

  // set results to autocomplete in PlaceResultCardProps format 
  // add marker to the map
  useEffect(()=>{
    if(!map || !autoComplete) return
    console.log("---autocomplete---")
    let newResult = [{
      displayName: autoComplete.name,
      primaryType: autoComplete.types ? autoComplete.types[0] : null,
      priceLevel: autoComplete.price_level,
      rating: autoComplete.rating,
      regularOpeningHours: autoComplete.opening_hours,
      photos: autoComplete.photos,
      formattedAddress: autoComplete.formatted_address
    }]
    if(autoComplete.geometry?.location){
      let newMarker: Poi[] = [{
        key: autoComplete.place_id ? autoComplete.place_id : '1',
        location: {
          lat: autoComplete.geometry.location.lat(),
          lng: autoComplete.geometry.location.lng()
        }
      }]
      setMarkers(newMarker)
    }
    setResults(newResult)
  }, [map, autoComplete])

  return(
    <>
    {trip ?
      <TripHeader tripID={trip.id} tripName={trip.tripName} tripImg={trip.tripPhoto} tripDate={formatDate(trip.startDate, trip.endDate)} />
    : null}
    <section>
      <h2>Explore</h2>

      {/* Explore by Category */}
      <div className={styles.expCatCon}>
        <ExploreCategory category="restaurant" onNearbySearch={setLocations}/>
        <ExploreCategory category="hotel" onNearbySearch={setLocations}/>
        <ExploreCategory category="tourist_attraction" onNearbySearch={setLocations}/>
        <ExploreCategory category="bar" onNearbySearch={setLocations}/>
        <ExploreCategory category="transportation" onNearbySearch={setLocations}/>
      </div>

      {/* Explore Search Bar */}
      <div>
        <AutoCompleteSearch onPlaceSelected={setAutoComplete} name="exploreSearch" placeholder="Search for a place" />
      </div>
    </section>

    {/* Results */}
    {results ? 
      <section>
        {
          results.map((result, i) => (
            <PlaceResultCard 
            key={i}
            displayName={result.displayName}
            primaryType={result.primaryType}
            priceLevel={result.priceLevel}
            rating={result.rating}
            regularOpeningHours={result.regularOpeningHours}
            photos={result.photos}
            formattedAddress={result.formattedAddress}
            />
          ))
        }
      </section>
    : null}

    </>
  )
}
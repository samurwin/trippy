"use client"
import { useState, useEffect } from 'react'
import { useTrip } from '../TripContext';
import styles from '@/styles/trip.module.css'
import { formatDate } from '../../../../utils'
import ExploreCategory from '@/app/components/ExploreCategory'
import AutoCompleteSearch from '@/app/components/AutoCompleteSearch';
import TripHeader from '../../../components/TripHeader'
import PlaceResultCard from '../../../components/PlaceResultCard'

import { useMap } from '@vis.gl/react-google-maps'

export default function Explore(){
  const { trip } = useTrip();
  const map = useMap();

  const [autoComplete, setAutoComplete] = useState<google.maps.places.PlaceResult | null>(null)
  const [locations, setLocations] = useState<google.maps.places.Place[] | null>(null)

  // do something with locations
  useEffect(() => {
    if(!map && !locations)  return
    console.log('---locations---')

  },[map, locations])

  useEffect(()=>{
    if(!map && !autoComplete) return
    console.log("---autocomplete---")
    console.log(autoComplete)
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
    {locations ? 
      <section>
        {
          locations.map((location) => (
            <PlaceResultCard 
            key={location.id}
            displayName={location.displayName}
            primaryType={location.primaryType}
            priceLevel={location.priceLevel}
            rating={location.rating}
            regularOpeningHours={location.regularOpeningHours}
            photos={location.photos}
            formattedAddress={location.formattedAddress}
            />
          ))
        }
      </section>
    : null}

    {autoComplete ? 
      <section>
        <PlaceResultCard
        displayName={autoComplete.name}
        primaryType={autoComplete.types ? autoComplete.types[0] : null}
        priceLevel={autoComplete.price_level}
        rating={autoComplete.rating}
        regularOpeningHours={autoComplete.opening_hours}
        photos={autoComplete.photos}
        formattedAddress={autoComplete.formatted_address}
        />
      </section>
    : null}

    </>
  )
}
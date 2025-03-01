"use client"
import { useState, useEffect } from 'react'
import { useTrip } from '../TripContext';
import styles from '@/styles/trip.module.css'
import AutoCompleteSearch from '@/app/components/AutoCompleteSearch';
import TripHeader from '../../../components/TripHeader'
import { formatDate } from '../../../../utils'

import { FaCocktail } from "react-icons/fa";
import { FaUtensils, FaMapPin } from "react-icons/fa6";
import { MdHotel, MdDirectionsTransit } from "react-icons/md";

import { useMap } from '@vis.gl/react-google-maps'

export default function Explore(){
  const { trip } = useTrip();
  const map = useMap();

  // set photo if photo in trip data is updated
  // const [photo, setPhoto] = useState(trip!.tripPhoto);
  // useEffect(()=>{
  //   setPhoto(trip!.tripPhoto);
  // },[trip])

  const [location, setLocation] = useState<google.maps.places.PlaceResult | null>(null)

  useEffect(() => {
    if(!map && !location) return
    console.log('here')
  },[map, location])
  return(
    <>
    {trip ?
      <TripHeader tripID={trip.id} tripName={trip.tripName} tripImg={trip.tripPhoto} tripDate={formatDate(trip.startDate, trip.endDate)} />
    : null}
    <section>
      <h2>Explore</h2>

      {/* Explore by Category */}
      <div className={styles.expCatCon}>
        <div id="exploreRestaurants" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <FaUtensils /> </div>
          <p className={styles.expCatLabel}>Restaurants</p>
        </div>

        <div id="exploreHotels" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <MdHotel /> </div>
          <p className={styles.expCatLabel}>Hotels</p>
        </div>

        <div id="exploreAttractions" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <FaMapPin /> </div>
          <p className={styles.expCatLabel}>Attractions</p>
        </div>

        <div id="exploreBars" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <FaCocktail /> </div>
          <p className={styles.expCatLabel}>Bars</p>
        </div>

        <div id="exploreTransit" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <MdDirectionsTransit /> </div>
          <p className={styles.expCatLabel}>Transit</p>
        </div>
      </div>

      {/* Explore Search Bar */}
      <div>
        <AutoCompleteSearch onPlaceSelected={setLocation} name="exploreSearch" placeholder="Search for a place" />
      </div>
      
    </section>
    </>
  )
}
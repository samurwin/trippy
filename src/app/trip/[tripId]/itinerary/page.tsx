"use client"
import ItineraryItem from "@/app/components/ItineraryItem";
import { useTrip } from "../TripContext";
import styles from '../../../../styles/trip.module.css'
import TripHeader from "@/app/components/TripHeader";
import { formatDate } from '../../../../utils'


export default function Itinerary(){
  const { trip } = useTrip();

  function formatItinDate(dateString:string) {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = { 
      weekday: "long", 
      day: "numeric", 
      month: "long",
      timeZone: 'UTC' 
  };
    return date.toLocaleDateString("en-US", options);
}

  return (
    <section>
      <TripHeader tripID={trip!.id} tripName={trip!.tripName} tripImg={trip!.tripPhoto} tripDate={formatDate(trip!.startDate, trip!.endDate)} />

      <div className={styles.itineraryCon}>
        {trip?.tripDates.map((tripdate, i) => (
          <div key={i}>
            <h3 className={styles.itineraryDate}>{formatItinDate(tripdate.date)}</h3>

            {tripdate.itinerary ? tripdate.itinerary.map((itineraryItem, i) => 
              <ItineraryItem key={itineraryItem.id} itineraryItem={itineraryItem} i={i} id={itineraryItem.id}/>
            ): null}
          </div>
        ))}
      </div>
    </section>
  )
}
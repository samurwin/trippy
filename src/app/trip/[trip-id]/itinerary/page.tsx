"use client"
import { Itineraryitem } from "../../../../../types";
import { useTrip } from "../TripContext";
import styles from '../../../../styles/trip.module.css'
import PlaceResultCard from "@/app/components/PlaceResultCard";
import TripHeader from "@/app/components/TripHeader";
import { formatDate } from '../../../../utils'

export default function Itinerary(){
  const { trip } = useTrip();
  console.log(trip);

  function formatItinDate(dateString:string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: "long", 
      day: "numeric", 
      month: "long" 
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
              <div key={i} className={styles.itineraryitem}>
                {i > 0 ? 
                  <div className={styles.divider}></div>
                : null}
                {itineraryItem.timeblock ? 
                  <p className={styles.timeblock}>
                  {itineraryItem.timeblock === 'specific-time' ? 
                    <>{itineraryItem.startTime} - {itineraryItem.endTime}</>
                  :
                    (itineraryItem.timeblock)
                  }
                  </p>
                  
                   : null}
                <PlaceResultCard 
                displayName={itineraryItem.place.displayName} 
                primaryType={itineraryItem.place.primaryType}
                priceLevel={itineraryItem.place.priceLevel}
                rating={itineraryItem.place.rating}
                regularOpeningHours={itineraryItem.place.regularOpeningHours}
                photos={itineraryItem.place.photos}
                formattedAddress={itineraryItem.place.formattedAddress}
                formattedPhone={itineraryItem.place.formattedPhone}
                website={itineraryItem.place.website}
                summary={itineraryItem.place.summary}
                />
                {itineraryItem.notes ? (
                  itineraryItem.notes.map((note, i) => (
                    <div key={i} className={styles.noteCon}>
                      {note}
                    </div>
                  ))
                ): null}
              </div>
            ): null}
          </div>
        ))}
      </div>
    </section>
  )
}
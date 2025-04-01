"use client"
import { Itineraryitem } from "../../../../../types";
import { useTrip } from "../TripContext";
import styles from '../../../../styles/trip.module.css'
import PlaceResultCard from "@/app/components/PlaceResultCard";

export default function Itinerary(){
  const { trip } = useTrip();
  console.log(trip);

  function formatDate(dateString:string) {
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
      <h1>{trip?.tripName}</h1>

      <div
      className={styles.itineraryHeader}
      style={{backgroundImage: `url(${trip?.tripPhoto})`}}></div>

      <div className={styles.itineraryCon}>
        {trip?.tripDates.map((tripdate, i) => (
          <div key={i}>
            <h3 className={styles.itineraryDate}>{formatDate(tripdate.date)}</h3>
            {tripdate.itinerary ? tripdate.itinerary.map((itineraryItem, i) => 
              <div key={i}>
                {itineraryItem.timeblock ? <p>{itineraryItem.timeblock}</p> : null}
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
'use client'
import { useState, useEffect } from 'react'
import PlaceResultCard from "../PlaceResultCard";
import { Itineraryitem, Note } from "../../../../types";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from './ItineraryItem.module.css'
import { useTrip } from "@/app/trip/[trip-id]/TripContext";
import { setCookie, getCookie } from 'cookies-next';


interface ItineraryItemProps {
  itineraryItem: Itineraryitem,
  i: number
}

export default function ItineraryItem({itineraryItem, i}:ItineraryItemProps){
  const { trip, setTrip } = useTrip(); 
  const cookie = getCookie("tripData")
  console.log('--cookie--');
  console.log(cookie ? JSON.parse(cookie) : 'no cookie');

  function updateItineraryItem(updatedItem:Itineraryitem){
    console.log(updatedItem)
    if(trip){
      const updatedTrip = {
        ...trip,
        tripDates: trip.tripDates.map((dateObj) =>{
          if(dateObj.date === updatedItem.startDate){
            return {
              ...dateObj,
              itinerary: dateObj.itinerary?.map(item =>
                item.id === updatedItem.id ? updatedItem : item
              )
            };
          }
          return dateObj;
        })
      }
      console.log(updatedTrip);
      setTrip(updatedTrip);
      setCookie("tripData", JSON.stringify(updatedTrip), { maxAge: 60 * 60 * 24, })
    } else{
      console.log('no trip');
    }
  }
  
  function editItineraryItem(){

  }

  function deleteItineraryItem(){

  }

  const [notesArr, setNotes] = useState<Note[] | undefined>(itineraryItem.notes);

  function editNote(e: React.ChangeEvent<HTMLInputElement>, id:number){
    e.preventDefault();
    if(notesArr && notesArr.length > 0){
      setNotes(prevNotes =>
        prevNotes!.map(note =>
          note.id === id ? { ...note, note: e.target.value } : note
        ))
    }
  }

  function addNote(){

  }

function noteOnBlur(e: React.FocusEvent<HTMLInputElement>){
  e.preventDefault();
    const updatedItineraryItem = {
      ...itineraryItem,
      notes: notesArr
    }
  updateItineraryItem(updatedItineraryItem)
}

  return (
    <div className={styles.itineraryitem}>
      {i > 0 ? 
        <div className={styles.divider}></div>
      : null}
      <div className={styles.itinDetails}>
        {itineraryItem.timeblock ? 
          <p className={styles.timeblock}>
          {itineraryItem.timeblock === 'specific-time' ? 
            <>{itineraryItem.startTime}{itineraryItem.endTime ?  - (itineraryItem.endTime) : null} </>
          :
            (itineraryItem.timeblock)
          }
          </p>
          : null}

          <div className={styles.editBtns}>
            <button className={styles.editItin}>
              <MdEdit />
            </button>
            <button className={styles.deleteItin}>
              <MdDelete/>
            </button>
          </div>
      </div>
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
      {notesArr ? (
        notesArr.map((noteObj) => (
          <input type="text" key={noteObj.id} className={styles.noteCon} value={noteObj.note} onChange={(e) => editNote(e, noteObj.id)} onBlur={noteOnBlur}/>
        ))
      ): null}
    </div>
  )
}
'use client'
import { useState, useEffect } from 'react'
import PlaceResultCard from "../PlaceResultCard";
import { Itineraryitem, Note } from "../../../../types";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from './ItineraryItem.module.css'
import { useTrip } from "@/app/trip/[tripId]/TripContext";
import { FaPlus } from "react-icons/fa6";

interface ItineraryItemProps {
  itineraryItem: Itineraryitem,
  i: number,
  id: string
}

export default function ItineraryItem({itineraryItem, i, id}:ItineraryItemProps){
  const { trip, setTrip } = useTrip(); 

  const [itineraryItemState, setItineraryItemState] = useState<Itineraryitem>(itineraryItem)

  useEffect(()=>{
    if(trip){
      const updatedTrip = {
        ...trip,
        tripDates: trip.tripDates.map((dateObj) =>{
          if(dateObj.date === itineraryItemState.startDate){
            return {
              ...dateObj,
              itinerary: dateObj.itinerary?.map(item =>
                item.id === itineraryItemState.id ? itineraryItemState : item
              )
            };
          }
          return dateObj;
        })
      }
      setTrip(updatedTrip);
      setTimeout(()=>{
        console.log(trip)
      }, 10000)
    } else{
      console.log('no trip');
    }
  }, [itineraryItemState])

  
  function editItineraryItem(){

  }

  function deleteItineraryItem(){

  }

  const [notesArr, setNotes] = useState<Note[] | []>(itineraryItem.notes || []);

  function editNote(e: React.ChangeEvent<HTMLInputElement>, id:string){
    e.preventDefault();
    if(notesArr && notesArr.length > 0){
      setNotes(prevNotes =>
        prevNotes!.map(note =>
          note.id === id ? { ...note, note: e.target.value } : note
        ))
    }
  }

  function addNote(){
    const newNoteObj:Note = {id: crypto.randomUUID(), note: '' }
    setNotes([ ...notesArr, newNoteObj ]);
    setTimeout(() => {
      if(document){
        const newNoteEl = document.getElementById(newNoteObj.id)
        if(newNoteEl){
          console.log('here')
          newNoteEl.focus();
        }
      }
      setItineraryItemState({
        ...itineraryItemState,
        notes: notesArr
      })
    }, 100)
  }

  // delete note from notesArr state and update the intinerary item state
  function deleteNote(e: React.MouseEvent<SVGElement, MouseEvent>, id: string){
    e.preventDefault();
    setNotes(
      notesArr.filter(note => note.id !== id)
    )
    setItineraryItemState({
      ...itineraryItemState,
      notes: notesArr
    })
  }

// on blur of note field, update itinerary item state
function noteOnBlur(e: React.FocusEvent<HTMLInputElement>){
  e.preventDefault();

  setItineraryItemState({
    ...itineraryItemState,
    notes: notesArr
  })
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
          <div className={styles.noteWrapper} key={noteObj.id} >
          <input type="text"id={noteObj.id} className={styles.noteCon} value={noteObj.note} onChange={(e) => editNote(e, noteObj.id)} onBlur={noteOnBlur}></input>
          <MdDelete onClick={(e) => deleteNote(e, noteObj.id)}/>
          </div>
        ))
      ): null}
      <button className={styles.addNoteBtn} onClick={addNote}><FaPlus/>Add Note</button>
    </div>
  )
}
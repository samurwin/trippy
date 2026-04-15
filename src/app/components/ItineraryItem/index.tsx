'use client'
import { useState, useEffect } from 'react'
import PlaceResultCard from "../PlaceResultCard";
import { Itineraryitem, Note } from "../../../../types";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from './ItineraryItem.module.css'
import { useTrip } from "@/app/trip/[tripId]/TripContext";
import { FaPlus } from "react-icons/fa6";
import AddToModal from '../AddToModal';

interface ItineraryItemProps {
  itineraryItem: Itineraryitem,
  i: number,
  id: string
}

export default function ItineraryItem({itineraryItem, i, id}:ItineraryItemProps){
  const { trip, setTrip } = useTrip(); 

  const [itineraryItemState, setItineraryItemState] = useState<Itineraryitem>(itineraryItem)

  useEffect(()=>{
    if(!itineraryItemState) return;
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
    } else{
      console.log('no trip');
    }
  }, [itineraryItemState])

  const [editItemModal, setEditItemModal] = useState(false)
 

  function deleteItineraryItem(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    if(trip){
      let updatedTrip = {
        ...trip,
        tripDates: trip?.tripDates.map(dateObj => {
          console.log(dateObj)
          if(dateObj.date === itineraryItemState.startDate){
            console.log('here')
            return {
              ...dateObj,
              itinerary: dateObj.itinerary?.filter(item => item.id === itineraryItemState.id)
            }
          }
          return dateObj
        })
      }
      console.log("updated trip")
      console.log(updatedTrip)
      setTrip(updatedTrip)
    } else{
      console.log('no trip')
    }
    
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
        {itineraryItemState.timeblock ? 
          <p className={styles.timeblock}>
          {itineraryItemState.timeblock === 'specific-time' ? 
            <>{itineraryItemState.startTime}{itineraryItemState.endTime ?  - (itineraryItemState.endTime) : null} </>
          :
            (itineraryItem.timeblock)
          }
          </p>
          : null}

          <div className={styles.editBtns}>
            <button className={styles.editItin} onClick={() => setEditItemModal(true)}>
              <MdEdit />
            </button>
            <button className={styles.deleteItin} onClick={(e) => deleteItineraryItem(e)}>
              <MdDelete/>
            </button>
          </div>
      </div>
      <PlaceResultCard 
      displayName={itineraryItemState.place.displayName} 
      primaryType={itineraryItemState.place.primaryType}
      priceLevel={itineraryItemState.place.priceLevel}
      rating={itineraryItemState.place.rating}
      regularOpeningHours={itineraryItemState.place.regularOpeningHours}
      photos={itineraryItemState.place.photos}
      formattedAddress={itineraryItem.place.formattedAddress}
      formattedPhone={itineraryItemState.place.formattedPhone}
      website={itineraryItemState.place.website}
      summary={itineraryItemState.place.summary}
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

      {editItemModal ? (
        <AddToModal addTo={'itinerary'} place={itineraryItem.place} closeModal={setEditItemModal} itinItemToEdit={itineraryItemState} />
      ):''}

    </div>
  )
}
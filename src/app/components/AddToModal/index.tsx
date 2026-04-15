"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTrip } from "@/app/trip/[tripId]/TripContext"
import styles from '../../../styles/trip.module.css'
import IteneraryForm from "../IteneraryForm";
import { PlaceResultCardProps, ItineraryFormData, Itineraryitem, tripData } from '../../../../types'

interface AddToModalProps {
  addTo: 'itinerary' | 'bucket-list';
  place: PlaceResultCardProps,
  closeModal: React.Dispatch<React.SetStateAction<boolean>>,
  itinItemToEdit?: Itineraryitem
}

export default function AddToModal({addTo, place, closeModal, itinItemToEdit}:AddToModalProps){
  const router = useRouter()
  const { trip, setTrip } = useTrip();
  const [itinItemToAdd, setItinItemToAdd] = useState<Itineraryitem | ''>('')

  let itinEditItem
  if(itinItemToEdit){
    itinEditItem = {
      length: itinItemToEdit.length,
      startDate: itinItemToEdit.startDate,
      endDate: itinItemToEdit.endDate,
      timeblock: itinItemToEdit.timeblock || '',
      startTime: itinItemToEdit.startTime,
      endTime: itinItemToEdit.endTime
    }
  }


  // set state to close modal
  function handleClose(){
    closeModal(false);
  }

  useEffect(()=>{
    if(!itinItemToAdd) return;
    // create new trip object
    if(trip){
      let updatedTrip:tripData = {
        ...trip,
        // map trip dates to find one that matches startDate
        tripDates: trip.tripDates.map(dateObj => 
          dateObj.date === itinItemToAdd.startDate ? 
          // if there are items in the itinerary object check if item exsists
          { ...dateObj, itinerary: dateObj.itinerary?.length ? (
              dateObj.itinerary.map(itinItem =>
                itinItem.id === itinItemToAdd.id ?
                itinItem = itinItemToAdd
                :
                itinItem
              )
              // or add the item to the array if it doesn't exist
            ): dateObj.itinerary ? [...dateObj.itinerary,itinItemToAdd]
              // otherwise create an array with the new item
              : [itinItemToAdd]
             }
            : dateObj
        )
      }
      // set trip with new data
      setTrip(updatedTrip);
      handleClose();

      setTimeout(() => {
        router.refresh();
        window.alert("Saved itinerary item");
      }, 100);
    } else {
      throw new Error('Error loading trip data')
    }
  }, [itinItemToAdd])

  // get the itenerary form data back
  function handleItinFormData(itineraryFormData:ItineraryFormData){
    // add the form data to a IteneraryItem with place:PlaceResultCardProps
    if(itinItemToEdit){
      setItinItemToAdd({
        ...itineraryFormData,
        id: itinItemToEdit.id,
        place: place
      });
    } else {
      // create an id if the itinItem is new
      setItinItemToAdd({
        ...itineraryFormData,
        id: crypto.randomUUID(),
        place: place
      });
    }
  }

  return (
    <div className={styles.modalCon}>
      <div className={styles.modal}>
        <h3 className={styles.subheading}>Add <span className="txtPink">{place.displayName}</span> To {addTo === 'itinerary' ? 'Itinerary' : addTo === 'bucket-list' ? 'Bucket List' : ''}</h3>

        {addTo === 'itinerary' ? (
          <IteneraryForm handleFormData={handleItinFormData} tripDates={trip!.tripDates} cancelFunc={handleClose} itinEditItem={itinEditItem}/>
        ): null}
      </div>
    </div>
  )
}


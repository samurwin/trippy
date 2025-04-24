"use client"
import { useTrip } from "@/app/trip/[tripId]/TripContext"
import styles from '../../../styles/trip.module.css'
import IteneraryForm from "../IteneraryForm";
import { PlaceResultCardProps, ItineraryFormData } from '../../../../types'

interface AddToModalProps {
  addTo: 'itinerary' | 'bucket-list';
  place: PlaceResultCardProps,
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddToModal({addTo, place, closeModal}:AddToModalProps){
  const { trip } = useTrip();

  function handleClose(){
    closeModal(false);
  }
  // get the itenerary form data back
  function addItemToItinerary(itineraryFormData:ItineraryFormData){
    // add the form data to a IteneraryItem with place:PlaceResultCardProps
    return {
      ...itineraryFormData,
      id: crypto.randomUUID(),
      place: place
    };
  }

  return (
    <div className={styles.modalCon}>
      <div className={styles.modal}>
        <h3 className={styles.subheading}>Add <span className="txtPink">{place.displayName}</span> To {addTo === 'itinerary' ? 'Itinerary' : addTo === 'bucket-list' ? 'Bucket List' : ''}</h3>

        {addTo === 'itinerary' ? (
          <IteneraryForm handleFormData={addItemToItinerary} tripDates={trip!.tripDates} cancelFunc={handleClose}/>
        ): null}
      </div>
    </div>
  )
}
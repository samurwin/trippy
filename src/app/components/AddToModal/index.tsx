import { useTrip } from "@/app/trip/[trip-id]/TripContext"
import styles from '../../../styles/trip.module.css'
import IteneraryForm from "../IteneraryForm";
import { PlaceResultCardProps, ItineraryFormData, Itineraryitem, tripData } from '../../../../types'
import { setCookie, getCookie } from 'cookies-next';

interface AddToModalProps {
  addTo: 'itinerary' | 'bucket-list';
  place: PlaceResultCardProps,
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddToModal({addTo, place, closeModal}:AddToModalProps){
  const { trip, setTrip } = useTrip();

  function handleClose(){
    closeModal(false);
  }
  // get the itenerary form data back
  function addItemToItinerary(itineraryFormData:ItineraryFormData){
    // add the form data to a IteneraryItem with place:PlaceResultCardProps
    let newItineraryItem:Itineraryitem = {
      ...itineraryFormData,
      place: place
    };
    console.log(newItineraryItem);
    
    // add to trip and save to cookie
    if(trip){
      let updatedTrip:tripData = {
        ...trip,
        tripDates: trip.tripDates.map(dateObj => 
          dateObj.date === newItineraryItem.startDate 
            ? { ...dateObj, itinerary: dateObj.itinerary ? [...dateObj.itinerary, newItineraryItem] : [newItineraryItem] }
            : dateObj
        )
      }
  
      console.log(updatedTrip);
      setTrip(updatedTrip);
      setCookie('tripData', JSON.stringify(updatedTrip),{ maxAge: 60 * 60 * 24, })
      const checkCookie = getCookie('tripData')
      if (checkCookie) console.log(JSON.parse(checkCookie));
      handleClose();
      window.alert("Saved itinerary item")
    } else {
      throw new Error('Error loading trip data')
    }
 
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
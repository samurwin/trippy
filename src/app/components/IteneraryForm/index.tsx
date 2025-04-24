'use client'
import { useTrip } from "@/app/trip/[tripId]/TripContext"
import { setCookie } from 'cookies-next'
import { useState } from 'react'
import styles from '../../../styles/trip.module.css'
import { ItineraryFormData, TripDate, tripData, Itineraryitem } from '../../../../types'


interface ItineraryFormProps {
  handleFormData: (iteneraryFormData: ItineraryFormData) => Itineraryitem,
  tripDates: TripDate[],
  cancelFunc: () => void
}

export default function ItineraryForm({ handleFormData, tripDates, cancelFunc }:ItineraryFormProps){
  const { trip, setTrip } = useTrip();

  const [activityLength, setActivityLength] = useState('single-day')
  const [specificTime, setSpecificTime] = useState(false);
  const [formData, setFormData] = useState<ItineraryFormData>({length: 'single-day', startDate: ''})
  const [errorMsg, setErrorMsg] = useState<string>();

  // handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>){
    e.preventDefault();
    if(e.target.name === 'note'){
      let note;
      if(formData.notes?.length){
        note = {
          note: e.target.value,
          id: formData.notes[0].id
        }
      } else {
        note = {
          note: e.target.value,
          id: crypto.randomUUID()
        }
      }
      setFormData({...formData, notes: [note]})
    } else if(e.target.name === 'timeblock'){
      console.log(e.target.value)
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }
  
  // submit form - add to itenerary
  function addToItenerary(e: React.FormEvent<HTMLFormElement>, trip: tripData | null){
    e.preventDefault();
    console.log(formData);
    if(!formData.startDate){
      setErrorMsg("Select a date to add to the itinerary");
      return;
    }
    const newItinItem:Itineraryitem = handleFormData(formData);

    // add to trip and save to cookie
    if(trip){
      let updatedTrip:tripData = {
        ...trip,
        tripDates: trip.tripDates.map(dateObj => 
          dateObj.date === newItinItem.startDate 
            ? { ...dateObj, itinerary: dateObj.itinerary ? [...dateObj.itinerary, newItinItem] : [newItinItem] }
            : dateObj
        )
      }
  
      console.log('--- updated trip ---')
      setTrip(updatedTrip);

      setTimeout(() => {
        cancelFunc();
        window.alert("Saved itinerary item");
      }, 100);
    } else {
      throw new Error('Error loading trip data')
    }
  }

  return (
    <form className={styles.addToForm} onSubmit={(e) =>addToItenerary(e, trip)}>
      <div className={styles.inputCon}>
      <select  
       className={styles.dropDown}
        name="length"
        onChange={(e) => {
          setActivityLength(e.target.value);
          handleChange
        }}
      >
        <option value="single-day">Single Day</option>
        <option value="multi-day">Multi Day</option>
      </select>
      </div>
      
      {activityLength === 'single-day' ? (
        <>
        <div className="formRow">
          <div className={styles.inputCon}>
            <select id="startDate" name="startDate" className={styles.dropDown} required onChange={handleChange}>
              <option value="">Select a Date</option>
              {tripDates.map((dateObj, i) => (
                <option key={i} value={dateObj.date}>{dateObj.date}</option>
              ))}
            </select>
          </div>

          <div>
            <select 
            className={styles.dropDown}
            name="timeblock"
            onChange={(e) => {
              console.log("change timeblock")
              if(e.target.value === 'specific-time'){setSpecificTime(true)};
              handleChange(e)
            }}
            >
              <option value="">Set a time</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Morning">Morning</option>
              <option value="Lunch">Lunch</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Dinner">Dinner</option>
              <option value="Evening">Evening</option>
              <option value="All Day">All Day</option>
              <option value="specific-time">Specific Time</option>
            </select>
          </div>
        </div>
        
        {specificTime ? (
          <div className="formRow">
            <div>
              <label htmlFor="startTime">Start time:</label>
              <input className={styles.addToInput} type="time" name="startTime" onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="endTime">End time:</label>
              <input className={styles.addToInput} type="time" name="endTime" onChange={handleChange}/>
            </div>
          </div>
        ): null}
        </>
      ): (
        <>
        <div className="formRow">
          <div>
            <label htmlFor="start-day">Start date:</label>
            <select className={styles.dropDown} name="start-day" required onChange={handleChange}>
              <option value="">Select a date</option>
              {tripDates.map(dateObj => (
                <option key={dateObj.date} value={dateObj.date}>{dateObj.date}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="end-day">End date:</label>
            <select className={styles.dropDown} name="end-day" required onChange={handleChange}>
              <option value="">Select a date</option>
              {tripDates.map(dateObj => (
                <option value={dateObj.date}>{dateObj.date}</option>
              ))}
            </select>
          </div>
        </div>
        </>
      )}

      <div>
        <label htmlFor="note">Add a note:</label>
        <textarea className={styles.addNote} maxLength={250} name="note" onChange={handleChange}></textarea>
      </div>
      
      {errorMsg ? (
        <div>
          <p className="error">{errorMsg}</p>
        </div>
      ): null}

      <div className={styles.btnCon}>
        <button className="pinkBtn" type="submit">Add to Itenerary</button>
        <button className={styles.cancelBtn} onClick={cancelFunc}>Cancel</button>
      </div>
      
    </form>
  )
}
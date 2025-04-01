import { useState } from 'react'
import styles from '../../../styles/trip.module.css'
import { ItineraryFormData, TripDate } from '../../../../types'

interface ItineraryFormProps {
  handleFormData: (iteneraryFormData: ItineraryFormData) => void,
  tripDates: TripDate[],
  cancelFunc: () => void
}

export default function ItineraryForm({ handleFormData, tripDates, cancelFunc }:ItineraryFormProps){
  const [activityLength, setActivityLength] = useState('single-day')
  const [specificTime, setSpecificTime] = useState(false);
  const [formData, setFormData] = useState<ItineraryFormData>({length: 'single-day', startDate: ''})
  const [errorMsg, setErrorMsg] = useState<string>();

  // handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>){
    e.preventDefault();
    if(e.target.name === 'note'){
      setFormData({...formData, notes: [e.target.value]})
    } else if(e.target.name === 'timeblock'){
      console.log(e.target.value)
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }
  
  // submit form - add to itenerary
  function addToItenerary(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(formData);
    if(!formData.startDate){
      setErrorMsg("Select a date to add to the itinerary");
      return;
    }
    handleFormData(formData);
  }

  return (
    <form className={styles.addToForm} onSubmit={addToItenerary}>
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
              <option value="breakfast">Breakfast</option>
              <option value="morning">Morning</option>
              <option value="lunch">Lunch</option>
              <option value="afternoon">Afternoon</option>
              <option value="dinner">Dinner</option>
              <option value="evening">Evening</option>
              <option value="all-day">All Day</option>
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
        <button className={styles.pinkBtn} type="submit">Add to Itenerary</button>
        <button className={styles.cancelBtn} onClick={cancelFunc}>Cancel</button>
      </div>
      
    </form>
  )
}
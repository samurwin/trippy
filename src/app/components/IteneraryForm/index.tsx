import { useState } from 'react'
import styles from '../../../styles/trip.module.css'
import { ItineraryFormData } from '../../../../types'

interface ItineraryFormProps {
  handleFormData: (iteneraryFormData: ItineraryFormData) => void,
  tripDates: string[],
  cancelFunc: () => void
}

export default function ItineraryForm({ handleFormData, tripDates, cancelFunc }:ItineraryFormProps){
  const [activityLength, setActivityLength] = useState('single-day')
  const [specificTime, setSpecificTime] = useState(false);
  const [formData, setFormData] = useState<ItineraryFormData>({length: 'single-day', startDate: ''})

  // handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>){
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  // submit form - add to itenerary
  function addToItenerary(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(formData);
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
            <label htmlFor="startDate">Select a day:</label>
            <select name="startDate" className={styles.dropDown} required onChange={handleChange}>
              {tripDates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timeBlock">Set a time</label>
            <select 
            className={styles.dropDown}
            name="timeBlock"
            onChange={(e) => {
              if(e.target.value === 'specific-time'){setSpecificTime(true)};
              handleChange
            }}
            >
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
            <label htmlFor="start-day">Start day:</label>
            <select className={styles.dropDown} name="start-day" required onChange={handleChange}>
              {tripDates.map(date => (
                <option value={date}>{date}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="end-day">End day:</label>
            <select className={styles.dropDown} name="end-day" required onChange={handleChange}>
              {tripDates.map(date => (
                <option value={date}>{date}</option>
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

      <div className={styles.btnCon}>
        <button className={styles.pinkBtn} type="submit">Add to Itenerary</button>
        <button className={styles.cancelBtn} onClick={cancelFunc}>Cancel</button>
      </div>
      
    </form>
  )
}
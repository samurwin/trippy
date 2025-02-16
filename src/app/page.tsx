"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import styles from "../styles/page.module.css";

import Header from "./components/Header"
import AutoCompleteSearch from "./components/AutoCompleteSearch"

interface FormData {
  location: google.maps.places.PlaceResult | null;
  start: string;
  end: string;
}

export default function Home() {
  const date = new Date();

  // form data
  const [formData, setFormData] = useState<FormData>({location: null, start: '', end: ''})
  // is form filled out
  const [isFormValid, setIsFormValid] = useState(false);

  // check if all fields are filled
  useEffect(() => {
    setIsFormValid(formData.location !== null && formData.end.trim() !== '' && formData.start.trim() !== '');
  }, [formData]);

  // handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // on submit
  function startTrip(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log( "start: " + formData.start + "end: " + formData.end)
    if (formData.location) {
      const { formatted_address, geometry } = formData.location;
      const lat = geometry?.location?.lat ? geometry.location.lat() : null;
      const lng = geometry?.location?.lng ? geometry.location.lng() : null;
      console.log("Address:", formatted_address, "Lat:", lat, "Lng:", lng);
    }
  }

  return (
    <>
      <Header/>
      <main className={styles.homeMain}>
          <section className={styles.hero}>
            <h1>Start Planning your Trip</h1>
            <form id="startPlanning" className={styles.startForm} onSubmit={startTrip} >
              <AutoCompleteSearch  
              name={"location"} 
              placeholder={"Enter a city or country"} 
              label={"Location"} 
              onPlaceSelected={(place) =>
                setFormData((prev) => ({
                  ...prev,
                  location: place, 
                }))}
              />
              <div className={styles.dates}>
                <div className={styles.dateInputCon}>
                  <label htmlFor="start">Start Date</label>
                  <input type="date" name="start" min={date.getDate()} onChange={handleChange} value={formData.start || ''} />
                </div>
                <div className={styles.dateInputCon}>
                  <label htmlFor="end">End Date</label>
                  <input type="date" name="end" min={date.getDate()} onChange={handleChange} value={formData.end || ''}/>
                </div>
              </div>
              <button type="submit" className={styles.startBtn} disabled={!isFormValid}>Get Started</button>
            </form>

          </section>
      </main>
    </>

  );
}

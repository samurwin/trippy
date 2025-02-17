"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next';

import styles from "../styles/page.module.css";
import { tripData } from "../../types"

import Header from "./components/Header"
import AutoCompleteSearch from "./components/AutoCompleteSearch"

interface FormData {
  location: google.maps.places.PlaceResult | null;
  start: string;
  end: string;
}

export default function Home() {
  const date = new Date();
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({location: null, start: '', end: ''})
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

  // on submit save trip data to cookie
  function startTrip(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    let tripPhoto = ''
    if(formData.location?.photos){
      tripPhoto = formData.location.photos[0].getUrl();
    }
    let tripData:tripData = {
      id: "abc123",
      tripPhoto: tripPhoto,
      tripName: "Trip to " + formData.location?.name,
      startDate: formData.start,
      endDate: formData.end
    }
    if(formData.location?.geometry?.location){
      tripData = {
        ...tripData,
        centerMap: {
          lat: formData.location?.geometry.location.lat(),
          lng: formData.location?.geometry?.location?.lng() 
        }
      }
    }
    console.log(tripData);
    setCookie('tripData', JSON.stringify(tripData),{ maxAge: 60 * 60 * 24, })

    router.push(`/trip/${tripData.id}/explore`)
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

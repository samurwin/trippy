"use client"
import { MarkersProvider } from "@/app/trip/[trip-id]/MarkersContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next';
import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

import TripMap from "../TripMap"
import styles from "../../../styles/page.module.css"
import { tripData } from "../../../../types"
const googleApiKey : any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

interface FormData {
  location: google.maps.places.PlaceResult | null;
  start: string;
  end: string;
}

const  StartFormInner = () => {
  const date = new Date();
  const router = useRouter()

  // Load the "places" library
  const places = useMapsLibrary("places");

  // Access the map instances
  const map = useMap();
  const [formData, setFormData] = useState<FormData>({location: null, start: '', end: ''})
  const [isFormValid, setIsFormValid] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  // check if all fields are filled
  useEffect(() => {
    setIsFormValid(formData.location !== null && formData.end.trim() !== '' && formData.start.trim() !== '');
  }, [formData]);

  useEffect(() => {
    if (!places || !window.google || !inputRef.current ) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setInputValue(place.formatted_address || "");
      console.log(place)
      setFormData({...formData, location: place});
    });
  }, [setFormData, places, map]);

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
      tripName: formData.location?.name ? "Trip to " + formData.location?.name : "Trip to " + formData.location?.formatted_address,
      centerId: formData.location?.place_id,
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
    <div>
      <form id="startPlanning" className={styles.startForm} onSubmit={startTrip} >
        <label htmlFor={"location"}>Location</label>
        <input
          name={"location"}
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={'Enter a location'}
          className={styles.startInput}
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
      <TripMap defaultCenter={{lat: 43.7181228, lng: -79.5428679}}/>
    </div>  
  )
}

export default function StartForm(){


  return (
    <APIProvider apiKey={googleApiKey} onLoad={() => console.log('Maps API has loaded.')}>
      <MarkersProvider>
        <StartFormInner/>
      </MarkersProvider>
    </APIProvider>
  )
}
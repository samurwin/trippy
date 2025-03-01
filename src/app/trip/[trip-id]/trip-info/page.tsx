"use client"
import styles from '../../../../styles/trip.module.css'
import { useTrip } from '../TripContext';
import { useState, useEffect, useRef } from 'react'
import {useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import { tripData } from '../../../../../types';
import { setCookie } from 'cookies-next';

export default function TripInfo(){
  const date = new Date();
  const { trip, setTrip } = useTrip();
  const placesLibrary = useMapsLibrary('places');
  const map = useMap();

  // trip info relevant to this page
  const [tripInfo, setTripInfo] = useState({tripName: trip?.tripName, end: trip?.endDate, start: trip?.startDate, photo: trip?.tripPhoto })

  // default trip location's google maps photos
  const [locationPhotos, setLocationPhotos] = useState<google.maps.places.PlacePhoto[]>([]);

  // get photos for the trip's location for options to change trip photo
  useEffect(() => {
    if(!trip?.centerId || !placesLibrary || !map) return;
    const request = {
      placeId: trip.centerId,
      fields: ["name", "photos"]
    }
      new placesLibrary.PlacesService(map).getDetails(request, (place, status) => {
        if(status === google.maps.places.PlacesServiceStatus.OK && place && place?.photos){
          setLocationPhotos(place.photos);
        }
      })
  },[placesLibrary, map, trip])
 

  // change on name and date inputs
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    setTripInfo({...tripInfo, [e.target.name]: e.target.value });
  }

  // choose a new trip photo
  const[showPhotoList, setShowPhotoList] = useState(false);
  let selectedPhoto = '';

  function selectPhoto(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    selectedPhoto = e.target.value;
  }

  function changePhoto(){
    if(selectedPhoto){
      console.log("here")
      setTripInfo({...tripInfo, photo: selectedPhoto});
    }
    setShowPhotoList(false);
  }
  // On form submit set updated trip info as new values
  // update the cookie and context to reflect new trip info
  function saveTripData(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const updatedTrip = { ...trip, ...tripInfo };

    setTrip(updatedTrip);
    setCookie('tripData', JSON.stringify(updatedTrip),{ maxAge: 60 * 60 * 24, })
    window.alert("Saved Trip Info")
  }

  return (
    <section>
      <h2>Trip Info</h2>
      <div>
        <form className={styles.tripDetailsForm} onSubmit={saveTripData}>
          <label htmlFor="tripName">Trip Name</label>
          <input name="tripName" className={styles.tripDetailInput} type="text" value={tripInfo.tripName} onChange={handleChange}/>
          <label htmlFor="start">Start Date</label>
          <input className={styles.tripDetailInput} type="date" name="start" min={date.getDate()} value={tripInfo.start}  onChange={handleChange}/>
          <label htmlFor="end">End Date</label>
          <input className={styles.tripDetailInput} type="date" name="end" min={date.getDate()} value={tripInfo.end}  onChange={handleChange}/>
          <span className={styles.label}>Trip Cover Photo</span>
        <div className={styles.tripPhoto}>
            <img src={tripInfo.photo} alt={tripInfo.tripName + " Cover Photo"}/>
            <div className={styles.changePhoto}>
              <button onClick={(e) =>{ e.preventDefault(); setShowPhotoList(true)}}>Change</button>
            </div>
        </div>

        {showPhotoList ? 
          <div className={styles.choosePhotoCon}>
          <div className={styles.photoList}>
          {locationPhotos ? 
          <>
            <h3>Choose a Photo</h3>
            <div className={styles.photoListCon}>
              {
                locationPhotos.map((photo, i) => (
                  <div className={styles.locationPhoto} key={i + "photoList"}>
                    <input type="radio" className={styles.photoRadio} value={photo.getUrl()} onChange={selectPhoto}/>
                    <img src={photo.getUrl()} />
                  </div>
                ))
              }
            </div>
            <div className={styles.photoListBtns}>
              <button className={styles.choosePhotoBtn} onClick={changePhoto}>Choose Photo</button>
              <button className={styles.cancelBtn} onClick={(e) => {e.preventDefault(); setShowPhotoList(false)}}>Cancel</button>
            </div>
          </>
          : 
            <p>No photos</p>
          }
          </div>
        </div>
        : null}

        <button type="submit" className={styles.saveBtn}>Save</button>
        </form>
      </div>
    </section>
  )
}
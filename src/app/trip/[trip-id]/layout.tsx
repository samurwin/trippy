"use client"
import { TripProvider } from './TripContext'
import TripMap from './TripMap'
import Header from '../../components/Header';
import SideBar from '../../components/SideBar'
import styles from '../../../styles/trip.module.css'

import { getCookie } from 'cookies-next';
import { APIProvider } from '@vis.gl/react-google-maps';

const googleApiKey : any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function TripLayout({ children }: Readonly<{  children: React.ReactNode; }>){

  const tripData = getCookie("tripData");

  let trip = null;
  if (tripData) {
    try {
      trip = JSON.parse(tripData);
    } catch (error) {
      console.error("Error parsing tripData cookie:", error);
    }
  }

  return (
    <APIProvider apiKey={googleApiKey} onLoad={() => console.log('Maps API has loaded.')}>
    <TripProvider tripData={trip}>
      <div className={styles.tripLayoutCon}>
        <div className={styles.tripContentWrapper}>
          <Header/>
          <div className={styles.tripContentCon}>
            <SideBar tripId={trip?.id || ''}/>
            <div className={styles.tripContent}>
              {trip ?(
                <>
                  <main>{children}</main>
                </>
              ):(
                <p>No Trip Selected</p>
              )}
            </div>
          </div>
        </div>
        <TripMap defaultCenter={trip?.centerMap ? trip.centerMap : ''}/>
      </div>
    </TripProvider>  
    </APIProvider>
  )
}
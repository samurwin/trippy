"use client"
import TripContext  from './TripContext'
import TripMap from '../../components/TripMap'
import Header from '../../components/Header';
import SideBar from '../../components/SideBar'
import styles from '../../../styles/trip.module.css'
import { useState } from 'react'
import { tripData } from '../../../../types'

import { getCookie } from 'cookies-next';
import { APIProvider } from '@vis.gl/react-google-maps';

const googleApiKey : any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function TripLayout({ children }: Readonly<{  children: React.ReactNode; }>){

  const tripCookie = getCookie("tripData");

  const [trip, setTrip] = useState<tripData>(JSON.parse(tripCookie!));
  const value = {trip, setTrip};

  return (
    <APIProvider apiKey={googleApiKey} onLoad={() => console.log('Maps API has loaded.')}>
    <TripContext.Provider value={value}>
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
        <TripMap defaultCenter={trip?.centerMap ? trip.centerMap : undefined} mapWidth="100vw" mapHeight="100vh" />
      </div>
    </TripContext.Provider>  
    </APIProvider>
  )
}
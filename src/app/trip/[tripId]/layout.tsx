"use client"
import TripContext  from './TripContext'
import {MarkersProvider} from './MarkersContext'
import TripMap from '../../components/TripMap'
import Header from '../../components/Header';
import SideBar from '../../components/SideBar'
import styles from '../../../styles/trip.module.css'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { tripData } from '../../../../types'

import { getCookie, setCookie } from 'cookies-next';
import { APIProvider } from '@vis.gl/react-google-maps';

const googleApiKey : any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function TripLayout({ children }: {  children: React.ReactNode,  }){
  const {tripId} = useParams()

  const cookie = getCookie(`tripData-${tripId}`);
  const parsedCookie = cookie ? JSON.parse(cookie as string) : null;
   const [trip, setTrip] = useState<tripData | null>(parsedCookie || null)
  const value = {trip, setTrip};

  useEffect(() => {
    if (!setCookie) console.log('set cookie not here')
    if (trip && trip.id) {
      // console.log('trip state')
      // console.log(trip);
      setCookie(`tripData-${trip.id}`, JSON.stringify(trip), {
        maxAge: 60 * 60 * 24,
        path: `/`, 
      });
      // console.log(`Cookie Updated: tripData-${trip.id}`);
      // const newCookie = getCookie(`tripData-${trip.id}`);
      // console.log(newCookie ?  JSON.parse(cookie as string) : null)
    }
  }, [trip, setCookie, getCookie]);

  return (
    <APIProvider apiKey={googleApiKey} onLoad={() => console.log('Maps API has loaded.')}>
    <TripContext.Provider value={value}>
    <MarkersProvider>
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
    </MarkersProvider>
    </TripContext.Provider>  
    </APIProvider>
  )
}
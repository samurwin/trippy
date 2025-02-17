import TripMap from './TripMap'
import Header from '../../components/Header';
import SideBar from '../../components/SideBar'
import TripHeader from '../../components/TripHeader'
import { tripData } from "../../../../types"
import styles from '../../../styles/trip.module.css'

import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next'

const exampleTripData = {
  id: '123',
  tripName: "Trip Name",
  tripPhoto: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  startDate: '2025-01-01',
  endDate: '2025-01-07'
}


export default function TripLayout({ children }: Readonly<{  children: React.ReactNode; }>){
  const cookieStore = cookies();
  const tripData = cookieStore.get("tripData")?.value;

  let trip = null;
  if (tripData) {
    try {
      trip = JSON.parse(tripData);
    } catch (error) {
      console.error("Error parsing tripData cookie:", error);
    }
  }
  

  return (
    <div className={styles.tripLayoutCon}>
        <div className={styles.tripContentWrapper}>
          <Header/>
          
          <div className={styles.tripContentCon}>
            <SideBar />
            <div className={styles.tripContent}>
              {trip ?(
                <>
                  <TripHeader tripName={trip.tripName} tripImg={trip.tripPhoto} />
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
  )
}
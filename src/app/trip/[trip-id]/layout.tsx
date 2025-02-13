import TripMap from './TripMap'
import Header from '../../components/Header';
import SideBar from '../../components/SideBar'
import TripHeader from '../../components/TripHeader'

import styles from '../../../styles/trip.module.css'

const exampleTripData = {
  tripName: "Girls Trip Spring 2025",
  tripImg: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}

export default function TripLayout({ children }: Readonly<{  children: React.ReactNode; }>){
  return (
    <div className={styles.tripLayoutCon}>
        <div className={styles.tripContentWrapper}>
          <Header/>
          <div className={styles.tripContentCon}>
            <SideBar />
            <div className={styles.tripContent}>
              <TripHeader tripName={exampleTripData.tripName} tripImg={exampleTripData.tripImg} />
              <main>{children}</main>
            </div>
          </div>
        </div>
        <TripMap />
    </div>
  )
}
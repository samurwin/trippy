import TripMap from './TripMap'
import Header from '../../components/Header';
import SideBar from '../../components/SideBar'

import styles from '../../../styles/trip.module.css'

export default function TripLayout({ children }: Readonly<{  children: React.ReactNode; }>){
  return (
    <div className={styles.tripLayoutCon}>
        <div className={styles.tripContentWrapper}>
          <Header/>
          <div className={styles.tripContentCon}>
            <SideBar />
            <main>{children}</main>
          </div>
        </div>
        <TripMap />
    </div>
  )
}
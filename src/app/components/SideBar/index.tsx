import Link from 'next/link';
import styles from '../../../styles/trip.module.css'
// Icons
import { MdOutlineExplore, MdFormatListBulleted, MdOutlineCalendarMonth, MdOutlineMap, MdOutlineStar } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

export default function SideBar(props:{ tripId:string }){
  return(
    <div className={styles.sideBar}>
      <div className={styles.subList}>
        <span className={styles.navLabel}>Trip</span>
          <Link href={props.tripId ? `/trip/${props.tripId}/trip-info`: ''} className={styles.navItem}>Trip Info</Link>
          <Link href={props.tripId ? `/trip/${props.tripId}/coming-soon` : ''} className={styles.navItem}>Packing Lists</Link>
          <Link href={props.tripId ? `/trip/${props.tripId}/coming-soon` : ''}  className={styles.navItem}>Documents</Link>
      </div>

      <div>
        <Link href={props.tripId ? `/trip/${props.tripId}/explore` : ''} className={styles.navItem}>
          <MdOutlineExplore />
          Explore
        </Link>
      </div>

      <div className={styles.subList}>
        <span className={styles.navLabel}>Itenerary</span>
        <Link href={props.tripId ? `/trip/${props.tripId}/coming-soon` : ''}  className={styles.navItem}> <MdFormatListBulleted /> List
        </Link>
        <Link href={props.tripId ? `/trip/${props.tripId}/coming-soon` : ''}  className={styles.navItem}> <MdOutlineCalendarMonth /> Calendar</Link>
        <Link href={props.tripId ? `/trip/${props.tripId}/coming-soon` : ''}  className={styles.navItem}> <MdOutlineMap /> Map</Link>
      </div>

      <div className={styles.subList}>
        <span className={styles.navLabel}>Bucket Lists</span>
        <Link href={props.tripId ? `/trip/${props.tripId}/coming-soon` : ''} className={styles.addBucketListBtn}> <FaPlus /> Create New</Link>
      </div>
    </div>
  )
}
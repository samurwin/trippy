import styles from '../../../styles/trip.module.css';
import { MdEdit } from "react-icons/md";

import Link from 'next/link';

interface TripHeaderProps {
  tripID: string;
  tripName: string;
  tripImg: string;
  tripDate: string
}

const TripHeader: React.FC<TripHeaderProps> = ({ tripID, tripName, tripImg, tripDate }) => {
  return (
    <div className={styles.tripHeaderCon}
    style={{backgroundImage: `url(${tripImg})`}}
    >
      <Link href={`/trip/${tripID}/trip-info`} className={styles.headerEditBtn}><MdEdit/></Link>
      <div className={styles.tripHeaderText}>
        <h1>{tripName} <Link href={`/trip/${tripID}/trip-info`} className={styles.editName}><MdEdit/></Link></h1>
        <p className={styles.tripDate}>{tripDate} <Link href={`/trip/${tripID}/trip-info`} className={styles.editDate}><MdEdit/></Link></p>
      </div>
    </div>
  );
};

export default TripHeader;
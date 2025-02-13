import styles from '../../../styles/trip.module.css';

interface TripHeaderProps {
  tripName: string;
  tripImg: string;
}

const TripHeader: React.FC<TripHeaderProps> = ({ tripName, tripImg }) => {
  return (
    <div className={styles.tripHeaderCon}
    style={{backgroundImage: `url(${tripImg})`}}
    >
      <h1>{tripName}</h1>
    </div>
  );
};

export default TripHeader;
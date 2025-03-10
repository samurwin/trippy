import styles from '../../../styles/trip.module.css'

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface PlaceResultCardProps {
  place: google.maps.places.Place;
}

export default function PlaceResultCard({place}:PlaceResultCardProps){

  function formatType(primaryType:string){
    let formattedType = '';
    let typeArr = primaryType.split("_");
    typeArr.forEach(str =>{
      let newStr = str.charAt(0).toUpperCase() + str.substring(1);
      formattedType = formattedType + newStr + ' ';
    })
    return formattedType
  }

  function displayPriceLevel(priceLevel:string){
      switch(priceLevel){
        case 'FREE':
          return 'Free';
        case 'INEXPENSIVE':
          return '$';
        case 'MODERATE':
          return '$$';
        case 'EXPENSIVE':
          return '$$$';
        case 'VERY EXPENSIVE':
          return '$$$$';
        default: return;
      }
  }
  function displayStars(rating:number){
    if(rating){
      if(rating <= 0.75){
        return <FaStarHalfAlt/>;
      } else if (rating > 0.75 && rating <= 1.25){
        return <FaStar/>;
      } else if (rating > 1.25 && rating <= 1.75){
        return <><FaStar/><FaStarHalfAlt/></>;
      } else if (rating > 1.75 && rating <= 2.25){
        return <><FaStar/><FaStar/></>;
      } else if (rating > 2.25 && rating <= 2.75){
        return <><FaStar/><FaStar/><FaStarHalfAlt/></>
      } else if (rating > 2.75 && rating <= 3.25){
        return <><FaStar/><FaStar/><FaStar/></>
      } else if (rating > 3.25 && rating <= 3.75){
        return <><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/></>
      } else if (rating > 3.75 && rating <= 4.25){
        return <><FaStar/><FaStar/><FaStar/><FaStar/></>
      } else if (rating > 4.25 && rating <= 4.75){
        return <><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/></>
      } else if (rating > 4.75){
        return <><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></>
      }
    } else return;
    
  }

  function displayHours(hours:google.maps.places.OpeningHours){
    const date = new Date;
    const day = date.getDay();
    if(hours){
      if(day === 0){
        return hours.weekdayDescriptions[6];
      } else {
        return hours.weekdayDescriptions[day - 1];
      }
    }
    else return;

  }

  return(
    <div className={styles.placeResultCard}>
      {place.photos && place.photos[0] ? 
            <div className={styles.placeResultImg} style={{backgroundImage: `url(${place.photos[0].getURI()})`}}></div>
      : null}

      <div className={styles.placeResultInfo}>
        <p className={styles.placeName}>{place.displayName}</p>
        <div className={styles.placeMetaData}>
          <p className={styles.placeType}>{formatType(place.primaryType!)}</p>
          <p className={styles.priceLevel}>{displayPriceLevel(place.priceLevel!)}</p>
          <p className={styles.rating}>
            {displayStars(place.rating!)}
          </p>
          <p className={styles.hours}>
            {displayHours(place.regularOpeningHours!)}
          </p>
        </div>
        <p className={styles.address}>{place.formattedAddress}</p>
      </div>
    </div>
  )
}
import styles from '../../../styles/trip.module.css'

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface PlaceResultCardProps {
  displayName: string | null | undefined,
  primaryType: string | undefined | null,
  priceLevel: string | number | undefined | null ,
  rating: number | undefined | null,
  regularOpeningHours: google.maps.places.OpeningHours | google.maps.places.PlaceOpeningHours | undefined | null,
  photos: any,
  formattedAddress: string | null | undefined
}

export default function PlaceResultCard({ displayName, primaryType, priceLevel, rating, regularOpeningHours, photos, formattedAddress }:PlaceResultCardProps){

  function formatType(primaryType:string){
    if(primaryType){
      let formattedType = '';
      let typeArr = primaryType.split("_");
      typeArr.forEach(str =>{
        let newStr = str.charAt(0).toUpperCase() + str.substring(1);
        formattedType = formattedType + newStr + ' ';
      })
      return formattedType
    }
  }

  function displayPriceLevel(priceLevel:string | number){
      switch(priceLevel){
        case 'FREE':
          return 'Free';
        case 0: 
          return 'Free';
        case 'INEXPENSIVE':
          return '$';
        case 1:
          return '$'
        case 'MODERATE':
          return '$$';
        case 2:
          return '$$';
        case 'EXPENSIVE':
          return '$$$';
        case 3:
          return '$$$';
        case 'VERY EXPENSIVE':
          return '$$$$';
        case 4:
          return '$$$$'
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

  function displayHours(hours:any){
    const date = new Date;
    const day = date.getDay();
    if(hours){
      if(hours.weekdayDescriptions){
        if(day === 0){
          return hours.weekdayDescriptions[6];
        } else {
          return hours.weekdayDescriptions[day - 1];
        }
      } else if (hours.weekday_text){
        if(day === 0){
          return hours.weekday_text[6];
        } else {
          return hours.weekday_text[day - 1];
        }
      }

    }
    else return;

  }


  return(
    <div className={styles.placeResultCard}>
      {photos && photos[0] ? 
            <div className={styles.placeResultImg} style={{backgroundImage: `url(${photos[0].getURL ? photos[0].getURL() : photos[0].getURI ? photos[0].getURI() : null})`}}></div>
      : null}

      <div className={styles.placeResultInfo}>
        <p className={styles.placeName}>{displayName}</p>
        <div className={styles.placeMetaData}>
          <p className={styles.placeType}>{formatType(primaryType!)}</p>
          <p className={styles.priceLevel}>{displayPriceLevel(priceLevel!)}</p>
          <p className={styles.rating}>
            {displayStars(rating!)}
          </p>
          <p className={styles.hours}>
            {displayHours(regularOpeningHours!)}
          </p>
        </div>
        <p className={styles.address}>{formattedAddress}</p>
      </div>
    </div>
  )
}
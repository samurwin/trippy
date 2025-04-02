import styles from './PlaceResultCard.module.css'
import { PlaceResultCardProps } from '../../../../types';
import AddToModal from '../AddToModal';

import { useState } from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function PlaceResultCard(props:PlaceResultCardProps){
const [moreDetails, setMoreDetails] = useState(false);
const [addToItenerary, setAddToItinerary] = useState(false);
const [addToBucketList, setAddToBucketList] = useState(false);

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
    <div className={moreDetails ? styles.openPlaceResult : styles.placeResultCard}>
      <div className={moreDetails ? styles.row : styles.single}>
      {props.photos && props.photos[0] ? 
            <div className={styles.placeResultImg} style={{backgroundImage: `url(${props.photos[0].getURL ? props.photos[0].getURL() : props.photos[0].getURI ? props.photos[0].getURI() : null})`}}></div>
      : null}
      {moreDetails && props.photos ?
      <>
        {props.photos[1] ?
        <div className={styles.placeResultImg} style={{backgroundImage: `url(${props.photos[1].getURL ? props.photos[1].getURL() : props.photos[1].getURI ? props.photos[1].getURI() : null})`}}></div>
        : null}
        {props.photos[2] ?
        <div className={styles.placeResultImg} style={{backgroundImage: `url(${props.photos[2].getURL ? props.photos[2].getURL() : props.photos[2].getURI ? props.photos[2].getURI() : null})`}}></div>
        : null}
      </>
      :null}
      </div>

      <div className={styles.placeResultInfo}>
        <p className={styles.placeName}>{props.displayName}</p>
        <div className={styles.placeMetaData}>
          <p className={styles.placeType}>{formatType(props.primaryType!)}</p>
          <p className={styles.priceLevel}>{displayPriceLevel(props.priceLevel!)}</p>
          <p className={styles.rating}>
            {displayStars(props.rating!)}
          </p>
          {moreDetails ? 
          <p className={styles.hours}>{displayHours(props.regularOpeningHours)}</p>
          : null}
        </div>
        <p className={styles.address}>{props.formattedAddress}</p>
        {/* additional detials */}
        {moreDetails ? 
          <>
            <div className={styles.flexCon}>
              {props.formattedPhone ?
                <p className={styles.placeLink}><b>Phone: </b><a href={`tel: ${props.formattedPhone}`}>{props.formattedPhone}</a></p> 
              : null }
              {props.website ?
                <p className={styles.placeLink}><b>Website: </b><a href={props.website}>{props.website.length < 50 ? props.website : 'Visit Website'}</a></p>
              : null}
            </div>
            {props.summary ? <p>{props.summary}</p> : null}
          </>
        : null}
        {props.explore ? (
          <div className={styles.btnCon}>
            <button onClick={() => setAddToItinerary(true)} className="pinkBtn">Add to Itenerary</button>
            <button onClick={() => setAddToBucketList(true)} className="blueBtn">Add to Bucket List</button>
          </div>
        ): null}

        <button onClick={() => setMoreDetails(!moreDetails)} className={styles.moreBtn}>{moreDetails === false ?  'More Details' : 'Show Less'}</button>
      </div>
      
      {/* Add to Modals */}
      {addToItenerary ?
        <AddToModal addTo='itinerary' place={props} closeModal={setAddToItinerary} />
      : addToBucketList ?
        <AddToModal addTo='bucket-list' place={props} closeModal={setAddToBucketList} />
      : null}

    </div>
  )
}
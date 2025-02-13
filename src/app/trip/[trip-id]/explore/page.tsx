import styles from '../../../../styles/trip.module.css'

import { FaCocktail } from "react-icons/fa";
import { FaUtensils, FaMapPin } from "react-icons/fa6";
import { MdHotel, MdDirectionsTransit } from "react-icons/md";


export default function Explore(){
  return(
    <section>
      <h2>Explore</h2>

      {/* Explore by Category */}
      <div className={styles.expCatCon}>
        <div id="exploreRestaurants" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <FaUtensils /> </div>
          <p className={styles.expCatLabel}>Restaurants</p>
        </div>

        <div id="exploreHotels" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <MdHotel /> </div>
          <p className={styles.expCatLabel}>Hotels</p>
        </div>

        <div id="exploreAttractions" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <FaMapPin /> </div>
          <p className={styles.expCatLabel}>Attractions</p>
        </div>

        <div id="exploreBars" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <FaCocktail /> </div>
          <p className={styles.expCatLabel}>Bars</p>
        </div>

        <div id="exploreTransit" className={styles.expCategory}>
          <div className={styles.expCatIcon}> <MdDirectionsTransit /> </div>
          <p className={styles.expCatLabel}>Transit</p>
        </div>
      </div>

      {/* Explore Search Bar */}
      <div>
        <input name="explore" type="text" placeholder="Search for a location" className={styles.exploreSearch}/>
      </div>
      
    </section>
  )
}
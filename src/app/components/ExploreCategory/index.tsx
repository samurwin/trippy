import { FaCocktail } from "react-icons/fa";
import { FaUtensils, FaMapPin } from "react-icons/fa6";
import { MdHotel, MdDirectionsTransit } from "react-icons/md";
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import{ useState, useEffect } from 'react';

import styles from '../../../styles/trip.module.css'
import { useTrip } from '../../trip/[trip-id]/TripContext';

interface ExploreCategoryProps {
  category: string,
  onNearbySearch: (location: google.maps.places.Place[] | null) => void;
}

export default function ExploreCategory({category, onNearbySearch}:ExploreCategoryProps){
  const map = useMap();
  const { trip } = useTrip()
  const placesLib = useMapsLibrary('places');

  // keep track of map center to search with
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!map) return;

    const updateCenter = () => {
      const mapCenter = map.getCenter();
      if (mapCenter) {
        setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() });
      }
    };
    // Get center initially
    updateCenter();

    // Add event listener for map movement
    map.addListener("center_changed", updateCenter);

    return () => {
      google.maps.event.clearListeners(map, "center_changed"); // Cleanup listener
    };
  }, [map]);

  // search nearby for selected category
  async function searchNearby(){
  if(!center || !placesLib ) {
    console.log("error doing search nearby")
    return;
  }
    let primaryTypes = []
    if(category === 'transportation'){
      primaryTypes =['airport', 'bus_station', 'subway_station', 'train_station', 'transit_station', 'ferry_terminal']
    } else {
      primaryTypes = [category]
    }
    const request = {
      fields: ['id', 'displayName', 'editorialSummary', 'location', 'formattedAddress', 'photos', 'priceLevel', 'primaryType', 'rating', 'regularOpeningHours', ],
      locationRestriction: {
          center: center,
          radius: 500, 
      },
      includedPrimaryTypes: primaryTypes,
      maxResultCount: 10,
      language: 'en-US',
    }

    const { places } = await placesLib?.Place.searchNearby(request);
    console.log("----places----")
    console.log(places);
    onNearbySearch(places)
  }

  let icon;
  let label;
    switch(category){
    case 'restaurant':
      icon = <FaUtensils />;
      label = "Restaurants";
      break;
    case 'hotel':
      icon = <MdHotel/>;
      label = "Hotels";
      break;
    case 'tourist_attraction':
      icon = <FaMapPin/>;
      label = "Attractions";
      break;
    case 'bar':
      icon = <FaCocktail/>;
      label = "Bars";
      break;
    case 'transportation':
      icon = <MdDirectionsTransit/>;
      label = "Transit";
  }

  return(
    <div id={category} className={styles.expCategory} onClick={searchNearby}>
          <div className={styles.expCatIcon}> {icon}</div>
          <p className={styles.expCatLabel}>{label}</p>
    </div>
  )
}
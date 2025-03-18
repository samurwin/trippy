'use client'
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/page.module.css";
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

interface AutoCompleteSearchProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult | null) => void;
  name: string;
  label?: string;
  placeholder?: string;
  locationBias?: {
    lat: number,
    lng: number
  }
}

export default function AutoCompleteSearch({ onPlaceSelected, name, label, placeholder, locationBias}: AutoCompleteSearchProps) {
  const map = useMap();

  const placesLibrary = useMapsLibrary('places');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!window.google || !placesLibrary || !map) return;

    const options: google.maps.places.AutocompleteOptions = {
      fields: ["name", "types", "price_level", "rating", "photos", "opening_hours",  "formatted_address", "geometry"],
      strictBounds: false, 
      ...(locationBias && {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(locationBias.lat - 1, locationBias.lng - 1), 
          new google.maps.LatLng(locationBias.lat + 1, locationBias.lng + 1) 
        ),
      }),
    };

    const autocomplete = new placesLibrary.Autocomplete(inputRef.current!, options);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setInputValue(place.name || place.formatted_address || ""); // Update input field
      onPlaceSelected(place);
    });

  }, [onPlaceSelected, locationBias, map, placesLibrary]);

  return (
    <>
    {label ? 
      <label htmlFor={name}>{label}</label>
      : null}

    <input
      name={name}
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder || 'Enter a location'}
      className={styles.startInput}
    />
    </>

  );
}
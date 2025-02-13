'use client'
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/page.module.css";

interface AutoCompleteSearchProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult | null) => void;
}

export default function AutoCompleteSearch({ onPlaceSelected }: AutoCompleteSearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setInputValue(place.formatted_address || ""); // Update input field
      onPlaceSelected(place);
    });

  }, [onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter a location..."
      className={styles.startInput}
    />
  );
}
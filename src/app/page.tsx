"use client"
import { useState } from "react";
import styles from "../styles/page.module.css";

import Header from "./components/Header"
import AutoCompleteSearch from "./components/AutoCompleteSearch"

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  return (
    <>
      <Header/>
      <main className={styles.homeMain}>
          <section className={styles.hero}>
            <h1>Plan your trip</h1>
            <p className={styles.startPara}>Start by entering a destination such as a country or city.</p>
            <AutoCompleteSearch  onPlaceSelected={setSelectedPlace} />

          </section>
      </main>
    </>

  );
}

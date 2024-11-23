import Image from "next/image";
import styles from "../styles/page.module.css";

import Header from "./components/Header"

export default function Home() {
  return (
    <>
      <Header/>
      <main className={styles.homeMain}>
          <section className={styles.hero}>
            <h1>Plan your trip</h1>
            <p className={styles.startPara}>Start by entering a destination such as a country or city.</p>
            <input name="startLocation" type="text" placeholder="Ex. New York City" className={styles.startInput} />
          </section>
      </main>
    </>

  );
}

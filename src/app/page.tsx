import styles from "../styles/page.module.css";

import Header from "./components/Header"
import StartForm from "./components/StartForm"

export default function Home() {


  return (
      <div>
        <Header/>
        <main className={styles.homeMain}>
            <section className={styles.hero}>
              <h1>Start Planning your Trip</h1>
              <StartForm/>

            </section>
        </main>
      </div>    
  );
}

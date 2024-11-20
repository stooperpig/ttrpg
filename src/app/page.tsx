'use client'

import { useEffect, useRef } from "react";
import styles from "./page.module.css"
import Link from "next/link";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Play the video on the client-side once the component is mounted
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div>
      <div className={`${styles.masthead} ${styles.video_background}`}>
        <video ref={videoRef} className={styles.background_video} muted loop playsInline id="background_video">
          <source src="/MS_Masthead_Video_Loop.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.video_text}>
          <h1 className={styles.masthead_text}>Curated Masters for your Games</h1>
          <Link href="/contact-us"></Link>
          <div className="cta_button">Reserve your GM</div>
        </div>
      </div>
      <div className="section">
        <h2>Skilled Game Masters bring your campaign to life</h2>
        <p>Whether your game of choice is Dungeons & Dragons, Pathfinder, or Call of Cthulhu, <b className="tan">Malve Studios</b> has <b className="tan">hand-picked</b> a selection of expert
          Dungeon Masters to conduct your story-driven games.</p>
        <br />
       
       {/* <div className="cta_button">View Our Masters</div> */}
      </div>
      <div className="section dice">
        <div className={`section ${styles.nested_section}`}>
          <h2>Play Anywhere. Full Stop.</h2>
          <p>Experience <b className="blue">tailor-made</b>, remote delves with your adventuring party from the comfort of home.</p>
          <p>Our include <b className="blue">Virutal Table Top (VTT)</b> service ensures seamless global connectivity
            and multitudes of game-enhancing tools.</p>
          <br />
          <div className={styles.bottom_cta_container}>
          <Link href="/services"></Link>
            <div className="cta_button">Learn More</div>
          </div>
        </div>
      </div>
      <div className="section petal">
        <h2>Master Your Games</h2>
        <p><b className="tan">Malve Studios</b> has the <b className="tan">perfect DM</b> to evolve your next night.</p>
        <p>Still unconvinced? <b className="tan">Reach out to use directly.</b></p>
        <br />
        <Link href="/contact-us"></Link>
        <div className="cta_button">Contact Us</div>
      </div>
    </div>
  );
}

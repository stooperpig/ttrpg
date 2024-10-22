'use client'

import { useEffect, useRef } from "react";
import styles from "./page.module.css"

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
      <div className={`${styles.masthead} top-section ${styles.video_background}`}>
        <video ref={videoRef} className={styles.background_video} muted loop playsInline id="background_video">
          <source src="/MS_Masthead_Video_Loop.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.video_text}>
          <h1>Curated Masters for your games</h1>
          <div className="cta_button">Reserve your GM</div>
        </div>
      </div>
      <div className="section">
        <h1>Skilled Game Masters bring your campaign to life</h1>
        <p>Whether you game of choise Dungeons & Dragons, Pathfinder, or Call of Cthulhu, Malve Studios has hand-picked a selection of expert
          Dungeon Masters to conduct your story-driven games.</p>
        <br />
        <div className="cta_button">View Our Masters</div>
      </div>
      <div className="section dice">
        <h1>Play Anywhere. Full Stop.</h1>
        <p>Experience tailor-made, remote delves with your adventuring party from the comfort of home.</p>
        <p>Our include Virutal Table Top (VTT) service ensures seamless global connectivity and multitudes of game-enhancing tools.</p>
        <br />
        <div className="cta_button">Learn More</div>
      </div>
      <div className="section petal">
        <h1>Master Your Games</h1>
        <p>Malve Studios has the perfect DM to evolve your next night.</p>
        <p>Still unconvinced? Reach out to use directly.</p>
        <br />
        <div className="cta_button">Contact Us</div>
      </div>
    </div>
  );
}

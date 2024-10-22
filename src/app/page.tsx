'use client'

import { useEffect, useRef } from "react";
import "./globals.css"
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
          Curated Masters for your games
          <br />
          Button (Reserve your GM)
        </div>
      </div>
      <div className="section">
        Skilled Game Masters bring your campaign to life
        <br />
        images of masters
        <br />
        Whether you game of choise Dungeons & Dragons, Pathfinder, or Call of Cthulhu, Malve Studios has hand-picked a selection of expert
        Dungeon Masters to conduct your story-driven games.
        <br />
        Button (View Our Masters)
      </div>
      <div className="section dice">
        Play Anywhere. Full Stop.
        <br />
        Experience tailor-made, remote delves with your adventuring party from the comfort of home.
        <br />
        Our include Virutal Table Top (VTT) service ensures seamless global connectivity and multitudes of game-enhancing tools.
        <br />
        Button (Learn More)
      </div>
      <div className="section petal">
        Master Your Games
        <br />
        Malve Studios has the perfect DM to evolve your next night.
        <br />
        Still unconvinced? Reach out to use directly.
        <br />
        Button (Contact Us)
      </div>
    </div>
  );
}

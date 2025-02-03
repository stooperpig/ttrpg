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
          <source src="/pro_dm_MS_Masthead_Video_Loop.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.video_text}>
          <h1 className={styles.masthead_text}>Vetted Professional Masters for your Games</h1>
          <Link href="/contact-us"><div className="cta_button">Reserve your GM</div></Link>
        </div>
      </div>
      <div className="section">
        <h2>Skilled Game Masters bring your campaign to life</h2>
        <p>Whether you are rolling for initiative in Dungeons & Dragons, fighting villains in Masks,
          or facing horrors in Call of Cthulhu, Malve Studios connects you to handpicked professional dungeon masters and game masters who make your story unforgettable.</p>
        <p>We take the effort of vetting every GM on ourselves. All you have to do is tell us your playstyle and wants.</p>  
        <br />
       
       {/* <div className="cta_button">View Our Masters</div> */}
      </div>
      <div className="section dice">
        <div className={`section ${styles.nested_section}`}>
          <h2>Play Anywhere. No Limits.</h2>
          <p>Delve into <b className="blue">epic adventures</b> from the comfort of home.</p>
          <p>Our <b className="blue">remote sessions</b> are fully customizable, ensuring your party gets the tailor-made experience it deserves.</p>
          <br />
          <div className={styles.bottom_cta_container}>
          <Link href="/services"><div className="cta_button">Learn More</div></Link>
          </div>
        </div>
      </div>
      <div className="section petal">
        <h2>Master Your Games</h2>
        <p><b className="tan">Malve Studios</b> matches you with the <b className="tan">perfect professional DM</b> to take your gaming to the next level.</p>
        <p>Still unconvinced? <b className="tan">Reach out to us directly.</b></p>
        <br />
        <Link href="/contact-us"><div className="cta_button">Contact Us</div></Link>
      </div>
    </div>
  );
}

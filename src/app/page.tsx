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
          <h1 className={styles.masthead_text}>Stop Rolling Dice To Find Your Next Campaign</h1>
          <Link href="/services"><div className="cta_button">Find My Table</div></Link>
        </div>
      </div>
      <div className="section">
        <h2>A Table That Actually Fits</h2>
        <p>Malve matches the table to you based on your schedule, style, table chemistry, and experience level.
          <br/>

          <p> Our Game Masters are vetted to prioritize your playing experience online and in person.</p>
          Your time is valuable. Spend it playing, not searching.<p>
           Send us an <Link href="mailto:business@malvestudios.com"> email </Link> or set up a<Link href="https://calendly.com/malvestudios/one-shot-conversation?month=2026-05">  call </Link>with our Coordinator.</p></p><br/>
        <br />
       </div>
       
       {/* <div className="cta_button">View Our Masters</div> */}
      
      <div className="section dice">
        <div className={`section ${styles.nested_section}`}>
          <h2>Play Anywhere. Find Your Table.</h2>
          <p>Online games shouldn't feel <b className="blue">random</b>.</p>
          <p>We help <b className="blue">match you</b> to a remote table that actually fits.</p>
          <br />
          <div className={styles.bottom_cta_container}>
          <Link href="/services"><div className="cta_button">Find My Table</div></Link>
          </div>
        </div>
      </div>
      <div className="section petal">
        <h2>Master Your Games</h2>
        <p><b className="tan">Not every GM is the right GM for </b> your perfect table.</p>
        <p>Malve helps match you with a GM who fits  <b className="tan">the game you actually want to play.</b></p>
        <br />
        <Link href="/contact-us"><div className="cta_button">Contact Us</div></Link>
      </div>
    </div>
  );
}


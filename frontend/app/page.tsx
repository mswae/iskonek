// app/page.tsx — Hero / Landing Page
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styles from './page.module.css';

export default function HeroPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user has an active token in their browser
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className={styles.page}>
      <Navbar/>

      {/* ── HERO SECTION ── */}
      <section className={styles.hero}>
        {/* Top gradient area */}
        <div className={styles.heroTop}>
          <h1 className={styles.heroTitle}>iskonek</h1>
          <p className={styles.heroSub}>A Web-based Centralized Scholarship Listing Platform</p>
        </div>

        {/* Bottom white card area with wave separator */}
        <div className={styles.heroBottom}>
          {/* Campus image panel */}
          <div className={styles.campusImage}>
            <img
              src="https://i0.wp.com/dateline-ibalon.com/wp-content/uploads/2025/06/ADNU-header.png?fit=930%2C450&ssl=1&w=640"
              alt="University campus"
            />
          </div>

          {/* CTA content */}
          <div className={styles.heroCta}>
            <h2 className={styles.ctaHeading}>
              Find your <span className={styles.ctaAccent}>Future</span>
            </h2>
            <p className={styles.ctaTagline}>Listing • Matching • Tracking</p>
            <p className={styles.ctaDesc}>
              Consolidating scholarship opportunities and matches Filipino Senior High School and Undergraduate Students.
            </p>
            <div className={styles.ctaBtns}>
              {isLoggedIn ? (
                <Link href="/home" className={styles.signupBtn}>Go to Dashboard</Link>
              ) : (
                <>
                  <Link href="/register" className={styles.signupBtn}>Sign Up</Link>
                  <Link href="/login" className={styles.loginBtnHero}>Log In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ISKONEK SECTION ── */}
      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>About Iskonek</h2>
        <p className={styles.aboutSub}>Iskonek FTW!</p>
      </section>

      <Footer />
    </div>
  );
}
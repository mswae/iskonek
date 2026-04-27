// app/page.tsx — Hero / Landing Page
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styles from './page.module.css';

export default function HeroPage() {
  return (
    <div className={styles.page}>
      <Navbar variant="guest" />

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
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/University_of_the_Philippines_Diliman_Administration_Building.jpg/1280px-University_of_the_Philippines_Diliman_Administration_Building.jpg"
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
              <Link href="/login" className={styles.signupBtn}>Sign Up</Link>
              <Link href="/login" className={styles.loginBtnHero}>Log In</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ISKONEK SECTION ── */}
      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>About Iskonek</h2>
        <p className={styles.aboutSub}>subtitle here here here</p>
      </section>

      <Footer />
    </div>
  );
}

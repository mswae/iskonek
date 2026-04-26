// registration type selection
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './page.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <Navbar variant="guest" />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Student Profile Registration</h1>
          <p className={styles.subtitle}>
            Select your current education level to begin registration.
          </p>
        </div>

        <div className={styles.cards}>
          {/* SHS Card */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <GraduationIcon />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>Senior High School (SHS) Student</h2>
              <p className={styles.cardDesc}>
                For students currently enrolled in SHS who wish to apply for
                pre-college or senior high scholarships.
              </p>
            </div>
            <Link href="/register/shs" className={styles.registerBtn}>
              Register
            </Link>
          </div>

          {/* Undergraduate Card */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <UniversityIcon />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>Undergraduate Student</h2>
              <p className={styles.cardDesc}>
                For college or university students applying for scholarships
                based on academic performance or field of study.
              </p>
            </div>
            <Link href="/register/undergraduate" className={styles.registerBtn}>
              Register
            </Link>
          </div>
        </div>

        <p className={styles.loginPrompt}>
          Already have an account?{' '}
          <Link href="/login" className={styles.loginLink}>
            Log In
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}

function GraduationIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

function UniversityIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

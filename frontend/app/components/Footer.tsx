// app/components/Footer.tsx — Shared footer
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        {/* Left: Logo + tagline */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <IskonekLogo />
            <span className={styles.logoText}>iskonek</span>
          </div>
          <p className={styles.tagline}>ISKOnek para sayo!</p>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Right: Contact info */}
        <div className={styles.contact}>
          <h4 className={styles.contactTitle}>Keep in Touch</h4>
          <p className={styles.contactSub}>About the Developers</p>
          <p className={styles.contactLabel}>Contact Us</p>
          <p className={styles.contactDetail}>iskonek@email.com</p>
          <p className={styles.contactDetail}>0912 345 6789</p>
        </div>
      </div>
    </footer>
  );
}

function IskonekLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="2" fill="#2d8c62"/>
      <rect x="13" y="2" width="9" height="9" rx="2" fill="#2d8c62" opacity="0.5"/>
      <rect x="2" y="13" width="9" height="9" rx="2" fill="#2d8c62" opacity="0.5"/>
      <rect x="13" y="13" width="9" height="9" rx="2" fill="#2d8c62"/>
    </svg>
  );
}

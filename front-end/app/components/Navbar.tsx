// app/components/Navbar.tsx — Shared navigation bar
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

interface NavbarProps {
  /** 'guest' shows Log In button; 'user' shows notification + avatar */
  variant?: 'guest' | 'user';
}

export default function Navbar({ variant = 'guest' }: NavbarProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        <IskonekLogo />
        <span className={styles.logoText}>iskonek</span>
      </Link>

      {/* Nav links */}
      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className={styles.navCta}>
        {variant === 'guest' ? (
          <Link href="/login" className={styles.loginBtn}>Log In</Link>
        ) : (
          <div className={styles.userActions}>
            <button className={styles.iconBtn} aria-label="Notifications">
              <BellIcon />
            </button>
            <Link href="/profile" className={styles.avatarBtn} aria-label="Profile">
              <AvatarIcon />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ── Inline SVG icons ── */
function IskonekLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="2" fill="#2d8c62"/>
      <rect x="13" y="2" width="9" height="9" rx="2" fill="#2d8c62" opacity="0.5"/>
      <rect x="2" y="13" width="9" height="9" rx="2" fill="#2d8c62" opacity="0.5"/>
      <rect x="13" y="13" width="9" height="9" rx="2" fill="#2d8c62"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

function AvatarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // We wrap useAppContext in a try/catch. 
  // If the Navbar is rendered outside the AppProvider (like on the landing page before login), 
  // it won't crash the app.
  let tasks: any[] = [];
  try {
    const context = useAppContext();
    tasks = context.tasks;
  } catch (e) {
    // Context not available, default to empty
  }

  // Check for JWT token on mount
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/'; 
  };

  const navLinks = [
    { label: 'Home', href: isLoggedIn ? '/home' : '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '#contact' },
  ];

  // Derive notifications from tasks (Ignore completed tasks)
  const notifications = tasks.filter(t => t.progress !== 'Completed').map(t => ({
    id: t.id,
    title: t.title,
    message: t.urgency === 'High' ? 'URGENT: Missing requirement!' : 'Pending requirement',
    isHighUrgency: t.urgency === 'High'
  }));

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <IskonekLogo />
        <span className={styles.logoText}>iskonek</span>
      </Link>

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

      <div className={styles.navCta}>
        {mounted && (
          !isLoggedIn ? (
            <Link href="/login" className={styles.loginBtn}>Log In</Link>
          ) : (
            <div className={styles.userActions}>
              
              {/* Notifications Dropdown Wrapper */}
              <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <button 
                  className={styles.iconBtn} 
                  aria-label="Notifications"
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ position: 'relative', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}
                >
                  <BellIcon />
                  {/* Unread Badge */}
                  {notifications.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: 'translate(25%, -25%)'
                    }}>
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {showNotifications && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    marginTop: '10px',
                    width: '300px',
                    backgroundColor: '#fff',
                    border: '1px solid #eaeaea',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 50,
                    overflow: 'hidden'
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #eaeaea', fontWeight: 'bold', backgroundColor: '#f9f9f9', color: '#333' }}>
                      Notifications
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {notifications.length === 0 ? (
                        <div style={{ padding: '16px', textAlign: 'center', color: '#888', fontSize: '13px' }}>
                          You're all caught up!
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} style={{
                            padding: '12px 16px',
                            borderBottom: '1px solid #f0f0f0',
                            backgroundColor: notif.isHighUrgency ? '#fef2f2' : '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                          }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: notif.isHighUrgency ? '#dc2626' : '#333' }}>
                              {notif.title}
                            </span>
                            <span style={{ fontSize: '12px', color: '#666' }}>
                              {notif.message}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/profile" className={styles.avatarBtn} aria-label="Profile">
                <AvatarIcon />
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Log Out
              </button>
            </div>
          )
        )}
      </div>
    </nav>
  );
}

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
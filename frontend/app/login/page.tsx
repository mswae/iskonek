// app/login/page.tsx — Login page (simulated, no backend)
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate login — redirect to /home after 800ms
    setTimeout(() => {
      router.push('/home');
    }, 800);
  }

  return (
    <div className={styles.page}>
      {/* Left panel */}
      <div className={styles.leftPanel}>
        <Link href="/" className={styles.logo}>
          <IskonekLogo />
          <span className={styles.logoText}>iskonek</span>
        </Link>
        <div className={styles.leftContent}>
          <h1 className={styles.leftTitle}>Find your<br /><span>Future.</span></h1>
          <p className={styles.leftDesc}>
            Consolidating scholarship opportunities for Filipino Senior High School and Undergraduate Students.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className={styles.formSub}>
            {isSignup ? 'Sign up to find scholarships.' : 'Log in to continue.'}
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {isSignup && (
              <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  placeholder="Juan Dela Cruz"
                  className={styles.input}
                  required
                />
              </div>
            )}
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="juan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Loading…' : isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <p className={styles.switchText}>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <button className={styles.switchBtn} onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function IskonekLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="2" fill="white"/>
      <rect x="13" y="2" width="9" height="9" rx="2" fill="white" opacity="0.5"/>
      <rect x="2" y="13" width="9" height="9" rx="2" fill="white" opacity="0.5"/>
      <rect x="13" y="13" width="9" height="9" rx="2" fill="white"/>
    </svg>
  );
}

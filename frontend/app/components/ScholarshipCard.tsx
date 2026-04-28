// app/components/ScholarshipCard.tsx — Reusable scholarship listing card
'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './ScholarshipCard.module.css';

// frontend/app/components/ScholarshipCard.tsx
export interface Scholarship {
  id: string;
  title: string;
  tag: string;     
  amount: string;
  deadline: string;
  description: string;
  gradient: string; 
  bookmarked?: boolean;
  criteria: {
    minGwa: number;
    maxIncome: number;
    course: string;
  };
}

interface ScholarshipCardProps {
  scholarship: Scholarship;
  showBookmark?: boolean;
}

export default function ScholarshipCard({ scholarship, showBookmark = true }: ScholarshipCardProps) {
  const [bookmarked, setBookmarked] = useState(scholarship.bookmarked ?? false);

  return (
    <div className={styles.card}>
      {/* Visual image area */}
      <div className={styles.cardImage} style={{ background: scholarship.gradient }} />

      {/* Card body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{scholarship.title}</h3>
        <p className={styles.cardMeta}>
          <span className={styles.amount}>{scholarship.amount}</span>
          <span className={styles.deadline}>Deadline: {scholarship.deadline}</span>
        </p>
        <p className={styles.cardDesc}>{scholarship.description}</p>
      </div>

      {/* Card footer */}
      <div className={styles.cardFooter}>
        <button className={styles.detailsBtn}>Details</button>
        {showBookmark && (
          <button
            className={`${styles.bookmarkBtn} ${bookmarked ? styles.bookmarked : ''}`}
            onClick={() => setBookmarked(!bookmarked)}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            <BookmarkIcon filled={bookmarked} />
          </button>
        )}
      </div>
    </div>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

// app/home/page.tsx — Scholarship Listings Page
'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScholarshipCard, { Scholarship } from '../components/ScholarshipCard';
// REMOVE: import { SCHOLARSHIPS } from '../data/scholarships';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Fetch data from Django on mount
  useEffect(() => {
    fetch(`${API_URL}/api/scholarships/`)
      .then((res) => res.json())
      .then((data) => {
        // Map Django's flat snake_case to the frontend's nested format
        const formattedData: Scholarship[] = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          tag: item.tag,
          amount: item.amount,
          deadline: item.deadline,
          description: item.description,
          gradient: item.gradient,
          link: item.link,
          bookmarked: item.bookmarked,
          criteria: {
            minGwa: item.min_gwa,
            maxIncome: item.max_income,
            course: item.course,
          }
        }));
        setScholarships(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch scholarships:", err);
        setLoading(false);
      });
  }, []);

  const [studentProfile, setStudentProfile] = useState({
    gwa: 88,
    income: 250000,
    course: 'STEM',
  });

  // 2. The Matching Algorithm combined with text search
  // Fetch data from Django on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      // If no token, bounce them back to login
      window.location.href = '/login';
      return;
    }

    fetch(`${API_URL}/api/scholarships/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        const formattedData: Scholarship[] = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          tag: item.tag,
          amount: item.amount,
          deadline: item.deadline,
          description: item.description,
          gradient: item.gradient,
          link: item.link,
          bookmarked: item.bookmarked,
          criteria: {
            minGwa: item.min_gwa,
            maxIncome: item.max_income,
            course: item.course,
          }
        }));
        setScholarships(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch scholarships:", err);
        setLoading(false);
      });
  }, []);

  // ALL strict matching is now done by the Django Backend!
  // We only run the text search against the pre-filtered results here.
  const filtered = scholarships.filter((s) => {
    return s.title.toLowerCase().includes(search.toLowerCase()) ||
           s.description.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visible = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        {/* Page heading */}
        <div className={styles.heading}>
          <h1 className={styles.title}>Scholarship Matching</h1>
          <p className={styles.subtitle}>Find scholarships that match your profile.</p>
        </div>  

        {/* Search + Filter bar */}
        <div className={styles.searchRow}>
          <div className={styles.searchWrap}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for Keyword"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.filterBtn}>
            <FilterIcon />
            Filter
          </button>
        </div>

        {/* Scholarship grid */}
        {visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No scholarships match your current profile.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ‹
            </button>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
      <line x1="11" y1="18" x2="13" y2="18"/>
    </svg>
  );
}
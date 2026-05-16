// app/home/page.tsx — Scholarship Listings Page
'use client';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScholarshipCard, { Scholarship } from '../components/ScholarshipCard';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 6;

const PROGRAMS = [
  'STEM', 'ABM', 'HUMSS', 'GAS', 'TVL', 'Sports Track', 'Arts & Design',
  'BS Computer Science', 'BS Information Technology', 'BS Information Systems',
  'BS Computer Engineering', 'BS Civil Engineering', 'BS Electrical Engineering',
  'BS Mechanical Engineering', 'BS Nursing', 'BS Education', 
  'BS Business Administration', 'AB Communication', 'AB Political Science', 'Other'
];

export default function HomePage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filter states for "What If" scenarios
  const [showFilters, setShowFilters] = useState(false);
  const [filterGwa, setFilterGwa] = useState('');
  const [filterIncome, setFilterIncome] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Fetch data from Django
  const fetchScholarships = useCallback((gwa?: string, income?: string, course?: string) => {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      // If no token, bounce them back to login
      window.location.href = '/login';
      return;
    }

    // Build URL with query params if they exist
    const url = new URL(`${API_URL}/api/scholarships/`);
    if (gwa) url.searchParams.append('gwa', gwa);
    if (income) url.searchParams.append('income', income);
    if (course) url.searchParams.append('course', course);

    fetch(url.toString(), {
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
  }, [API_URL]);

  // Initial load uses real profile
  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  const handleApplyFilters = () => {
    fetchScholarships(filterGwa, filterIncome, filterCourse);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilterGwa('');
    setFilterIncome('');
    setFilterCourse('');
    fetchScholarships(); // Fetches default profile settings
    setPage(1);
  };

  // Run the text search against the backend results
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
          <button 
            className={styles.filterBtn} 
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon />
            {showFilters ? 'Hide Options' : 'Filters'}
          </button>
        </div>

        {/* The "What If" Filter Panel */}
        {showFilters && (
          <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #eaeaea', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '1', minWidth: '120px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Simulated GWA</label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="e.g. 95" 
                  value={filterGwa} 
                  onChange={e => setFilterGwa(e.target.value)} 
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} 
                />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '1', minWidth: '150px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Simulated Income</label>
                <input 
                  type="number" 
                  placeholder="e.g. 150000" 
                  value={filterIncome} 
                  onChange={e => setFilterIncome(e.target.value)} 
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} 
                />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '2', minWidth: '200px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Simulated Program</label>
                <select 
                  value={filterCourse} 
                  onChange={e => setFilterCourse(e.target.value)} 
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', fontSize: '14px' }}
                >
                   <option value="">-- Select a Program --</option>
                   {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
             </div>
             <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  onClick={handleClearFilters} 
                  style={{ padding: '8px 16px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                >
                  Clear
                </button>
                <button 
                  onClick={handleApplyFilters} 
                  style={{ padding: '8px 16px', border: 'none', backgroundColor: '#d4622a', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                >
                  Apply
                </button>
             </div>
          </div>
        )}

        {/* Scholarship grid */}
        {loading ? (
          <p className={styles.empty}>Loading scholarships...</p>
        ) : visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No scholarships match these criteria.</p>
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
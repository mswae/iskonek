// app/profile/page.tsx — My Profile / Dashboard
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScholarshipCard from '../components/ScholarshipCard';
import { SCHOLARSHIPS } from '../data/scholarships';
import styles from './page.module.css';

/* ── Mock data ── */
const TASK_STATS = [
  { label: 'Not Started', value: '12', icon: '◻', active: false },
  { label: 'Planned', value: '05', icon: '📋', active: false },
  { label: 'Applied', value: '08', icon: '📨', active: false },
  { label: 'In Review', value: '03', icon: '🔍', active: false },
  { label: 'Accepted', value: '01', icon: '✓', active: true },
  { label: 'Decline', value: '02', icon: '✕', active: false },
];

const DOCUMENTS = [
  {
    name: 'Personal Statement (Draft 2)',
    updated: '13 • 300 • 000',
    status: 'DECLINE',
    urgency: 'HIGH PRIORITY',
    action: 'edit',
  },
  {
    name: 'Transcripts – Semester 7',
    updated: '14 • 300 • 000',
    status: 'COMPLETED',
    urgency: 'LOW PRIORITY',
    action: 'download',
  },
  {
    name: 'Letter of Recommendation (MOD)',
    updated: '15 • 300 • 000',
    status: 'PENDING',
    urgency: 'MEDIUM PRIORITY',
    action: 'email',
  },
];

const CALENDAR_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const CALENDAR_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
// May 2025 starts on Thursday (index 4)
const MAY_OFFSET = 4;
const TODAY = 29;

const MY_SCHOLARSHIPS = SCHOLARSHIPS.slice(0, 2).map((s) => ({ ...s, bookmarked: true }));

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <Navbar variant="user" />

      <main className={styles.main}>
        {/* ── Task Overview ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Task Overview</h2>
          <div className={styles.taskRow}>
            {TASK_STATS.map((stat) => (
              <div key={stat.label} className={`${styles.taskCard} ${stat.active ? styles.taskActive : ''}`}>
                <span className={styles.taskValue}>{stat.value}</span>
                <span className={styles.taskLabel}>{stat.label}</span>
                {stat.active && <span className={styles.taskCheck}>✓</span>}
              </div>
            ))}
          </div>
        </section>

        {/* ── Document Ledger + Calendar ── */}
        <div className={styles.midRow}>
          {/* Document Ledger */}
          <section className={styles.ledger}>
            <div className={styles.ledgerHeader}>
              <h3 className={styles.ledgerTitle}>DOCUMENT LEDGER</h3>
              <button className={styles.updateBtn}>UPDATE RECORDS</button>
            </div>
            <table className={styles.ledgerTable}>
              <thead>
                <tr>
                  <th>REQUIREMENT NAME</th>
                  <th>STATUS SIGNAL</th>
                  <th>URGENCY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {DOCUMENTS.map((doc) => (
                  <tr key={doc.name}>
                    <td>
                      <p className={styles.docName}>{doc.name}</p>
                      <p className={styles.docSub}>{doc.updated}</p>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[`status_${doc.status.toLowerCase()}`]}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.urgencyBadge} ${doc.urgency.includes('HIGH') ? styles.urgencyHigh : doc.urgency.includes('MEDIUM') ? styles.urgencyMed : styles.urgencyLow}`}>
                        {doc.urgency}
                      </span>
                    </td>
                    <td>
                      <button className={styles.actionBtn}><ActionIcon type={doc.action} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Legend */}
            <div className={styles.legend}>
              <span className={styles.legendItem}><span className={styles.dotGreen} /> OFFICIAL SIGNAL/GLOBAL PASS</span>
              <span className={styles.legendItem}><span className={styles.dotGray} /> 0.00/0000 TON INDICATORS</span>
            </div>
          </section>

          {/* Mini Calendar */}
          <section className={styles.calendar}>
            <div className={styles.calHeader}>
              <span className={styles.calMonth}>MAY 2025</span>
              <div className={styles.calNav}>
                <button>‹</button>
                <button>›</button>
              </div>
            </div>
            <div className={styles.calGrid}>
              {CALENDAR_HEADERS.map((d, i) => (
                <span key={i} className={styles.calDayName}>{d}</span>
              ))}
              {/* Empty offset cells */}
              {Array.from({ length: MAY_OFFSET }).map((_, i) => (
                <span key={`empty-${i}`} />
              ))}
              {CALENDAR_DAYS.map((d) => (
                <span
                  key={d}
                  className={`${styles.calDay} ${d === TODAY ? styles.calToday : ''}`}
                >
                  {d}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* ── My Scholarships ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>My Scholarships</h2>
          <div className={styles.scholarshipGrid}>
            {MY_SCHOLARSHIPS.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} showBookmark={true} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ActionIcon({ type }: { type: string }) {
  if (type === 'download') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
  if (type === 'email') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScholarshipCard, { Scholarship } from '../components/ScholarshipCard';
import { useAppContext, Task, TaskProgress, TaskUrgency } from '../context/AppContext';
import styles from './page.module.css';

const CALENDAR_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function ProfilePage() {
  const { bookmarkedIds, tasks, addTask, updateTask, deleteTask } = useAppContext();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const [allScholarships, setAllScholarships] = useState<Scholarship[]>([]);
  const savedScholarships = allScholarships.filter((s) => bookmarkedIds.includes(s.id));

  const TASK_STATS = [
    { label: 'Not Started', value: tasks.filter(t => t.progress === 'Not Started').length.toString().padStart(2, '0'), icon: '◻', active: false },
    { label: 'In Progress', value: tasks.filter(t => t.progress === 'In Progress').length.toString().padStart(2, '0'), icon: '📋', active: true },
    { label: 'Completed', value: tasks.filter(t => t.progress === 'Completed').length.toString().padStart(2, '0'), icon: '✓', active: false },
    { label: 'Saved Grants', value: savedScholarships.length.toString().padStart(2, '0'), icon: '🔖', active: false },
  ];

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    gwa: '',
    income: '',
    course: '',
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [requirement, setRequirement] = useState('');
  const [progress, setProgress] = useState<TaskProgress>('Not Started');
  const [urgency, setUrgency] = useState<TaskUrgency>('Medium');
  const [scholarshipId, setScholarshipId] = useState(''); 

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // 1. Fetch User Profile (Bulletproof)
    fetch(`${API_URL}/api/scholarships/profile/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
          throw new Error('Unauthorized');
        }
        const data = await res.json();
        if (!res.ok) {
           throw new Error(data.error || 'Failed to fetch profile.');
        }
        return data;
      })
      .then(data => {
        setProfile({
          fullName: data.fullName || '',
          email: data.email || '',
          gwa: data.gwa?.toString() || '',
          income: data.income?.toString() || '',
          course: data.course || '',
        });
      })
      .catch(err => {
        console.error(err);
        setProfileMessage("No student profile found. If you are an Admin, you do not have a profile.");
      })
      .finally(() => {
        setLoadingProfile(false);
      });

    // 2. Fetch All Scholarships
    fetch(`${API_URL}/api/scholarships/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => res.json())
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
        setAllScholarships(formattedData);
      })
      .catch((err) => console.error("Failed to fetch scholarships:", err));

  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage('');
    
    const token = localStorage.getItem('accessToken');

    try {
      const res = await fetch(`${API_URL}/api/scholarships/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setProfileMessage('Profile updated successfully!');
        setTimeout(() => setProfileMessage(''), 3000);
        setIsProfileFormOpen(false); 
      } else {
        setProfileMessage('Failed to update profile. Please check your inputs.');
      }
    } catch (err) {
      setProfileMessage('Server error. Ensure Django is running.');
    } finally {
      setSavingProfile(false);
    }
  };

  const openAddForm = () => {
    setEditingTaskId(null);
    setTitle('');
    setRequirement('');
    setProgress('Not Started');
    setUrgency('Medium');
    setScholarshipId(''); 
    setIsFormOpen(!isFormOpen);
  };

  const openEditForm = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setRequirement(task.requirement);
    setProgress(task.progress);
    setUrgency(task.urgency);
    setScholarshipId(task.scholarshipId || ''); 
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { 
      title, 
      requirement, 
      progress, 
      urgency,
      scholarshipId: scholarshipId || null 
    };

    if (editingTaskId) updateTask(editingTaskId, taskData);
    else addTask(taskData);
    setIsFormOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const currentYear = currentDate.getFullYear();
  const currentMonthIdx = currentDate.getMonth();
  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
  
  const actualNow = new Date();
  const isCurrentMonthView = actualNow.getFullYear() === currentYear && actualNow.getMonth() === currentMonthIdx;
  const todayDate = actualNow.getDate();

  const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
  const firstDayOffset = new Date(currentYear, currentMonthIdx, 1).getDay();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const deadlineDays = savedScholarships.map(s => {
    if (!s.deadline) return null;
    const d = new Date(s.deadline);
    if (d.getFullYear() === currentYear && d.getMonth() === currentMonthIdx) {
      return d.getDate();
    }
    return null;
  }).filter((d): d is number => d !== null);

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>

        <section className={styles.section} style={{ marginBottom: '2rem' }}>
          <div className={styles.ledgerHeader}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Personal Profile</h2>
            <button className={styles.updateBtn} onClick={() => setIsProfileFormOpen(!isProfileFormOpen)}>
              {isProfileFormOpen ? 'CANCEL EDIT' : 'EDIT PROFILE'}
            </button>
          </div>

          {profileMessage && (
            <div style={{ marginTop: '1rem', padding: '10px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '4px', fontSize: '14px' }}>
              {profileMessage}
            </div>
          )}

          {loadingProfile ? (
            <p style={{ fontSize: '14px', color: '#888', marginTop: '1rem' }}>Loading profile data...</p>
          ) : isProfileFormOpen ? (
            <form className={styles.formContainer} style={{ marginTop: '1rem' }} onSubmit={handleProfileSubmit}>
              <div className={styles.formRow}>
                <input required name="fullName" placeholder="Full Name" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} className={styles.formInput} />
                <input required type="email" name="email" placeholder="Email Address" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={styles.formInput} />
              </div>
              <div className={styles.formRow}>
                <input required type="number" step="0.01" name="gwa" placeholder="GWA" value={profile.gwa} onChange={(e) => setProfile({ ...profile, gwa: e.target.value })} className={styles.formInput} />
                <input required type="number" name="income" placeholder="Annual Income (PHP)" value={profile.income} onChange={(e) => setProfile({ ...profile, income: e.target.value })} className={styles.formInput} />
                <input required name="course" placeholder="Degree Program" value={profile.course} onChange={(e) => setProfile({ ...profile, course: e.target.value })} className={styles.formInput} />
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.btnSave} disabled={savingProfile}>
                  {savingProfile ? 'SAVING...' : 'SAVE PROFILE'}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem', padding: '1.5rem', backgroundColor: '#f8f9fa', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', color: '#333' }}>
              <div><strong style={{ color: '#000', display: 'block', marginBottom: '4px' }}>Full Name</strong> {profile.fullName || 'N/A'}</div>
              <div><strong style={{ color: '#000', display: 'block', marginBottom: '4px' }}>Email</strong> {profile.email || 'N/A'}</div>
              <div><strong style={{ color: '#000', display: 'block', marginBottom: '4px' }}>Current GWA</strong> {profile.gwa || 'N/A'}</div>
              <div><strong style={{ color: '#000', display: 'block', marginBottom: '4px' }}>Annual Income</strong> ₱{profile.income ? Number(profile.income).toLocaleString() : 'N/A'}</div>
              <div><strong style={{ color: '#000', display: 'block', marginBottom: '4px' }}>Degree Program</strong> {profile.course || 'N/A'}</div>
            </div>
          )}
        </section>

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

        <div className={styles.midRow}>
          
          <section className={styles.ledger}>
            <div className={styles.ledgerHeader}>
              <h3 className={styles.ledgerTitle}>DOCUMENT LEDGER</h3>
              <button className={styles.updateBtn} onClick={openAddForm}>
                {isFormOpen ? 'CANCEL' : '+ ADD TASK'}
              </button>
            </div>

            {isFormOpen && (
              <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <input required placeholder="Task Name (e.g. Transcript)" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.formInput} />
                  <input required placeholder="Details (e.g. Sem 7)" value={requirement} onChange={(e) => setRequirement(e.target.value)} className={styles.formInput} />
                </div>
                <div className={styles.formRow}>
                  <select value={progress} onChange={(e) => setProgress(e.target.value as TaskProgress)} className={styles.formInput}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <select value={urgency} onChange={(e) => setUrgency(e.target.value as TaskUrgency)} className={styles.formInput}>
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  <select value={scholarshipId} onChange={(e) => setScholarshipId(e.target.value)} className={styles.formInput}>
                    <option value="">-- Link to a Grant (Optional) --</option>
                    {savedScholarships.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.btnSave}>SAVE TASK</button>
                </div>
              </form>
            )}

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
                {tasks.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#888', fontSize: '12px' }}>No tasks added yet. Add one above.</td></tr>
                ) : (
                  tasks.map((task) => {
                    const linkedScholarship = savedScholarships.find((s) => s.id === task.scholarshipId);
                    
                    return (
                      <tr key={task.id}>
                        <td>
                          <p className={styles.docName}>{task.title}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p className={styles.docSub}>{task.requirement}</p>
                            {linkedScholarship && (
                              <span className={styles.badgeScholarship}>📌 {linkedScholarship.tag}</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles['status_' + task.progress.toLowerCase().replace(' ', '')]}`}>
                            {task.progress.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <span className={`${styles.urgencyBadge} ${task.urgency === 'High' ? styles.urgencyHigh : task.urgency === 'Medium' ? styles.urgencyMed : styles.urgencyLow}`}>
                            {task.urgency.toUpperCase()} PRIORITY
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '5px' }}>
                             <button type="button" className={styles.actionBtn} onClick={() => openEditForm(task)}>
                               <ActionIcon type="edit" />
                             </button>
                             <button type="button" className={styles.actionBtn} onClick={() => deleteTask(task.id)}>
                               <ActionIcon type="delete" />
                             </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </section>

          <section className={styles.calendar}>
            <div className={styles.calHeader}>
              <span className={styles.calMonth}>{currentMonthName} {currentYear}</span>
              <div className={styles.calNav}>
                <button type="button" onClick={handlePrevMonth}>‹</button>
                <button type="button" onClick={handleNextMonth}>›</button>
              </div>
            </div>
            <div className={styles.calGrid}>
              {CALENDAR_HEADERS.map((d, i) => <span key={`header-${i}`} className={styles.calDayName}>{d}</span>)}
              
              {Array.from({ length: firstDayOffset }).map((_, i) => <span key={`empty-${i}`} />)}
              
              {calendarDays.map((d) => {
                const isToday = isCurrentMonthView && d === todayDate;
                const hasDeadline = deadlineDays.includes(d);
                
                return (
                  <span 
                    key={`day-${d}`} 
                    className={`${styles.calDay} ${isToday ? styles.calToday : ''}`}
                    style={hasDeadline && !isToday ? { color: '#dc2626', fontWeight: '900', borderBottom: '2px solid #dc2626' } : {}}
                    title={hasDeadline ? 'Scholarship Deadline!' : undefined}
                  >
                    {d}
                  </span>
                );
              })}
            </div>
          </section>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>My Scholarships</h2>
          {savedScholarships.length === 0 ? (
            <p style={{ color: '#888', fontSize: '13px' }}>Go to the Home page to bookmark scholarships!</p>
          ) : (
            <div className={styles.scholarshipGrid}>
              {savedScholarships.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} showBookmark={true} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ActionIcon({ type }: { type: 'edit' | 'delete' }) {
  if (type === 'edit') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
  if (type === 'delete') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
      <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  );
  return null;
}
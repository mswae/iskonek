'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScholarshipCard from '../components/ScholarshipCard';
import { SCHOLARSHIPS } from '../data/scholarships';
import { useAppContext, Task, TaskProgress, TaskUrgency } from '../context/AppContext';
import styles from './page.module.css';

const CALENDAR_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const CALENDAR_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MAY_OFFSET = 4;
const TODAY = 29;

export default function ProfilePage() {
  const { bookmarkedIds, tasks, addTask, updateTask, deleteTask } = useAppContext();
  
  // Dynamically load only bookmarked scholarships
  const savedScholarships = SCHOLARSHIPS.filter((s) => bookmarkedIds.includes(s.id));

  // Dynamic Task Stats based on your global tasks
  const TASK_STATS = [
    { label: 'Not Started', value: tasks.filter(t => t.progress === 'Not Started').length.toString().padStart(2, '0'), icon: '◻', active: false },
    { label: 'In Progress', value: tasks.filter(t => t.progress === 'In Progress').length.toString().padStart(2, '0'), icon: '📋', active: true },
    { label: 'Completed', value: tasks.filter(t => t.progress === 'Completed').length.toString().padStart(2, '0'), icon: '✓', active: false },
    { label: 'Saved Grants', value: savedScholarships.length.toString().padStart(2, '0'), icon: '🔖', active: false },
  ];

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [requirement, setRequirement] = useState('');
  const [progress, setProgress] = useState<TaskProgress>('Not Started');
  const [urgency, setUrgency] = useState<TaskUrgency>('Medium');

  const openAddForm = () => {
    setEditingTaskId(null);
    setTitle('');
    setRequirement('');
    setProgress('Not Started');
    setUrgency('Medium');
    setIsFormOpen(!isFormOpen);
  };

  const openEditForm = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setRequirement(task.requirement);
    setProgress(task.progress);
    setUrgency(task.urgency);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId) updateTask(editingTaskId, { title, requirement, progress, urgency });
    else addTask({ title, requirement, progress, urgency });
    setIsFormOpen(false);
  };

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
              <button className={styles.updateBtn} onClick={openAddForm}>
                {isFormOpen ? 'CANCEL' : '+ ADD TASK'}
              </button>
            </div>

            {/* Task Form inside Ledger */}
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
                  tasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <p className={styles.docName}>{task.title}</p>
                        <p className={styles.docSub}>{task.requirement}</p>
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
                           <button className={styles.actionBtn} onClick={() => openEditForm(task)}>✎</button>
                           <button className={styles.actionBtn} onClick={() => deleteTask(task.id)}>✕</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          {/* Mini Calendar (Unchanged) */}
          <section className={styles.calendar}>
            <div className={styles.calHeader}>
              <span className={styles.calMonth}>MAY 2025</span>
              <div className={styles.calNav}>
                <button>‹</button>
                <button>›</button>
              </div>
            </div>
            <div className={styles.calGrid}>
              {CALENDAR_HEADERS.map((d, i) => <span key={i} className={styles.calDayName}>{d}</span>)}
              {Array.from({ length: MAY_OFFSET }).map((_, i) => <span key={`empty-${i}`} />)}
              {CALENDAR_DAYS.map((d) => (
                <span key={d} className={`${styles.calDay} ${d === TODAY ? styles.calToday : ''}`}>{d}</span>
              ))}
            </div>
          </section>
        </div>

        {/* ── My Scholarships ── */}
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
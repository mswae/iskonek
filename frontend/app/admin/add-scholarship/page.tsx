'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../register/form.module.css'; // Reusing your existing form styles

export default function AddScholarshipPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    amount: '',
    deadline: '',
    description: '',
    gradient: 'linear-gradient(135deg, #2d8c62 0%, #1a6648 100%)', // Default green
    min_gwa: '',
    max_income: '',
    course: 'ALL PROGRAMS',
    link: ''
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const token = localStorage.getItem('accessToken');

    try {
      const res = await fetch(`${API_URL}/api/scholarships/admin/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Scholarship successfully added to the database!');
        // Reset form
        setFormData({
          title: '', tag: '', amount: '', deadline: '', description: '',
          gradient: 'linear-gradient(135deg, #2d8c62 0%, #1a6648 100%)',
          min_gwa: '', max_income: '', course: 'ALL PROGRAMS', link: ''
        });
      } else {
        // If it's a 403, they aren't a superuser
        if (res.status === 403) {
            setError("Access Denied: You must be an administrator to add scholarships.");
        } else {
            setError(data.error || 'Failed to add scholarship.');
        }
      }
    } catch (err) {
      setError('Server error. Ensure your Django backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.header} style={{ marginBottom: '2rem' }}>
          <h1 className={styles.title}>Admin: Add Scholarship</h1>
          <p className={styles.subtitle}>Create a new scholarship entry in the live database.</p>
        </div>

        <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {message && <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}
          {error && <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Scholarship Title <span className={styles.required}>*</span></label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className={styles.input} placeholder="e.g. DOST-SEI Merit Scholarship" />
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                <label className={styles.label}>Short Tag <span className={styles.required}>*</span></label>
                <input required type="text" name="tag" value={formData.tag} onChange={handleChange} className={styles.input} placeholder="e.g. DOST" />
                </div>
                <div className={styles.field}>
                <label className={styles.label}>Amount Details <span className={styles.required}>*</span></label>
                <input required type="text" name="amount" value={formData.amount} onChange={handleChange} className={styles.input} placeholder="e.g. Php 80,000/Year" />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                <label className={styles.label}>Application Deadline <span className={styles.required}>*</span></label>
                <input required type="date" name="deadline" value={formData.deadline} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.field}>
                <label className={styles.label}>Application Link (URL) <span className={styles.required}>*</span></label>
                <input required type="url" name="link" value={formData.link} onChange={handleChange} className={styles.input} placeholder="https://..." />
                </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Description <span className={styles.required}>*</span></label>
              <textarea required name="description" value={formData.description} onChange={handleChange} className={styles.input} rows={4} placeholder="Full description of the scholarship..."></textarea>
            </div>

            <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#333' }}>Matching Criteria</h3>
            
            <div className={styles.row}>
                <div className={styles.field}>
                <label className={styles.label}>Minimum GWA (0-100) <span className={styles.required}>*</span></label>
                <input required type="number" step="0.01" name="min_gwa" value={formData.min_gwa} onChange={handleChange} className={styles.input} placeholder="e.g. 85" />
                </div>
                <div className={styles.field}>
                <label className={styles.label}>Maximum Annual Income (PHP) <span className={styles.required}>*</span></label>
                <input required type="number" name="max_income" value={formData.max_income} onChange={handleChange} className={styles.input} placeholder="e.g. 300000" />
                </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Eligible Programs (Comma separated) <span className={styles.required}>*</span></label>
              <textarea required name="course" value={formData.course} onChange={handleChange} className={styles.input} rows={2} placeholder="e.g. STEM, BS Computer Science, ALL PROGRAMS"></textarea>
            </div>

            <div className={styles.actions} style={{ marginTop: '2rem' }}>
              <button type="submit" className={styles.nextBtn} disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Adding Scholarship...' : 'Add Scholarship to Database'}
              </button>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
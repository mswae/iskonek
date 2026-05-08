// undergraduate registration
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../form.module.css';

const STEPS = ['Personal', 'Academic', 'Contact', 'Account'];

const YEAR_LEVELS = ['1st Year', '2nd Year'];

const PROGRAMS = [
  'BS Computer Science',
  'BS Information Technology',
  'BS Information Systems',
  'BS Computer Engineering',
  'BS Civil Engineering',
  'BS Electrical Engineering',
  'BS Mechanical Engineering',
  'BS Nursing',
  'BS Education',
  'BS Business Administration',
  'AB Communication',
  'AB Political Science',
  'Other',
];

export default function UndergraduateRegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [personal, setPersonal] = useState({
    fullName: '',
    dob: '',
    sex: '',
    nationality: 'Filipino',
    income: '',
  });

  const [academic, setAcademic] = useState({
    school: '',
    gpa: '',
    yearLevel: '',
    program: '',
  });

  const [contact, setContact] = useState({
    contactPerson: '',
    contactNumber: '',
    email: '',
  });

  const [account, setAccount] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleNext() {
    if (step === 1) {
      if (!personal.fullName || !personal.dob || !personal.sex || !personal.income) {
        alert("Please fill in all required Personal fields."); return;
      }
    } else if (step === 2) {
      if (!academic.school || !academic.gpa || !academic.yearLevel || !academic.program) {
        alert("Please fill in all required Academic fields."); return;
      }
    } else if (step === 3) {
      if (!contact.contactNumber) {
        alert("Contact number is required."); return;
      }
    }
    
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  async function handleSubmit() {
    setLoading(true);

    if (account.password !== account.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    const payload = {
      fullName: personal.fullName,
      email: account.email,
      password: account.password,
      gpa: academic.gpa,
      program: academic.program,
      income: personal.income || 0,
    };

    try {
      const res = await fetch('http://localhost:8000/api/scholarships/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json();
        alert(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Ensure your Django backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Student Profile Registration</h1>
          <p className={styles.subtitle}>Create your profile to apply for scholarships.</p>
        </div>

        {/* Step indicator */}
        <div className={styles.stepper}>
          {STEPS.map((label, i) => {
            const num = i + 1;
            const isDone = num < step;
            const isActive = num === step;
            return (
              <div key={label} className={styles.stepItem}>
                <div
                  className={
                    `${styles.stepCircle} ` +
                    (isDone ? styles.done : isActive ? styles.active : '')
                  }
                >
                  {isDone ? '✓' : num}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`${styles.stepLine} ${isDone ? styles.done : ''}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.card}>
          {done ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className={styles.successTitle}>Registration Complete!</h2>
              <p className={styles.successDesc}>
                Your profile has been created successfully. You can now log in and start
                exploring scholarships that match your profile.
              </p>
              <Link href="/login" className={styles.goHomeBtn}>
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              {/* Step 1 — Personal */}
              {step === 1 && (
                <>
                  <h2 className={styles.sectionLabel}>Personal</h2>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Full Name<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter First Name and Last Name"
                        value={personal.fullName}
                        onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Date of Birth<span className={styles.required}>*</span>
                        </label>
                        <input
                          type="date"
                          value={personal.dob}
                          onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Sex<span className={styles.required}>*</span>
                        </label>
                        <div className={styles.selectWrap}>
                          <select
                            value={personal.sex}
                            onChange={(e) => setPersonal({ ...personal, sex: e.target.value })}
                            className={styles.select}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Nationality<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={personal.nationality}
                        onChange={(e) => setPersonal({ ...personal, nationality: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                  <div className={styles.field}>
                      <label className={styles.label}>
                        Annual Family Income (PHP)<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 250000"
                        value={personal.income}
                        onChange={(e) => setPersonal({ ...personal, income: e.target.value })}
                        className={styles.input}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2 — Academic (Undergraduate) */}
              {step === 2 && (
                <>
                  <h2 className={styles.sectionLabel}>Academic</h2>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        School / University<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ateneo de Naga University"
                        value={academic.school}
                        onChange={(e) => setAcademic({ ...academic, school: e.target.value })}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          General Average (Percentage 0-100)<span className={styles.required}>*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 85, 92.5"
                          min="60"
                          max="100"
                          step="0.01"
                          value={academic.gpa}
                          onChange={(e) => setAcademic({ ...academic, gpa: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Year Level<span className={styles.required}>*</span>
                        </label>
                        <div className={styles.selectWrap}>
                          <select
                            value={academic.yearLevel}
                            onChange={(e) => setAcademic({ ...academic, yearLevel: e.target.value })}
                            className={styles.select}
                            required
                          >
                            <option value="">Select year</option>
                            {YEAR_LEVELS.map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Program / Degree<span className={styles.required}>*</span>
                      </label>
                      <div className={styles.selectWrap}>
                        <select
                          value={academic.program}
                          onChange={(e) => setAcademic({ ...academic, program: e.target.value })}
                          className={styles.select}
                          required
                        >
                          <option value="">Select program</option>
                          {PROGRAMS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3 — Contact */}
              {step === 3 && (
                <>
                  <h2 className={styles.sectionLabel}>Contact</h2>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>Contact Person</label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={contact.contactPerson}
                        onChange={(e) => setContact({ ...contact, contactPerson: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Contact Number<span className={styles.required}>*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+63xxxxxxxxxx"
                          value={contact.contactNumber}
                          onChange={(e) => setContact({ ...contact, contactNumber: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>Email Address</label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          className={styles.input}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 4 — Account */}
              {step === 4 && (
                <>
                  <h2 className={styles.sectionLabel}>Account</h2>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Email Address<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={account.email}
                        onChange={(e) => setAccount({ ...account, email: e.target.value })}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Password<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="password"
                        placeholder="At least 8 characters"
                        value={account.password}
                        onChange={(e) => setAccount({ ...account, password: e.target.value })}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Confirm Password<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Re-enter your password"
                        value={account.confirmPassword}
                        onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
                        className={styles.input}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Navigation */}
              <div className={styles.actions}>
                {step === 1 ? (
                  <Link href="/register" className={styles.cancelBtn}>
                    Cancel
                  </Link>
                ) : (
                  <button className={styles.backBtn} onClick={handleBack}>
                    Back
                  </button>
                )}
                <button
                  className={styles.nextBtn}
                  onClick={handleNext}
                  disabled={loading}
                >
                  {loading ? 'Submitting…' : step === 4 ? 'Submit' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

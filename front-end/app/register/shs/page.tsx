// shs student registration 
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../form.module.css';

const STEPS = ['Personal', 'Academic', 'Contact', 'Account'];

const STRANDS = [
  'STEM', 'ABM', 'HUMSS', 'GAS', 'TVL', 'Sports Track', 'Arts & Design',
];

const GRADE_LEVELS = ['Grade 11', 'Grade 12'];

export default function SHSRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Form state
  const [personal, setPersonal] = useState({
    fullName: '',
    dob: '',
    sex: '',
    nationality: 'Filipino',
  });

  const [academic, setAcademic] = useState({
    school: '',
    strand: '',
    gpa: '',
    gradeLevel: '',
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
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  function handleSubmit() {
    setLoading(true);
    // replace 
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <Navbar variant="guest" />

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
            /* Success screen */
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
                  </div>
                </>
              )}

              {/* Step 2 — Academic (SHS) */}
              {step === 2 && (
                <>
                  <h2 className={styles.sectionLabel}>Academic</h2>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        School<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter school name"
                        value={academic.school}
                        onChange={(e) => setAcademic({ ...academic, school: e.target.value })}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Strand<span className={styles.required}>*</span>
                      </label>
                      <div className={styles.selectWrap}>
                        <select
                          value={academic.strand}
                          onChange={(e) => setAcademic({ ...academic, strand: e.target.value })}
                          className={styles.select}
                          required
                        >
                          <option value="">Select strand</option>
                          {STRANDS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          GPA / General Average<span className={styles.required}>*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 92.5"
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
                          Grade Level<span className={styles.required}>*</span>
                        </label>
                        <div className={styles.selectWrap}>
                          <select
                            value={academic.gradeLevel}
                            onChange={(e) => setAcademic({ ...academic, gradeLevel: e.target.value })}
                            className={styles.select}
                            required
                          >
                            <option value="">Select level</option>
                            {GRADE_LEVELS.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
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

              {/* Navigation buttons */}
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

// pages/auth.jsx
// ──────────────────────────────────────────────────────────────
// SKYBOUND — Authentication Page (Login / Register)
// Next.js + CSS Modules  |  No external UI library
// ──────────────────────────────────────────────────────────────

import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

// ── VALIDATION HELPERS ────────────────────────────────────────

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address';
}
function validatePassword(v) {
  return v.length >= 8 ? '' : 'Password must be at least 8 characters';
}
function validateName(v) {
  return v.trim().length >= 2 ? '' : 'Name must be at least 2 characters';
}

// ── FLOATING FLIGHT CARD ──────────────────────────────────────

function FlightCard() {
  return (
    <div className={styles.flightCard}>
      <div className={styles.flightCardRoute}>
        <div>
          <div className={styles.flightCardCity}>LOS</div>
          <div className={styles.flightCardCode}>Lagos, NG</div>
        </div>
        <div className={styles.flightCardLine}>
          <div className={styles.flightCardLineInner} />
          <div className={styles.flightCardDuration}>6h 20m</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className={styles.flightCardCity}>LHR</div>
          <div className={styles.flightCardCode}>London, UK</div>
        </div>
      </div>
      <div className={styles.flightCardMeta}>
        <span className={styles.flightCardClass}>BUSINESS CLASS</span>
        <span className={styles.flightCardPrice}>$1,240</span>
      </div>
    </div>
  );
}

// ── LOGIN FORM ────────────────────────────────────────────────

function LoginForm({ onSwitch }) {
  const router = useRouter();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    const emailErr = validateEmail(form.email);
    const pwErr    = validatePassword(form.password);
    if (emailErr) e.email    = emailErr;
    if (pwErr)    e.password = pwErr;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    // TODO: replace with real auth API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Welcome back</h1>
        <p className={styles.formSubtitle}>Sign in to access your bookings and saved trips.</p>
      </div>

      <div className={styles.modeTabs}>
        <button className={`${styles.modeTab} ${styles.modeTabActive}`}>Sign In</button>
        <button className={styles.modeTab} onClick={onSwitch}>Register</button>
      </div>

      <div className={styles.socialRow}>
        <button className={styles.socialBtn}>
          <span className={styles.socialIcon}>G</span> Google
        </button>
        <button className={styles.socialBtn}>
          <span className={styles.socialIcon}>🍎</span> Apple
        </button>
      </div>

      <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <span className={styles.dividerText}>OR CONTINUE WITH EMAIL</span>
        <div className={styles.dividerLine} />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Email Address</label>
        <input
          className={`${styles.fieldInput} ${errors.email ? styles.error : ''}`}
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={set('email')}
        />
        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Password</label>
        <div className={styles.passwordWrap}>
          <input
            className={`${styles.fieldInput} ${errors.password ? styles.error : ''}`}
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            value={form.password}
            onChange={set('password')}
          />
          <button className={styles.passwordToggle} onClick={() => setShowPw(!showPw)} type="button">
            {showPw ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
      </div>

      <div className={styles.forgotRow}>
        <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
      </div>

      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <><span className={styles.spinner} /> Signing in…</> : 'Sign In →'}
      </button>

      <div className={styles.switchMode}>
        Don't have an account?{' '}
        <button className={styles.switchModeBtn} onClick={onSwitch}>
          Create one free
        </button>
      </div>
    </>
  );
}

// ── REGISTER FORM ─────────────────────────────────────────────

function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agree: false,
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (validateName(form.firstName))  e.firstName = validateName(form.firstName);
    if (validateName(form.lastName))   e.lastName  = validateName(form.lastName);
    const emailErr = validateEmail(form.email);
    if (emailErr) e.email = emailErr;
    const pwErr = validatePassword(form.password);
    if (pwErr) e.password = pwErr;
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.agree) e.agree = 'You must accept the terms';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    // TODO: replace with real register API call
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Account Created!</h2>
        <p className={styles.successText}>
          Welcome to Snap Trip. Check your email to verify your account,
          then sign in to start exploring flights.
        </p>
        <br />
        <button className={styles.submitBtn} onClick={onSwitch} style={{ marginTop: 24 }}>
          Sign In Now →
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Create account</h1>
        <p className={styles.formSubtitle}>Join 2M+ travellers. Free forever.</p>
      </div>

      <div className={styles.modeTabs}>
        <button className={styles.modeTab} onClick={onSwitch}>Sign In</button>
        <button className={`${styles.modeTab} ${styles.modeTabActive}`}>Register</button>
      </div>

      <div className={styles.socialRow}>
        <button className={styles.socialBtn}>
          <span className={styles.socialIcon}>G</span> Google
        </button>
        <button className={styles.socialBtn}>
          <span className={styles.socialIcon}>🍎</span> Apple
        </button>
      </div>

      <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <span className={styles.dividerText}>OR CONTINUE WITH EMAIL</span>
        <div className={styles.dividerLine} />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>First Name</label>
          <input
            className={`${styles.fieldInput} ${errors.firstName ? styles.error : ''}`}
            type="text" placeholder="Ada"
            value={form.firstName} onChange={set('firstName')}
          />
          {errors.firstName && <span className={styles.fieldError}>{errors.firstName}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Last Name</label>
          <input
            className={`${styles.fieldInput} ${errors.lastName ? styles.error : ''}`}
            type="text" placeholder="Okonkwo"
            value={form.lastName} onChange={set('lastName')}
          />
          {errors.lastName && <span className={styles.fieldError}>{errors.lastName}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Email Address</label>
        <input
          className={`${styles.fieldInput} ${errors.email ? styles.error : ''}`}
          type="email" placeholder="you@example.com"
          value={form.email} onChange={set('email')}
        />
        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Password</label>
        <div className={styles.passwordWrap}>
          <input
            className={`${styles.fieldInput} ${errors.password ? styles.error : ''}`}
            type={showPw ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            value={form.password} onChange={set('password')}
          />
          <button className={styles.passwordToggle} onClick={() => setShowPw(!showPw)} type="button">
            {showPw ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
        {!errors.password && <span className={styles.fieldHelp}>Must be at least 8 characters</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Confirm Password</label>
        <input
          className={`${styles.fieldInput} ${errors.confirmPassword ? styles.error : ''}`}
          type="password" placeholder="••••••••"
          value={form.confirmPassword} onChange={set('confirmPassword')}
        />
        {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
      </div>

      <div className={styles.checkRow}>
        <input
          type="checkbox"
          id="agree"
          checked={form.agree}
          onChange={set('agree')}
        />
        <label htmlFor="agree">
          I agree to Skybound's{' '}
          <a href="#">Terms of Service</a> and{' '}
          <a href="#">Privacy Policy</a>.
          {errors.agree && <><br /><span className={styles.fieldError}>{errors.agree}</span></>}
        </label>
      </div>

      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <><span className={styles.spinner} /> Creating account…</> : 'Create Account →'}
      </button>

      <div className={styles.switchMode}>
        Already have an account?{' '}
        <button className={styles.switchModeBtn} onClick={onSwitch}>
          Sign in
        </button>
      </div>
    </>
  );
}

// ── PAGE ──────────────────────────────────────────────────────

export default function AuthPage() {
  const router = useRouter();
  const initMode = router.query?.mode === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(initMode);

  const toLogin    = useCallback(() => setMode('login'),    []);
  const toRegister = useCallback(() => setMode('register'), []);

  return (
    <>
      <Head>
        <title>{mode === 'login' ? 'Sign In' : 'Create Account'} — Skybound</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.page}>

        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>
          <div className={styles.leftBg} />
          <div className={styles.leftGrid} />
          <div className={styles.leftContent}>

            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>✦</span>
              Snap<span>Trip</span>
            </Link>

            <div className={styles.leftCenter}>
              <div className={styles.leftEyebrow}>Trusted by 2M+ Travellers</div>
              <h2 className={styles.leftTitle}>
                Your Premium<br />
                Travel <em>Companion</em>
              </h2>
              <p className={styles.leftDesc}>
                Book smarter with real-time fares, instant e-tickets,
                and loyalty rewards that upgrade every journey.
              </p>

              <div className={styles.perks}>
                {[
                  { icon: '⚡', title: 'Instant Confirmation',   text: 'E-ticket in under 30 seconds' },
                  { icon: '💰', title: 'Best Price Guarantee',   text: 'We match any lower fare'      },
                  { icon: '🛡️', title: 'Flexible Cancellations', text: 'Free changes on most fares'   },
                  { icon: '🌍', title: '190 Countries',          text: '500+ airline partners'         },
                ].map((p) => (
                  <div key={p.title} className={styles.perk}>
                    <div className={styles.perkIcon}>{p.icon}</div>
                    <div className={styles.perkText}>
                      <strong>{p.title}</strong>
                      {p.text}
                    </div>
                  </div>
                ))}
              </div>

              <FlightCard />
            </div>

            <div className={styles.leftFooter}>
              © 2025 Skybound Technologies · Privacy · Terms
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          <div className={styles.formContainer}>
            {mode === 'login'
              ? <LoginForm    onSwitch={toRegister} />
              : <RegisterForm onSwitch={toLogin}    />
            }
          </div>
        </div>

      </div>
    </>
  );
}

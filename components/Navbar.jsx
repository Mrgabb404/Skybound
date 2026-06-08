// components/Navbar.jsx
// ──────────────────────────────────────────────────────────────
// SKYBOUND — Shared Navbar
// Drop this into every page instead of duplicating nav code.
// Usage: import Navbar from '../components/Navbar'
// ──────────────────────────────────────────────────────────────

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

const NAV_LINKS = [
  { label: 'Flights',      href: '/flights'  },
  { label: 'Deals',        href: '/deals'    },
  { label: 'My Trips',     href: '/my-trips' },
  { label: 'Track Flight', href: '/track'    },
  { label: 'Support',      href: '/support'  },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          Snap<span>Trip</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`${styles.navLink} ${router.pathname === l.href ? styles.navLinkActive : ''}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className={styles.navActions}>
          <Link href="/auth" className={styles.btnGhost}>Sign In</Link>
          <Link href="/auth?mode=register" className={styles.btnGold}>Get Started</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`${styles.mobileLink} ${router.pathname === l.href ? styles.mobileLinkActive : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div className={styles.mobileActions}>
          <Link href="/auth" className={styles.btnGhost} onClick={() => setMobileOpen(false)}>
            Sign In
          </Link>
          <Link href="/auth?mode=register" className={styles.btnGold} onClick={() => setMobileOpen(false)}>
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

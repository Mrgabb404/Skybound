// pages/index.jsx
// ──────────────────────────────────────────────────────────────
// SKYBOUND — Home Page
// Next.js + CSS Modules  |  No external UI library
// ──────────────────────────────────────────────────────────────

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

// ── DATA ──────────────────────────────────────────────────────

const destinations = [
  { city: 'Dubai',         country: 'United Arab Emirates', price: 'From $420', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' },
  { city: 'Abuja',         country: 'Nigeria',              price: 'From $150', image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80' },
  { city: 'London',        country: 'United Kingdom',       price: 'From $480', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80' },
  { city: 'New York',      country: 'United States',        price: 'From $540', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80' },
  { city: 'Port Harcourt', country: 'Nigeria',              price: 'From $80',  image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80' },
];

const features = [
  {
    icon: '✈️',
    title: 'Real-Time Booking',
    text: 'Live seat availability and instant confirmation across 500+ airlines worldwide.',
  },
  {
    icon: '🔐',
    title: 'Secure Payments',
    text: 'PCI-compliant checkout with Stripe, Paystack, Flutterwave and 8 more gateways.',
  },
  {
    icon: '📡',
    title: 'Live Flight Tracking',
    text: 'Real-time departure boards, gate updates, and delay notifications.',
  },
  {
    icon: '🎯',
    title: 'AI Recommendations',
    text: 'Personalised deals powered by your travel history and preferences.',
  },
  {
    icon: '💳',
    title: 'Loyalty Rewards',
    text: 'Earn SkyPoints on every booking. Redeem for upgrades, lounge access, and more.',
  },
  {
    icon: '🌐',
    title: 'Multi-Currency',
    text: 'Book in your local currency with live exchange rates for 140+ currencies.',
  },
];

const deals = [
  { from: 'Lagos',  to: 'London',   airline: '✈️', bg: '#1a3a5c', date: 'Nov 12 – Nov 19', price: '$520',  save: '32% off' },
  { from: 'Accra',  to: 'Dubai',    airline: '🌟', bg: '#3d2a1a', date: 'Dec 3 – Dec 10',  price: '$390',  save: '18% off' },
  { from: 'Nairobi', to: 'Paris',   airline: '🦅', bg: '#1a3a2c', date: 'Jan 8 – Jan 15',  price: '$610',  save: '24% off' },
  { from: 'Cairo',  to: 'New York', airline: '🗽', bg: '#2a1a3d', date: 'Feb 2 – Feb 9',   price: '$780',  save: '15% off' },
  { from: 'Abuja',  to: 'Tokyo',    airline: '🗾', bg: '#1a2a3a', date: 'Mar 5 – Mar 12',  price: '$940',  save: '29% off' },
  { from: 'Dakar',  to: 'Istanbul', airline: '🕌', bg: '#3d3a1a', date: 'Apr 1 – Apr 8',   price: '$460',  save: '21% off' },
];

// ── COMPONENT ─────────────────────────────────────────────────

export default function Home() {
  const [tripType, setTripType] = useState('roundtrip');

  return (
    <>
      <Head>
        <title>SnapTrip — Luxury Flight Booking</title>
        <meta name="description" content="Search, compare and book premium flights worldwide." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.page}>

        {/* ── NAVBAR ── */}
        <nav className={styles.navbar}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
           Snap<span>Trip</span>
          </Link>

          <ul className={styles.navLinks}>
            {[
              { label: 'Flights',      href: '/flights'  },
              { label: 'Deals',        href: '/deals'    },
              { label: 'My Trips',     href: '/my-trips' },
              { label: 'Track Flight', href: '/track'    },
              { label: 'Support',      href: '/support'  },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className={styles.navActions}>
            <Link href="/auth" className={styles.btnGhost}>Sign In</Link>
            <Link href="/auth?mode=register" className={styles.btnGold}>Get Started</Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroGrid} />

          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowDot} />
              500+ Airlines · 190 Countries · Live Fares
            </div>

            <h1 className={styles.heroTitle}>
              The World Awaits.<br />
              <em>Fly Without Borders.</em>
            </h1>

            <p className={styles.heroSubtitle}>
              Discover, compare and book premium flights at unbeatable fares.
              Your journey starts the moment you search.
            </p>
          </div>

          {/* Search Widget */}
          <div className={styles.searchWidget}>
            <div className={styles.searchTabs}>
              {[
                { id: 'oneway',    label: 'One Way'    },
                { id: 'roundtrip', label: 'Round Trip' },
                { id: 'multi',     label: 'Multi-City' },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`${styles.searchTab} ${tripType === t.id ? styles.searchTabActive : ''}`}
                  onClick={() => setTripType(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className={styles.searchRow}>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>From</label>
                <input className={styles.searchInput} placeholder="City or airport" type="text" />
              </div>

              <div className={styles.searchField}>
                <label className={styles.searchLabel}>To</label>
                <input className={styles.searchInput} placeholder="City or airport" type="text" />
              </div>

              <div className={styles.searchField}>
                <label className={styles.searchLabel}>
                  {tripType === 'roundtrip' ? 'Departure — Return' : 'Departure Date'}
                </label>
                <input
                  className={styles.searchInput}
                  type={tripType === 'roundtrip' ? 'text' : 'date'}
                  placeholder={tripType === 'roundtrip' ? 'Select dates' : ''}
                />
              </div>

              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Passengers · Class</label>
                <input className={styles.searchInput} placeholder="1 Adult · Economy" type="text" readOnly />
              </div>

              <button className={styles.searchBtn}>
                <span>✦</span> Search
              </button>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className={styles.statsStrip}>
          {[
            { number: '2.4M+', label: 'Flights Booked'   },
            { number: '500+',  label: 'Airline Partners'  },
            { number: '190',   label: 'Countries Covered' },
            { number: '4.9★',  label: 'Average Rating'    },
          ].map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNumber}>{s.number}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── DESTINATIONS ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionEyebrow}>Popular Routes</div>
              <h2 className={styles.sectionTitle}>Top Destinations<br />This Season</h2>
            </div>
            <Link href="/search" className={styles.sectionLink}>
              Explore all →
            </Link>
          </div>

          <div className={styles.destinationsGrid}>
            {destinations.map((d, i) => (
              <div key={d.city} className={styles.destCard}>
                <div className={styles.destCardBg}>
  <img
    src={d.image}
    alt={d.city}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      position: 'absolute',
      inset: 0,
    }}
  />
</div>
                <div className={styles.destOverlay} />
                <div className={styles.destPrice}>{d.price}</div>
                <div className={styles.destInfo}>
                  <div className={styles.destCity}>{d.city}</div>
                  <div className={styles.destCountry}>{d.country}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className={`${styles.section} ${styles.featuresBg}`}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionEyebrow}>Why SnapTrip</div>
              <h2 className={styles.sectionTitle}>Everything You Need<br />In One Platform</h2>
            </div>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEALS ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionEyebrow}>Limited Time Offers</div>
              <h2 className={styles.sectionTitle}>Today's Best<br />Flight Deals</h2>
            </div>
            <Link href="/search" className={styles.sectionLink}>View all deals →</Link>
          </div>

          <div className={styles.dealsGrid}>
            {deals.map((d) => (
              <div key={`${d.from}-${d.to}`} className={styles.dealCard}>
                <div
                  className={styles.dealAirline}
                  style={{ background: `${d.bg}66` }}
                >
                  {d.airline}
                </div>
                <div className={styles.dealInfo}>
                  <div className={styles.dealRoute}>{d.from} → {d.to}</div>
                  <div className={styles.dealMeta}>{d.date} · Round trip</div>
                </div>
                <div className={styles.dealPrice}>
                  <div className={styles.dealAmount}>{d.price}</div>
                  <div className={styles.dealTag}>{d.save}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBg} />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready for Your<br />Next Adventure?</h2>
            <p className={styles.ctaText}>
              Join over 2 million travellers who trust Snap Trip for every journey.
              Sign up free and unlock exclusive member fares.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/auth?mode=register" className={styles.btnGold}>
                Create Free Account
              </Link>
              <Link href="/search" className={styles.btnGhost}>
                Search Flights
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className={styles.footer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.logo} style={{ fontSize: '1.5rem' }}>
                <span className={styles.logoIcon}>✦</span>
                Snap<span>Trip</span>
              </Link>
              <p className={styles.footerDesc}>
                Premium flight booking platform connecting travellers to 500+ airlines
                across 190 countries with real-time fares and instant confirmation.
              </p>
            </div>

            {[
              { heading: 'Product',  links: ['Search Flights', 'My Bookings', 'Flight Tracker', 'Deals', 'Loyalty Program'] },
              { heading: 'Company',  links: ['About Us', 'Careers', 'Press', 'Blog', 'Partners'] },
              { heading: 'Support',  links: ['Help Centre', 'Contact Us', 'Refund Policy', 'Baggage Info', 'Travel Insurance'] },
            ].map((col) => (
              <div key={col.heading} className={styles.footerCol}>
                <h4>{col.heading}</h4>
                <ul className={styles.footerLinks}>
                  {col.links.map((l) => (
                    <li key={l}><Link href="#">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.footerBottom}>
            <span>© 2025 Snap Trip Technologies. All rights reserved.</span>
            <span>Privacy Policy · Terms · Cookie Settings</span>
          </div>
        </footer>

      </div>
    </>
  );
}

// pages/deals.jsx
// SKYBOUND — Deals Page (/deals)

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Deals.module.css';

const CATEGORIES = ['All Deals', 'Africa', 'Europe', 'Asia', 'Americas', 'Middle East', 'Flash Sales'];

const FEATURED = {
  route: 'Lagos → Dubai',
  fromCode: 'LOS', toCode: 'DXB',
  desc: 'Experience the jewel of the Middle East with our exclusive winter fare. Business class upgrades available from $890.',
  dates: 'Nov 15 – Dec 31, 2025',
  airline: 'Emirates · Qatar Airways',
  duration: '6h 25m non-stop',
  originalPrice: '$680',
  price: '$390',
  save: '43% off',
  stats: [
    { num: '43%',  label: 'Saving vs avg'    },
    { num: '6h',   label: 'Flight time'       },
    { num: '2',    label: 'Airlines available' },
    { num: '★4.9', label: 'Traveller rating'  },
  ],
};

const DEALS = [
  { emoji: '🗼', bg: '#1a2a4a', route: 'Lagos → Paris',     meta: 'Nov–Jan · Round trip',  price: '$520',  save: '28%' },
  { emoji: '🏙️', bg: '#4a1a1a', route: 'Accra → New York',  meta: 'Dec–Feb · Round trip',  price: '$740',  save: '19%' },
  { emoji: '⛩️', bg: '#1a3a2c', route: 'Nairobi → Tokyo',   meta: 'Jan–Mar · Round trip',  price: '$890',  save: '31%' },
  { emoji: '🗽', bg: '#2a1a4a', route: 'Abuja → London',    meta: 'Oct–Dec · Round trip',  price: '$480',  save: '22%' },
  { emoji: '🌴', bg: '#2a3a1a', route: 'Dakar → Bangkok',   meta: 'Dec–Jan · Round trip',  price: '$660',  save: '25%' },
  { emoji: '🕌', bg: '#3a2a1a', route: 'Cairo → Istanbul',  meta: 'Nov–Dec · Round trip',  price: '$310',  save: '35%' },
  { emoji: '🌊', bg: '#1a2a3a', route: 'Accra → Sydney',    meta: 'Jan–Feb · Round trip',  price: '$1,100', save: '17%' },
  { emoji: '🦁', bg: '#3a1a1a', route: 'Lagos → Cape Town', meta: 'Nov–Jan · Round trip',  price: '$280',  save: '40%' },
  { emoji: '🏔️', bg: '#1a3a3a', route: 'Nairobi → Zurich',  meta: 'Dec–Feb · Round trip',  price: '$620',  save: '24%' },
];

// Simple countdown to end of year
function useCountdown() {
  const target = new Date('2025-12-31T23:59:59');
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function DealsPage() {
  const [activeCategory, setCategory] = useState('All Deals');
  const [email, setEmail] = useState('');
  const time = useCountdown();
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <>
      <Head>
        <title>Flight Deals — SnapTrip</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        <Navbar />

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Limited Time · New Deals Every 24 Hours
            </div>
            <h1 className={styles.heroTitle}>
              Unbeatable Fares,<br />
              <em>Unforgettable Journeys.</em>
            </h1>
            <p className={styles.heroSub}>
              Handpicked flight deals updated daily across 500+ airlines.
              Book before they're gone.
            </p>

            <div className={styles.countdown}>
              <div className={styles.countdownLabel}>Today's deals expire in</div>
              <div className={styles.countdownTimer}>
                {[{ num: pad(time.d), sub: 'Days' }, { num: pad(time.h), sub: 'Hrs' }, { num: pad(time.m), sub: 'Min' }, { num: pad(time.s), sub: 'Sec' }].map((u, i) => (
                  <>
                    {i > 0 && <span key={`sep-${i}`} className={styles.countdownSep}>:</span>}
                    <div key={u.sub} className={styles.countdownUnit}>
                      <div className={styles.countdownNum}>{u.num}</div>
                      <div className={styles.countdownSub}>{u.sub}</div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER */}
        <div className={styles.filterTabs}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`${styles.filterTab} ${activeCategory === c ? styles.filterTabActive : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FEATURED DEAL */}
        <div className={styles.featuredWrap}>
          <div className={styles.featuredDeal}>
            <div>
              <div className={styles.featuredBadge}>🔥 Deal of the Week</div>
              <h2 className={styles.featuredTitle}>
                {FEATURED.route.split('→')[0]} →<br />
                <em>{FEATURED.route.split('→')[1]}</em>
              </h2>
              <p className={styles.featuredDesc}>{FEATURED.desc}</p>
              <div className={styles.featuredMeta}>
                {[
                  { label: 'Travel Dates',  value: FEATURED.dates    },
                  { label: 'Airlines',      value: FEATURED.airline  },
                  { label: 'Duration',      value: FEATURED.duration },
                ].map((m) => (
                  <div key={m.label} className={styles.featuredMetaItem}>
                    <span className={styles.featuredMetaLabel}>{m.label}</span>
                    <span className={styles.featuredMetaValue}>{m.value}</span>
                  </div>
                ))}
              </div>
              <div className={styles.featuredPrice}>
                <span className={styles.featuredPriceFrom}>From</span>
                <span className={styles.featuredPriceAmount}>{FEATURED.price}</span>
                <span className={styles.featuredPriceSave}>{FEATURED.save}</span>
              </div>
              <button className={styles.btnGold}>Book This Deal →</button>
            </div>

            <div className={styles.featuredVisual}>
              {FEATURED.stats.map((s) => (
                <div key={s.label} className={styles.featuredStat}>
                  <div className={styles.featuredStatNum}>{s.num}</div>
                  <div className={styles.featuredStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DEALS GRID */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionTitle}>All Flight Deals</div>
              <div className={styles.sectionSub}>{DEALS.length} deals available · Prices per person, round trip</div>
            </div>
          </div>

          <div className={styles.dealsGrid}>
            {DEALS.map((d) => (
              <div key={d.route} className={styles.dealCard}>
                <div className={styles.dealCardTop} style={{ background: `${d.bg}cc` }}>
                  <span style={{ fontSize: '3.5rem' }}>{d.emoji}</span>
                  <span className={styles.dealSaveBadge}>{d.save} off</span>
                </div>
                <div className={styles.dealCardBody}>
                  <div className={styles.dealRoute}>{d.route}</div>
                  <div className={styles.dealMeta}>{d.meta}</div>
                  <div className={styles.dealFooter}>
                    <div>
                      <div className={styles.dealPrice}>{d.price}</div>
                      <div className={styles.dealPriceSub}>per person</div>
                    </div>
                    <button className={styles.dealBtn}>Book Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterBg} />
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>Never Miss a Deal</h2>
            <p className={styles.newsletterSub}>
              Get exclusive flight deals delivered to your inbox before they go public.
            </p>
            <div className={styles.newsletterForm}>
              <input
                className={styles.newsletterInput}
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className={styles.btnGold}>Subscribe</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

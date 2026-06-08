// pages/my-trips.jsx
// SKYBOUND — My Trips Page (/my-trips)

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/MyTrips.module.css';

const TRIPS = [
  {
    id: 'SKY-29401', airline: '✈️', airlineBg: '#1a3a5c', airlineName: 'British Airways',
    from: 'Lagos', fromCode: 'LOS', to: 'London', toCode: 'LHR',
    depart: 'Nov 12, 2025', returnDate: 'Nov 19, 2025',
    flightNum: 'BA 083', duration: '6h 30m', cabin: 'Business Class',
    passengers: '1 Adult', amount: '$1,240', status: 'upcoming',
  },
  {
    id: 'SKY-28876', airline: '🌟', airlineBg: '#8b0000', airlineName: 'Emirates',
    from: 'Lagos', fromCode: 'LOS', to: 'Dubai', toCode: 'DXB',
    depart: 'Sep 5, 2025', returnDate: 'Sep 12, 2025',
    flightNum: 'EK 782', duration: '6h 20m', cabin: 'Economy',
    passengers: '2 Adults', amount: '$780', status: 'completed',
  },
  {
    id: 'SKY-28102', airline: '🦅', airlineBg: '#1a3a2c', airlineName: 'Air France',
    from: 'Lagos', fromCode: 'LOS', to: 'Paris', toCode: 'CDG',
    depart: 'Jul 20, 2025', returnDate: 'Jul 28, 2025',
    flightNum: 'AF 541', duration: '7h 10m', cabin: 'Economy',
    passengers: '1 Adult', amount: '$510', status: 'completed',
  },
  {
    id: 'SKY-27450', airline: '🕊️', airlineBg: '#2a1a3d', airlineName: 'Qatar Airways',
    from: 'Lagos', fromCode: 'LOS', to: 'Doha', toCode: 'DOH',
    depart: 'Dec 20, 2025', returnDate: 'Jan 3, 2026',
    flightNum: 'QR 1433', duration: '5h 50m', cabin: 'Premium Economy',
    passengers: '2 Adults · 1 Child', amount: '$1,620', status: 'upcoming',
  },
  {
    id: 'SKY-26991', airline: '🌍', airlineBg: '#1a2a10', airlineName: 'Ethiopian Airlines',
    from: 'Lagos', fromCode: 'LOS', to: 'Nairobi', toCode: 'NBO',
    depart: 'May 10, 2025', returnDate: 'May 14, 2025',
    flightNum: 'ET 313', duration: '3h 40m', cabin: 'Economy',
    passengers: '1 Adult', amount: '$220', status: 'cancelled',
  },
];

const TABS = ['All Trips', 'Upcoming', 'Completed', 'Cancelled'];

const SUMMARY = [
  { icon: '✈️', num: '5',      label: 'Total Trips'       },
  { icon: '🌍', num: '8',      label: 'Countries Visited'  },
  { icon: '📍', num: '14,280', label: 'Miles Flown'         },
  { icon: '⭐', num: '1,240',  label: 'SkyPoints Earned'    },
];

export default function MyTripsPage() {
  const [activeTab, setTab] = useState('All Trips');

  const filtered = TRIPS.filter((t) => {
    if (activeTab === 'All Trips')  return true;
    if (activeTab === 'Upcoming')   return t.status === 'upcoming';
    if (activeTab === 'Completed')  return t.status === 'completed';
    if (activeTab === 'Cancelled')  return t.status === 'cancelled';
    return true;
  });

  const badgeClass = (status) => ({
    upcoming:  styles.badgeUpcoming,
    completed: styles.badgeCompleted,
    cancelled: styles.badgeCancelled,
    pending:   styles.badgePending,
  }[status]);

  const badgeLabel = (status) => ({
    upcoming:  '● Upcoming',
    completed: '✓ Completed',
    cancelled: '✕ Cancelled',
    pending:   '○ Pending',
  }[status]);

  const upcomingActions = (t) => (
    <>
      <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>View E-Ticket</button>
      <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}>Manage</button>
      <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}>Check In</button>
    </>
  );

  const completedActions = () => (
    <>
      <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>Download Receipt</button>
      <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}>Book Again</button>
    </>
  );

  const cancelledActions = () => (
    <>
      <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}>View Details</button>
      <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}>Book Again</button>
    </>
  );

  return (
    <>
      <Head>
        <title>My Trips — SnapTrip</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        <Navbar />

        {/* TOP BAND */}
        <div className={styles.topBand}>
          <div className={styles.topBandInner}>
            <div>
              <div className={styles.greeting}>Welcome back, Traveller</div>
              <h1 className={styles.pageTitle}>My <em>Trips</em></h1>
            </div>
            <Link href="/flights" className={styles.btnGold}>+ Book New Flight</Link>
          </div>
        </div>

        {/* SUMMARY ROW */}
        <div className={styles.summaryRow}>
          {SUMMARY.map((s) => (
            <div key={s.label} className={styles.summaryCard}>
              <div className={styles.summaryIcon}>{s.icon}</div>
              <div>
                <div className={styles.summaryNum}>{s.num}</div>
                <div className={styles.summaryLabel}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t}
              className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
              {t === 'Upcoming' && <span style={{ marginLeft: 6, fontSize: '0.68rem', background: 'rgba(74,144,217,0.15)', color: '#7ab8f5', padding: '1px 7px', borderRadius: '10px' }}>2</span>}
            </button>
          ))}
        </div>

        {/* TRIP LIST */}
        <div className={styles.content}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>✈️</div>
              <div className={styles.emptyTitle}>No trips here yet</div>
              <p className={styles.emptyText}>Ready for your next adventure? Search flights and start your journey.</p>
              <Link href="/flights" className={styles.btnGold}>Search Flights</Link>
            </div>
          ) : (
            filtered.map((t) => (
              <div key={t.id} className={styles.tripCard}>
                <div className={styles.tripCardHeader}>
                  <div className={styles.tripAirline} style={{ background: `${t.airlineBg}88` }}>
                    {t.airline}
                  </div>
                  <div className={styles.tripRouteWrap}>
                    <div className={styles.tripRoute}>
                      <span className={styles.tripCity}>{t.from}</span>
                      <span className={styles.tripArrow}>→</span>
                      <span className={styles.tripCity}>{t.to}</span>
                    </div>
                    <div className={styles.tripDate}>{t.depart} – {t.returnDate} · {t.airlineName} · {t.flightNum}</div>
                  </div>
                  <div className={styles.tripRef}>{t.id}</div>
                  <span className={`${styles.badge} ${badgeClass(t.status)}`}>
                    {badgeLabel(t.status)}
                  </span>
                </div>

                <div className={styles.tripCardDetails}>
                  {[
                    { label: 'Cabin',      value: t.cabin      },
                    { label: 'Passengers', value: t.passengers  },
                    { label: 'Duration',   value: t.duration    },
                    { label: 'Amount Paid',value: t.amount      },
                  ].map((d) => (
                    <div key={d.label} className={styles.tripDetail}>
                      <span className={styles.tripDetailLabel}>{d.label}</span>
                      <span className={styles.tripDetailValue}>{d.value}</span>
                    </div>
                  ))}
                  <div className={styles.tripActions}>
                    {t.status === 'upcoming'  && upcomingActions(t)}
                    {t.status === 'completed' && completedActions()}
                    {t.status === 'cancelled' && cancelledActions()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

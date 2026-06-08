// pages/track.jsx
// SKYBOUND — Track Flight Page (/track)

import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Track.module.css';

const DEMO_FLIGHT = {
  flightNum: 'BA 083',
  airline: 'British Airways',
  status: 'boarding',
  statusLabel: '● Now Boarding',
  from: 'LOS', fromCity: 'Lagos, Nigeria',
  to: 'LHR',   toCity: 'London, UK',
  departTime: '22:15', arriveTime: '05:45',
  duration: '6h 30m',
  stops: 'Non-stop',
  gate: 'B14',
  terminal: 'International',
  aircraft: 'Boeing 777-300ER',
  seatsFull: '312 / 350',
  scheduledDepart: '22:15',
  actualDepart: '22:35',
  delayMins: 20,
  progress: 62, // % of journey complete
  steps: [
    { icon: '🎫', label: 'Check-In',    time: '18:00', done: true,   active: false },
    { icon: '🔒', label: 'Security',    time: '19:30', done: true,   active: false },
    { icon: '🚪', label: 'Boarding',    time: '21:45', done: false,  active: true  },
    { icon: '✈️', label: 'Departed',    time: '22:35', done: false,  active: false },
    { icon: '🛬', label: 'Arrived',     time: '05:45', done: false,  active: false },
  ],
  updates: [
    { text: 'Gate B14 is now open. Boarding will commence in 10 minutes.',          time: '21:35', color: '#4a90d9' },
    { text: 'Flight BA 083 delayed by 20 minutes due to late aircraft arrival.',      time: '20:58', color: '#f59e0b' },
    { text: 'Check-in closed. All passengers please proceed to security.',            time: '20:00', color: '#22c55e' },
    { text: 'Online check-in is now open for flight BA 083 LOS → LHR.',              time: '08:00', color: '#c9a84c' },
  ],
};

const RECENT_FLIGHTS = ['BA 083', 'EK 782', 'QR 1433', 'AF 541', 'ET 313'];

export default function TrackPage() {
  const [searchMode, setMode]     = useState('flight');
  const [flightInput, setFlight]  = useState('');
  const [routeFrom, setFrom]      = useState('');
  const [routeTo, setTo]          = useState('');
  const [trackDate, setDate]      = useState('');
  const [result, setResult]       = useState(null);

  const handleSearch = () => {
    // In production connect to AviationStack / Amadeus API
    // For demo, show mock result for any input
    setResult(DEMO_FLIGHT);
  };

  const statusClass = (s) => ({
    ontime:    styles.statusOnTime,
    delayed:   styles.statusDelayed,
    cancelled: styles.statusCancelled,
    boarding:  styles.statusBoarding,
  }[s] || styles.statusOnTime);

  return (
    <>
      <Head>
        <title>Track Flight — SnapTrip</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        <Navbar />

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Track Your <em>Flight</em></h1>
            <p className={styles.heroSub}>
              Live status, gate info, boarding times and delay alerts — all in real time.
            </p>

            <div className={styles.searchBox}>
              <div className={styles.searchTabs}>
                {[['flight','By Flight Number'],['route','By Route']].map(([id, label]) => (
                  <button key={id}
                    className={`${styles.searchTab} ${searchMode===id ? styles.searchTabActive : ''}`}
                    onClick={() => setMode(id)}>
                    {label}
                  </button>
                ))}
              </div>

              <div className={styles.searchRow}>
                {searchMode === 'flight' ? (
                  <>
                    <div className={styles.searchField}>
                      <label className={styles.searchLabel}>Flight Number</label>
                      <input className={styles.searchInput} placeholder="e.g. BA 083" value={flightInput}
                        onChange={(e) => setFlight(e.target.value)} />
                    </div>
                    <div className={styles.searchField}>
                      <label className={styles.searchLabel}>Date</label>
                      <input className={styles.searchInput} type="date" value={trackDate}
                        onChange={(e) => setDate(e.target.value)} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.searchField}>
                      <label className={styles.searchLabel}>From</label>
                      <input className={styles.searchInput} placeholder="Lagos (LOS)" value={routeFrom}
                        onChange={(e) => setFrom(e.target.value)} />
                    </div>
                    <div className={styles.searchField}>
                      <label className={styles.searchLabel}>To</label>
                      <input className={styles.searchInput} placeholder="London (LHR)" value={routeTo}
                        onChange={(e) => setTo(e.target.value)} />
                    </div>
                  </>
                )}
                <button className={styles.searchBtn} onClick={handleSearch}>Track →</button>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.body}>
          {!result ? (
            /* EMPTY STATE */
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📡</div>
              <div className={styles.emptyTitle}>Enter a flight to track</div>
              <p className={styles.emptyText}>
                Search by flight number (e.g. BA 083) or by route to get live departure boards,
                gate information, and real-time delay updates.
              </p>
              <div className={styles.recentSearches}>
                <div className={styles.recentTitle}>Recent Searches</div>
                <div className={styles.recentTags}>
                  {RECENT_FLIGHTS.map((f) => (
                    <span key={f} className={styles.recentTag} onClick={() => { setFlight(f); setResult(DEMO_FLIGHT); }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* STATUS CARD */}
              <div className={styles.statusCard}>
                <div className={styles.statusCardTop}>
                  <div>
                    <div className={styles.flightIdRow}>
                      <span className={styles.flightNum}>{result.flightNum}</span>
                      <span className={styles.airlineTag}>{result.airline}</span>
                    </div>
                    <div className={styles.routeVisual}>
                      <div className={styles.routeAirport}>
                        <div className={styles.routeCode}>{result.from}</div>
                        <div className={styles.routeCity}>{result.fromCity}</div>
                        <div className={styles.routeTime}>{result.departTime}</div>
                      </div>
                      <div className={styles.routeLine}>
                        <div className={styles.routeLineBar}>
                          <span className={styles.planeIcon}>✈</span>
                        </div>
                        <div className={styles.routeDuration}>{result.duration}</div>
                        <div className={styles.routeStops}>{result.stops}</div>
                      </div>
                      <div className={styles.routeAirport} style={{ textAlign: 'right' }}>
                        <div className={styles.routeCode}>{result.to}</div>
                        <div className={styles.routeCity}>{result.toCity}</div>
                        <div className={styles.routeTime}>{result.arriveTime}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`${styles.statusBadge} ${statusClass(result.status)}`}>
                      <span className={styles.dot} />
                      {result.status === 'boarding' ? 'Now Boarding' :
                       result.status === 'delayed'  ? `Delayed ${result.delayMins} min` :
                       result.status === 'ontime'   ? 'On Time' : 'Cancelled'}
                    </span>
                  </div>
                </div>

                <div className={styles.infoGrid}>
                  {[
                    { label: 'Gate',        value: result.gate,            sub: `Terminal ${result.terminal}` },
                    { label: 'Aircraft',    value: result.aircraft,        sub: null },
                    { label: 'Scheduled',   value: result.scheduledDepart, sub: 'Departure' },
                    { label: 'Actual',      value: result.actualDepart,    sub: result.delayMins ? `+${result.delayMins} min delay` : 'On time', delayed: !!result.delayMins },
                    { label: 'Occupancy',   value: result.seatsFull,       sub: 'Passengers' },
                  ].map((c) => (
                    <div key={c.label} className={styles.infoCell}>
                      <div className={styles.infoCellLabel}>{c.label}</div>
                      <div className={`${styles.infoCellValue} ${c.delayed ? styles.delayedValue : ''}`}>{c.value}</div>
                      {c.sub && <div className={styles.infoCellSub}>{c.sub}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* PROGRESS TIMELINE */}
              <div className={styles.timeline}>
                <div className={styles.timelineTitle}>Flight Progress</div>
                <div className={styles.timelineSteps}>
                  <div
                    className={styles.timelineProgress}
                    style={{ width: `${result.progress}%` }}
                  />
                  {result.steps.map((s) => (
                    <div key={s.label} className={styles.timelineStep}>
                      <div className={`${styles.stepDot} ${s.done ? styles.stepDotDone : s.active ? styles.stepDotActive : styles.stepDotPending}`}>
                        {s.icon}
                      </div>
                      <div className={`${styles.stepLabel} ${s.active ? styles.stepLabelActive : ''}`}>{s.label}</div>
                      <div className={styles.stepTime}>{s.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE UPDATES */}
              <div className={styles.updatesCard}>
                <div className={styles.updatesTitle}>
                  Live Updates
                  <span className={styles.liveBadge}>
                    <span className={styles.dot} />
                    Live
                  </span>
                </div>
                {result.updates.map((u, i) => (
                  <div key={i} className={styles.updateItem}>
                    <div className={styles.updateDot} style={{ background: u.color }} />
                    <div>
                      <div className={styles.updateText}>{u.text}</div>
                      <div className={styles.updateTime}>{u.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

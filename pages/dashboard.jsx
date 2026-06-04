// pages/admin/dashboard.jsx
// ──────────────────────────────────────────────────────────────
// SKYBOUND — Admin Dashboard
// Next.js + CSS Modules  |  No external UI library
// Route: /admin/dashboard  (protect with middleware in production)
// ──────────────────────────────────────────────────────────────

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/AdminDashboard.module.css';

// ── STATIC DATA ───────────────────────────────────────────────

const kpiData = [
  { label: 'Total Revenue',    value: '$2.41M', change: '+12.4%', up: true,  icon: '💰' },
  { label: 'Total Bookings',   value: '18,294', change: '+8.1%',  up: true,  icon: '✈️' },
  { label: 'Active Users',     value: '94,520', change: '+5.7%',  up: true,  icon: '👥' },
  { label: 'Cancellation Rate',value: '2.8%',   change: '-0.4%',  up: false, icon: '⚠️' },
];

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const revenueData = [38, 52, 45, 61, 55, 72, 80, 68, 74, 90, 85, 98]; // % of max

const cabinData = [
  { label: 'Economy',         pct: 58, color: '#4a90d9' },
  { label: 'Premium Economy', pct: 18, color: '#c9a84c' },
  { label: 'Business',        pct: 17, color: '#22c55e' },
  { label: 'First Class',     pct: 7,  color: '#ef4444' },
];

const recentBookings = [
  { id: 'SKY-29401', route: 'LOS → LHR', passenger: 'Ada Okonkwo',     cabin: 'Business',  amount: '$1,240', status: 'confirmed' },
  { id: 'SKY-29398', route: 'ABV → DXB', passenger: 'Chidi Nwosu',      cabin: 'Economy',   amount: '$390',   status: 'confirmed' },
  { id: 'SKY-29391', route: 'NBO → CDG', passenger: 'Fatima Al-Hassan', cabin: 'Premium',   amount: '$820',   status: 'pending'   },
  { id: 'SKY-29387', route: 'ACC → JFK', passenger: 'Kofi Mensah',      cabin: 'Business',  amount: '$1,540', status: 'confirmed' },
  { id: 'SKY-29380', route: 'DKR → IST', passenger: 'Mariama Diallo',   cabin: 'Economy',   amount: '$460',   status: 'cancelled' },
  { id: 'SKY-29372', route: 'CMN → SIN', passenger: 'Youssef Benali',   cabin: 'First',     amount: '$3,200', status: 'confirmed' },
  { id: 'SKY-29368', route: 'LOS → CDG', passenger: 'Ngozi Adeyemi',    cabin: 'Economy',   amount: '$510',   status: 'pending'   },
];

const activityFeed = [
  { text: <><strong>New booking</strong> SKY-29401 — Lagos to London, Business Class</>,  time: '2 min ago',  color: '#22c55e' },
  { text: <><strong>Payment failed</strong> for booking SKY-29374 — retrying</>,          time: '9 min ago',  color: '#ef4444' },
  { text: <><strong>Flight delayed</strong> EK 102 DXB→LOS by 45 minutes</>,              time: '18 min ago', color: '#f59e0b' },
  { text: <><strong>User registered</strong> Amara Sesay (amara@example.com)</>,           time: '31 min ago', color: '#4a90d9' },
  { text: <><strong>Refund processed</strong> $390 to Chukwuemeka Eze</>,                  time: '52 min ago', color: '#a855f7' },
  { text: <><strong>Promo code SKYJAN25</strong> redeemed 47 times today</>,               time: '1h ago',     color: '#c9a84c' },
  { text: <><strong>Admin login</strong> from 197.149.88.xx (Lagos, NG)</>,                time: '2h ago',     color: '#6b7c9b' },
];

const navGroups = [
  {
    label: 'Overview',
    items: [
      { icon: '📊', label: 'Dashboard',    id: 'dashboard',    badge: null },
      { icon: '📈', label: 'Analytics',    id: 'analytics',    badge: null },
    ],
  },
  {
    label: 'Operations',
    items: [
      { icon: '🎫', label: 'Bookings',     id: 'bookings',     badge: '12' },
      { icon: '✈️', label: 'Flights',      id: 'flights',      badge: null },
      { icon: '👥', label: 'Users',        id: 'users',        badge: null },
      { icon: '🏷️', label: 'Promotions',   id: 'promotions',   badge: '3'  },
    ],
  },
  {
    label: 'Finance',
    items: [
      { icon: '💳', label: 'Transactions', id: 'transactions', badge: null },
      { icon: '💰', label: 'Revenue',      id: 'revenue',      badge: null },
      { icon: '🧾', label: 'Refunds',      id: 'refunds',      badge: '5'  },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: '🛎️', label: 'Support',      id: 'support',      badge: '8'  },
      { icon: '⚙️', label: 'Settings',     id: 'settings',     badge: null },
      { icon: '🔐', label: 'Security',     id: 'security',     badge: null },
    ],
  },
];

// ── STATUS BADGE ──────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    confirmed: { cls: styles.badgeSuccess, dot: '●', label: 'Confirmed' },
    pending:   { cls: styles.badgeWarning, dot: '●', label: 'Pending'   },
    cancelled: { cls: styles.badgeDanger,  dot: '●', label: 'Cancelled' },
    refunded:  { cls: styles.badgeInfo,    dot: '●', label: 'Refunded'  },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`${styles.badge} ${s.cls}`}>
      {s.dot} {s.label}
    </span>
  );
}

// ── DONUT CHART (SVG) ─────────────────────────────────────────

function DonutChart({ data }) {
  const size = 120;
  const cx = 60, cy = 60;
  const r = 44, stroke = 14;
  const circumference = 2 * Math.PI * r;

  let cumulative = 0;
  const segments = data.map((d) => {
    const dash   = (d.pct / 100) * circumference;
    const gap    = circumference - dash;
    const offset = circumference - (cumulative / 100) * circumference;
    cumulative  += d.pct;
    return { ...d, dash, gap, offset };
  });

  return (
    <div className={styles.donutWrap}>
      <svg className={styles.donut} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((s) => (
          <circle
            key={s.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={s.offset}
            strokeLinecap="butt"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        ))}
        <text x={cx} y={cy - 6}  textAnchor="middle" fill="#f0f2f5" fontSize="11" fontFamily="DM Mono, monospace">100%</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b7c9b" fontSize="7"  fontFamily="DM Sans, sans-serif">Sold</text>
      </svg>

      <div className={styles.donutLegend}>
        {data.map((d) => (
          <div key={d.label} className={styles.donutLegendItem}>
            <span className={styles.donutLegendLabel}>
              <span className={styles.donutDot} style={{ background: d.color }} />
              {d.label}
            </span>
            <span className={styles.donutValue}>{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MINI BAR CHART ────────────────────────────────────────────

function BarChart({ data, labels }) {
  const max = Math.max(...data);
  const colors = ['#4a90d9','#c9a84c','#22c55e'];
  return (
    <div className={styles.barChart}>
      {data.map((v, i) => (
        <div key={labels[i]} className={styles.barWrap}>
          <div
            className={styles.bar}
            style={{
              height: `${(v / max) * 100}%`,
              background: i === data.indexOf(max)
                ? 'linear-gradient(180deg, #c9a84c, #e8c97e)'
                : `rgba(74, 144, 217, ${0.35 + (v / max) * 0.45})`,
            }}
            title={`${labels[i]}: ${v}%`}
          />
          <span className={styles.barLabel}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <>
      <Head>
        <title>Admin Dashboard — Skybound</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.shell}>

        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>

          <Link href="/" className={styles.sidebarLogo}>
            <span className={styles.sidebarLogoIcon}>✦</span>
            Sky<span>bound</span>
            <span className={styles.sidebarBadge}>Admin</span>
          </Link>

          <nav className={styles.sidebarNav}>
            {navGroups.map((group) => (
              <div key={group.label} className={styles.navGroup}>
                <div className={styles.navGroupLabel}>{group.label}</div>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.navItem} ${activeNav === item.id ? styles.navItemActive : ''}`}
                    onClick={() => setActiveNav(item.id)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    {item.label}
                    {item.badge && (
                      <span className={styles.navBadge}>{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className={styles.sidebarProfile}>
            <div className={styles.profileAvatar}>SA</div>
            <div className={styles.profileInfo}>
              <div className={styles.profileName}>Super Admin</div>
              <div className={styles.profileRole}>Administrator</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className={styles.main}>

          {/* TOPBAR */}
          <div className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <h1>Dashboard</h1>
              <p>Tuesday, 19 May 2025 · Live data</p>
            </div>

            <div className={styles.topbarRight}>
              <div className={styles.topbarSearch}>
                <span>🔍</span>
                <input
                  className={styles.topbarSearchInput}
                  placeholder="Search bookings, users…"
                  type="text"
                />
              </div>
              <div className={styles.topbarIcon}>
                🔔
                <span className={styles.topbarNotifDot} />
              </div>
              <div className={styles.topbarIcon}>⚙️</div>
            </div>
          </div>

          {/* CONTENT */}
          <div className={styles.content}>

            {/* KPI CARDS */}
            <div className={styles.kpiGrid}>
              {kpiData.map((k) => (
                <div key={k.label} className={styles.kpiCard}>
                  <div className={styles.kpiHeader}>
                    <span className={styles.kpiLabel}>{k.label}</span>
                    <span className={styles.kpiIcon}>{k.icon}</span>
                  </div>
                  <div className={styles.kpiValue}>{k.value}</div>
                  <div className={styles.kpiChange}>
                    <span className={k.up ? styles.kpiChangeUp : styles.kpiChangeDown}>
                      {k.up ? '↑' : '↓'} {k.change}
                    </span>
                    &nbsp;vs last month
                  </div>
                </div>
              ))}
            </div>

            {/* CHARTS ROW */}
            <div className={styles.chartsRow}>

              {/* Revenue bar chart */}
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.panelTitle}>Monthly Revenue</div>
                    <div className={styles.panelSub}>2025 · USD</div>
                  </div>
                  <button className={styles.panelAction}>Export ↓</button>
                </div>
                <div className={styles.panelBody}>
                  <BarChart data={revenueData} labels={months} />
                </div>
              </div>

              {/* Cabin breakdown donut */}
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.panelTitle}>Cabin Class Split</div>
                    <div className={styles.panelSub}>All bookings · 2025</div>
                  </div>
                </div>
                <div className={styles.panelBody}>
                  <DonutChart data={cabinData} />
                </div>
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className={styles.bottomRow}>

              {/* Recent Bookings */}
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.panelTitle}>Recent Bookings</div>
                    <div className={styles.panelSub}>Latest 7 transactions</div>
                  </div>
                  <button className={styles.panelAction}>View all →</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className={styles.table}>
                    <thead className={styles.tableHead}>
                      <tr>
                        <th>Booking ID</th>
                        <th>Route</th>
                        <th>Passenger</th>
                        <th>Cabin</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((b) => (
                        <tr key={b.id} className={styles.tableRow}>
                          <td className={styles.tableBookingId}>{b.id}</td>
                          <td className={styles.tableRoute}>{b.route}</td>
                          <td className={styles.tablePassenger}>{b.passenger}</td>
                          <td>{b.cabin}</td>
                          <td className={styles.tableAmount}>{b.amount}</td>
                          <td><StatusBadge status={b.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activity Feed */}
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <div className={styles.panelTitle}>Live Activity</div>
                    <div className={styles.panelSub}>System events</div>
                  </div>
                  <button className={styles.panelAction}>Clear</button>
                </div>
                <div className={styles.panelBody}>
                  <div className={styles.activityFeed}>
                    {activityFeed.map((a, i) => (
                      <div key={i} className={styles.activityItem}>
                        <div
                          className={styles.activityDot}
                          style={{ background: a.color }}
                        />
                        <div className={styles.activityContent}>
                          <div className={styles.activityText}>{a.text}</div>
                          <div className={styles.activityTime}>{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}

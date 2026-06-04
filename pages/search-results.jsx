// pages/search-results.jsx
// SKYBOUND — Search Results Page (/search-results)

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/SearchResults.module.css';

const ALL_FLIGHTS = [
  { id:1, emoji:'✈️', bg:'#1a3a5c', airline:'British Airways', num:'BA 083', from:'LOS', fromCity:'Lagos',   to:'LHR', toCity:'London',   dep:'22:15', arr:'05:45+1', dur:'6h 30m', stops:0, cabin:'Economy',  bag:'23kg', refund:'Free cancel',   price:520  },
  { id:2, emoji:'🌟', bg:'#8b0000', airline:'Emirates',        num:'EK 782', from:'LOS', fromCity:'Lagos',   to:'LHR', toCity:'London',   dep:'23:40', arr:'14:20+1', dur:'9h 40m', stops:1, cabin:'Economy',  bag:'30kg', refund:'Flexible',       price:480  },
  { id:3, emoji:'🦅', bg:'#1a3a2c', airline:'Air France',      num:'AF 541', from:'LOS', fromCity:'Lagos',   to:'LHR', toCity:'London',   dep:'11:00', arr:'21:30',   dur:'7h 30m', stops:1, cabin:'Business', bag:'32kg', refund:'Non-refundable',  price:1240 },
  { id:4, emoji:'🕊️', bg:'#2a1a3d', airline:'Qatar Airways',   num:'QR 143', from:'LOS', fromCity:'Lagos',   to:'LHR', toCity:'London',   dep:'08:30', arr:'20:55',   dur:'11h 25m',stops:1, cabin:'Economy',  bag:'23kg', refund:'Free cancel',   price:460  },
  { id:5, emoji:'🌍', bg:'#1a2a10', airline:'Ethiopian',        num:'ET 923', from:'LOS', fromCity:'Lagos',   to:'LHR', toCity:'London',   dep:'07:00', arr:'19:45',   dur:'10h 45m',stops:1, cabin:'Premium',  bag:'30kg', refund:'Flexible',       price:640  },
  { id:6, emoji:'🔵', bg:'#0a2a4a', airline:'KLM',             num:'KL 591', from:'LOS', fromCity:'Lagos',   to:'LHR', toCity:'London',   dep:'14:20', arr:'23:50',   dur:'8h 30m', stops:1, cabin:'Economy',  bag:'23kg', refund:'Non-refundable',  price:495  },
  { id:7, emoji:'🌐', bg:'#2a0a2a', airline:'Turkish Airlines', num:'TK 624', from:'LOS', fromCity:'Lagos',   to:'LHR', toCity:'London',   dep:'18:45', arr:'10:20+1', dur:'12h 35m',stops:1, cabin:'Economy',  bag:'23kg', refund:'Flexible',       price:440  },
  { id:8, emoji:'⭐', bg:'#1a1a3a', airline:'Lufthansa',        num:'LH 570', from:'LOS', fromCity:'Lagos',   to:'LHR', toCity:'London',   dep:'06:00', arr:'15:30',   dur:'8h 30m', stops:1, cabin:'Business', bag:'32kg', refund:'Free cancel',   price:1180 },
];

const AIRLINES  = [...new Set(ALL_FLIGHTS.map((f) => f.airline))];
const STOP_OPTS = [{ label: 'Direct only', val: 0 }, { label: '1 Stop', val: 1 }, { label: '2+ Stops', val: 2 }];
const SORT_OPTS = ['Cheapest', 'Fastest', 'Best Value', 'Earliest'];

function stopClass(n) {
  if (n === 0) return { cls: styles.stopDirect, label: 'Direct'       };
  if (n === 1) return { cls: styles.stopOne,    label: '1 Stop'        };
  return           { cls: styles.stopMulti,  label: `${n} Stops`   };
}

export default function SearchResultsPage() {
  const [from,     setFrom]     = useState('Lagos (LOS)');
  const [to,       setTo]       = useState('London (LHR)');
  const [date,     setDate]     = useState('');
  const [pax,      setPax]      = useState('1 Adult');
  const [sort,     setSort]     = useState('Cheapest');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [filterAirlines, setFA] = useState([]);
  const [filterStops,    setFS] = useState([]);

  const toggleArr = (arr, setArr, v) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = ALL_FLIGHTS
    .filter((f) => parseInt(f.price) <= maxPrice)
    .filter((f) => !filterAirlines.length || filterAirlines.includes(f.airline))
    .filter((f) => !filterStops.length    || filterStops.includes(f.stops));

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Cheapest')   return a.price - b.price;
    if (sort === 'Fastest')    return a.dur.localeCompare(b.dur);
    if (sort === 'Earliest')   return a.dep.localeCompare(b.dep);
    if (sort === 'Best Value')  return (a.price / 6.5) - (b.price / 6.5);
    return 0;
  });

  const cheapest = Math.min(...filtered.map((f) => f.price));

  return (
    <>
      <Head>
        <title>Search Results · Lagos → London — Skybound</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        <Navbar />

        {/* STICKY SEARCH BANNER */}
        <div className={styles.searchBanner}>
          <div className={styles.searchBannerInner}>
            <div className={styles.searchRow}>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>From</label>
                <input className={styles.searchInput} value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>To</label>
                <input className={styles.searchInput} value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Date</label>
                <input className={styles.searchInput} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Passengers</label>
                <input className={styles.searchInput} value={pax} onChange={(e) => setPax(e.target.value)} />
              </div>
              <button className={styles.searchBtn}>Update Search</button>
            </div>

            <div className={styles.resultBar}>
              <div className={styles.resultCount}>
                Showing <strong>{sorted.length} flights</strong> · {from.split(' ')[0]} → {to.split(' ')[0]}
                {sort === 'Cheapest' && filtered.length > 0 && (
                  <span style={{ marginLeft: 10, color: 'var(--gold)', fontSize: '0.82rem' }}>
                    · Best price from <strong>${cheapest}</strong>
                  </span>
                )}
              </div>
              <div className={styles.sortRow}>
                {SORT_OPTS.map((s) => (
                  <button key={s}
                    className={`${styles.sortBtn} ${sort === s ? styles.sortBtnActive : ''}`}
                    onClick={() => setSort(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className={styles.body}>

          {/* FILTERS */}
          <aside className={styles.filters}>
            <div className={styles.filterCard}>
              <div className={styles.filterTitle}>Max Price</div>
              <div className={styles.rangeWrap}>
                <input className={styles.rangeSlider} type="range" min={100} max={2000} step={20}
                  value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                <div className={styles.rangeLabels}><span>$100</span><span>${maxPrice.toLocaleString()}</span></div>
              </div>
            </div>

            <div className={styles.filterCard}>
              <div className={styles.filterTitle}>Stops</div>
              <div className={styles.filterGroup}>
                {STOP_OPTS.map((s) => (
                  <label key={s.val} className={`${styles.filterCheck} ${filterStops.includes(s.val) ? styles.filterCheckActive : ''}`}>
                    <input type="checkbox" checked={filterStops.includes(s.val)}
                      onChange={() => toggleArr(filterStops, setFS, s.val)} />
                    {s.label}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterCard}>
              <div className={styles.filterTitle}>Airlines</div>
              <div className={styles.filterGroup}>
                {AIRLINES.map((a) => (
                  <div key={a} className={styles.filterItem}>
                    <label className={`${styles.filterCheck} ${filterAirlines.includes(a) ? styles.filterCheckActive : ''}`}>
                      <input type="checkbox" checked={filterAirlines.includes(a)}
                        onChange={() => toggleArr(filterAirlines, setFA, a)} />
                      {a}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.filterCard}>
              <div className={styles.filterTitle}>Cabin Class</div>
              <div className={styles.filterGroup}>
                {['Economy','Premium Economy','Business','First Class'].map((c) => (
                  <label key={c} className={styles.filterCheck}>
                    <input type="checkbox" /> {c}
                  </label>
                ))}
              </div>
            </div>

            <button className={styles.clearBtn} onClick={() => { setFA([]); setFS([]); setMaxPrice(2000); }}>
              Clear All Filters
            </button>
          </aside>

          {/* RESULTS */}
          <section className={styles.results}>
            {sorted.length === 0 ? (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>✈️</div>
                <div className={styles.noResultsTitle}>No flights found</div>
                <p className={styles.noResultsText}>Try adjusting your filters or search for different dates.</p>
              </div>
            ) : (
              <>
                {sorted.map((f, i) => {
                  const stop = stopClass(f.stops);
                  const isBest = f.price === cheapest;
                  return (
                    <div key={f.id} className={`${styles.flightCard} ${isBest ? styles.bestValueCard : ''}`}>
                      {isBest && <span className={styles.bestValueBadge}>★ Best Value</span>}

                      <div className={styles.airlineLogo} style={{ background: `${f.bg}88` }}>
                        {f.emoji}
                      </div>

                      <div className={styles.flightMain}>
                        <div className={styles.timeCol}>
                          <div className={styles.timeMain}>{f.dep}</div>
                          <div className={styles.timeCode}>{f.from}</div>
                          <div className={styles.timeCity}>{f.fromCity}</div>
                        </div>

                        <div className={styles.flightMid}>
                          <div className={styles.flightMidBar} />
                          <div className={styles.flightDuration}>{f.dur}</div>
                          <span className={`${styles.stopBadge} ${stop.cls}`}>{stop.label}</span>
                        </div>

                        <div className={styles.timeCol}>
                          <div className={styles.timeMain}>{f.arr}</div>
                          <div className={styles.timeCode}>{f.to}</div>
                          <div className={styles.timeCity}>{f.toCity}</div>
                        </div>
                      </div>

                      <div className={styles.flightMeta}>
                        <div className={styles.flightMetaItem}>{f.airline}</div>
                        <div className={styles.flightMetaItem}>{f.num}</div>
                        <div className={styles.flightMetaItem}>{f.cabin}</div>
                        <div className={styles.flightMetaItem}>🧳 {f.bag}</div>
                        <div className={styles.flightRefund}>✓ {f.refund}</div>
                      </div>

                      <div className={styles.priceCol}>
                        <div className={styles.priceMain}>${f.price}</div>
                        <div className={styles.priceSub}>per person</div>
                        <Link href="/flight-details" className={styles.selectBtn}>Select →</Link>
                      </div>
                    </div>
                  );
                })}

                <button className={styles.loadMore}>Load More Flights ↓</button>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

// pages/flights.jsx
// SKYBOUND — Flights Search Page (/flights)

import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Flights.module.css';

const MOCK_FLIGHTS = [
  { id: 1, airline: '✈️', airlineName: 'British Airways', airlineBg: '#1a3a5c', from: 'LOS', fromCity: 'Lagos', to: 'LHR', toCity: 'London', depart: '22:15', arrive: '05:45+1', duration: '6h 30m', stops: 'Direct', stopClass: true, class: 'Economy', baggage: '23kg included', refund: 'Free cancellation', price: '$520' },
  { id: 2, airline: '🌟', airlineName: 'Emirates',       airlineBg: '#8b0000', from: 'LOS', fromCity: 'Lagos', to: 'LHR', toCity: 'London', depart: '23:40', arrive: '14:20+1', duration: '9h 40m', stops: '1 Stop · DXB', stopClass: false, class: 'Economy', baggage: '30kg included', refund: 'Flexible',        price: '$480' },
  { id: 3, airline: '🦅', airlineName: 'Air France',     airlineBg: '#1a3a2c', from: 'LOS', fromCity: 'Lagos', to: 'LHR', toCity: 'London', depart: '11:00', arrive: '21:30',   duration: '7h 30m', stops: '1 Stop · CDG', stopClass: false, class: 'Business', baggage: '32kg included', refund: 'Non-refundable', price: '$1,240' },
  { id: 4, airline: '🕊️', airlineName: 'Qatar Airways',  airlineBg: '#2a1a3d', from: 'LOS', fromCity: 'Lagos', to: 'LHR', toCity: 'London', depart: '08:30', arrive: '20:55',   duration: '11h 25m', stops: '1 Stop · DOH', stopClass: false, class: 'Economy', baggage: '23kg included', refund: 'Free cancellation', price: '$460' },
  { id: 5, airline: '🌍', airlineName: 'Ethiopian',      airlineBg: '#1a2a10', from: 'LOS', fromCity: 'Lagos', to: 'LHR', toCity: 'London', depart: '07:00', arrive: '19:45',   duration: '10h 45m', stops: '1 Stop · ADD', stopClass: false, class: 'Premium',  baggage: '30kg included', refund: 'Flexible',        price: '$640' },
];

const AIRLINES  = ['British Airways', 'Emirates', 'Air France', 'Qatar Airways', 'Ethiopian'];
const STOP_OPTS = ['Direct', '1 Stop', '2+ Stops'];

export default function FlightsPage() {
  const [tripType, setTripType]     = useState('roundtrip');
  const [sort, setSort]             = useState('Cheapest');
  const [maxPrice, setMaxPrice]     = useState(2000);
  const [selectedAirlines, setAirlines] = useState([]);
  const [selectedStops, setStops]   = useState([]);

  const toggleArr = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const filtered = MOCK_FLIGHTS
    .filter((f) => maxPrice >= 2000 || parseInt(f.price.replace(/\D/g,'')) <= maxPrice)
    .filter((f) => !selectedAirlines.length || selectedAirlines.includes(f.airlineName))
    .filter((f) => !selectedStops.length    || selectedStops.some((s) => s === 'Direct' ? f.stopClass : !f.stopClass));

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Cheapest') return parseInt(a.price.replace(/\D/g,'')) - parseInt(b.price.replace(/\D/g,''));
    if (sort === 'Fastest')  return a.duration.localeCompare(b.duration);
    return 0;
  });

  return (
    <>
      <Head>
        <title>Search Flights — Skybound</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        <Navbar />

        {/* HERO SEARCH */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Find Your <em>Perfect Flight</em></h1>

            <div className={styles.tabs}>
              {['oneway','roundtrip','multi'].map((t) => (
                <button key={t} className={`${styles.tab} ${tripType===t ? styles.tabActive : ''}`} onClick={() => setTripType(t)}>
                  {t === 'oneway' ? 'One Way' : t === 'roundtrip' ? 'Round Trip' : 'Multi-City'}
                </button>
              ))}
            </div>

            <div className={styles.searchBar}>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>From</label>
                <input className={styles.searchInput} defaultValue="Lagos (LOS)" type="text" />
              </div>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>To</label>
                <input className={styles.searchInput} placeholder="Destination" type="text" />
              </div>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Date</label>
                <input className={styles.searchInput} type="date" />
              </div>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Passengers · Class</label>
                <input className={styles.searchInput} defaultValue="1 Adult · Economy" readOnly />
              </div>
              <button className={styles.searchBtn}>Search Flights</button>
            </div>
          </div>
        </section>

        {/* BODY */}
        <div className={styles.body}>

          {/* FILTERS */}
          <aside className={styles.filters}>
            <div className={styles.filterCard}>
              <div className={styles.filterTitle}>Price Range</div>
              <div className={styles.rangeWrap}>
                <input className={styles.rangeSlider} type="range" min={100} max={2000} step={50}
                  value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                <div className={styles.rangeLabels}><span>$100</span><span>${maxPrice.toLocaleString()}</span></div>
              </div>
            </div>

            <div className={styles.filterCard}>
              <div className={styles.filterTitle}>Stops</div>
              <div className={styles.filterGroup}>
                {STOP_OPTS.map((s) => (
                  <label key={s} className={`${styles.filterCheckbox} ${selectedStops.includes(s) ? styles.checked : ''}`}>
                    <input type="checkbox" checked={selectedStops.includes(s)} onChange={() => toggleArr(selectedStops, setStops, s)} />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterCard}>
              <div className={styles.filterTitle}>Airlines</div>
              <div className={styles.filterGroup}>
                {AIRLINES.map((a) => (
                  <div key={a} className={styles.filterItem}>
                    <label className={`${styles.filterCheckbox} ${selectedAirlines.includes(a) ? styles.checked : ''}`}>
                      <input type="checkbox" checked={selectedAirlines.includes(a)} onChange={() => toggleArr(selectedAirlines, setAirlines, a)} />
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
                  <label key={c} className={styles.filterCheckbox}>
                    <input type="checkbox" /> {c}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* RESULTS */}
          <section className={styles.results}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsCount}>
                Showing <strong>{sorted.length} flights</strong> · Lagos → London
              </div>
              <div className={styles.sortRow}>
                {['Cheapest','Fastest','Best Value','Earliest'].map((s) => (
                  <button key={s} className={`${styles.sortBtn} ${sort===s ? styles.sortBtnActive : ''}`} onClick={() => setSort(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {sorted.map((f) => (
              <div key={f.id} className={styles.flightCard}>
                <div className={styles.airlineLogo} style={{ background: `${f.airlineBg}88` }}>
                  {f.airline}
                </div>

                <div className={styles.flightInfo}>
                  <div className={styles.timeBlock}>
                    <div className={styles.timeMain}>{f.depart}</div>
                    <div className={styles.timeCode}>{f.from}</div>
                  </div>

                  <div className={styles.flightMiddle}>
                    <div className={styles.flightLine} />
                    <div className={styles.flightDuration}>{f.duration}</div>
                    <div className={`${styles.flightStops} ${f.stopClass ? styles.flightStopsDirect : ''}`}>
                      {f.stops}
                    </div>
                  </div>

                  <div className={styles.timeBlock}>
                    <div className={styles.timeMain}>{f.arrive}</div>
                    <div className={styles.timeCode}>{f.to}</div>
                  </div>
                </div>

                <div className={styles.flightMeta}>
                  <div className={styles.flightClass}>{f.class}</div>
                  <div className={styles.flightBaggage}>🧳 {f.baggage}</div>
                  <div className={styles.flightRefund}>✓ {f.refund}</div>
                </div>

                <div className={styles.priceBlock}>
                  <div className={styles.priceAmount}>{f.price}</div>
                  <div className={styles.pricePer}>per person</div>
                  <button className={styles.selectBtn}>Select →</button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

// pages/flight-details.jsx
// SKYBOUND — Flight Details Page (/flight-details)

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/FlightDetails.module.css';

const FLIGHT = {
  flightNum: 'BA 083',
  airline: 'British Airways',
  airlineEmoji: '✈️',
  airlineBg: '#1a3a5c',
  from: 'LOS', fromCity: 'Lagos, Nigeria', fromTerminal: 'Terminal 1, Gate 12',
  to: 'LHR',   toCity: 'London Heathrow, UK', toTerminal: 'Terminal 5, Gate B22',
  depart: '22:15', arrive: '05:45',
  date: 'Tuesday, Nov 12, 2025',
  duration: '6h 30m', stops: 'Non-stop',
  aircraft: 'Boeing 777-300ER',
  cabin: 'Business Class',
  price: '$1,240',
  taxes: '$186',
  fees: '$24',
  total: '$1,450',
  fare: {
    cancellation: 'Free cancellation up to 24h before',
    changes: 'Free date changes',
    refund: 'Full refund eligible',
    miles: 'Earn 6,200 Avios miles',
  },
  baggage: [
    { icon: '🎒', label: 'Carry-On',  value: '1 × 12kg',  sub: 'Included'         },
    { icon: '🧳', label: 'Checked',   value: '2 × 32kg',  sub: 'Included'         },
    { icon: '💼', label: 'Personal',  value: '1 item',    sub: 'Under-seat bag'   },
  ],
  amenities: [
    { icon: '🍽️',  label: 'Meal Service',      good: true  },
    { icon: '🛏️',  label: 'Lie-flat Bed',       good: true  },
    { icon: '📺',  label: 'In-flight Entertainment', good: true },
    { icon: '🔌',  label: 'Power Outlets',      good: true  },
    { icon: '📶',  label: 'Wi-Fi (paid)',        good: false },
    { icon: '🥂',  label: 'Premium Lounge',      good: true  },
    { icon: '🚿',  label: 'Onboard Shower',      good: true  },
    { icon: '🎧',  label: 'Noise-Cancel Headset',good: true  },
  ],
};

export default function FlightDetailsPage() {
  const [selectedFare, setFare] = useState('business');

  const fares = [
    { id: 'economy',  label: 'Economy',         price: '$520',  perks: ['1 carry-on', '23kg checked', 'Meal included', 'Non-refundable'] },
    { id: 'premium',  label: 'Premium Economy', price: '$840',  perks: ['2 carry-on', '30kg checked', 'Meal + drinks', 'Free changes']   },
    { id: 'business', label: 'Business Class',  price: '$1,240', perks: ['Lie-flat bed', '2×32kg checked', 'Premium dining', 'Free cancel'] },
    { id: 'first',    label: 'First Class',     price: '$3,100', perks: ['Private suite', '3×40kg checked', 'Chef-curated meals', 'Limo transfer'] },
  ];

  return (
    <>
      <Head>
        <title>Flight Details — BA 083 LOS → LHR — Skybound</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        <Navbar />

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> ›
              <Link href="/flights">Flights</Link> ›
              <span>BA 083 · Lagos → London</span>
            </div>

            <div className={styles.heroTop}>
              <div className={styles.heroLeft}>
                <div className={styles.airlineRow}>
                  <div className={styles.airlineLogo} style={{ background: `${FLIGHT.airlineBg}88` }}>
                    {FLIGHT.airlineEmoji}
                  </div>
                  <span className={styles.airlineName}>{FLIGHT.airline}</span>
                  <span className={styles.flightNumber}>{FLIGHT.flightNum}</span>
                </div>

                <div className={styles.routeRow}>
                  <span className={styles.routeCity}>{FLIGHT.from}</span>
                  <span className={styles.routeArrow}>→</span>
                  <span className={styles.routeCity}>{FLIGHT.to}</span>
                </div>

                <div className={styles.routeMeta}>
                  {[
                    { label: 'Date',     value: FLIGHT.date      },
                    { label: 'Duration', value: FLIGHT.duration  },
                    { label: 'Stops',    value: FLIGHT.stops     },
                    { label: 'Aircraft', value: FLIGHT.aircraft  },
                  ].map((m) => (
                    <div key={m.label} className={styles.routeMetaItem}>
                      <strong>{m.value}</strong> · {m.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.heroRight}>
                <div className={styles.priceLabel}>From</div>
                <div className={styles.priceAmount}>$520</div>
                <div className={styles.pricePer}>per person · Economy</div>
                <Link href="/booking" className={styles.btnBook}>Book Now →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* BODY */}
        <div className={styles.body}>
          <div>
            {/* ITINERARY */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Flight Itinerary</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{FLIGHT.date}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.itinerary}>
                  <div className={styles.itin}>
                    <div className={styles.itinLine}>
                      <div className={`${styles.itinDot} ${styles.itinDotFilled}`} />
                      <div className={styles.itinStem} />
                    </div>
                    <div className={styles.itinContent}>
                      <div className={styles.itinTime}>{FLIGHT.depart}</div>
                      <div className={styles.itinCode}>{FLIGHT.from}</div>
                      <div className={styles.itinCity}>{FLIGHT.fromCity}</div>
                      <div className={styles.itinTerminal}>{FLIGHT.fromTerminal}</div>
                      <div className={styles.itinFlight}>
                        ✈ <strong>{FLIGHT.flightNum}</strong> · {FLIGHT.aircraft} · {FLIGHT.duration} · {FLIGHT.stops}
                      </div>
                    </div>
                  </div>

                  <div className={styles.itin}>
                    <div className={styles.itinLine}>
                      <div className={`${styles.itinDot} ${styles.itinDotFilled}`} />
                    </div>
                    <div className={styles.itinContent}>
                      <div className={styles.itinTime}>{FLIGHT.arrive}<span style={{ fontSize: '0.9rem', color: 'var(--muted)', marginLeft: 6 }}>+1</span></div>
                      <div className={styles.itinCode}>{FLIGHT.to}</div>
                      <div className={styles.itinCity}>{FLIGHT.toCity}</div>
                      <div className={styles.itinTerminal}>{FLIGHT.toTerminal}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FARE OPTIONS */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Select Your Fare</span>
              </div>
              <div className={styles.cardBody}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
                  {fares.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setFare(f.id)}
                      style={{
                        background: selectedFare === f.id ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${selectedFare === f.id ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.07)'}`,
                        borderRadius: 12, padding: 18, cursor: 'pointer', transition: 'all 0.25s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--white)' }}>{f.label}</span>
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: 'var(--gold-light)' }}>{f.price}</span>
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {f.perks.map((p) => (
                          <li key={p} style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', gap: 7 }}>
                            <span style={{ color: 'var(--success)' }}>✓</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FARE RULES */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Fare Rules & Flexibility</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.fareGrid}>
                  {[
                    { icon: '↩️', label: 'Cancellation',  value: FLIGHT.fare.cancellation, cls: styles.fareValueGood  },
                    { icon: '📅', label: 'Date Changes',   value: FLIGHT.fare.changes,      cls: styles.fareValueGood  },
                    { icon: '💰', label: 'Refund Policy',  value: FLIGHT.fare.refund,       cls: styles.fareValueGood  },
                    { icon: '⭐', label: 'Miles Earned',   value: FLIGHT.fare.miles,        cls: styles.fareValueWarn  },
                  ].map((r) => (
                    <div key={r.label} className={styles.fareItem}>
                      <span className={styles.fareIcon}>{r.icon}</span>
                      <div>
                        <div className={styles.fareLabel}>{r.label}</div>
                        <div className={`${styles.fareValue} ${r.cls}`}>{r.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BAGGAGE */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Baggage Allowance</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Business Class</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.baggageGrid}>
                  {FLIGHT.baggage.map((b) => (
                    <div key={b.label} className={styles.baggageItem}>
                      <div className={styles.baggageIcon}>{b.icon}</div>
                      <div className={styles.baggageLabel}>{b.label}</div>
                      <div className={styles.baggageValue}>{b.value}</div>
                      <div className={styles.baggageSub}>{b.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AMENITIES */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Onboard Amenities</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.amenitiesList}>
                  {FLIGHT.amenities.map((a) => (
                    <div key={a.label} className={`${styles.amenityTag} ${a.good ? styles.amenityTagGood : ''}`}>
                      {a.icon} {a.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className={styles.sidebar}>
            {/* Price Summary */}
            <div className={styles.priceCard}>
              <div className={styles.priceCardTop}>
                <div className={styles.priceCardTitle}>Price Summary</div>
                {[
                  { label: 'Base fare (1 adult)', value: FLIGHT.price  },
                  { label: 'Taxes & charges',     value: FLIGHT.taxes  },
                  { label: 'Service fee',          value: FLIGHT.fees   },
                ].map((r) => (
                  <div key={r.label} className={styles.priceRow}>
                    <span className={styles.priceRowLabel}>{r.label}</span>
                    <span className={styles.priceRowValue}>{r.value}</span>
                  </div>
                ))}
                <div className={styles.priceDivider} />
                <div className={styles.priceTotalRow}>
                  <span className={styles.priceTotalLabel}>Total</span>
                  <span className={styles.priceTotalAmount}>{FLIGHT.total}</span>
                </div>
              </div>
              <div className={styles.priceCardBody}>
                <Link href="/booking" className={styles.btnBookFull}>Continue to Book →</Link>
                <div className={styles.secureNote}>🔒 Secure · PCI-compliant checkout</div>
              </div>
            </div>

            {/* CO2 card */}
            <div className={styles.co2Card}>
              <span className={styles.co2Icon}>🌿</span>
              <div>
                <div className={styles.co2Title}>Carbon Offset Available</div>
                <p className={styles.co2Text}>
                  This flight emits ~1.2 tonnes CO₂. Add a carbon offset for $8 during checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

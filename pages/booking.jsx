// pages/booking.jsx
// SKYBOUND — Booking Checkout Page (/booking)

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Booking.module.css';

// ── SEAT MAP DATA ─────────────────────────────────────────────
// O = occupied, A = available, X = exit row
const SEAT_MAP = {
  business: {
    label: 'Business Class',
    cols: ['A','','C','D','','F'],
    rows: [
      ['O','','A','A','','O'],
      ['A','','O','A','','A'],
      ['A','','A','O','','A'],
    ],
  },
  economy: {
    label: 'Economy Class',
    cols: ['A','B','C','','D','E','F'],
    rows: [
      ['X','X','X','','X','X','X'],
      ['A','O','A','','A','A','O'],
      ['O','A','A','','O','A','A'],
      ['A','A','O','','A','O','A'],
      ['A','O','A','','A','A','A'],
      ['O','A','A','','O','A','O'],
    ],
  },
};

const ADD_ONS = [
  { id: 'insurance',  icon: '🛡️', title: 'Travel Insurance',    desc: 'Full trip protection including medical, cancellation & delays.', price: '+$32' },
  { id: 'meal',       icon: '🍱', title: 'Premium Meal',         desc: 'Pre-select your meal from a curated in-flight menu.',            price: '+$18' },
  { id: 'lounge',     icon: '🛋️', title: 'Airport Lounge',       desc: 'Access to 1,300+ airport lounges worldwide with Priority Pass.', price: '+$45' },
  { id: 'fasttrack',  icon: '⚡', title: 'Fast Track Security',  desc: 'Skip the queue with priority security and boarding lanes.',      price: '+$22' },
  { id: 'extrabag',   icon: '🧳', title: 'Extra Baggage 23kg',   desc: 'Add an additional 23kg checked bag to your booking.',            price: '+$55' },
  { id: 'carbonfree', icon: '🌿', title: 'Carbon Offset',        desc: 'Neutralise your flight\'s CO₂ emissions for a greener trip.',   price: '+$8'  },
];

const STEPS = ['Passenger Details', 'Seat Selection', 'Add-ons', 'Review'];

export default function BookingPage() {
  const [currentStep, setStep] = useState(0);
  const [selectedSeat, setSeat]   = useState(null);
  const [selectedAddOns, setAddOns] = useState([]);
  const [seatCabin, setSeatCabin]   = useState('economy');

  const [passenger, setPassenger] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    dob: '', gender: '', nationality: '', passport: '', passportExpiry: '',
  });

  const setField = (k) => (e) => setPassenger((p) => ({ ...p, [k]: e.target.value }));

  const toggleAddOn = (id) =>
    setAddOns((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);

  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const a = ADD_ONS.find((x) => x.id === id);
    return sum + parseInt(a?.price.replace(/\D/g, '') || 0);
  }, 0);

  const total = 1240 + addOnTotal;

  const seatLabel = (row, col) => `${row + 1}${SEAT_MAP[seatCabin].cols[col]}`;

  return (
    <>
      <Head>
        <title>Book Flight — BA 083 LOS→LHR — Skybound</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        <Navbar />

        {/* TOP BAR */}
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> ›
              <Link href="/flights">Flights</Link> ›
              <Link href="/flight-details">BA 083</Link> ›
              <span>Booking</span>
            </div>

            <h1 className={styles.pageTitle}>Complete Your <em>Booking</em></h1>

            {/* Progress Steps */}
            <div className={styles.steps}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={styles.step}>
                    <div className={`${styles.stepNum} ${i < currentStep ? styles.stepNumDone : i === currentStep ? styles.stepNumActive : styles.stepNumPending}`}>
                      {i < currentStep ? '✓' : i + 1}
                    </div>
                    <span className={`${styles.stepLabel} ${i === currentStep ? styles.stepLabelActive : ''}`}>{s}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`${styles.stepLine} ${i < currentStep ? styles.stepLineDone : ''}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          <div>

            {/* STEP 0 — PASSENGER DETAILS */}
            {currentStep === 0 && (
              <>
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionNum}>1</span>
                    <span className={styles.sectionTitle}>Personal Information</span>
                  </div>
                  <div className={styles.sectionBody}>
                    <div className={styles.fieldGrid}>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>First Name</label>
                        <input className={styles.fieldInput} placeholder="Ada" value={passenger.firstName} onChange={setField('firstName')} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Last Name</label>
                        <input className={styles.fieldInput} placeholder="Okonkwo" value={passenger.lastName} onChange={setField('lastName')} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Email Address</label>
                        <input className={styles.fieldInput} type="email" placeholder="you@example.com" value={passenger.email} onChange={setField('email')} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Phone Number</label>
                        <input className={styles.fieldInput} placeholder="+234 800 000 0000" value={passenger.phone} onChange={setField('phone')} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Date of Birth</label>
                        <input className={styles.fieldInput} type="date" value={passenger.dob} onChange={setField('dob')} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Gender</label>
                        <select className={styles.fieldSelect} value={passenger.gender} onChange={setField('gender')}>
                          <option value="">Select gender</option>
                          <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionNum}>2</span>
                    <span className={styles.sectionTitle}>Passport & Travel Document</span>
                  </div>
                  <div className={styles.sectionBody}>
                    <div className={styles.fieldGrid}>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Nationality</label>
                        <select className={styles.fieldSelect} value={passenger.nationality} onChange={setField('nationality')}>
                          <option value="">Select country</option>
                          {['Nigeria','Ghana','Kenya','South Africa','Egypt','Ethiopia','United Kingdom','United States','France','Germany'].map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Passport Number</label>
                        <input className={styles.fieldInput} placeholder="A12345678" value={passenger.passport} onChange={setField('passport')} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Passport Expiry Date</label>
                        <input className={styles.fieldInput} type="date" value={passenger.passportExpiry} onChange={setField('passportExpiry')} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Issuing Country</label>
                        <select className={styles.fieldSelect}>
                          <option value="">Select country</option>
                          {['Nigeria','Ghana','Kenya','South Africa'].map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 1 — SEAT SELECTION */}
            {currentStep === 1 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>3</span>
                  <span className={styles.sectionTitle}>Choose Your Seat</span>
                </div>
                <div className={styles.sectionBody}>
                  {/* Cabin toggle */}
                  <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                    {Object.keys(SEAT_MAP).map((c) => (
                      <button key={c}
                        onClick={() => { setSeatCabin(c); setSeat(null); }}
                        style={{
                          padding: '8px 20px', borderRadius: 8, cursor: 'pointer',
                          border: `1px solid ${seatCabin === c ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                          background: seatCabin === c ? 'rgba(201,168,76,0.1)' : 'transparent',
                          color: seatCabin === c ? 'var(--gold-light)' : 'var(--muted)',
                          fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', transition: 'all 0.25s',
                        }}>
                        {SEAT_MAP[c].label}
                      </button>
                    ))}
                  </div>

                  <div className={styles.seatMapWrap}>
                    <div className={styles.seatMapLegend}>
                      {[
                        { color: 'rgba(74,144,217,0.3)', label: 'Available' },
                        { color: 'rgba(255,255,255,0.1)', label: 'Occupied' },
                        { color: 'linear-gradient(135deg,#c9a84c,#e8c97e)', label: 'Selected' },
                        { color: 'rgba(239,68,68,0.2)', label: 'Exit Row' },
                      ].map((l) => (
                        <div key={l.label} className={styles.legendItem}>
                          <div className={styles.legendDot} style={{ background: l.color }} />
                          {l.label}
                        </div>
                      ))}
                    </div>

                    {/* Column headers */}
                    <div className={styles.seatCabin}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 8, paddingLeft: 26 }}>
                        {SEAT_MAP[seatCabin].cols.map((c, i) => (
                          <div key={i} style={{ width: 32, textAlign: 'center', fontSize: '0.68rem', color: 'var(--muted)' }}>{c}</div>
                        ))}
                      </div>

                      {SEAT_MAP[seatCabin].rows.map((row, ri) => (
                        <div key={ri} className={styles.seatRow}>
                          <span className={styles.rowNum}>{ri + 1}</span>
                          {row.map((s, ci) => {
                            if (s === '') return <div key={ci} className={styles.seatAisle} />;
                            const id = seatLabel(ri, ci);
                            const isSelected = selectedSeat === id;
                            return (
                              <div
                                key={ci}
                                className={`${styles.seat} ${s === 'O' ? styles.seatOccupied : s === 'X' ? styles.seatExit : isSelected ? styles.seatSelected : styles.seatAvailable}`}
                                onClick={() => s === 'A' && setSeat(isSelected ? null : id)}
                                title={s === 'X' ? 'Exit row' : s === 'O' ? 'Occupied' : id}
                              >
                                {isSelected ? '✓' : s === 'X' ? '!' : id}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {selectedSeat && (
                      <div style={{ marginTop: 16, padding: '10px 20px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 10, fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                        ✓ Seat <strong>{selectedSeat}</strong> selected · {SEAT_MAP[seatCabin].label}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — ADD-ONS */}
            {currentStep === 2 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>4</span>
                  <span className={styles.sectionTitle}>Enhance Your Journey</span>
                </div>
                <div className={styles.sectionBody}>
                  <div className={styles.addOnsGrid}>
                    {ADD_ONS.map((a) => {
                      const selected = selectedAddOns.includes(a.id);
                      return (
                        <div
                          key={a.id}
                          className={`${styles.addOnCard} ${selected ? styles.addOnCardSelected : ''}`}
                          onClick={() => toggleAddOn(a.id)}
                        >
                          <span className={styles.addOnIcon}>{a.icon}</span>
                          <div className={styles.addOnInfo}>
                            <div className={styles.addOnTitle}>{a.title}</div>
                            <div className={styles.addOnDesc}>{a.desc}</div>
                            <div className={styles.addOnPrice}>{a.price}</div>
                          </div>
                          <div className={`${styles.addOnCheck} ${selected ? styles.addOnCheckSelected : ''}`}>
                            {selected ? '✓' : '+'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — REVIEW */}
            {currentStep === 3 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>5</span>
                  <span className={styles.sectionTitle}>Review Your Booking</span>
                </div>
                <div className={styles.sectionBody}>
                  {[
                    { label: 'Passenger',  value: `${passenger.firstName || 'Ada'} ${passenger.lastName || 'Okonkwo'}` },
                    { label: 'Email',      value: passenger.email || 'ada@example.com'    },
                    { label: 'Passport',   value: passenger.passport || 'A12345678'       },
                    { label: 'Flight',     value: 'BA 083 · Lagos → London'               },
                    { label: 'Date',       value: 'Tuesday, Nov 12, 2025'                 },
                    { label: 'Cabin',      value: 'Business Class'                        },
                    { label: 'Seat',       value: selectedSeat || 'Not selected'          },
                    { label: 'Add-ons',    value: selectedAddOns.length ? selectedAddOns.join(', ') : 'None' },
                    { label: 'Total',      value: `$${total.toLocaleString()}`            },
                  ].map((r) => (
                    <div key={r.label} style={{
                      display: 'flex', justifyContent: 'space-between', padding: '12px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.88rem',
                    }}>
                      <span style={{ color: 'var(--muted)' }}>{r.label}</span>
                      <span style={{ color: 'var(--white)', fontWeight: 500 }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NAV BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              {currentStep > 0 && (
                <button
                  onClick={() => setStep(currentStep - 1)}
                  style={{ padding: '12px 28px', borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  ← Back
                </button>
              )}
              <div style={{ marginLeft: 'auto' }}>
                {currentStep < STEPS.length - 1 ? (
                  <button
                    onClick={() => setStep(currentStep + 1)}
                    style={{ padding: '12px 32px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,var(--gold),var(--gold-light))', color: 'var(--navy)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Continue →
                  </button>
                ) : (
                  <Link href="/payment" style={{ padding: '12px 32px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,var(--gold),var(--gold-light))', color: 'var(--navy)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                    Proceed to Payment →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className={styles.sidebar}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryTop}>
                <div className={styles.summaryTitle}>Booking Summary</div>
                <div className={styles.summaryFlight}>
                  <div className={styles.summaryAirline} style={{ background: '#1a3a5c88' }}>✈️</div>
                  <div>
                    <div className={styles.summaryRoute}>Lagos → London</div>
                    <div className={styles.summaryMeta}>BA 083 · Nov 12, 2025 · Business</div>
                  </div>
                </div>
              </div>

              <div className={styles.summaryBody}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Base fare</span>
                  <span className={styles.summaryValue}>$1,240</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Taxes</span>
                  <span className={styles.summaryValue}>$186</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Fees</span>
                  <span className={styles.summaryValue}>$24</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Add-ons ({selectedAddOns.length})</span>
                    <span className={styles.summaryValue}>+${addOnTotal}</span>
                  </div>
                )}
                <div className={styles.summaryDivider} />
                <div className={styles.summaryTotal}>
                  <span className={styles.summaryTotalLabel}>Total</span>
                  <span className={styles.summaryTotalValue}>${total.toLocaleString()}</span>
                </div>
              </div>

              {currentStep === 3 && (
                <div className={styles.summaryFooter}>
                  <Link href="/payment" className={styles.btnContinue}>Pay Now →</Link>
                  <div className={styles.secureNote}>🔒 256-bit SSL · PCI-DSS compliant</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

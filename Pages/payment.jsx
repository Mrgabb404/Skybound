// pages/payment.jsx
// SKYBOUND — Payment Page (/payment)

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Payment.module.css';

const GATEWAYS = [
  { id: 'card',       icon: '💳', label: 'Card'       },
  { id: 'paypal',     icon: '🅿️', label: 'PayPal'     },
  { id: 'applepay',   icon: '🍎', label: 'Apple Pay'  },
  { id: 'googlepay',  icon: '🔵', label: 'Google Pay' },
  { id: 'paystack',   icon: '🟢', label: 'Paystack'   },
  { id: 'flutterwave',icon: '🦋', label: 'Flutterwave'},
  { id: 'stripe',     icon: '⚡', label: 'Stripe'     },
  { id: 'transfer',   icon: '🏦', label: 'Transfer'   },
];

const ORDER = {
  route: 'Lagos → London',
  flightNum: 'BA 083',
  date: 'Nov 12, 2025',
  cabin: 'Business Class',
  passenger: 'Ada Okonkwo',
  seat: '2C',
  baseFare: 1240,
  taxes: 186,
  fees: 24,
  addOns: 55,
};

function generateRef() {
  return 'SKY-' + Math.floor(10000 + Math.random() * 90000);
}

export default function PaymentPage() {
  const [gateway, setGateway]   = useState('card');
  const [paying, setPaying]     = useState(false);
  const [paid, setPaid]         = useState(false);
  const [bookingRef]            = useState(generateRef);

  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const setCardField = (k) => (e) => {
    let val = e.target.value;
    if (k === 'number') val = val.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
    if (k === 'expiry') val = val.replace(/\D/g,'').slice(0,4).replace(/^(.{2})(.+)/,'$1/$2');
    if (k === 'cvv')    val = val.replace(/\D/g,'').slice(0,4);
    setCard((c) => ({ ...c, [k]: val }));
  };

  const total = ORDER.baseFare + ORDER.taxes + ORDER.fees + ORDER.addOns;

  const handlePay = async () => {
    setPaying(true);
    // TODO: connect to real payment gateway API
    await new Promise((r) => setTimeout(r, 2200));
    setPaying(false);
    setPaid(true);
  };

  // ── SUCCESS STATE ──────────────────────────────────────────
  if (paid) {
    return (
      <>
        <Head><title>Booking Confirmed — Skybound</title></Head>
        <div className={styles.page}>
          <Navbar />
          <div className={styles.successPage}>
            <div className={styles.successCircle}>✓</div>
            <h1 className={styles.successTitle}>Booking <em>Confirmed!</em></h1>
            <p className={styles.successSub}>
              Your flight has been booked and your e-ticket is on its way.
              Check your email for the full itinerary and boarding pass.
            </p>
            <div className={styles.successRef}>Booking Ref: {bookingRef}</div>
            <div className={styles.successActions}>
              <Link href="/my-trips" className={styles.btnGold}>📋 View My Trips</Link>
              <Link href="/"         className={styles.btnGhost}>Back to Home</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── PAYMENT FORM ──────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Secure Payment — Skybound</title>
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
              <Link href="/booking">Booking</Link> ›
              <span>Payment</span>
            </div>
            <h1 className={styles.pageTitle}>Secure <em>Payment</em></h1>
            <p className={styles.pageSub}>Your payment is encrypted and processed securely.</p>
          </div>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          <div>

            {/* GATEWAY SELECTION */}
            <div className={styles.payCard}>
              <div className={styles.payCardHeader}>
                <span className={styles.payCardTitle}>Choose Payment Method</span>
              </div>
              <div className={styles.payCardBody}>
                <div className={styles.gatewayGrid}>
                  {GATEWAYS.map((g) => (
                    <div
                      key={g.id}
                      className={`${styles.gatewayBtn} ${gateway === g.id ? styles.gatewayBtnActive : ''}`}
                      onClick={() => setGateway(g.id)}
                    >
                      <span className={styles.gatewayIcon}>{g.icon}</span>
                      <span className={`${styles.gatewayLabel} ${gateway === g.id ? styles.gatewayLabelActive : ''}`}>
                        {g.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CARD FORM */}
            {gateway === 'card' && (
              <div className={styles.payCard}>
                <div className={styles.payCardHeader}>
                  <span className={styles.payCardTitle}>Card Details</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>🔒 256-bit SSL Encrypted</span>
                </div>
                <div className={styles.payCardBody}>

                  {/* Live card visual */}
                  <div className={styles.cardVisual}>
                    <div className={styles.cardVisualBg} />
                    <div className={styles.cardChip}>⬜</div>
                    <div className={styles.cardNum}>
                      {card.number || '•••• •••• •••• ••••'}
                    </div>
                    <div className={styles.cardBottom}>
                      <div>
                        <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>CARD HOLDER</div>
                        <div className={styles.cardHolder}>{card.name || 'YOUR NAME'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>EXPIRES</div>
                        <div className={styles.cardExpiry}>{card.expiry || 'MM/YY'}</div>
                      </div>
                      <div className={styles.cardNetwork}>💳</div>
                    </div>
                  </div>

                  <div className={styles.cardForm}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Card Number</label>
                      <input className={styles.fieldInput} placeholder="1234 5678 9012 3456"
                        value={card.number} onChange={setCardField('number')} maxLength={19} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Cardholder Name</label>
                      <input className={styles.fieldInput} placeholder="ADA OKONKWO"
                        value={card.name} onChange={setCardField('name')}
                        style={{ fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }} />
                    </div>
                    <div className={styles.fieldRow}>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Expiry Date</label>
                        <input className={styles.fieldInput} placeholder="MM/YY"
                          value={card.expiry} onChange={setCardField('expiry')} maxLength={5} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>CVV / CVC</label>
                        <input className={styles.fieldInput} placeholder="•••"
                          value={card.cvv} onChange={setCardField('cvv')} maxLength={4} type="password" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ALTERNATIVE PAYMENT METHODS */}
            {['paypal','applepay','googlepay','paystack','flutterwave','stripe','transfer'].includes(gateway) && (
              <div className={styles.payCard}>
                <div className={styles.payCardHeader}>
                  <span className={styles.payCardTitle}>
                    {GATEWAYS.find((g) => g.id === gateway)?.icon} {' '}
                    Pay with {GATEWAYS.find((g) => g.id === gateway)?.label}
                  </span>
                </div>
                <div className={styles.payCardBody}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>
                    You will be securely redirected to {GATEWAYS.find((g) => g.id === gateway)?.label} to complete
                    your payment of <strong style={{ color: 'var(--gold-light)' }}>${total.toLocaleString()}</strong>.
                    Your booking will be confirmed instantly upon successful payment.
                  </p>
                  <div className={styles.altPayRow}>
                    <div className={styles.altPayBtn} style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}>
                      <span className={styles.altPayIcon}>{GATEWAYS.find((g) => g.id === gateway)?.icon}</span>
                      Continue with {GATEWAYS.find((g) => g.id === gateway)?.label}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY BADGES */}
            <div className={styles.payCard}>
              <div className={styles.payCardBody}>
                <div className={styles.securityRow}>
                  {[
                    { icon: '🔒', label: '256-bit SSL' },
                    { icon: '✅', label: 'PCI-DSS Compliant' },
                    { icon: '🛡️', label: 'Fraud Protection' },
                    { icon: '🔄', label: '3D Secure' },
                    { icon: '💯', label: 'Money-Back Guarantee' },
                  ].map((b) => (
                    <div key={b.label} className={styles.secBadge}>
                      {b.icon} {b.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className={styles.sidebar}>
            <div className={styles.orderCard}>
              <div className={styles.orderTop}>
                <div className={styles.orderTitle}>Order Summary</div>
                <div className={styles.orderFlight}>
                  <div className={styles.orderRoute}>
                    <span className={styles.orderRouteText}>{ORDER.route}</span>
                    <span className={styles.orderFlightNum}>{ORDER.flightNum}</span>
                  </div>
                  <div className={styles.orderMeta}>
                    <span>{ORDER.date} · {ORDER.cabin}</span>
                    <span>Passenger: {ORDER.passenger}</span>
                    <span>Seat: {ORDER.seat}</span>
                  </div>
                </div>
              </div>

              <div className={styles.orderBody}>
                {[
                  { label: 'Base fare',  value: `$${ORDER.baseFare.toLocaleString()}` },
                  { label: 'Taxes',      value: `$${ORDER.taxes}`                     },
                  { label: 'Fees',       value: `$${ORDER.fees}`                      },
                  { label: 'Add-ons',    value: `$${ORDER.addOns}`                    },
                ].map((r) => (
                  <div key={r.label} className={styles.orderRow}>
                    <span className={styles.orderLabel}>{r.label}</span>
                    <span className={styles.orderValue}>{r.value}</span>
                  </div>
                ))}
                <div className={styles.orderDivider} />
                <div className={styles.orderTotal}>
                  <span className={styles.orderTotalLabel}>Total</span>
                  <span className={styles.orderTotalValue}>${total.toLocaleString()}</span>
                </div>
              </div>

              <div className={styles.orderFooter}>
                <button
                  className={styles.btnPay}
                  onClick={handlePay}
                  disabled={paying}
                >
                  {paying
                    ? <><span className={styles.spinner} />Processing…</>
                    : `Pay $${total.toLocaleString()} →`
                  }
                </button>
                <p className={styles.payNote}>
                  By completing this payment you agree to Skybound's Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

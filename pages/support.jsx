// pages/support.jsx
// SKYBOUND — Support Page (/support)

import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Support.module.css';

const FAQ_CATEGORIES = ['All', 'Bookings', 'Payments', 'Baggage', 'Cancellations', 'Check-In'];

const FAQS = [
  { category: 'Bookings',       q: 'How do I change the date on my flight booking?',           a: 'You can change your flight date through My Trips. Select your booking, click "Manage", then choose "Change Date". Date changes are subject to airline availability and fare differences. Most flexible fares allow free changes up to 24 hours before departure.' },
  { category: 'Cancellations',  q: 'What is the cancellation and refund policy?',               a: 'Cancellation policies vary by fare type. Fully flexible fares can be cancelled for a full refund up to 2 hours before departure. Semi-flexible fares may carry a cancellation fee. Non-refundable fares are not eligible for cash refunds but may qualify for travel credit. Check your booking confirmation for your specific fare rules.' },
  { category: 'Payments',       q: 'Which payment methods does Skybound accept?',               a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, Stripe, and African payment gateways including Paystack and Flutterwave. All payments are secured with 256-bit SSL encryption and PCI-DSS compliance.' },
  { category: 'Baggage',        q: 'How much luggage can I bring on my flight?',                a: 'Baggage allowances depend on your airline and cabin class. Economy typically allows 23kg checked baggage; Business class allows 32–40kg. Your allowance is shown on your e-ticket. Excess baggage can be purchased during booking or at the airport.' },
  { category: 'Check-In',       q: 'When can I check in for my flight?',                       a: 'Online check-in opens 24–48 hours before departure depending on the airline. You can check in via the airline\'s website or app, or at the airport check-in desk. For international flights, we recommend arriving at least 3 hours before departure.' },
  { category: 'Bookings',       q: 'Can I book a flight for someone else?',                    a: 'Yes. During checkout, enter the passenger\'s details (name, passport number, nationality) instead of your own. Ensure the name matches their travel document exactly to avoid issues at the airport.' },
  { category: 'Payments',       q: 'Why was my payment declined?',                             a: 'Payments can be declined for several reasons: insufficient funds, card limits, incorrect billing address, or bank fraud protection. Try a different payment method or contact your bank. Our support team can also assist you in completing your booking.' },
  { category: 'Cancellations',  q: 'How long does a refund take to process?',                  a: 'Refunds are processed within 5–10 business days after approval. The time for funds to appear in your account depends on your bank or payment provider — typically 3–7 additional business days. You will receive an email confirmation once your refund is initiated.' },
  { category: 'Baggage',        q: 'What items are prohibited in carry-on luggage?',            a: 'Liquids over 100ml, sharp objects, flammable items, and most self-defence tools are prohibited in carry-on bags. Each country and airline may have additional restrictions. Always check the airline\'s specific guidelines before packing.' },
];

const CONTACT_OPTIONS = [
  { icon: '💬', label: 'Live Chat',    desc: 'Chat with a support agent in real time. Available 24/7 for urgent travel needs.', meta: 'Avg. response: 2 min' },
  { icon: '📧', label: 'Email Us',     desc: 'Send us a detailed message and we\'ll get back to you as quickly as possible.', meta: 'Response within 4 hours' },
  { icon: '📞', label: 'Call Us',      desc: 'Speak directly with our travel experts for complex booking issues.', meta: '+234 800 SKY BOUND' },
];

export default function SupportPage() {
  const [activeCategory, setCategory]   = useState('All');
  const [openFaq, setOpenFaq]           = useState(null);
  const [searchQuery, setSearch]        = useState('');
  const [submitted, setSubmitted]       = useState(false);
  const [form, setForm]                 = useState({ name:'', email:'', subject:'', category:'', message:'' });

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const filteredFaqs = FAQS.filter((f) => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = !searchQuery || f.q.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <>
      <Head>
       Snap<title>Support — Trip</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        <Navbar />

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>How Can We <em>Help You?</em></h1>
            <p className={styles.heroSub}>
              Search our help centre, browse FAQs, or reach our support team directly — we're here 24/7.
            </p>
            <div className={styles.heroSearch}>
              <input
                className={styles.heroSearchInput}
                placeholder="Search for answers… e.g. 'refund policy'"
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className={styles.btnGold}>Search</button>
            </div>
          </div>
        </section>

        {/* CONTACT OPTIONS */}
        <div className={styles.contactRow}>
          {CONTACT_OPTIONS.map((c) => (
            <div key={c.label} className={styles.contactCard}>
              <div className={styles.contactIcon}>{c.icon}</div>
              <div className={styles.contactLabel}>{c.label}</div>
              <p className={styles.contactDesc}>{c.desc}</p>
              <span className={styles.contactMeta}>{c.meta}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>Help Centre</div>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqCategories}>
            {FAQ_CATEGORIES.map((c) => (
              <button
                key={c}
                className={`${styles.faqCat} ${activeCategory === c ? styles.faqCatActive : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className={styles.faqList}>
            {filteredFaqs.map((f, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <span className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ''}`}>▼</span>
                </button>
                <div className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ''}`}>
                  {f.a}
                </div>
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <p style={{ color: 'var(--muted)', padding: '24px 0', fontSize: '0.9rem' }}>
                No results found for "{searchQuery}". Try a different search term or browse by category.
              </p>
            )}
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className={styles.formSection}>
          <div className={styles.formInner}>
            <div className={styles.formLeft}>
              <h2 className={styles.formTitle}>Still Need Help?</h2>
              <p className={styles.formDesc}>
                Our travel support specialists are available 24 hours a day, 7 days a week.
                Fill out the form and we'll get back to you as quickly as possible.
              </p>
              <div className={styles.responseTime}>
                <span className={styles.responseTimeIcon}>⏱️</span>
                <span>Average response time: <span className={styles.responseTimeHighlight}>under 4 hours</span></span>
              </div>
            </div>

            <div className={styles.formRight}>
              {submitted ? (
                <div className={styles.successMsg}>
                  <div className={styles.successIcon}>✓</div>
                  <div className={styles.successTitle}>Message Sent!</div>
                  <p className={styles.successText}>
                    Thanks for reaching out. Our team will respond to {form.email} within 4 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Full Name</label>
                      <input className={styles.fieldInput} placeholder="Ada Okonkwo" value={form.name} onChange={setField('name')} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Email Address</label>
                      <input className={styles.fieldInput} type="email" placeholder="you@example.com" value={form.email} onChange={setField('email')} />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Topic</label>
                    <select className={styles.fieldSelect} value={form.category} onChange={setField('category')}>
                      <option value="">Select a topic…</option>
                      {FAQ_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Booking Reference (optional)</label>
                    <input className={styles.fieldInput} placeholder="e.g. SKY-29401" value={form.subject} onChange={setField('subject')} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Message</label>
                    <textarea className={styles.fieldTextarea} placeholder="Describe your issue in detail…" value={form.message} onChange={setField('message')} />
                  </div>

                  <button className={styles.submitBtn} onClick={handleSubmit}>
                    Send Message →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

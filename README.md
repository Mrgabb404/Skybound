# ✦ Skybound — Flight Booking Frontend

> **Next.js 14 · React 18 · CSS Modules only · No UI library**

---

## 📁 File Structure

```
skybound/
├── pages/
│   ├── _app.jsx               ← Global app wrapper
│   ├── index.jsx              ← Homepage (/)
│   ├── auth.jsx               ← Login + Register (/auth)
│   └── admin/
│       └── dashboard.jsx      ← Admin Dashboard (/admin/dashboard)
│
├── styles/
│   ├── globals.css            ← Global reset
│   ├── Home.module.css        ← Homepage styles
│   ├── Auth.module.css        ← Auth page styles
│   └── AdminDashboard.module.css ← Admin dashboard styles
│
└── package.json
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
# or
yarn install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📄 Pages

| Route               | File                          | Description                          |
|---------------------|-------------------------------|--------------------------------------|
| `/`                 | `pages/index.jsx`             | Homepage with hero, search, destinations, deals |
| `/auth`             | `pages/auth.jsx`              | Login / Register (toggle in-page)    |
| `/auth?mode=register` | `pages/auth.jsx`             | Opens directly on Register tab       |
| `/admin/dashboard`  | `pages/admin/dashboard.jsx`   | Admin dashboard with KPIs, charts, table |

---

## 🎨 Design System

All design tokens are defined as CSS custom properties in each module:

| Token           | Value                          |
|-----------------|-------------------------------|
| `--navy`        | `#0a0f1e` (primary background) |
| `--navy-mid`    | `#111827`                      |
| `--navy-light`  | `#1a2540`                      |
| `--gold`        | `#c9a84c` (primary accent)     |
| `--gold-light`  | `#e8c97e`                      |
| `--sky`         | `#4a90d9` (secondary accent)   |
| `--white`       | `#f5f5f0`                      |
| `--muted`       | `#8a9ab5`                      |

**Fonts** (loaded from Google Fonts — add to `<Head>` in each page):
- **Display:** `Cormorant Garamond` (headings, brand name)
- **Body:** `DM Sans` (UI text, buttons, labels)
- **Mono:** `DM Mono` (booking IDs, amounts, code)

---

## 🔌 Next Steps (Backend Integration)

Replace the `TODO` comments in each page with real API calls:

### Auth page (`pages/auth.jsx`)
```js
// Login
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

// Register
const res = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstName, lastName, email, password }),
});
```

### Homepage search (`pages/index.jsx`)
```js
// Connect to Amadeus / Skyscanner / AviationStack API
const res = await fetch('/api/flights/search', {
  method: 'POST',
  body: JSON.stringify({ from, to, date, passengers, cabin }),
});
```

### Admin dashboard (`pages/admin/dashboard.jsx`)
```js
// Fetch real KPIs
const res = await fetch('/api/admin/analytics');
const data = await res.json();
```

---

## 🛡️ Admin Route Protection

Add a Next.js middleware file to protect `/admin/*` routes:

**`middleware.js`** (root of project)
```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('skybound_token');
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## 📦 Recommended Next Packages

```bash
# Animations
npm install framer-motion

# Forms & validation
npm install react-hook-form zod

# HTTP client
npm install axios

# Auth (if using JWT)
npm install jsonwebtoken js-cookie

# Icons (lightweight)
npm install lucide-react

# Date picker
npm install react-day-picker date-fns
```

---

*Built with ✦ Skybound Design System · Next.js 14 · CSS Modules*

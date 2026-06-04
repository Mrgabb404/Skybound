// pages/_app.jsx
// Global app wrapper — import global reset here if needed

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

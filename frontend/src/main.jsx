import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
} else if ('serviceWorker' in navigator) {
  const appScope = `${window.location.origin}/`;
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => Promise.all(
      registrations
        .filter((registration) => registration.scope === appScope)
        .map((registration) => registration.unregister())
    ))
    .then(() => caches.delete('kebena-sda-v1'))
    .catch((error) => {
      console.error('Failed to clean up the development service worker:', error);
    });
}

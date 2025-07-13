export function registerSW() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('SW registered'))
        .catch((err) => console.log('SW registration failed:', err));
    });
  }
}

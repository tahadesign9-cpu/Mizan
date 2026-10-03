const VERSION='mizan-v8';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png','./fonts/alexandria-arabic-600-normal.woff2','./fonts/alexandria-arabic-700-normal.woff2','./fonts/alexandria-arabic-800-normal.woff2','./fonts/alexandria-latin-600-normal.woff2','./fonts/alexandria-latin-700-normal.woff2','./fonts/alexandria-latin-800-normal.woff2','./fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2','./fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2','./fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2','./fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2','./fonts/ibm-plex-sans-arabic-latin-400-normal.woff2','./fonts/ibm-plex-sans-arabic-latin-500-normal.woff2','./fonts/ibm-plex-sans-arabic-latin-600-normal.woff2','./fonts/ibm-plex-sans-arabic-latin-700-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url); if(url.origin!==location.origin) return;
  if(url.pathname.includes('/fonts/')||url.pathname.includes('/icons/')){e.respondWith(caches.match(req).then(h=>h||fetch(req).then(r=>{const cp=r.clone();caches.open(VERSION).then(c=>c.put(req,cp));return r;})));return;}
  e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(VERSION).then(c=>c.put(req,cp));return r;}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
});

// BENTUK3D – guna versi terbaru bila ada internet, salinan simpanan bila luar talian
const CACHE='bentuk3d-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/logo.svg','./icons/icon-192.png','./icons/icon-512.png','./simulasi/putar-3d.html','./simulasi/bentangan.html','./simulasi/isi-air.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
 e.respondWith(fetch(e.request.url,{cache:'no-cache'}).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res})
  .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));
});

// const VERSION = 'v03::';

// // const cacheName = 'lightcity';
// const APP_CACHE_NAME = 'lightcity-app';
// const STATIC_CACHE_NAME = 'lightcity-static';

// console.log(`installing service-worker.js`);

// const CACHE_STATIC = [
//     '../images/LightCityLOGO.png',
//     '/images/LightCityLOGO.png',
//     '../images/preload.svg',
//     '/images/preload.svg',
//     '../images/Trophy7.svg',
//     '../images/Trophy10.svgg',
//     '../images/Trophy8Silver.svg',
//     '../images/Trophy11.svg',
//     '../images/sadEmoji.svg',
//     '../images/Hint17.svg',
//     '../images/correct-gif2.gif',    
//     '../images/wrong-gif3.gif',
//     '../style/lightcity-02.css',    
//     '/style/lightcity-02.css',    
//     '../style/article-style.css',    
//     '../style/bibleQuizAnimation.css',    
//     '../style/bibleQuizNoBG.css',    
//     '../style/bibleQuizBG-darkpurple.css',    
//     '../style/bibleQuizBG-antiquewhite.css',    
//     '../style/bibleQuizBG-blackpearl.css',    
//     '../style/bibleQuizBG-copperrose.css',    
//     '../style/bibleQuizBG-crimson.css',    
//     '../style/bibleQuizBG-darkcyan.css',    
//     '../style/bibleQuizBG-darkcyan.css',    
//     '/style/bibleQuizNoBG.css',    
//     '/style/bibleQuizBG-darkpurple.css',    
//     '/style/bibleQuizBG-antiquewhite.css',    
//     '/style/bibleQuizBG-blackpearl.css',    
//     '/style/bibleQuizBG-copperrose.css',    
//     '/style/bibleQuizBG-crimson.css',    
//     '/style/bibleQuizBG-darkcyan.css',    
//     '/style/bibleQuizBG-darkcyan.css',    
//  ];

//  const CACHE_APP = [
//     '/',
//     '/index.html',
//     '/about/',
//     '/contact/',
//     '/events/',
//     '/code-of-conduct/',
//     '/merch/',
//     '/welcome-to-slack/',
//  ];

// self.addEventListener('install',function(e){
//     e.waitUntil(
//         Promise.all([
//             caches.open(STATIC_CACHE_NAME),
//             caches.open(APP_CACHE_NAME),
//             self.skipWaiting()
//           ]).then(function(storage){
//             var static_cache = storage[0];
//             var app_cache = storage[1];
//             return Promise.all([
//               static_cache.addAll(CACHE_STATIC),
//               app_cache.addAll(CACHE_APP)]);
//         })
//     );
// });

// self.addEventListener('activate', function(e) {
//     e.waitUntil(
//         Promise.all([
//             self.clients.claim(),
//             caches.keys().then(function(cacheNames) {
//                 return Promise.all(
//                     cacheNames.map(function(cacheName) {
//                         if (cacheName !== APP_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
//                             console.log('deleting',cacheName);
//                             return caches.delete(cacheName);
//                         }
//                     })
//                 );
//             })
//         ])
//     );
// });

// this.addEventListener('fetch', function(event) {
//   var response;
//   event.respondWith(caches.match(event.request)
//     .then(function (match) {
//       return match || fetch(event.request);
//     }).catch(function() {
//       return fetch(event.request);
//     })
//     .then(function(r) {
//       response = r;
//       caches.open(cacheName).then(function(cache) {
//         cache.put(event.request, response);
//       });
//       return response.clone();
//     })
//   );
// });
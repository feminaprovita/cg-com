// none of this matters until i get https working, duh

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js')

if (workbox) console.log(`Yay! Workbox is loaded 🎉`)
else console.log(`Boo! Workbox didn't load 😬`)


self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
})
// does the above suggest that all these 'workbox's should be 'self's?

workbox.clientsClaim()

// cache name
workbox.core.setCacheNameDetails({
    prefix: 'cg-cache',
    precache: 'precache',
    runtime: 'runtime',
  })

// runtime cache
// 1. stylesheet
workbox.routing.registerRoute(
    new RegExp('\.css$'),
    workbox.strategies.cacheFirst({
        cacheName: 'cg-cache-stylesheets',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24, // cache for one day
                maxEntries: 20, // only cache 20 requests
                purgeOnQuotaError: true
            })
        ]
    })
)

// 2. Google Fonts webfont files
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // one year
      }),
    ],
  }),
);

// 3. images
workbox.routing.registerRoute(
    new RegExp('\.(png|svg|jpg|jpeg)$'),
    workbox.strategies.cacheFirst({
        cacheName: 'cg-cache-images',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30, // thirty days
                maxEntries: 50, // 50 requests
                purgeOnQuotaError: true
            })
        ]
    })
)

// 4. component (seed) data
workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cg-cache-data',
        cacheExpiration: {
            maxAgeSeconds: 60 * 60 * 24 // one day
        }
    })
)

workbox.precaching.precacheAndRoute([])

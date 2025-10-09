// A list of pages which have custom rules.
const PAGES_NONSTANDARD_RULES = [
  '/news',
  '/storage',
  '/events',
  '/auth',
  '/rules',
  '/shift-schedule',
];

// Do not convert into an ES6 export.
// lighthouse-ci (as of 0.14.0) uses require() to import, and this is not supported with ES6 modules.
const config = {
  ci: {
    collect: {
      settings: {
        hostname: '127.0.0.1',
      },
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/auth',
        'http://localhost:3000/en/about',
        'http://localhost:3000/en/events',
        'http://localhost:3000/en/events/1',
        'http://localhost:3000/en/news',
        'http://localhost:3000/en/news/1',
        'http://localhost:3000/en/storage',
        'http://localhost:3000/en/storage/shopping-cart',
        'http://localhost:3000/en/storage/item/new',
        'http://localhost:3000/en/storage/item/1',
        'http://localhost:3000/en/storage/item/1/edit',
        'http://localhost:3000/en/storage/loans',
        'http://localhost:3000/en/storage/loans/user',
        'http://localhost:3000/en/storage/categories',
        'http://localhost:3000/en/shift-schedule',
        'http://localhost:3000/en/rules',
        'http://localhost:3000/en/rules/1',
        'http://localhost:3000/en/reservations',
        'http://localhost:3000/en/reservations/prusamk3',
      ],
      startServerCommand: 'bun run start',
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lhci.hackerspace-ntnu.no', // build token is set by the GH Action
    },
    assert: {
      assertMatrix: [
        {
          // Match all routes, except for pages with special rules. See https://github.com/GoogleChrome/lighthouse-ci/issues/511 and https://github.com/GoogleChrome/lighthouse-ci/issues/208#issuecomment-784501105
          matchingUrlPattern: `http://.*/en(?!${PAGES_NONSTANDARD_RULES.join('|')}).*`,
          preset: 'lighthouse:recommended',
          assertions: {
            'bf-cache': 'off',
            'color-contrast': 'off',
            'heading-order': 'off',
            'largest-contentful-paint': 'off',
            'render-blocking-resources': 'off',
            'target-size': 'off',
            'unused-javascript': 'off',
            interactive: 'off',
            'mainthread-work-breakdown': 'off',
            'max-potential-fid': 'off',
            'bootup-time': 'off',
          },
        },
        {
          matchingUrlPattern: 'http://.*/en/news.*',
          preset: 'lighthouse:recommended',
          assertions: {
            'bf-cache': 'off',
            'color-contrast': 'off',
            'heading-order': 'off',
            'largest-contentful-paint': 'off',
            'render-blocking-resources': 'off',
            'target-size': 'off',
            'unused-javascript': 'off',
            interactive: 'off',
            'mainthread-work-breakdown': 'off',
            'max-potential-fid': 'off',
            'bootup-time': 'off',
            'uses-responsive-images': 'off', // Should be removed when we obtain images from backend
            'image-aspect-ratio': 'off', // Should be removed when we obtain images from backend
            'image-size-responsive': 'off', // Should be removed when we obtain images from backend
          },
        },
        {
          matchingUrlPattern: 'http://.*/en/storage.*',
          preset: 'lighthouse:recommended',
          assertions: {
            'bf-cache': 'off',
            'color-contrast': 'off',
            'heading-order': 'off',
            'largest-contentful-paint': 'off',
            'render-blocking-resources': 'off',
            'target-size': 'off',
            'unused-javascript': 'off',
            interactive: 'off',
            'mainthread-work-breakdown': 'off',
            'max-potential-fid': 'off',
            'bootup-time': 'off',
            'cumulative-layout-shift': 'off', // We don't always know how many items are in the cart, which can lead to layout shifts when loading completes
            'image-aspect-ratio': 'off', // Should be removed when we obtain images from backend
          },
        },
        {
          matchingUrlPattern: 'http://.*/en/events.*',
          preset: 'lighthouse:recommended',
          assertions: {
            'bf-cache': 'off',
            'color-contrast': 'off',
            'heading-order': 'off',
            'largest-contentful-paint': 'off',
            'render-blocking-resources': 'off',
            'target-size': 'off',
            'unused-javascript': 'off',
            interactive: 'off',
            'mainthread-work-breakdown': 'off',
            'max-potential-fid': 'off',
            'bootup-time': 'off',
            'uses-responsive-images': 'off', // Should be removed when we obtain images from backend
            'label-content-name-mismatch': 'off',
          },
        },
        {
          matchingUrlPattern: 'http://.*/en/auth.*',
          preset: 'lighthouse:recommended',
          assertions: {
            'bf-cache': 'off',
            'color-contrast': 'off',
            'heading-order': 'off',
            'largest-contentful-paint': 'off',
            'render-blocking-resources': 'off',
            'target-size': 'off',
            'unused-javascript': 'off',
            interactive: 'off',
            'mainthread-work-breakdown': 'off',
            'max-potential-fid': 'off',
            'bootup-time': 'off',
            'document-title': 'off',
            'font-size': 'off',
            viewport: 'off',
            'meta-description': 'off',
          },
        },
        {
          matchingUrlPattern: 'http://.*/en/rules.*',
          preset: 'lighthouse:recommended',
          assertions: {
            'bf-cache': 'off',
            'color-contrast': 'off',
            'heading-order': 'off',
            'largest-contentful-paint': 'off',
            'render-blocking-resources': 'off',
            'target-size': 'off',
            'unused-javascript': 'off',
            interactive: 'off',
            'mainthread-work-breakdown': 'off',
            'max-potential-fid': 'off',
            'bootup-time': 'off',
            'image-redundant-alt': 'off',
            'label-content-name-mismatch': 'off',
          },
        },
        {
          matchingUrlPattern: 'http://.*/en/shift-schedule.*',
          preset: 'lighthouse:recommended',
          assertions: {
            'bf-cache': 'off',
            'color-contrast': 'off',
            'heading-order': 'off',
            'largest-contentful-paint': 'off',
            'render-blocking-resources': 'off',
            'target-size': 'off',
            'unused-javascript': 'off',
            interactive: 'off',
            'mainthread-work-breakdown': 'off',
            'max-potential-fid': 'off',
            'bootup-time': 'off',
            'errors-in-console': 'off', // Preloading fonts causes errors in console
          },
        },
      ],
    },
  },
};

module.exports = config;

const PAGES_EXCLUDED = ['news', 'storage'];

// Do not convert into an ES6 export.
// lighthouse-ci (as of 0.14.0) uses require() to import, and this is not supported with ES6 modules.
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/en/', // Trailing slash required, else the regex for default lighthouse rules won't catch this one
        'http://localhost:3000/en/about',
        'http://localhost:3000/en/events',
        'http://localhost:3000/en/news',
        'http://localhost:3000/en/news/1',
        'http://localhost:3000/en/storage',
        'http://localhost:3000/en/storage/shopping-cart',
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
          matchingUrlPattern: `http://.*/en/(?!${PAGES_EXCLUDED.join('|')}).*`, // match all routes, except for pages with special rules. See https://github.com/GoogleChrome/lighthouse-ci/issues/511 and https://github.com/GoogleChrome/lighthouse-ci/issues/208#issuecomment-784501105
          preset: 'lighthouse:recommended',
          assertions: {
            'bf-cache': 'off',
            'color-contrast': 'off',
            'heading-order': 'off',
            'largest-contentful-paint': 'off',
            'render-blocking-resources': 'off',
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
            interactive: 'off',
            'uses-responsive-images': 'off', // Should be removed when we obtain images from backend
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
            'unused-javascript': 'off',
            'cumulative-layout-shift': 'off', // We don't always know how many items are in the cart, which can lead to layout shifts when loading completes
            'max-potential-fid': 'off',
          },
        },
      ],
    },
  },
};

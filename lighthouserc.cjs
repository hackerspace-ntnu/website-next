const PAGES_EXCLUDED = ['news', 'events', 'storage'];

// Do not convert into an ES6 export.
// lighthouse-ci (as of 0.14.0) uses require() to import, and this is not supported with ES6 modules.
const config = {
  ci: {
    collect: {
      settings: {
        hostname: '127.0.0.1',
      },
      url: [
        'http://localhost:3000/en/', // Trailing slash required, else the regex for default lighthouse rules won't catch this one
        'http://localhost:3000/en/auth',
        'http://localhost:3000/en/about',
        'http://localhost:3000/en/events',
        'http://localhost:3000/en/events/1',
        'http://localhost:3000/en/news',
        'http://localhost:3000/en/news/1',
        'http://localhost:3000/en/storage',
        'http://localhost:3000/en/storage/shopping-cart',
        'http://localhost:3000/en/shift-schedule',
        'http://localhost:3000/en/rules',
        'http://localhost:3000/en/rules/1',
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
            'document-title': 'error[0]',
            'font-size': 'error[0]',
            viewport: 'error[0]',
            'meta-description': 'error[0]',
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
            'image-redundant-alt': 'error[0]',
            'label-content-name-mismatch': 'error[0]',
          },
        },
      ],
    },
  },
};

module.exports = config;

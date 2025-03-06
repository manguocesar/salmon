import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['require-in-the-middle'],
  // If you were using other experimental features, keep them here
  experimental: {
    // other experimental options...
  },
};

export default withSentryConfig(nextConfig, {
  org: 'cesar-1v',
  project: 'javascript-nextjs',

  silent: !process.env.CI, // Only print logs for uploading source maps in CI

  widenClientFileUpload: true, // Upload a larger set of source maps for prettier stack traces (increases build time)

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // automaticVercelMonitors: true,
});

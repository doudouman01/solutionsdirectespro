/** @type {import('next').NextConfig} */
const nextConfig = {

  // ─── Headers de sécurité + SEO ───
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Sécurité
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // ─── Redirections permanentes (301) ───
  async redirects() {
    return [
      // Redirection www → non-www (au cas où)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.solutionsdirectespro.com' }],
        destination: 'https://solutionsdirectespro.com/:path*',
        permanent: true,
      },
    ];
  },

  // ─── Optimisation images ───
  images: {
    formats: ['image/avif', 'image/webp'],
  },

};

module.exports = nextConfig;

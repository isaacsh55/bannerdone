const isStaticExport = 'false';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // ✅ Add this block to force standalone unless static export
  ...(isStaticExport === 'true'
    ? { output: 'export' }
    : { output: 'standalone' }),
};

export default nextConfig;

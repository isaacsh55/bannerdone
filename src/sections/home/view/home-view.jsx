'use client';

import { useBackToTop } from 'minimal-shared/hooks';

import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';
import { SectionTitle } from '../components/section-title';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeZoneUI } from '../home-zone-ui';
import { HomeMinimal } from '../home-minimal';
import { HomePricing } from '../home-pricing';
import { HomeForDesigner } from '../home-for-designer';
import { HomeTestimonials } from '../home-testimonials';
import { HomeIntegrations } from '../home-integrations';
import { HomeAdvertisement } from '../home-advertisement';
import { HomeHugePackElements } from '../home-hugepack-elements';
import { HomeHighlightFeatures } from '../home-highlight-features';


import { _mock } from 'src/_mock';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SLIDES = [
  {
    id: 1,
    title: 'Banner 1',
    coverUrl: '/banners/Confinement_Banner.jpg',
  },
  {
    id: 2,
    title: 'Banner 2',
    coverUrl: '/banners/Confinement_Banner_2.png',
  },
  {
    id: 3,
    title: 'Banner 3',
    coverUrl: '/banners/Confinement_Banner_3.jpg',
  },
];


// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  const { onBackToTop, isVisible } = useBackToTop('90%');

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1, top: 0, left: 0, width: '100%' })]}
      />

      <BackToTopButton isVisible={isVisible} onClick={onBackToTop} />

      <HomeHero data={SLIDES.slice(0, 3)} />

      <Stack
        sx={{
          position: 'relative',
          px: { xs: 1, sm: 2, md: 4 },
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <HomePricing />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: { xs: 2, sm: 3 },
            px: { xs: 2, sm: 4 },
            my: { xs: 2, sm: 3 },
            width: { xs: '100%', sm: '90%', md: '90%' },
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="div"
            fontWeight="bold"
            color="primary.main"
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
          >
            Trusted by mothers since 2011
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', sm: '1.1rem' } }}
          >
            Chilli Padi Confinement strives to assist new mothers transition into postpartum comfortably by delivering delicious meals which restore hormonal balance and increase the production of breastmilk.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', sm: '1.1rem' } }}
          >
            Over the past decade, we have served our confinement meals to over thirty thousand new mothers. Thank you for allowing us to be a part of your confinement journey!
          </Typography>

          {/* <SectionTitle
            title="Our Packages"
            description="Chilli Padi Confinement food delivery offers a wide range of packages from 7 Days to 28 Days options"
            sx={{ mb: 5, textAlign: 'center' }}
          /> */}
        </Box>

        {/* <HomeMinimal /> */}
        {/* <HomeHugePackElements /> */}
        {/* <HomeForDesigner /> */}
        <HomeHighlightFeatures />
        {/* <HomeIntegrations /> */}
        {/* <HomeTestimonials /> */}
        {/* <HomeFAQs /> */}
        {/* <HomeZoneUI /> */}
        {/* <HomeAdvertisement /> */}
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

function BackToTopButton({ isVisible, sx, ...other }) {
  return (
    <Fab
      aria-label="Back to top"
      sx={[
        (theme) => ({
          width: 48,
          height: 48,
          position: 'fixed',
          transform: 'scale(0)',
          right: { xs: 24, md: 32 },
          bottom: { xs: 24, md: 32 },
          zIndex: theme.zIndex.speedDial,
          transition: theme.transitions.create(['transform']),
          ...(isVisible && { transform: 'scale(1)' }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <SvgIcon>
        {/* https://icon-sets.iconify.design/solar/double-alt-arrow-up-bold-duotone/ */}
        <path
          fill="currentColor"
          d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
          opacity="0.5"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057"
          clipRule="evenodd"
        />
      </SvgIcon>
    </Fab>
  );
}

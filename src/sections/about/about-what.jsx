'use client';
import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutWhat({ sx, ...other }) {
  return (
    <Box
      component="section"
      sx={[{ overflow: 'hidden' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Container
        component={MotionViewport}
        sx={{ py: { xs: 10, md: 7 }, textAlign: { xs: 'center', md: 'left' } }}
      >
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }} // force side-by-side on desktop
        >
          {/* Image */}
          <Grid xs={12} md={2}>
            <Box sx={{ width: '100%' }}>
              <m.div variants={varFade('inUp')}>
                <Image
                  alt="Chilli Padi Owner"
                  src={`${CONFIG.assetsDir}/aboutUs/owner.jpeg`}
                  ratio="3/4"
                  sx={(theme) => ({
                    borderRadius: 3,
                    boxShadow: `-40px 40px 80px ${varAlpha(
                      theme.vars.palette.grey['500Channel'],
                      0.24
                    )}`,
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  })}
                />
              </m.div>
            </Box>
          </Grid>

          {/* Text */}
          <Grid xs={12} md={2}>
            <Box>
              <Typography component={m.p} variants={varFade('inRight')} sx={{ color: 'text.secondary' }}>
                Chilli Padi started off as a restaurant which was founded in 1997 and has been synonymous with authentic Peranakan Cuisine, rich heritage and gourmet excellence. We have since built an island-wide footprint with our catering arm, flagship restaurant and chain of cafeterias, collectively known as Chilli Padi Holding.
              </Typography>

              <Typography component={m.p} variants={varFade('inRight')} sx={{ color: 'text.secondary', mt: 3 }}>
                Over the years, Chilli Padi has received numerous accolades including the coveted Singapore’s Best Restaurant by Singapore Tatler, Asia Pacific Brands Award and Promising SME500, among others. In particular, the Singapore Tourism Board proudly recommends the international media to Chilli Padi’s cuisine as a fine exemplary of Singapore’s rich food heritage.
              </Typography>
              <Typography component={m.p} variants={varFade('inRight')} sx={{ color: 'text.secondary', mt: 3 }}>
                In 2011, we initially offered our confinement meals at our restaurant. Encouraged by the positive response and demand for our meals, we expanded our portfolio to cater confinement meal catering service aimed to aid mummies in their postpartum recovery.              </Typography>

              <Button
                component={m.a}
                variants={varFade('inRight')}
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ mt: 5 }}
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                href="https://chillipadi.com.sg/chilli-padi-confinement"
                target="_blank"
                rel="noopener noreferrer"
              >
                More Info
              </Button>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}

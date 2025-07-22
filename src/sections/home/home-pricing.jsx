import { m } from 'framer-motion';
import { useTabs } from 'minimal-shared/hooks';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { varFade, varScale, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatXIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function HomePricing({ sx, ...other }) {
  const tabs = useTabs('Dual Meal');

  const renderDescription = () => (
    <SectionTitle
      title="Our Packages"
      description="Chilli Padi Confinement food delivery offers a wide range of packages from 7 Days to 28 Days options"
      sx={{ mb: 5, textAlign: 'center' }}
    />
  );

  const renderContentDesktop = () => (
    <Box gridTemplateColumns="repeat(3, 1fr)" sx={{ display: { xs: 'none', md: 'grid' } }}>
      {PLANS.map((plan) => (
        <PlanCard
          key={plan.license}
          plan={plan}
          sx={(theme) => ({
            ...(plan.license === 'Single Meal' && {
              [theme.breakpoints.down(1440)]: {
                borderLeft: `dashed 2px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                borderRight: `dashed 2px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
              },
            }),
          })}
        />
      ))}
    </Box>
  );

  const renderContentMobile = () => (
    <Stack spacing={2} alignItems="center" sx={{ display: { md: 'none' } }}>
      <Tabs
        value={tabs.value}
        onChange={tabs.onChange}
        sx={[
          (theme) => ({
            boxShadow: `0px -2px 0px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)} inset`,
          }),
        ]}
      >
        {PLANS.map((tab) => (
          <Tab key={tab.license} value={tab.license} label={tab.license} />
        ))}
      </Tabs>

      <Box
        sx={[
          (theme) => ({
            width: 1,
            borderRadius: 2,
            border: `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
          }),
        ]}
      >
        {PLANS.map(
          (tab) => tab.license === tabs.value && <PlanCard key={tab.license} plan={tab} />
        )}
      </Box>
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[{ py: 5, position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <MotionViewport>
        <FloatLine vertical sx={{ top: 0, left: 80 }} />
        <Container>{renderDescription()}</Container>
        <Box
          sx={(theme) => ({
            position: 'relative',
            '&::before, &::after': {
              width: 64,
              height: 64,
              content: "''",
              [theme.breakpoints.up(1440)]: { display: 'block' },
            },
          })}
        >
          <Container>{renderContentDesktop()}</Container>
          <FloatLine sx={{ top: 64, left: 0 }} />
          <FloatLine sx={{ bottom: 64, left: 0 }} />
        </Box>
        <Container>{renderContentMobile()}</Container>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 1 }}
        >
          Book your confinement food delivery package with us now!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href={paths.product.root}
            component="a"
            sx={{ minWidth: 240 }} // Added to make the button wider
          >
            Order Now
          </Button>
        </Box>

      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <FloatLine vertical sx={{ top: -64, left: 0, height: 'calc(100% + (64px * 2))' }} />
    <FloatLine vertical sx={{ top: -64, right: 0, height: 'calc(100% + (64px * 2))' }} />
    <FloatXIcon sx={{ top: -8, left: -8 }} />
    <FloatXIcon sx={{ top: -8, right: -8 }} />
    <FloatXIcon sx={{ bottom: -8, left: -8 }} />
    <FloatXIcon sx={{ bottom: -8, right: -8 }} />
  </>
);

function PlanCard({ plan, sx, ...other }) {
  const DualMealPackage = plan.license === 'Dual Meal';
  const SingleMealPackage = plan.license === 'Single Meal';
  const TrialMealPackage = plan.license == 'Trial Meal'

  return (
    <MotionViewport>
      <Box
        sx={[
          () => ({
            px: 6,
            py: 8,
            gap: 3,
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',

          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {SingleMealPackage && renderLines()}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Stack flexGrow={1}>
            <m.div variants={varFade('inLeft', { distance: 24 })}>
              <Typography variant="h4" component="h6">
                {plan.license}
              </Typography>
            </m.div>

            <m.div variants={varScale('inX')}>
              <Box
                sx={{
                  width: 32,
                  height: 6,
                  opacity: 0.24,
                  borderRadius: 1,
                  bgcolor: 'error.main',
                  ...(DualMealPackage && { bgcolor: 'primary.main' }),
                  ...(SingleMealPackage && { bgcolor: 'secondary.main' }),
                }}
              />
            </m.div>
          </Stack>

          <m.div variants={varFade('inLeft', { distance: 24 })}>
            <Box component="span" sx={{ typography: 'h6' }}>
              from
            </Box>
            <Box component="span" sx={{ typography: 'h3' }}>
              ${plan.price}
            </Box>
          </m.div>
        </Box>

        {/* Display plan.option based on plan type */}
        <Typography variant="subtitle2" color="text.secondary">
          {DualMealPackage && 'Lunch And Dinner'}
          {SingleMealPackage && 'Lunch Or Dinner'}
          {TrialMealPackage && 'Lunch Or Dinner'}
        </Typography>


        <Stack spacing={2.5}>
          {DualMealPackage && (
            plan.dualMeal.map((dualMeal, idx) => (
              <Box
                key={dualMeal}
                component={m.div}
                variants={varFade('in')}
                sx={{
                  gap: 1.5,
                  display: 'flex',
                  typography: 'body2',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify width={16} icon="eva:arrow-right-fill" />
                  {dualMeal}
                </Box>
                <Box sx={{ fontWeight: 600 }}>${plan.dualMealPrice[idx]}</Box>
              </Box>
            ))
          )}

          {SingleMealPackage && (
            plan.singleMeal.map((singleMeal, idx) => (
              <Box
                key={singleMeal}
                component={m.div}
                variants={varFade('in')}
                sx={{
                  gap: 1.5,
                  display: 'flex',
                  typography: 'body2',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify width={16} icon="eva:arrow-right-fill" />
                  {singleMeal}
                </Box>
                <Box sx={{ fontWeight: 600 }}>${plan.singleMealPrice[idx]}</Box>
              </Box>
            ))
          )}

          {TrialMealPackage && (
            plan.trialMeal.map((trialMeal, idx) => (
              <Box
                key={trialMeal}
                component={m.div}
                variants={varFade('in')}
                sx={{
                  gap: 1.5,
                  display: 'flex',
                  typography: 'body2',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify width={16} icon="eva:arrow-right-fill" />
                  {trialMeal}
                </Box>
                <Box sx={{ fontWeight: 600 }}>${plan.trialMealPrice[idx]}</Box>
              </Box>
            ))
          )}
        </Stack>
      </Box>
    </MotionViewport>
  );
}

// ----------------------------------------------------------------------

const PLANS = Array.from({ length: 3 }, (_, index) => ({
  license: ['Dual Meal', 'Single Meal', 'Trial Meal'][index],
  price: [498, 498, 38][index],
  option: ['Lunch And Dinner', 'Lunch Or Dinner', 'Lunch Or Dinner'],
  dualMeal: [
    '28 Days',
    '21 Days',
    '14 Days',
    '7  Days',
  ],
  dualMealPrice: [
    1768,
    1368,
    968,
    498
  ],
  singleMeal: [
    '28 Days',
    '21 Days',
    '14 Days'
  ],
  singleMealPrice: [
    968,
    728,
    498
  ],
  trialMeal: [
    '1 Day'
  ],
  trialMealPrice: [
    38
  ],
  icons: [
    `${CONFIG.assetsDir}/assets/icons/platforms/ic-js.svg`,
    `${CONFIG.assetsDir}/assets/icons/platforms/ic-ts.svg`,
    `${CONFIG.assetsDir}/assets/icons/platforms/ic-figma.svg`,
  ],
}));

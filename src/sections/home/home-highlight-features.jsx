import { useRef, useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useClientRect } from 'minimal-shared/hooks';
import { m, useSpring, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/global-config';
import { primaryColorPresets } from 'src/theme/with-settings';

import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
  </>
);

export function HomeHighlightFeatures({ sx, ...other }) {
  const containerRoot = useClientRect();

  return (
    <Box
      component="section"
      sx={[
        {
          position: 'relative',
          pt: { xs: 10, md: 20 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container>
          <Stack
            ref={containerRoot.elementRef}
            spacing={5}
            sx={[
              () => ({
                textAlign: { xs: 'center', md: 'center' },
                alignItems: { xs: 'center', md: 'center' },
              }),
            ]}
          >
            <SectionTitle title="Dishes for Confinement Mothers" />
          </Stack>
        </Container>
      </MotionViewport>
      <ScrollableContent containerRoot={containerRoot} />
    </Box>
  );
}

// ----------------------------------------------------------------------

const ITEMS = [
  {
    title: `Pig's Trotter with Ginger, Vinegar and Egg (猪脚醋)`,
    subtitle: 'Pig trotters are often consumed',
    imgUrl: [`${CONFIG.assetsDir}/menu/homedish/Pig_Trotters_with_Vinger_Egg_480x480.webp`],
  },
  {
    title: 'Milk Boosting Fish and Papaya Soup (木瓜鱼汤)',
    subtitle: 'Express your Papaya fish soup is a traditional dish highly recommended for confinement mothers. style with just one click.',
    imgUrl: [
      `${CONFIG.assetsDir}/menu/homedish/Papaya_Fish_soup_480x480.webp`,
    ],
  },
  {
    title: 'Right-to-HK Style Steam Golden Snapper in Superior Soya Sauce (港式蒸鱼片)',
    subtitle: 'Support languages such as During this important month-long confinement period, it is vital to eat well to regain your strength., Persian, and Hebrew.',
    imgUrl: [`${CONFIG.assetsDir}/menu/homedish/11_1_480x480.webp`],
  },
  {
    title: 'Mind Boosting Walnut Black Bean Pork Ribs Soup (黑豆核桃排骨汤)',
    subtitle: 'Black Bean Pork Ribs, it is often regarded as a healthy and tasty tonic for the body, and it contains high nutritional values.',
    imgUrl: [`${CONFIG.assetsDir}/menu/homedish/Mind_Boosting_Walnut_Black_Bean_Pork_Ribs_Soup_480x480.webp`],
  },
  {
    title: 'Baked Herbal Chicken (烤药材鸡)',
    subtitle: 'By using Herbal, it will help to boost energy, aid in stomach discomfort and regulate blood.',
    imgUrl: [`${CONFIG.assetsDir}/menu/homedish/Baked_Herbal_Chicken_480x480.webp`],
  },
  {
    title: 'Lemongrass Chicken Soup (除风香茅鸡汤)',
    subtitle: 'Lemongrass is a herb that contains vitamins, mineral, electrolytes, and other chemicals that acts as antioxidants are abundant in all parts of lemongrass.',
    imgUrl: [`${CONFIG.assetsDir}/menu/homedish/Lemongrass_Chicken_Soup_b0ae4e7a-b06c-4440-aaec-b9c6d4265a69_480x480.webp`],
  },
  {
    title: 'Grilled Salmon With Apple Mirin Sauce (烤三文鱼与萍果味醂)',
    subtitle: 'This dish is carbohydrate free and a good source of protein. Salmon provides all of the essential amino acids, making it a complete source of protein like other animal products such as poultry and milk.',
    imgUrl: [`${CONFIG.assetsDir}/menu/homedish/Grilled_Salmon_With_Apple_Mirin_Sauce_31ecf175-a3a7-4f25-8766-358f5bfdf3da_480x480.webp`],
  },
  {
    title: 'Nourishing and Beautifying Black Chicken Soup (人参黑鸡汤)',
    subtitle: 'Ginseng black chicken is a popular soup in Chinese cuisine and traditional medicine. It helps to boost energy, strengthen your immune system, regulate blood sugar and support heart health.',
    imgUrl: [`${CONFIG.assetsDir}/menu/homedish/nourishing_and_beautifying_black_chicken_soup_1543b537-c603-4dc5-a281-c56130428ff5_480x48.webp`],
  },
  {
    title: 'Hakka Yellow Wine Chicken with Black Fungus (客家黄酒鸡)',
    subtitle: 'This traditional dish is a favourite among Hakkas and Cantonese. Yellow wine chicken helps to improve blood circulation, keep the body warm, and speed up the recovery process.',
    imgUrl: [`${CONFIG.assetsDir}/menu/homedish/Hakka_Yellow_Wine_Chicken_with_Black_Fungus_480x480.webp`],
  },

];

function ScrollableContent({ containerRoot }) {
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const containerRef = useRef(null);
  const containeRect = useClientRect(containerRef);

  const scrollRef = useRef(null);
  const scrollRect = useClientRect(scrollRef);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const [startScroll, setStartScroll] = useState(false);

  const physics = { damping: 16, mass: 0.12, stiffness: 80 };

  const scrollRange = (-scrollRect.scrollWidth + containeRect.width / 2) * (isRtl ? -1 : 1);

  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, scrollRange]), physics);

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    [
      'linear-gradient(180deg, #FFF 0%, #FFF 100%)', // Start: all white
      'linear-gradient(180deg, #FFF 0%, #FACAD5 100%)', // End: white to pink
    ]
  );

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest !== 0 && latest !== 1) {
      setStartScroll(true);
    } else {
      setStartScroll(false);
    }
  });

  return (
    <ScrollRoot ref={containerRef} sx={{ minHeight: '100vh' }}>
      <ScrollContainer style={{ background }} data-scrolling={startScroll}>
        <ScrollContent
          ref={scrollRef}
          style={{ x }}
          layout
          sx={{ ml: `${containerRoot.left}px` }}
          transition={{ ease: 'linear', duration: 0.25 }}
        >
          {ITEMS.map((item) => (
            <Item key={item.title} item={item} />
          ))}
        </ScrollContent>
      </ScrollContainer>
    </ScrollRoot>
  );
}

// ----------------------------------------------------------------------

const ScrollRoot = styled(m.div)(({ theme }) => ({
  zIndex: 9,
  position: 'relative',
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: { paddingTop: theme.spacing(8) },
}));

const ScrollContainer = styled(m.div)(({ theme }) => ({
  top: 0,
  height: '100vh',
  display: 'flex',
  position: 'sticky',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'flex-start',
  transition: theme.transitions.create(['background-color']),
  '&[data-scrolling="true"]': { justifyContent: 'center' },
}));

const ScrollContent = styled(m.div)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(5),
  paddingLeft: theme.spacing(3),
  transition: theme.transitions.create(['margin-left', 'margin-top']),
  [theme.breakpoints.up('md')]: { gap: theme.spacing(8), paddingLeft: theme.spacing(0) },
}));

// ----------------------------------------------------------------------

function Item({ item, sx, ...other }) {
  return (
    <Box
      sx={[
        {
          flexShrink: 0,
          maxWidth: { xs: 280, sm: 320, md: 400 }, // Responsive maxWidth
          width: { xs: 240, sm: 280, md: 400 },    // Responsive width
          mx: { xs: 'auto', md: 0 },               // Center on mobile
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on mobile
          gap: { xs: 2, md: 8 },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {item.imgUrl.map((url) => (
          <Box
            key={url}
            sx={[
              (theme) => ({
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: `-20px 20px 40px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                ...theme.applyStyles('dark', {
                  boxShadow: `-20px 20px 40px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
                }),
                width: { xs: 200, sm: 240, md: 480 },
                height: 'auto',
                mx: { xs: 'auto', md: 0 },
              }),
            ]}
          >
            <Box
              component="img"
              alt={url}
              src={url}
              sx={{
                width: { xs: 200, sm: 240, md: 480 },
                height: 'auto',
                display: 'block',
                mx: 'auto',
              }}
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ my: { xs: 2, md: 4 }, gap: 2, display: 'flex' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Typography
            variant="h6"
            sx={{
              wordBreak: 'break-word',
              color: '',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {item.title}
          </Typography>
          {/* <Typography variant="caption" sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>
            {item.subtitle}
          </Typography> */}
        </Stack>
      </Box>
    </Box>
  );
}

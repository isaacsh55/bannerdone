import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _socials } from 'src/_mock';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Logo } from 'src/components/logo';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Quick Links',
    children: [
      { name: 'Home', href: paths.about },
      { name: 'About us', href: paths.about },
      { name: 'View Weekly Menu', href: paths.about },
      { name: 'Confinement Packages', href: paths.about },
      { name: 'Baby Shower Celebration', href: paths.about },
      { name: 'Articles', href: paths.about },
      { name: 'Testimonials', href: paths.about },
      { name: 'FAQs', href: paths.about },
    ],
  }
];

const INFO = [
  {
    headline: 'Information',
    children: [
      {
        name: 'Hotline/Messenger Hours:',
        info: [
          {
            1: 'Mon - Fri 9:00AM to 6:00PM',
            2: 'Sat: 9:00AM to 12:30PM',
            3: 'Sun, PH Closed'
          },
        ]
      },
      {
        name: 'Please Note',
        info: `For E.D.D selection/new orders/next day activation/meal postponement and etc, we would need 1 working day's notice (before 2PM) for delivery on weekdays or 2 working day's notice (before 2PM) for delivery on weekends and PH. Any orders, activations or changes after operating hours would require 2 working day's notice. Additional $20/trip for delivery to Sentosa. Do check with our team for menu schedules.`
      }
    ],
  }
]

// ----------------------------------------------------------------------

const FooterRoot = styled('footer')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.vars.palette.background.default,
}));

export function Footer({ sx, layoutQuery = 'md', ...other }) {
  return (
    <FooterRoot sx={sx} {...other}>
      <Divider />

      <Container
        sx={(theme) => ({
          pb: 5,
          pt: 10,
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        })}
      >
        <Logo />

        {/* <Typography variant="h6" sx={{ mt: 2 }}>
          Your Custom Footer Title
        </Typography> */}

        <Grid
          container
          sx={[
            (theme) => ({
              mt: 3,
              justifyContent: 'center',
              [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
            }),
          ]}
        >
          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Typography
              variant="body2"
              sx={(theme) => ({
                mx: 'auto',
                maxWidth: 280,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              })}
            >
              3015 Bedok North Street 5, Shimei East Kitchen, #04-21, Singapore 486350
            </Typography>

            <Typography
              variant="body2"
              sx={(theme) => ({
                mx: 'auto',
                maxWidth: 280,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              })}
            >
              Phone: 6914 9900
            </Typography>
            <Typography
              variant="body2"
              sx={(theme) => ({
                mx: 'auto',
                maxWidth: 280,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              })}
            >
              Email: confinement@chillipadi.com.sg
            </Typography>

            <Box
              sx={(theme) => ({
                mt: 3,
                mb: 5,
                display: 'flex',
                justifyContent: 'center',
                [theme.breakpoints.up(layoutQuery)]: { mb: 0, justifyContent: 'flex-start' },
              })}
            >
              {_socials.map((social) => (
                <IconButton key={social.label}>
                  {social.value === 'facebook' && <FacebookIcon />}
                  {social.value === 'instagram' && <InstagramIcon />}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 6 }}>
            <Box
              sx={(theme) => ({
                gap: 5,
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' },
              })}
            >
              {LINKS.map((list) => (
                <Box
                  key={list.headline}
                  sx={(theme) => ({
                    gap: 2,
                    width: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    [theme.breakpoints.up(layoutQuery)]: { alignItems: 'flex-start' },
                  })}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              ))}
              {INFO.map((list) => (
                <Box
                  key={list.headline}
                  sx={(theme) => ({
                    gap: 2,
                    width: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    [theme.breakpoints.up(layoutQuery)]: { alignItems: 'flex-start' },
                  })}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Typography
                      key={link.name}
                      variant="body2"
                      color="inherit"
                      sx={{ mb: 1 }}
                    >
                      {link.name}
                      {link.info &&
                        (Array.isArray(link.info)
                          ? Object.values(link.info[0]).map((item, idx) => (
                            <span key={idx} style={{ display: 'block' }}>{item}</span>
                          ))
                          : <span style={{ display: 'block' }}>{link.info}</span>
                        )
                      }
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 10 }}>
          © All rights reserved.
        </Typography>
      </Container>
    </FooterRoot>
  );
}

// ----------------------------------------------------------------------

export function HomeFooter({ sx, ...other }) {
  return (
    <FooterRoot
      sx={[
        {
          py: 5,
          textAlign: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <Logo />
        <Box sx={{ mt: 1, typography: 'caption' }}>
          © All rights reserved.
          <br /> made by
          <Link href="https://minimals.cc/"> minimals.cc </Link>
        </Box>
      </Container>
    </FooterRoot>
  );
}

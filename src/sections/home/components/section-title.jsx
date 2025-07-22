import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return (
    <Box
      sx={[
        {
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {caption && (
        <SectionCaption
          title={caption}
          variants={slotProps?.caption?.variants}
          sx={slotProps?.caption?.sx}
        />
      )}

      <Typography
        component={m.h2}
        variant="h2"
        variants={slotProps?.title?.variants ?? varFade('inUp', { distance: 24 })}
        sx={[
          { color: 'primary.main' }, // <-- Add this line
          slotProps?.title?.sx,
        ]}
      >
        {`${title} `}
        <Box
          component="span"
          sx={(theme) => ({
            opacity: 0.4,
            display: 'inline-block',
            ...theme.mixins.textGradient(
              `to right, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
            ),
          })}
        >
          {txtGradient}
        </Box>
      </Typography>

      {description && (
        <Typography
          component={m.p}
          variants={slotProps?.description?.variants ?? varFade('inUp', { distance: 24 })}
          sx={[
            { color: 'text.secondary' },
            ...(Array.isArray(slotProps?.description?.sx)
              ? (slotProps?.description?.sx ?? [])
              : [slotProps?.description?.sx]),
          ]}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

export function SectionCaption({ title, variants, sx, ...other }) {
  return (
    <Box
      component={m.span}
      variants={variants ?? varFade('inUp', { distance: 24 })}
      sx={[
        () => ({ typography: 'overline', color: 'text.disabled' }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {title}
    </Box>
  );
}

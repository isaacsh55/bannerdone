import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';

import { fPercent, fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export function EcommerceSalesOverview({ title, subheader, data, sx, ...other }) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        sx={{
          gap: 4,
          px: 3,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {data.map((progress) => (
          <Item key={progress.label} progress={progress} />
        ))}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function Item({ progress }) {
  return (
    <div>
      <Box
        sx={{
          mb: 1,
          gap: 0.5,
          display: 'flex',
          alignItems: 'center',
          typography: 'subtitle2',
        }}
      >
        <Box component="span" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Box>

        <Box component="span">{fCurrency(progress.totalAmount)}</Box>

        <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
          ({fPercent(progress.value)})
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'Total income' && 'info') ||
          (progress.label === 'Total expenses' && 'warning') ||
          'primary'
        }
        sx={[
          (theme) => ({
            height: 8,
            bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
          }),
        ]}
      />
    </div>
  );
}

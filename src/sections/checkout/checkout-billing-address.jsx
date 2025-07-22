import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

import { _addressBooks } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from './context';
import { CheckoutSummary } from './checkout-summary';
import { AddressItem, AddressNewForm } from '../address';

// ----------------------------------------------------------------------

export function CheckoutBillingAddress() {
  const { onPayment, onChangeStep, onCreateBillingAddress, state: checkoutState } = useCheckoutContext();

  const addressForm = useBoolean();

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <AddressNewForm
            open={addressForm.value}
            onClose={addressForm.onFalse}
            onCreate={async (address) => {
              onCreateBillingAddress(address);
              await onPayment(); // call stripe checkout session.
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={() => onChangeStep('back')}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CheckoutSummary checkoutState={checkoutState} />
        </Grid>
      </Grid>


    </>
  );
}

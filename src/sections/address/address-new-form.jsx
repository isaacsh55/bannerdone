import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewAddressSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod.string().min(1, { message: 'Email Address is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  zipCode: zod.string().min(1, { message: 'Postal code is required!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  // Not required
  floor: zod.string(),
  unit: zod.string(),
  addressType: zod.string(),

});

// ----------------------------------------------------------------------

export function AddressNewForm({ open, onClose, onCreate }) {
  const defaultValues = {
    name: '',
    email: '',
    address: '',
    floor: '',
    unit: '',
    zipCode: '',
    country: '',
    primary: true,
    phoneNumber: '',
    addressType: 'Home',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      onCreate({
        name: data.name,
        phoneNumber: `${data.phoneNumber}, ${data.email}`,
        fullAddress: `${data.address}, # ${data.floor} - ${data.unit} ,Singapore ${data.zipCode}`,
        addressType: data.addressType,
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box sx={{ mb: 3 }}>
        <h2>Delivery Address</h2>
      </Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box
          sx={{
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="name" label="Full name" />

          <Field.Phone name="phoneNumber" label="Phone number" country="SG" />
        </Box>
        <Field.Text name="email" label="Email Address" type="email" />
        <Field.Text name="address" label="Address" />

        <Box
          sx={{
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
          }}
        >
          <Field.Text name="floor" label="Floor" />
          <Field.Text name="unit" label="Unit" />
          <Field.Text name="zipCode" label="Postal Code" />
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Proceed to Payment
        </LoadingButton>
      </Stack>
    </Form>
  );
}

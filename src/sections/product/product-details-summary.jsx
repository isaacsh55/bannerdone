import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
// import Link, { linkClasses } from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

// import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
// import { NumberInput } from 'src/components/number-input';

// ----------------------------------------------------------------------

export function ProductDetailsSummary({ items, product, addon, onAddToCart, disableActions, ...other }) {
  const router = useRouter();

  const {
    product_id,
    name,
    // sizes,
    price,
    // colors,
    image,
    // available,
    priceSale,
    // inventoryType,
    // subDescription,
  } = product;


  const {
    addon_id,
    addon_name,
    addon_price
  } = addon;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(product_id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === product_id).map((item) => item.quantity)[0];

  const defaultValues = {
    product_id,
    name,
    image,
    price,
    quantity: 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.info('DATA', JSON.stringify(data, null, 2));

    try {
      if (!existProduct) {
        onAddToCart?.({ ...data, colors: [values.colors] });
      }
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddToCart?.({
        ...values,
        subtotal: values.price * values.quantity,
        startdate: values.date
          ? new Date(
            new Date(values.date).getTime() +
            Math.abs(new Date(values.date).getTimezoneOffset()) * 60000
          ).toISOString().slice(0, 10)
          : null,
        starttype: values.startType || null,
        confirmedOrEdd: values.type || null,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddToCart, values]);

  const renderPrice = () => (
    <Box sx={{ typography: 'h5' }}>
      {/* {priceSale && ( */}
      <Box
        component="span"
        sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
      >
        {fCurrency(priceSale)}
      </Box>
      {/* )} */}

      {fCurrency(price)}
    </Box>
  );

  const renderdateSelection = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Start Date :
      </Typography>
      <Stack spacing={1}>
        <Field.DatePicker
          name="date"
          label="Select date"
          value={values.date}
          onChange={(date) => setValue('date', date)}
          sx={{ maxWidth: 'fullWidth' }}
        // minDate={new Date()}
        // maxDate={new Date(new Date().setFullYear(new Date().getFullYear
        //   () + 1)}
        />
      </Stack>
    </Box>
  );

  // const renderQuantity = () => (
  //   <Box sx={{ display: 'flex' }}>
  //     <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
  //       Quantity
  //     </Typography>

  //     <Stack spacing={1}>
  //       <NumberInput
  //         hideDivider
  //         value={values.quantity}
  //         onChange={(event, quantity) => setValue('quantity', quantity)}
  //         // max={available}
  //         sx={{ maxWidth: 112 }}
  //       />

  //       {/* <Typography
  //         variant="caption"
  //         component="div"
  //         sx={{ textAlign: 'right', color: 'text.secondary' }}
  //       >
  //         Available: {available}
  //       </Typography> */}
  //     </Stack>
  //   </Box>
  // );

  const renderStartType = () => (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Start with :
      </Typography>
      <Stack spacing={1} sx={{ flexGrow: 2 }}>
        <Controller
          name="startType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              onChange={(event) => field.onChange(event.target.value)}
            >
              <FormControlLabel value="lunch" control={<Radio />} label="Lunch" />
              <FormControlLabel value="dinner" control={<Radio />} label="Dinner" />
            </RadioGroup>
          )}
        />
      </Stack>
    </Box>
  );

  const renderDateStartType = () => (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Confirmed Start Date or E.D.D :
      </Typography>
      <Stack spacing={1} sx={{ flexGrow: 2 }}>
        <Controller
          name="type"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Field.Select
              {...field}
              size="medium"
              fullWidth
              sx={{ width: '100%' }}
              onChange={(event) => field.onChange(event.target.value)}
            >
              <MenuItem value="confirmed">Confirmed Start Date</MenuItem>
              <MenuItem value="edd">E.D.D</MenuItem>
            </Field.Select>
          )}
        />
      </Stack>
    </Box>
  );


  // const renderSpecialRequest = () => {
  //   const values = useWatch({ control });

  //   const SPECIAL_REQUEST_OPTIONS = [
  //     { label: 'No Pork Innards', value: 'No Pork Innards' },
  //     { label: 'No Pig Trotter', value: 'No Pig Trotter' },
  //     { label: 'No Hong Zhao Chicken/Fish', value: 'No Hong Zhao Chicken/Fish' },
  //     { label: 'No Chicken & Egg for the first 1 or 2 weeks', value: 'No Chicken & Egg for the first 1 or 2 weeks' },
  //     { label: 'No Papaya Fish Soup', value: 'No Papaya Fish Soup' },
  //     { label: 'No Salmon', value: 'No Salmon' },
  //     { label: 'No Snow/Sweet Peas', value: 'No Snow/Sweet Peas' },
  //     { label: 'No Sugar in Red Dates Tea', value: 'No Sugar in Red Dates Tea' },
  //     { label: 'No Weekend Deliveries', value: 'No Weekend Deliveries' },
  //   ];

  //   return (
  //     <Stack spacing={2} sx={{ width: '100%' }}>
  //       {/* Toggle checkbox */}
  //       <Controller
  //         name="specialRequestCheckbox"
  //         control={control}
  //         defaultValue={false}
  //         render={({ field }) => (
  //           <FormControlLabel
  //             control={
  //               <Checkbox
  //                 checked={field.value}
  //                 onChange={(e) => field.onChange(e.target.checked)}
  //               />
  //             }
  //             label="I have a special request"
  //           />
  //         )}
  //       />

  //       {/* Conditional rendering of special request checkboxes and notes */}
  //       {values?.specialRequestCheckbox && (
  //         <>
  //           <RHFMultiCheckbox
  //             name="specialRequests"
  //             label="Select your special requests"
  //             options={SPECIAL_REQUEST_OPTIONS}
  //           />

  //           <Controller
  //             name="specialRequestNotes"
  //             control={control}
  //             defaultValue=""
  //             render={({ field }) => (
  //               <Field.TextField
  //                 {...field}
  //                 fullWidth
  //                 placeholder="Additional notes or special instructions"
  //                 multiline
  //                 minRows={3}
  //               />
  //             )}
  //           />
  //         </>
  //       )}
  //     </Stack>
  //   );
  // };



  const renderAddOns = () => (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Typography variant="subtitle2">Add-ons</Typography>
      {Array.isArray(addon) && addon.length > 0 ? (
        addon.map((add) => (
          <Controller
            key={add.addon_id}
            name={`addons.${add.name}`}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Radio
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 1 }}>{add.name}</Typography>
                    <Typography color="text.secondary">
                      {fCurrency(add.price)}
                    </Typography>
                  </Box>
                }
              />
            )}
          />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No add-ons available.
        </Typography>
      )}
    </Stack>
  );

  const renderActions = () => (
    <Box sx={{ gap: 2, display: 'flex' }}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disableActions}
        size="large"
        color="primary"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to cart
      </Button>

      <Button
        fullWidth
        size="large"
        type="button"
        variant="contained"
        disabled={disableActions}
        onClick={async () => {
          try {
            await handleAddCart();
            router.push(paths.product.checkout);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Buy now
      </Button>
    </Box>
  );



  // const renderSubDescription = () => (
  //   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //     {subDescription}
  //   </Typography>
  // );

  // const renderLabels = () =>
  // (newLabel.enabled || saleLabel.enabled) && (
  // <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
  //   {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
  //   {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
  // </Box>
  // );

  // const renderInventoryType = () => (
  //   <Box
  //     component="span"
  //     sx={{
  //       typography: 'overline',
  //       color:
  //         (inventoryType === 'out of stock' && 'error.main') ||
  //         (inventoryType === 'low stock' && 'warning.main') ||
  //         'success.main',
  //     }}
  //   >
  //     {inventoryType}
  //   </Box>
  // );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {/* {renderLabels()} */}
          {/* {renderInventoryType()} */}

          <Typography variant="h5">{name}</Typography>

          {/* {renderRating()} */}
          {renderPrice()}
          {/* {renderSubDescription()} */}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* {renderColorOptions()}
        {renderSizeOptions()} */}
        {renderDateStartType()}
        {renderdateSelection()}
        {renderStartType()}

        {/* <Divider sx={{ borderStyle: 'dashed' }} />

        {renderSpecialRequest()} */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions()}
        {/* {renderShare()} */}
      </Stack>
    </Form>
  );
}

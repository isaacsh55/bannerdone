'use client';

import { union, isEqual } from 'es-toolkit';
import { getStorage } from 'minimal-shared/utils';
import { useLocalStorage } from 'minimal-shared/hooks';
import { useMemo, useState, Suspense, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { CheckoutContext } from './checkout-context';

// ----------------------------------------------------------------------

const CHECKOUT_STORAGE_KEY = 'app-checkout';
const CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];

const initialState = {
  items: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  starttype: null,
  startdate: null,
  confirmedOrEdd: null,
  totalItems: 0,
};

// ----------------------------------------------------------------------

export function CheckoutProvider({ children }) {
  return (
    <Suspense fallback={<SplashScreen />}>
      <CheckoutContainer>{children}</CheckoutContainer>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function CheckoutContainer({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStep = pathname.includes(paths.product.checkout)
    ? Number(searchParams.get('step'))
    : null;

  const [loading, setLoading] = useState(true);

  const { state, setState, setField, resetState } = useLocalStorage(
    CHECKOUT_STORAGE_KEY,
    initialState,
    { initializeWithValue: false }
  );

  const canReset = !isEqual(state, initialState);
  const completed = activeStep === CHECKOUT_STEPS.length; // completed when stripe payment is succesfull ( to be modified )

  const updateTotals = useCallback(() => {
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce((total, item) => total + item.quantity * item.price, 0);

    setField('subtotal', subtotal);
    setField('totalItems', totalItems);
    setField('total', subtotal - state.discount + state.shipping);
  }, [setField, state.discount, state.items, state.shipping]);

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        setLoading(true);
        const restoredValue = getStorage(CHECKOUT_STORAGE_KEY);
        if (restoredValue) {
          updateTotals();
        }
      } finally {
        setLoading(false);
      }
    };

    initializeCheckout();
  }, [updateTotals]);

  const onChangeStep = useCallback(
    (type, step) => {
      const stepNumbers = {
        back: (activeStep ?? 0) - 1,
        next: (activeStep ?? 0) + 1,
        go: step ?? 0,
      };

      const targetStep = stepNumbers[type];
      const queryString = new URLSearchParams({ step: `${targetStep}` }).toString();
      const redirectPath =
        targetStep === 0 ? paths.product.checkout : `${paths.product.checkout}?${queryString}`;

      router.push(redirectPath);
    },
    [activeStep, router]
  );

  const onPayment = async () => {
    // Call your backend API to create a Stripe Checkout Session
    try {
      const res = await fetch('http://localhost:3032/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: state.items }),
      });
      const data = await res.json();
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      }
    } catch (error) {
      console.error('error during checkout', error);
    }
  };

  const onAddToCart = useCallback(
    (newItem) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === newItem.id) {
          return {
            ...item,
            colors: union(item.colors, newItem.colors),
            quantity: item.quantity + newItem.quantity,
          };
        }
        return item;
      });

      if (!updatedItems.some((item) => item.id === newItem.id)) {
        updatedItems.push(newItem);
      }

      setField('items', updatedItems);
      setField('startdate', newItem.startdate);
      setField('starttype', newItem.starttype);
      setField('confirmedOrEdd', newItem.confirmedOrEdd);


    },
    [setField, state.items]
  );

  const onDeleteCartItem = useCallback(
    (itemId) => {
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      setField('items', updatedItems);
      if (updatedItems.length === 0) {
        resetState(initialState);
      }
    },
    [setField, state.items, resetState]
  );

  const onChangeItemQuantity = useCallback(
    (itemId, quantity) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });

      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onCreateBillingAddress = useCallback(
    (address) => {
      setField('billing', address);
    },
    [setField]
  );

  const onApplyDiscount = useCallback(
    (discount) => {
      setField('discount', discount);
    },
    [setField]
  );

  const onApplyShipping = useCallback(
    (shipping) => {
      setField('shipping', shipping);
    },
    [setField]
  );

  const onResetCart = useCallback(() => {
    resetState(initialState);
  }, [resetState]);


  const memoizedValue = useMemo(
    () => ({
      state,
      setState,
      setField,
      /********/
      activeStep,
      onChangeStep,
      steps: CHECKOUT_STEPS,
      /********/
      canReset,
      loading,
      completed,
      /********/
      onAddToCart,
      onResetCart,
      onApplyDiscount,
      onApplyShipping,
      onDeleteCartItem,
      onChangeItemQuantity,
      onCreateBillingAddress,
      onPayment
    }),
    [
      state,
      loading,
      canReset,
      setField,
      setState,
      completed,
      activeStep,
      onResetCart,
      onAddToCart,
      onChangeStep,
      onPayment,
      onApplyDiscount,
      onApplyShipping,
      onDeleteCartItem,
      onChangeItemQuantity,
      onCreateBillingAddress,
    ]
  );

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}

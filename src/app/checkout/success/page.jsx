'use client'
import { useEffect } from 'react';
import { useCheckoutContext } from 'src/sections/checkout/context';
import { CheckoutOrderComplete } from 'src/sections/checkout/checkout-order-complete';

export default function CheckoutSuccessPage() {
    const { onResetCart } = useCheckoutContext();
    useEffect(() => {
        onResetCart();
    }, [onResetCart]);

    return (
        <CheckoutOrderComplete
            open // ensures the Dialog is visible
            onResetCart={onResetCart}
            onDownloadPDF={() => { /* implement PDF download if needed */ }}
        />
    );
}
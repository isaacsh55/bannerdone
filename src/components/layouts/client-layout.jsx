'use client';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { SettingsDrawer } from 'src/components/settings';
import { CheckoutProvider } from 'src/sections/checkout/context';

export default function ClientLayout({ children }) {
    return (
        <CheckoutProvider>
            <Snackbar />
            <ProgressBar />
            <SettingsDrawer />
            {children}
        </CheckoutProvider>
    );
}

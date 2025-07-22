import { CONFIG } from 'src/global-config';

import { OverviewEcommerceView } from 'src/sections/overview/e-commerce/view';

// ----------------------------------------------------------------------

export const metadata = { title: `E-commerce | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewEcommerceView />;
}

import { CONFIG } from 'src/global-config';

import { MaintenanceView } from 'src/sections/maintenance/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Maintenance - ${CONFIG.appName}` };

export default function Page() {
  return <MaintenanceView />;
}

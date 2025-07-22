import { CONFIG } from 'src/global-config';

import { View403 } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `403 forbidden! | Error - ${CONFIG.appName}` };

export default function Page() {
  return <View403 />;
}

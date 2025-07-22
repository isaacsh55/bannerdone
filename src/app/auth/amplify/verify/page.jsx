import { CONFIG } from 'src/global-config';

import { AmplifyVerifyView } from 'src/auth/view/amplify';

// ----------------------------------------------------------------------

export const metadata = { title: `Verify | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return <AmplifyVerifyView />;
}

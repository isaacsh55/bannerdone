import { CONFIG } from 'src/global-config';

import { SplitSignInView } from 'src/auth/view/auth-demo/split';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return <SplitSignInView />;
}

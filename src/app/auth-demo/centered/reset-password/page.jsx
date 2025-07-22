import { CONFIG } from 'src/global-config';

import { CenteredResetPasswordView } from 'src/auth/view/auth-demo/centered';

// ----------------------------------------------------------------------

export const metadata = { title: `Reset password | Layout centered - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredResetPasswordView />;
}

import { AuthSplitLayout } from 'src/layouts/auth-split';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthSplitLayout
      slotProps={{
        section: { title: 'Hi, Welcome back' },
      }}
    >
      {children}
    </AuthSplitLayout>
  );
}

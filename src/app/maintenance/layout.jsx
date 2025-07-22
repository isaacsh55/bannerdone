import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <SimpleLayout
      slotProps={{
        content: { compact: true },
      }}
    >
      {children}
    </SimpleLayout>
  );
}

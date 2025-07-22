'use client';

import { createPaletteChannel } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

export const themeOverrides = {
  colorSchemes: {
    light: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#FACAD5',
          light: '#F8B5BA',
          main: '#F27C96',
          dark: '#BCBEC0',
          darker: '#6D6E71',
          contrastText: '#FFFFFF',
        }),
      },
    },
    dark: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#E4DCFD',
          light: '#A996F8',
          main: '#6950E8',
          dark: '#3828A7',
          darker: '#180F6F',
          contrastText: '#FFFFFF',
        }),
      },
    },
  },
};

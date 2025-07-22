"use client";
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function PostSort({ sort, sortOptions, onSort }) {
  const menuActions = usePopover();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
    >
      <MenuList>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={sort === option.value}
            onClick={() => {
              menuActions.onClose();
              onSort(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={menuActions.onOpen}
        endIcon={
          <Iconify
            icon={menuActions.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        }
        sx={{ fontWeight: 'fontWeightSemiBold', textTransform: 'capitalize' }}
      >
        Sort by:
        <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold' }}>
          {sort}
        </Box>
      </Button>

      {renderMenuActions()}
    </>
  );
}

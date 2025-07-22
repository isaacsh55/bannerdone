import { forwardRef } from 'react';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from 'src/components/iconify';
import { createNavItem, navItemStyles, navSectionClasses } from 'src/components/nav-section';

// ----------------------------------------------------------------------

export const NavItem = forwardRef((props, ref) => {
  const {
    path,
    icon,
    title,
    /********/
    open,
    active,
    /********/
    hasChild,
    className,
    externalLink,
    ...other
  } = props;

  const navItem = createNavItem({
    path,
    icon,
    hasChild,
    externalLink,
  });

  const ownerState = { open, active };

  return (
    <ItemRoot
      ref={ref}
      aria-label={title}
      {...ownerState}
      {...navItem.baseProps}
      className={mergeClasses([navSectionClasses.item.root, className], {
        [navSectionClasses.state.open]: open,
        [navSectionClasses.state.active]: active,
      })}
      {...other}
    >
      <ItemIcon {...ownerState}> {navItem.renderIcon}</ItemIcon>

      <ItemTitle {...ownerState}>{title}</ItemTitle>

      {hasChild && (
        <ItemArrow
          {...ownerState}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
        />
      )}
    </ItemRoot>
  );
});

const shouldForwardProp = (prop) => !['open', 'active', 'sx'].includes(prop);

/**
 * @slot root
 */
const ItemRoot = styled(ButtonBase, { shouldForwardProp })(({ theme }) => {
  const openStyles = {
    color: theme.vars.palette.text.primary,
    backgroundColor: theme.vars.palette.action.hover,
  };

  const activeStyles = {
    color: theme.vars.palette.primary.main,
    backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
    '&:hover': {
      backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
    },
  };

  return {
    gap: 16,
    height: 48,
    width: '100%',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(1.5),
    color: theme.vars.palette.text.secondary,
    variants: [
      { props: { open: true }, style: openStyles },
      { props: { active: true }, style: activeStyles },
    ],
  };
});

/**
 * @slot icon
 */
const ItemIcon = styled('span', { shouldForwardProp })(() => ({
  ...navItemStyles.icon,
}));

/**
 * @slot title
 */
const ItemTitle = styled('span', { shouldForwardProp })(({ theme }) => ({
  ...navItemStyles.title(theme),
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  variants: [
    {
      props: { active: true },
      style: { fontWeight: theme.typography.fontWeightSemiBold },
    },
  ],
}));

/**
 * @slot arrow
 */
const ItemArrow = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
  ...navItemStyles.arrow(theme),
}));

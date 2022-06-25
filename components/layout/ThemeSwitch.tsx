import React from 'react';
import { createStyles, Switch, Group, useMantineColorScheme } from '@mantine/core';
import { MoonIcon, SunIcon } from '@modulz/radix-icons';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    '& *': {
      cursor: 'pointer',
    },
  },

  icon: {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 1,
    top: 3,
  },

  iconLight: {
    left: 6,
    top: 4,
    color: theme.white,
  },

  iconDark: {
    right: 6,
    top: 4,
    color: theme.colors.gray[6],
  },
}));

export function ThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();

  return (
    <Group position="center">
      <div className={classes.root}>
        <SunIcon className={cx(classes.icon, classes.iconLight)} />
        <MoonIcon className={cx(classes.icon, classes.iconDark)} />
        <Switch
          radius={0}
          checked={colorScheme === 'dark'}
          onChange={() => toggleColorScheme()}
          size="md"
        />
      </div>
    </Group>
  );
}

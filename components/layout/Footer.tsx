import { Anchor, Box, createStyles, Group, Text } from '@mantine/core';
import React from 'react';
import { ThemeSwitch } from './ThemeSwitch';

const useStyles = createStyles((theme) => ({
  footer: {
    textAlign: 'center',
    maxWidth: theme.other.appMaxWidth,
    margin: '0 auto',
    padding: '20px 0',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.gray[9],
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: '0 auto',
      borderRadius: '0',
    },
  },
}));
const Footer = () => {
  const { classes } = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Group sx={{ justifyContent: 'center' }}>
        <Text sx={{ fontWeight: 'bold' }}>
          Made by <Anchor href="https://srujangurram.me">Srujan</Anchor>
        </Text>
        <ThemeSwitch />
      </Group>
    </Box>
  );
};

export default Footer;

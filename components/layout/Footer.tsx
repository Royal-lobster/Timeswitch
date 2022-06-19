import { Anchor, Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  footer: {
    padding: '20px',
    textAlign: 'center',
    maxWidth: theme.other.appMaxWidth,
    margin: '20px auto',
    backgroundColor: '#0000002a',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: '0 auto',
    },
  },
}));
const Footer = () => {
  const { classes } = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Text sx={{ fontWeight: 'bold' }}>
        Made by <Anchor href="https//srujangurram.me">Srujan</Anchor>
      </Text>
    </Box>
  );
};

export default Footer;

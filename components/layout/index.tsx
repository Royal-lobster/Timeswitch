import { Box, createStyles } from '@mantine/core';
import React from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  contentWrapper: {
    maxWidth: theme.other.appMaxWidth,
    margin: '10px auto 0 auto',
    width: '100%',
    padding: '20px',
  },
  footerWrapper: {
    marginTop: 'auto',
  },
}));

const Layout = ({ children }: LayoutProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.layout}>
      <Box className={classes.contentWrapper}>{children}</Box>
      <Box className={classes.footerWrapper}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;

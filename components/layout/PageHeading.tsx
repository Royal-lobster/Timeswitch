import { Box, createStyles, Group, ThemeIcon, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { RiTimer2Line } from 'react-icons/ri';

interface pageHeadingProps {
  title: string;
}
const useStyles = createStyles((theme) => ({
  pageHeadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pageHeading: {
    margin: '40px auto',
    cursor: 'pointer',
    textAlign: 'center',
    justifyContent: 'center',
  },
  pageHeadingSpan: {
    fontFamily: 'pacifico',
    color: theme.colors[theme.primaryColor][7],
  },
}));
const PageHeading = ({ title }: pageHeadingProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.pageHeadingContainer}>
      <Link href="/" passHref>
        <Group className={classes.pageHeading}>
          <ThemeIcon size="xl">
            <RiTimer2Line size={25} />
          </ThemeIcon>
          <Title>
            TimeSwitch <span className={classes.pageHeadingSpan}>{title}</span>
          </Title>
        </Group>
      </Link>
    </Box>
  );
};

export default PageHeading;

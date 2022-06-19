import { Box, createStyles, Group, ThemeIcon, Title } from '@mantine/core';
import { TimerIcon } from '@modulz/radix-icons';
import Link from 'next/link';
import React from 'react';

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
  },
  pageHeadingSpan: {
    fontFamily: 'pacifico',
    color: theme.colors.yellow[7],
  },
}));
const PageHeading = ({ title }: pageHeadingProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.pageHeadingContainer}>
      <Link href="/">
        <Group className={classes.pageHeading}>
          <ThemeIcon size="xl">
            <TimerIcon />
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

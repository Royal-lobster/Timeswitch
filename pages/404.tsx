import { Anchor, Box, Button, createStyles, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = createStyles((theme) => ({
  NotFoundContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10vh',
    padding: '80px',
  },
  title: {
    fontSize: 'min(100px, 15vw)',
    textAlign: 'center',
  },
  titleSpan: {
    fontFamily: 'pacifico',
    color: theme.colors[theme.primaryColor][5],
    fontSize: 'min(100px, 12vw)',
  },
  message: {
    fontSize: 'min(30px, 5vw)',
    textAlign: 'center',
  },
  homeButton: {
    marginTop: '20px',
  },
}));
const NotFound = () => {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Box className={classes.NotFoundContainer}>
      <Title order={1} className={classes.title}>
        404 {` `}
        <span className={classes.titleSpan}>Not Found</span>
      </Title>
      <Text className={classes.message}>Lost in the woods? </Text>
      <Button
        onClick={() => {
          router.push('/');
        }}
        size="lg"
        className={classes.homeButton}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;

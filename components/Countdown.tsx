import { Box, createStyles, Group, Text } from '@mantine/core';
import React from 'react';
import useCountdown from '../hooks/useCountdown';

interface CountdownProps {
  dateTime: string;
}

const useStyles = createStyles((theme) => ({
  countdownUnit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[9],
    borderRadius: '4px',
    width: 'min(100px, 20vw)',
    overflow: 'hidden',
  },
  digits: {
    fontSize: 'min(30px, 5vw)',
    color: theme.colors.yellow[6],
    padding: '10px',
    fontWeight: 'bold',
    width: '99%',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  digitsMarker: {
    fontSize: 'min(15px, 3vw)',
    backgroundColor: theme.colors.gray[8],
    padding: '5px',
    width: '100%',
    textAlign: 'center',
  },
}));

const padDigits = (num: number) => num.toString().padStart(2, '0');
export function Countdown({ dateTime }: CountdownProps) {
  const { classes } = useStyles();
  const { days, hours, minutes, seconds } = useCountdown(dateTime);
  return (
    <Group>
      <Box className={classes.countdownUnit}>
        <Text className={classes.digits}>{padDigits(days)}</Text>
        <Text className={classes.digitsMarker}>{days === 1 ? 'Day' : 'Days'}</Text>
      </Box>
      <Box className={classes.countdownUnit}>
        <Text className={classes.digits}>{padDigits(hours)}</Text>
        <Text className={classes.digitsMarker}>{hours === 1 ? 'Hour' : 'Hours'}</Text>
      </Box>
      <Box className={classes.countdownUnit}>
        <Text className={classes.digits}>{padDigits(minutes)}</Text>
        <Text className={classes.digitsMarker}>{minutes === 1 ? 'Minute' : 'Minutes'}</Text>
      </Box>
      <Box className={classes.countdownUnit}>
        <Text className={classes.digits}>{padDigits(seconds)}</Text>
        <Text className={classes.digitsMarker}>{seconds === 1 ? 'Second' : 'Seconds'}</Text>
      </Box>
    </Group>
  );
}

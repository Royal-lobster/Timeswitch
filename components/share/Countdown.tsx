import { Box, createStyles, Group, Stack, Text } from '@mantine/core';
import React, { useEffect, useMemo } from 'react';
import useCountdown from '../../hooks/useCountdown';
import dayjs from 'dayjs';
import { CountdownTitle } from './CountdownTitle';

interface CountdownProps {
  dateTime: string;
  countdownTimezone: string;
  setCountdownTimezone: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = createStyles((theme) => ({
  countdownBox: {
    transition: 'all 0.3s ease-in-out',
  },
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
export function Countdown({ dateTime, countdownTimezone, setCountdownTimezone }: CountdownProps) {
  const { classes } = useStyles();
  const { days, hours, minutes, seconds } = useCountdown(dateTime);
  const viewerLocation = useMemo(() => dayjs.tz.guess(), []);
  const [countdownAnimation, setCountdownAnimation] = React.useState(false);

  useEffect(() => {
    setCountdownAnimation(true);

    const clearAnimation = setTimeout(() => {
      setCountdownAnimation(false);
    }, 200);

    return () => clearTimeout(clearAnimation);
  }, [countdownTimezone]);

  return (
    <Stack>
      <CountdownTitle
        countdownTimezone={countdownTimezone}
        viewerLocation={viewerLocation}
        setCountdownTimezone={setCountdownTimezone}
      />
      <Group
        className={classes.countdownBox}
        sx={countdownAnimation ? { transform: 'scale(0.9)' } : { transform: 'scale(1)' }}
      >
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
    </Stack>
  );
}

import { Box, createStyles, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import useCountdown from '../../hooks/useCountdown';
import Confetti from './Confetti';

interface CountdownProps {
  dateTime: string;
  setTriggerReCalCreatorTime: React.Dispatch<React.SetStateAction<boolean>>;
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
    backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[2] : theme.colors.gray[9],
    width: 'min(100px, calc(100vw / 4 - 22px))',
    overflow: 'hidden',
  },
  digits: {
    fontSize: 'min(30px, 5vw)',
    color: theme.colors[theme.primaryColor][6],
    padding: '10px',
    fontWeight: 'bold',
    width: '99%',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  digitsMarker: {
    fontSize: 'min(15px, 3vw)',
    backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[4] : theme.colors.gray[8],
    padding: '5px',
    width: '100%',
    textAlign: 'center',
  },
}));

const padDigits = (num: number) => num.toString().padStart(2, '0');
export function Countdown({ dateTime, setTriggerReCalCreatorTime }: CountdownProps) {
  const { classes } = useStyles();
  const { days, hours, minutes, seconds } = useCountdown(dateTime);
  const [triggerConfetti, setTriggerConfetti] = React.useState(false);

  useEffect(() => {
    if (days + hours + minutes + seconds === 0) {
      setTimeout(() => {
        setTriggerReCalCreatorTime((p) => !p);
      }, 1000);
    }
  }, [days, hours, minutes, seconds, setTriggerReCalCreatorTime]);

  useEffect(() => {
    if (dayjs(dateTime).diff(dayjs(), 'second') <= 0) {
      setTriggerConfetti(true);
    }
  }, [days, hours, minutes, seconds, setTriggerConfetti]);

  return (
    <>
      {triggerConfetti && <Confetti />}
      <Stack>
        <Title order={2}>Countdown</Title>
        <Group className={classes.countdownBox}>
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
    </>
  );
}

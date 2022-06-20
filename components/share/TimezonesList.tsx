import { ActionIcon, Box, createStyles, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';
import ct from 'countries-and-timezones';
import ReactCountryFlag from 'react-country-flag';
import { Cross1Icon } from '@modulz/radix-icons';

interface TimezonesListProps {
  timezones: string[];
  creatorDateTime: dayjs.Dayjs;
}

const useStyles = createStyles((theme) => ({
  TimezoneListsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  Timezone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.gray[8]}`,
  },
  TimezoneDateTimeWrapper: {
    padding: '10px',
  },
  TimezoneDate: {
    fontSize: '12px',
    color: theme.colors.gray[6],
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TimezoneTime: {
    color: theme.colors.yellow[6],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timezoneNameWrapper: {
    backgroundColor: theme.colors.gray[9],
    padding: '10px',
    width: '100%',
  },
  timezoneName: {
    fontSize: '12px',
  },
}));

const TimezonesList = ({ timezones, creatorDateTime }: TimezonesListProps) => {
  const { classes } = useStyles();
  if (!timezones.length) return null;
  return (
    <Stack>
      <Title order={2}>Timezones</Title>
      <Box className={classes.TimezoneListsContainer}>
        {timezones.map((timezone, index) => (
          <Box className={classes.Timezone} key={index}>
            <Stack spacing={4} className={classes.TimezoneDateTimeWrapper}>
              <Text className={classes.TimezoneDate}>
                {creatorDateTime.tz(timezone).format('DD MMMM YYYY')}
              </Text>
              <Text className={classes.TimezoneTime}>
                {creatorDateTime.tz(timezone).format('hh:mm A')}
              </Text>
            </Stack>
            <Group spacing={5} className={classes.timezoneNameWrapper}>
              <ReactCountryFlag countryCode={ct.getTimezone(timezone)?.countries[0] || ''} />
              <Text className={classes.timezoneName}>{timezone}</Text>
            </Group>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default TimezonesList;

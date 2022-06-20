import { Countdown } from '../components/share/Countdown';
import React, { useEffect, useMemo } from 'react';
import { decode } from 'js-base64';
import { useRouter } from 'next/router';
import PageHeading from '../components/layout/PageHeading';
import { Box, createStyles, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TimezonesList from '../components/share/TimezonesList';
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

interface ShareData {
  title: string;
  description: string;
  date: string;
  time: string;
  creatorTimezone: string;
  timezones: string[];
}

const useStyles = createStyles((theme) => ({
  alignmentLayout: {
    width: '100%',
    margin: '0 auto',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      flexDirection: 'column',
    },
  },
  title: {
    paddingBottom: '10px',
    textDecoration: 'underline',
    textDecorationColor: theme.colors.yellow[7],
    textDecorationStyle: 'solid',
    textUnderlineOffset: '3px',
  },
  description: {
    padding: '20px',
    backgroundColor: theme.colors.gray[9],
    borderRadius: '4px',
  },
  startsOnDateTime: {
    fontWeight: 'bold',
    color: theme.colors.yellow[7],
    textDecoration: 'underline',
    textDecorationColor: theme.colors.yellow[7],
    textDecorationStyle: 'solid',
    textUnderlineOffset: '3px',
    padding: '0px 5px',
  },
}));

const Share = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const { data: encodedData } = router.query;

  const data = useMemo(() => {
    const decodedData = decode(encodedData as string);
    const data = JSON.parse(decodedData) as ShareData;
    return data;
  }, [encodedData]);

  const creatorDateTime = useMemo(() => {
    const date = dayjs(data.date).format('YYYY-MM-DD');
    const time = dayjs(data.time).format('hh:mm');
    return dayjs.tz(`${date} ${time}`, data.creatorTimezone);
  }, [data]);

  const viewerDateTime = useMemo(() => {
    const viewerTimezone = dayjs.tz.guess();
    const timezoneConverted = creatorDateTime.tz(viewerTimezone);
    return timezoneConverted.format('MMMM DD, YYYY hh:mm:ss');
  }, [creatorDateTime]);

  const isStackMode = useMemo(() => {
    return data.timezones && data.description.length < 120;
  }, [data]);

  return (
    <Box>
      <PageHeading title="View" />
      <Group
        align="start"
        className={classes.alignmentLayout}
        sx={{
          flexDirection: isStackMode ? 'column' : 'row',
          maxWidth: isStackMode ? '700px' : 'unset',
        }}
      >
        <Stack sx={{ flex: 1, width: '100%' }}>
          <Title className={classes.title}>{data.title}</Title>
          <Text className={classes.description}>{data.description}</Text>
          <Text>
            Event starts on
            <span className={classes.startsOnDateTime}>
              {dayjs.tz(creatorDateTime, dayjs.tz.guess()).format('DD MMM YYYY')}
            </span>{' '}
            at{' '}
            <span className={classes.startsOnDateTime}>
              {dayjs.tz(creatorDateTime, dayjs.tz.guess()).format('hh:mm A')}
            </span>{' '}
            in your local timezone
          </Text>
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <Countdown dateTime={viewerDateTime} />
          <TimezonesList timezones={data.timezones} creatorDateTime={creatorDateTime} />
        </Stack>
      </Group>
    </Box>
  );
};

export default Share;

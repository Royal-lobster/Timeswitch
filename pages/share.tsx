import { Countdown } from './../components/Countdown';
import React, { useMemo } from 'react';
import { decode } from 'js-base64';
import { useRouter } from 'next/router';
import PageHeading from '../components/layout/PageHeading';
import { Box, Center, Text } from '@mantine/core';
import useCountdown from '../hooks/useCountdown';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const Share = () => {
  const router = useRouter();
  const { data: encodedData } = router.query;

  const convertedDateTime = useMemo(() => {
    const decodedData = decode(encodedData as string);
    const data = JSON.parse(decodedData);

    const date = dayjs(data.date).format('YYYY-MM-DD');
    const time = dayjs(data.time).format('hh:mm');
    let creatorDateTime = `${date} ${time}`;
    const creatorDateTimeWithTimezone = dayjs.tz(creatorDateTime, data.creatorTimezone);

    const viewerTimezone = dayjs.tz.guess();
    const timezoneConverted = creatorDateTimeWithTimezone.tz(viewerTimezone);
    const viewerDateTime = timezoneConverted.format('MMMM DD, YYYY hh:mm:ss');

    return viewerDateTime;
  }, [encodedData]);

  return (
    <Box>
      <PageHeading title="View" />
      <Center>
        <Countdown dateTime={convertedDateTime} />
      </Center>
    </Box>
  );
};

export default Share;

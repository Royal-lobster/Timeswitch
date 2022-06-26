import { Button, Modal, Stack } from '@mantine/core';
import React, { useState } from 'react';
import { google, outlook, office365, yahoo, ics, CalendarEvent } from 'calendar-link';
import { RiCalendar2Line } from 'react-icons/ri';
import { BsGoogle, BsMicrosoft } from 'react-icons/bs';
import { FaYahoo } from 'react-icons/fa';

interface SaveToCalendarProps {
  event: CalendarEvent;
}
const calendarProviders = (event: CalendarEvent) => [
  {
    name: 'Google',
    icon: <BsGoogle />,
    link: google(event),
  },
  {
    name: 'Outlook',
    icon: <BsMicrosoft />,
    link: outlook(event),
  },
  {
    name: 'Yahoo',
    icon: <FaYahoo />,
    link: yahoo(event),
  },
  {
    name: 'Office365',
    icon: <BsMicrosoft />,
    link: office365(event),
  },
  {
    name: 'iCal',
    icon: <RiCalendar2Line />,
    link: ics(event),
  },
];
const SaveToCalendar = ({ event }: SaveToCalendarProps) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        size="xs"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select your Calendar"
      >
        <Stack>
          {calendarProviders(event).map((provider) => (
            <Button
              leftIcon={provider.icon}
              onClick={() => {
                window.open(provider.link, '_blank');
              }}
            >
              {provider.name}
            </Button>
          ))}
        </Stack>
      </Modal>

      <Button leftIcon={<RiCalendar2Line />} onClick={() => setOpened((o) => !o)}>
        Save to calendar
      </Button>
    </>
  );
};

export default SaveToCalendar;

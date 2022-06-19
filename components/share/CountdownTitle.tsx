import { ActionIcon, Badge, Group, Title } from '@mantine/core';
import { Cross2Icon } from '@modulz/radix-icons';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import ct from 'countries-and-timezones';

interface CountdownTitleProps {
  countdownTimezone: string;
  viewerLocation: string;
  setCountdownTimezone: React.Dispatch<React.SetStateAction<string>>;
}

export const CountdownTitle = ({
  countdownTimezone,
  viewerLocation,
  setCountdownTimezone,
}: CountdownTitleProps) => {
  const RemoveButton = countdownTimezone ? (
    <ActionIcon
      size="xs"
      radius="xl"
      variant="transparent"
      onClick={() => setCountdownTimezone('')}
    >
      <Cross2Icon />
    </ActionIcon>
  ) : null;
  return (
    <Group>
      <Title order={2}>Countdown</Title>
      <Badge
        size="lg"
        radius="xl"
        color="gray"
        sx={{
          fontSize: '10px',
          color: '#ccc',
        }}
        rightSection={RemoveButton}
        leftSection={
          <ReactCountryFlag
            style={{
              fontSize: '1.8em',
              lineHeight: '1.8em',
            }}
            countryCode={ct.getTimezone(countdownTimezone || viewerLocation)?.countries[0] || ''}
          />
        }
      >
        {countdownTimezone || viewerLocation}
      </Badge>
    </Group>
  );
};

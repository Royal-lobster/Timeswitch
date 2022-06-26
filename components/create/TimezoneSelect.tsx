import { Box, CloseButton, MultiSelectValueProps } from '@mantine/core';
import React, { forwardRef } from 'react';
import tz from 'countries-and-timezones';
import ReactCountryFlag from 'react-country-flag';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  country: string;
}

export const TimezoneValue = ({
  label,
  country,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & ItemProps) => (
  <div {...others}>
    <Box
      sx={(theme) => ({
        display: 'flex',
        cursor: 'default',
        alignItems: 'center',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        border: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]
        }`,
        paddingLeft: 10,
        borderRadius: 4,
      })}
    >
      <Box mr={10}>
        <ReactCountryFlag countryCode={country} />
      </Box>
      <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
      <CloseButton
        onMouseDown={onRemove}
        variant="transparent"
        size={22}
        iconSize={14}
        tabIndex={-1}
      />
    </Box>
  </div>
);

export const TimezoneItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ country, label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box mr={10}>
          <ReactCountryFlag countryCode={country} />
        </Box>
        <div>{label}</div>
      </Box>
    </div>
  )
);

export const tzData = Object.values(tz.getAllTimezones())
  .map((timezone) => {
    let label = timezone.name;
    const labelMatch = timezone.name.match(/^[^/]*\/(.*)$/);
    if (labelMatch) {
      label = labelMatch[1].replace(/\//g, ' - ');
    }
    return {
      label,
      value: timezone.name,
      group: timezone.name.split('/')[0],
      country: timezone.countries[0],
    };
  })
  .filter((item) => item.country !== undefined);

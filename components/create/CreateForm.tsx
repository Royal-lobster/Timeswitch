import {
  Anchor,
  Box,
  Button,
  ColorSwatch,
  createStyles,
  Group,
  MultiSelect,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React, { useEffect } from 'react';
import { encode } from 'js-base64';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useClipboard, useViewportSize } from '@mantine/hooks';
import { FaTelegramPlane } from 'react-icons/fa';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TimezoneItem, TimezoneValue, tzData } from './TimezoneSelect';

dayjs.extend(utc);
dayjs.extend(timezone);

const useStyles = createStyles((theme) => ({
  FormContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  MainFieldsWrapper: {
    display: 'flex',
    gap: '20px',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      flexDirection: 'column',
    },
  },
  FormSubmitBtn: {
    maxWidth: 'fit-content',
  },
  label: {
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? '#C1C2C5' : '#212529',
  },
}));

interface CreateFormProps {
  setPrimaryColor: (color: string) => void;
}

const CreateForm = ({ setPrimaryColor }: CreateFormProps) => {
  const { classes } = useStyles();
  const clipboard = useClipboard();
  const theme = useMantineTheme();
  const { width } = useViewportSize();

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      isRecurring: false,
      recurringFrequency: '',
      date: null,
      time: null,
      timezones: [],
    },
    validate: {
      title: (value) => (value ? null : 'Title is required'),
      date: (value) => (value ? null : 'Date is required'),
      time: (value) => (value ? null : 'Time is required'),
      recurringFrequency: (value) => {
        if (form.values.isRecurring) {
          return value ? null : 'Recurring frequency is required';
        }
        return null;
      },
    },
  });

  const handleFormSubmit = async (values: any) => {
    const data = {
      ...values,
      primaryColor: theme.primaryColor,
    };

    const dataString = JSON.stringify(data);
    const dataBase64 = encode(dataString);
    showNotification({
      id: 'share-link',
      title: 'Generating Share Link',
      message: 'Please wait while we generate your share link.',
      loading: true,
      autoClose: false,
      disallowClose: true,
    });
    const longURL = `${window.location.origin}/share?data=${dataBase64}`;
    try {
      const result = await fetch(`https://tinyurl.com/api-create.php?url=${longURL}`);
      const shortURL = await result.text();
      clipboard.copy(shortURL);
      updateNotification({
        id: 'share-link',
        title: 'Share Link Generated',
        message: (
          <Text>
            Your share link is: <Anchor href={shortURL}>{shortURL}</Anchor>
          </Text>
        ),
        autoClose: true,
        disallowClose: false,
      });
    } catch (e) {
      clipboard.copy(longURL);
      updateNotification({
        id: 'share-link',
        title: 'Share Link Generated',
        message: 'Link Copied to Clipboard',
        autoClose: true,
        disallowClose: false,
      });
    }
  };

  const swatches = Object.keys(theme.colors)
    .filter((c) => c !== 'dark')
    .reverse()
    .map((color) => (
      <ColorSwatch
        onClick={() => setPrimaryColor(color)}
        key={color}
        radius={0}
        sx={{
          cursor: 'pointer',
        }}
        color={theme.colors[color][6]}
      >
        {theme.primaryColor === color ? (
          <Box
            sx={{
              width: '60%',
              height: '60%',
              backgroundColor: theme.colors[color][9],
            }}
          />
        ) : null}
      </ColorSwatch>
    ));

  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  const disablePastDates = (displayedDate: Date) => {
    const now = new Date()
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return displayedDate < currentDate
  }

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack className={classes.FormContainer}>
        <Box className={classes.MainFieldsWrapper}>
          <Stack sx={{ flex: 1 }}>
            <TextInput
              {...form.getInputProps('title')}
              placeholder="Enter Title"
              size="md"
              radius={0}
              label="Event name"
            />
            <Switch {...form.getInputProps('isRecurring')} label="Recurring Event" radius={0} />
            <DatePicker
              {...form.getInputProps('date')}
              label="Event Date"
              placeholder="Select Date"
              size="md"
              radius={0}
              excludeDate={disablePastDates}
            />
            {form.values.isRecurring && (
              <Select
                {...form.getInputProps('recurringFrequency')}
                data={['Every Day', 'Alternate Days', 'Every Weak', 'Every Month', 'Every Year']}
                label="Recurring Frequency"
                placeholder="Select Frequency"
                size="md"
                radius={0}
              />
            )}
            <TimeInput
              {...form.getInputProps('time')}
              size="md"
              radius={0}
              label="Event Time"
              clearable
              format={width > 500 ? '12' : '24'}
            />
          </Stack>
          <Stack>
            <Textarea
              {...form.getInputProps('description')}
              sx={{ flex: 1, minWidth: '30vw' }}
              label="Description"
              placeholder="Enter description of the event"
              size="md"
              radius={0}
              minRows={8}
            />
            <Stack spacing={2} sx={{ maxWidth: '500px' }}>
              <Text className={classes.label}>Color Scheme</Text>
              <Group mt={3} spacing={10}>
                {swatches}
              </Group>
            </Stack>
          </Stack>
        </Box>
        <MultiSelect
          {...form.getInputProps('timezones')}
          data={tzData}
          label="Select Timezones"
          placeholder="Select Timezones for display"
          description="Time converted to these timezones will be present on share page along with user's time zone"
          size="md"
          radius={0}
          searchable
          valueComponent={TimezoneValue}
          itemComponent={TimezoneItem}
          styles={{
            dropdown: {
              maxWidth: '400px',
            },
          }}
        />
        <Button
          type="submit"
          className={classes.FormSubmitBtn}
          rightIcon={<FaTelegramPlane />}
          size="md"
          radius={0}
        >
          Create Event
        </Button>
      </Stack>
    </form>
  );
};

export default CreateForm;

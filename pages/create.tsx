import { createStyles, Stack } from '@mantine/core';
import React from 'react';
import Form from '../components/create/CreateForm';
import PageHeading from '../components/layout/PageHeading';

const useStyles = createStyles((theme) => ({
  createContainer: {
    padding: '20px',
  },
}));
const create = () => {
  const { classes } = useStyles();
  return (
    <Stack className={classes.createContainer}>
      <PageHeading title="Create" />
      <Form />
    </Stack>
  );
};

export default create;

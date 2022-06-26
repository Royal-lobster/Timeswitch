import { Stack } from '@mantine/core';
import React from 'react';
import CreateForm from '../components/create/CreateForm';
import PageHeading from '../components/layout/PageHeading';

interface createPageProps {
  setPrimaryColor: (color: string) => void;
}

const create = ({ setPrimaryColor }: createPageProps) => (
  <Stack>
    <PageHeading title="Create" />
    <CreateForm setPrimaryColor={setPrimaryColor} />
  </Stack>
);

export default create;

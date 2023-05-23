import React, { JSX } from 'react';
import { Priority } from '../../domains/priority/priority';
import { PageWrapper } from '../../components';

export const PriorityPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <Priority/>
    </PageWrapper>
  );
};

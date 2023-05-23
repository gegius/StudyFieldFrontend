import React, { JSX } from 'react';
import { DownloadUsersTable } from '../../domains/donwload-users-table';
import { PageWrapper } from '../../components';

export const DownloadUsersPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <DownloadUsersTable/>
    </PageWrapper>
  );
};

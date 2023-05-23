import React, { JSX } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { PageWrapper } from '../../components';
import { DeleteAllUsers } from '../../domains/delete-all-users';
import { LoadUsersList } from '../../domains/load-users-list';

export const ModifyUsersPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <Tabs
        defaultActiveKey={'load_users_list'}
        id={'uncontrolled-tab-example'}
        className={'mb-3'}
      >
        <Tab
          eventKey={'load_users_list'}
          title={'Загрузить список пользователей'}
        >
          <LoadUsersList/>
        </Tab>
        <Tab
          eventKey={'delete_all_users'}
          title={'Удалить всех пользователей'}
        >
          <DeleteAllUsers/>
        </Tab>
      </Tabs>
    </PageWrapper>
  );
};

import React from 'react';
import { Button } from 'react-bootstrap';
import { UserTableWrapper } from './user-table-wrapper';
import { EditableUserRow } from '../../../components';
import { loadUsersApi } from '../load-users.service';
import { TLoadedUser } from '../load-users.types';

type TUsersTable = {
  usersList: TLoadedUser[];
  isLoading: boolean
};

export const UsersTable = ({ usersList, isLoading }: TUsersTable) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <UserTableWrapper user={usersList[0]}>
        {usersList.map((user) => (
          <EditableUserRow
            key={user.userId}
            user={user}
            onUserChange={loadUsersApi.onUpdateUser}
          />
        ))}
      </UserTableWrapper>
      <Button
        disabled={isLoading}
        style={{ marginTop: '15px' }}
        variant={'danger'}
        onClick={loadUsersApi.dropUsersList}
      >
        {'Удалить список (все изменения исчезнут)'}
      </Button>
      <Button
        disabled={isLoading}
        style={{ marginTop: '10px' }}
        variant={'success'}
        onClick={loadUsersApi.loadUsersList}
      >
        {'Зарегистрировать пользователей и скачать их пароли'}
      </Button>
    </div>
  );
};

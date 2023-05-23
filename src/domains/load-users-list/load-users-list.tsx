import { useStore } from 'effector-react';
import React, { ChangeEvent, useState, JSX } from 'react';
import { Form } from 'react-bootstrap';
import { loadUsersApi } from './load-users.service';
import { getUsersFromXLS } from './load-users.utils';
import { TLoadedUser } from './load-users.types';
import { UsersTable, LoadUsersInfo } from './components';

export const LoadUsersList = (): JSX.Element => {
  const usersList = useStore(loadUsersApi.$usersToLoad);
  const isUserLoading = useStore(loadUsersApi.$isUsersLoading);
  const [isFileLoading, setIsFileLoading] = useState(false);

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    setIsFileLoading(true);
    getUsersFromXLS(event).then((users: TLoadedUser[]) => {
      loadUsersApi.setUsersList(users);
      setIsFileLoading(false);
    });
  }

  return (
    <>
      <Form.Text style={{ whiteSpace: 'break-spaces', paddingBottom: '10px', fontSize: '18px', fontWeight: '700' }}>
        {'Загрузить список пользователей'}
      </Form.Text>
      {!usersList.length ?
       <LoadUsersInfo
         isFileLoading={isFileLoading}
         handleFileUpload={handleFileUpload}
       />
                         :
       <UsersTable
         isLoading={isUserLoading}
         usersList={usersList}
       />
      }
    </>
  );
};

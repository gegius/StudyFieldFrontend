import { useStore } from 'effector-react';
import React, { useEffect, JSX } from 'react';
import { Spinner } from 'react-bootstrap';
import { Switch } from 'react-router-dom';
import { FullscreenWrapper } from '../components';
import { userApi } from '../models/user';
import { AdminRoot } from '../routes/admin-root';
import { UserRoot } from '../routes/user-root';

export const AuthorizedRoot = (): JSX.Element => {
  const isAdmin = useStore(userApi.$isAdmin);
  const isUserLoading = useStore(userApi.$isUserLoading);

  useEffect(() => {
    userApi.getUser();
  }, []);

  if (isUserLoading) {
    return (
      <FullscreenWrapper>
        <Spinner
          animation={'grow'}
          variant={'info'}
          style={{ width: '100px', height: '100px' }}
        />
      </FullscreenWrapper>
    );
  }

  return (
    <>
      <Switch>
        {isAdmin ? <AdminRoot/> : <UserRoot/>}
      </Switch>
    </>
  );
};

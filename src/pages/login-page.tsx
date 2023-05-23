import React, { FormEvent } from 'react';
import { Button } from 'react-bootstrap';
import { UnauthorizedRoutes } from '../routes/routes';
import { historyStore } from '../history-store';
import { PageWrapper } from '../components';
import { PasswordField } from '../domains/login/components/password-field';
import { UserIdField } from '../domains/login/components/user-id-field';
import { authApi } from '../models/auth/auth.service';

export const LoginPage = () => {
  const { submit } = authApi.$loginForm;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  return (
    <PageWrapper>
      <form onSubmit={onSubmit}>
        <div>
          <UserIdField/>
          <PasswordField/>
          <div
            onClick={() => historyStore.push(UnauthorizedRoutes.CHANGE_PASSWORD)}
            style={{ display: 'flex', alignSelf: 'self-start', marginLeft: '10px' }}
          >
            <p style={{ cursor: 'pointer', textDecoration: 'underline', margin: 0, fontSize: 14 }}>
              {'Сменить пароль'}
            </p>
          </div>
        </div>
        <div style={{ padding: '20px 10px 0px' }}>
          <Button
            type={'submit'}
            variant={'secondary'}
            style={{ width: '200px', height: '36px', borderRadius: '10px' }}
          >{'Войти'}</Button>
        </div>
      </form>
    </PageWrapper>
  );
};

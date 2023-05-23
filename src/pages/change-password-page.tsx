import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PageWrapper } from '../components';
import { authApi } from '../models/auth/auth.service';

export const ChangePasswordPage = () => {
  const [userId, setUserId] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  return (
    <PageWrapper>
      <Form>
        <div>
          <Form.Control
            type={'text'}
            style={{ marginBottom: '10px' }}
            placeholder={'Номер студенческого'}
            onChange={(event) => setUserId(event.target.value)}
            name={'Номер студенческого'}
            value={userId}
          />
          <Form.Control
            type={'password'}
            style={{ marginBottom: '10px' }}
            placeholder={'Старый пароль'}
            onChange={(event) => setOldPassword(event.target.value)}
            name={'Старый пароль'}
            value={oldPassword}
          />
          <Form.Control
            type={'password'}
            placeholder={'Новый пароль'}
            onChange={(event) => setNewPassword(event.target.value)}
            name={'Новый пароль'}
            value={newPassword}
          />
        </div>
        <div style={{ padding: '20px 10px 0px' }}>
          <Button
            variant={'secondary'}
            onClick={() => authApi.changePassword(userId, oldPassword, newPassword)}
            style={{ width: '200px', height: '36px', borderRadius: '10px' }}
          >
            {'Сменить пароль'}
          </Button>
        </div>
      </Form>
    </PageWrapper>
  );
};

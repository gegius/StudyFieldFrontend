import { useStore } from 'effector-react';
import React, { useState, JSX } from 'react';
import { Button, Form } from 'react-bootstrap';
import { deleteUsersApi } from './delete-all-users.service';
import { ConfirmModal } from '../../components';

export const DeleteAllUsers = (): JSX.Element => {
  const [isConfirmShow, setIsConfirmShow] = useState<boolean>(false);
  const isDeleteAllUsersPending = useStore(deleteUsersApi.$isDeleteAllUsersPending);

  function onConformDeleteUsers() {
    setIsConfirmShow(false);
    deleteUsersApi.deleteUsers();
  }

  return (
    <>
      <ConfirmModal
        isShow={isConfirmShow}
        title={'Удалить всех пользователей'}
        onClose={() => setIsConfirmShow(false)}
        onConfirm={onConformDeleteUsers}
      >
        <Form.Text style={{ whiteSpace: 'break-spaces' }}>
          {'Вы уверены, что хотите удалить всех пользователей?\n' +
           'Это действие нельзя отменить, изменения не коснутся администраторов'}
        </Form.Text>
      </ConfirmModal>
      <Button
        variant={'danger'}
        disabled={isDeleteAllUsersPending}
        onClick={() => setIsConfirmShow(true)}
      >
        {'Удалить всех пользователей'}
      </Button>
    </>
  );
};

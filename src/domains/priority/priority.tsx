import { useStore } from 'effector-react';
import React, { JSX } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PriorityTable } from './components';
import { userApi } from '../../models/user';

export const Priority = (): JSX.Element => {
  const user = useStore(userApi.$user)!;
  const isSetPriorityLoading = useStore(userApi.$isSendPriorityPending);
  const isDocumentDownloadVisible = useStore(userApi.$isDocumentDownloadVisible);

  return (
    <Form style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Text
        style={{
          textAlign: 'center',
          whiteSpace: 'break-spaces',
          paddingBottom: '10px',
          fontSize: '18px',
          fontWeight: '700',
          color: 'black'
        }}
      >
        {`${user.lastName} ${user.firstName} ${user.middleName} ${user.groupId}`}
      </Form.Text>
      <Form.Text
        style={{ whiteSpace: 'break-spaces', paddingBottom: '10px' }}
        className={'text-muted'}
      >
        {'Расставьте приоритеты и нажмите "Сохранить", после чего вы сможете скачать заявление'}
      </Form.Text>
      <PriorityTable user={user}/>
      <Button
        disabled={isSetPriorityLoading}
        onClick={userApi.sendPriority}
      >
        {'Сохранить приоритеты и сформировать заявление'}
      </Button>
      {isDocumentDownloadVisible &&
       <Button
         onClick={userApi.downloadStatement}
         style={{ marginTop: 30 }}
         size={'lg'}
         variant={'link'}
       >
         {'Скачать заявление'}
       </Button>}
    </Form>
  );
};

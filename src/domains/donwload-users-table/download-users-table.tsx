import React, { JSX, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { downloadUsersTableApi } from './download-users-table.service';

export const DownloadUsersTable = (): JSX.Element => {
  const [groupId, setGroupId] = useState<string>('');

  return (
    <div className={'container'}>
      <Form>
        <Form.Group
          style={{ display: 'flex', flexDirection: 'column' }}
          controlId={'formFileMultiple'}
        >
          <Form.Text
            style={{ whiteSpace: 'break-spaces', paddingBottom: '10px' }}
            className={'text-muted'}
          >
            {'Вы можете скачать файл с данными\nпо конкретной материнской группе'}
          </Form.Text>
          <Form.Control
            type={'text'}
            placeholder={'01.00.00'}
            onChange={(event) => setGroupId(event.target.value)}
            name={'groupInput'}
            value={groupId}
          />
        </Form.Group>
        <Button
          onClick={() => downloadUsersTableApi.downloadUsers(groupId)}
          style={{ width: '100%', marginTop: '15px' }}
        >
          {'Скачать'}
        </Button>
      </Form>
    </div>
  );
};

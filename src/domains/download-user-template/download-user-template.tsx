import React, { JSX, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { downloadUsersTemplateApi } from './download-user-template.service';

export const DownloadUserTemplate = (): JSX.Element => {
  const [userId, setUserId] = useState<string>('');

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
            {'Вы можете скачать заявление\nстудента по его студенческому'}
          </Form.Text>
          <Form.Control
            type={'text'}
            placeholder={'Номер студенческого'}
            onChange={(event) => setUserId(event.target.value)}
            name={'userIdInput'}
            value={userId}
          />
        </Form.Group>
        <Button
          onClick={() => downloadUsersTemplateApi.downloadUserTemplate(userId)}
          style={{ width: '100%', marginTop: '15px' }}
        >
          {'Скачать'}
        </Button>
      </Form>
    </div>
  );
};

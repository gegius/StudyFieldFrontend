import React from 'react';
import { Button, Form } from 'react-bootstrap';

type TLoadUsersInfo = {
  isFileLoading: boolean,
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const LoadUsersInfo = ({ isFileLoading, handleFileUpload }: TLoadUsersInfo) => {
  return (
    <Form>
      <Form.Text
        style={{ whiteSpace: 'break-spaces', paddingBottom: '10px' }}
        className={'text-muted'}
      >
        {'В таблице должны быть поля:\n' +
         'номер студенческого (userId), имя (firstName), фамилия (lastName),\n' +
         'отчество (middleName), номер группы (groupId), код направления (groupCode)'}
      </Form.Text>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
        <Button
          disabled={isFileLoading}
          style={{ width: '300px', height: '36px' }}
          variant={'primary'}
          onClick={() => document.getElementById('fileInput')!.click()}
        >
          {'Загрузить файл'}
          <input
            type={'file'}
            id={'fileInput'}
            accept={'.xls,.xlsx'}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </Button>
      </div>
    </Form>
  );
};

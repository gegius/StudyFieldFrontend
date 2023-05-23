import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type TUserCell = {
  isEdited: boolean,
  name: string,
  value: string,
  isShowEdit: boolean,
  changeEditMode: (name: string) => void,
  onValueChange: (value: string) => void
}

export const UserCell = ({
  isEdited,
  name,
  value,
  changeEditMode,
  isShowEdit,
  onValueChange
}: TUserCell) => {
  const [changedValue, setChangedValue] = useState<string>(value);

  function onSaveChange() {
    changeEditMode('');
    onValueChange(changedValue);
  }

  const editCell = (
    <div
      style={{ display: 'flex', flexDirection: 'column', padding: '5px' }}
    >
      <input
        style={{ width: '150px', marginBottom: '5px' }}
        type={'text'}
        name={'firstName'}
        defaultValue={value}
        onChange={(event) => setChangedValue(event.target.value)}
      />
      <Button
        size={'sm'}
        variant={'outline-success'}
        onClick={onSaveChange}
      >
        {'Закончить'}
      </Button>
    </div>
  );

  const cell = (
    <Form style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '31px' }}>
      <Form.Text
        style={{ whiteSpace: 'break-spaces', paddingBottom: '10px' }}
        className={'text-muted'}
      >
        {value}
      </Form.Text>
      {isShowEdit &&
       <Button
         style={{ marginLeft: '5px' }}
         onClick={() => changeEditMode(name)}
         size={'sm'}
         variant={'outline-success'}
       >
         {'✎'}
       </Button>
      }
    </Form>
  );

  return <>{isEdited ? editCell : cell}</>;
};

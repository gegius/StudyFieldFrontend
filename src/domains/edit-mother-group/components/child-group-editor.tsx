import { useField } from 'effector-forms';
import React, { JSX } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ChildGroupField } from './child-group-field';
import { TNewChildGroup } from '../edit-mother-group.types';
import { editMotherGroupApi } from '../edit-mother-group.service';
import { v4 as uuidv4 } from 'uuid';

export const ChildGroupEditor = (): JSX.Element => {
  const {
    value: childGroups,
    onChange: onChangeChildGroups,
    errorText,
    hasError
  } = useField(editMotherGroupApi.$newMotherGroup.fields.childGroups);
  const isAddGroupDisabled = !!childGroups.find((group) => !group.groupCode || !group.groupName);

  function onAddChildGroup() {
    onChangeChildGroups([...childGroups, { groupCode: '', groupName: '', id: uuidv4() }]);
  }

  function onChangeValue(groupId: string, changedValue: string, changedField: keyof TNewChildGroup) {
    onChangeChildGroups(childGroups.map((group) => {
      if (group.id === groupId) {
        return { ...group, [changedField]: changedValue };
      }
      return group;
    }));
  }

  function removeChildGroup(groupId: string) {
    onChangeChildGroups(childGroups.filter((group) => group.id !== groupId));
  }

  return (
    <Form.Group controlId={'formChildGroups'}>
      <Button
        variant={'primary'}
        disabled={isAddGroupDisabled}
        onClick={onAddChildGroup}
      >
        {'Добавить дочернюю группу'}
      </Button>
      {childGroups.map(({ id, groupCode, groupName }, index) => (
        <div key={id}>
          <hr/>
          <h5>Дочерняя группа {index + 1}</h5>
          <ChildGroupField
            errorMessage={errorText()}
            value={groupCode}
            id={id}
            isError={hasError()}
            title={'Код дочерней группы'}
            onChangeValue={(value) => onChangeValue(id, value, 'groupCode')}
          />
          <ChildGroupField
            errorMessage={errorText()}
            value={groupName}
            id={id}
            isError={hasError()}
            title={'Название дочерней группы'}
            onChangeValue={(value) => onChangeValue(id, value, 'groupName')}
          />
          <Button
            style={{ width: '100%' }}
            variant={'danger'}
            onClick={() => removeChildGroup(id)}
          >
            {'Удалить дочернюю группу'}
          </Button>
        </div>
      ))}
    </Form.Group>
  );
};

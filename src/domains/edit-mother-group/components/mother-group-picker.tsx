import React, { JSX } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { TMotherGroup } from '../edit-mother-group.types';

type TMotherGroupPicker = {
  motherGroups: TMotherGroup[],
  onSelectedGroup: (motherGroup: TMotherGroup | null) => void,
  onAddNewGroup: (value: boolean) => void,
}

export const MotherGroupPicker = ({
  motherGroups,
  onSelectedGroup,
  onAddNewGroup
}: TMotherGroupPicker): JSX.Element => {

  function onClearClick() {
    onSelectedGroup(null);
    onAddNewGroup(false);
  }

  function onGroupClick(motherGroup: TMotherGroup) {
    onSelectedGroup(motherGroup);
    onAddNewGroup(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'min-content' }}>
      <DropdownButton
        style={{ marginBottom: '15px' }}
        id={'user-select'}
        title={'Выберите группу'}
      >
        {motherGroups.map((motherGroup: TMotherGroup) => (
          <Dropdown.Item
            key={motherGroup.groupCode}
            onClick={() => onGroupClick(motherGroup)}
          >
            {motherGroup.groupName}
          </Dropdown.Item>
        ))}
        {!!motherGroups.length && <Dropdown.Divider/>}
        <Dropdown.Item onClick={() => onAddNewGroup(true)}>
          {'Новая группа'}
        </Dropdown.Item>
      </DropdownButton>
      <Button
        onClick={onClearClick}
        style={{ marginLeft: '5px' }}
        variant={'link'}
        size={'sm'}
      >
        {'Очистить'}
      </Button>
    </div>
  );
};

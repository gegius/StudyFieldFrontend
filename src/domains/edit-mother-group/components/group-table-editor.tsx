import React, { JSX } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GroupTableWrapper } from '../../../components';
import { TMotherGroup } from '../edit-mother-group.types';

type TGroupTableEditor = {
  selectedGroup: TMotherGroup,
  onMotherGroupDelete: (group: TMotherGroup) => void
}

export const GroupTableEditor = ({ selectedGroup, onMotherGroupDelete }: TGroupTableEditor): JSX.Element => {
  return (
    <Form>
      <GroupTableWrapper childGroupsLength={selectedGroup.childGroups.length}>
        <tr>
          <td>
            {selectedGroup.groupCode}
          </td>
          <td>
            {selectedGroup.groupName}
          </td>
          {selectedGroup.childGroups.map((childGroup) =>
            (
              <td
                key={childGroup.groupCode}
                style={{ wordBreak: 'break-word' }}
              >
                <Form.Text>{childGroup.groupCode}</Form.Text>
                <br/>
                <Form.Text>{childGroup.groupName}</Form.Text>
              </td>
            )
          )}
        </tr>
      </GroupTableWrapper>
      <Button
        variant={'danger'}
        style={{ marginTop: '10px', width: '100%' }}
        onClick={() => onMotherGroupDelete(selectedGroup)}
      >
        {'Удалить группу'}
      </Button>
    </Form>
  );
};

import React, { ChangeEvent, JSX } from 'react';
import { Form, Table } from 'react-bootstrap';
import { TUser } from '../../../models/user/user.types';
import { userApi } from '../../../models/user';

type TPriorityTable = {
  user: TUser
}

export const PriorityTable = ({ user }: TPriorityTable): JSX.Element => {
  const priorityValues = user.childGroups.map((_, index) => index + 1);

  function onChangePriority(e: ChangeEvent<HTMLSelectElement>, changedGroupCode: string) {
    const changedGroup = user.childGroups.find(group => group.groupCode === changedGroupCode);
    if (!changedGroup) {
      return;
    }
    const newPriority = Number(e.target.value);
    const nextGroup = user.childGroups.find((group) => group.priority === newPriority);
    if (nextGroup) {
      nextGroup.priority = changedGroup.priority;
    }
    changedGroup.priority = newPriority;
    userApi.changePriority(user.childGroups);
  }

  return (
    <Table
      striped
      bordered
      hover
    >
      <thead>
      <tr>
        <th>Приоритет</th>
        <th>Группа</th>
      </tr>
      </thead>
      <tbody>
      {user.childGroups.map(({ groupCode, groupName, priority }) => {
        return (
          <tr key={groupCode}>
            <td>
              <Form.Select
                value={priority}
                onChange={(event) => onChangePriority(event, groupCode)}
                aria-label={'Default select example'}
              >
                {priorityValues.map((value) => {
                  return <option
                    key={groupCode + value}
                    value={value}
                  >{value}</option>;
                })}
              </Form.Select>
            </td>
            <td>{`${groupCode} ${groupName}`}</td>
          </tr>
        );
      })
      }
      </tbody>
    </Table>
  );
};

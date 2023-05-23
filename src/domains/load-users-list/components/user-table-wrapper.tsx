import React, { JSX } from 'react';
import { Table } from 'react-bootstrap';
import { TLoadedUser } from '../load-users.types';

type TUserTableWrapper = {
  children: JSX.Element[] | JSX.Element,
  user: TLoadedUser
}

export const UserTableWrapper = ({ children, user }: TUserTableWrapper) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
    >
      <thead>
      <tr>
        {Object.keys(user).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {children}
      </tbody>
    </Table>
  );
};

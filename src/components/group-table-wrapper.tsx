import React, { JSX } from 'react';
import { Table } from 'react-bootstrap';

type TGroupTableWrapper = {
  children: JSX.Element[] | JSX.Element
  childGroupsLength: number
}

export const GroupTableWrapper = ({ children, childGroupsLength }: TGroupTableWrapper) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
    >
      <thead>
      <tr>
        <th>{'Код группы'}</th>
        <th>{'Название группы'}</th>
        {
          Array.from(Array(childGroupsLength).keys())
               .map((value) => (<th key={value}>{`Дочерняя группа ${value + 1}`}</th>
               ))
        }
      </tr>
      </thead>
      <tbody>
      {children}
      </tbody>
    </Table>
  );
};

import React from 'react';
import { Form } from 'react-bootstrap';

type TChildGroupField = {
  id: string,
  value: string,
  onChangeValue: (value: string) => void,
  title: string,
  isError: boolean,
  errorMessage: string
}

export const ChildGroupField = ({ id, onChangeValue, value, isError, errorMessage, title }: TChildGroupField) => {
  return (
    <Form.Group
      style={{ paddingBottom: '15px' }}
      controlId={`formGroup${id} ${title}`}
    >
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type={'text'}
        placeholder={title}
        onChange={(event) => onChangeValue(event.target.value)}
        name={`group ${id} ${title}`}
        defaultValue={value}
      />
      {isError && !value && (
        <Form.Text className={'text-danger'}>{errorMessage}</Form.Text>
      )}
    </Form.Group>
  );
};

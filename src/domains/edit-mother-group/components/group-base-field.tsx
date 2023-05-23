import { Field, useField } from 'effector-forms';
import React, { JSX } from 'react';
import { Form } from 'react-bootstrap';

type TGroupCodeField = {
  field: Field<string>
  label: string,
  placeholder: string
}

export const GroupBaseField = ({ field, label, placeholder }: TGroupCodeField): JSX.Element => {
  const {
    value,
    onChange,
    errorText,
    hasError
  } = useField(field);

  return (
    <div style={{ paddingBottom: '15px' }}>
      <Form.Group controlId={Object.keys(field)[0]}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={'text'}
          placeholder={placeholder}
          name={label}
        />
        {hasError() && <Form.Text className='text-danger'>{errorText()}</Form.Text>}
      </Form.Group>
    </div>
  );
};

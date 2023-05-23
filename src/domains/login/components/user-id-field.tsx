import { useField } from 'effector-forms';
import React, { ChangeEvent } from 'react';
import { authApi } from '../../../models/auth';

export const UserIdField = () => {
  const { value, onChange } = useField(authApi.$loginForm.fields.userId);

  return (
    <div style={{ padding: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div>{'Номер студенческого'}</div>
      <input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        style={{ width: '200px', height: '25px', borderRadius: '5px', borderWidth: '2px', margin: '5px' }}
      />
    </div>
  );
};

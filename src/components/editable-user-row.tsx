import React, { useEffect, useState } from 'react';
import { UserCell } from './user-cell';
import { TLoadedUser } from '../domains/load-users-list';

type TEditableRow = {
  user: TLoadedUser;
  onUserChange: (changedUser: TLoadedUser) => void;
}

export const EditableUserRow = ({ user, onUserChange }: TEditableRow) => {
  const [editedField, setEditedField] = useState<string>('');
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);

  useEffect(() => {
    setIsShowEdit(false);
    setEditedField('');
  }, [user]);

  const handleChange = (changedValue: string, fieldName: string) => {
    onUserChange({ ...user, [fieldName]: changedValue });
  };

  return (
    <>
      <tr
        onMouseEnter={() => setIsShowEdit(true)}
        onMouseLeave={() => setIsShowEdit(false)}
      >
        <td>{user.userId}</td>
        {
          Object.keys(user).map((field: string) => {
            if (field !== 'userId') {
              return (
                <td key={field}>
                  <UserCell
                    isEdited={editedField === field}
                    name={field}
                    value={user[field]}
                    isShowEdit={isShowEdit}
                    changeEditMode={setEditedField}
                    onValueChange={(newValue) => handleChange(newValue, field)}
                  />
                </td>
              );
            }
          })
        }
      </tr>
    </>
  );
};


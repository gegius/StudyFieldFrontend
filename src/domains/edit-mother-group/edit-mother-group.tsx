import { useStore } from 'effector-react';
import React, { JSX, useEffect, useState } from 'react';
import { GroupTableEditor, MotherGroupEditor } from './components';
import { TMotherGroup } from './edit-mother-group.types';
import { editMotherGroupApi } from './edit-mother-group.service';
import { MotherGroupPicker } from './components/mother-group-picker';

export const EditMotherGroup = (): JSX.Element => {
  const motherGroups = useStore(editMotherGroupApi.$motherGroups);
  const [isShowNewGroup, setIsShowNewGroup] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<TMotherGroup | null>(null);

  useEffect(() => {
    editMotherGroupApi.getMotherGroupsList();
  }, []);

  function onMotherGroupDelete(group: TMotherGroup) {
    editMotherGroupApi.deleteMotherGroup(group);
    setSelectedGroup(null);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px' }}>
      <MotherGroupPicker
        motherGroups={motherGroups}
        onSelectedGroup={setSelectedGroup}
        onAddNewGroup={setIsShowNewGroup}
      />
      {!!selectedGroup && !isShowNewGroup &&
       <GroupTableEditor
         selectedGroup={selectedGroup}
         onMotherGroupDelete={onMotherGroupDelete}
       />}
      {isShowNewGroup && <MotherGroupEditor/>}
    </div>
  );
};

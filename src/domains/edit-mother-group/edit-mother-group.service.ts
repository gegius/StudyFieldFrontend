import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { createForm } from 'effector-forms';
import {
  deleteMotherGroupTransportFx,
  getMotherGroupsListTransportFx,
  setMotherGroupTransportFx
} from './edit-mother-group.transport';
import { TGetMotherGroupsListResponse, TMotherGroup } from './edit-mother-group.types';

const onGetMotherGroupsList = createEvent();
const onDeleteMotherGroup = createEvent<TMotherGroup>();
const $motherGroups = createStore<TMotherGroup[]>([])
  .on(getMotherGroupsListTransportFx.doneData, (_, { motherGroups }: TGetMotherGroupsListResponse) =>
    motherGroups)
  .on(onDeleteMotherGroup, (oldGroups, groupToDelete: TMotherGroup) =>
    oldGroups.filter((group) => group !== groupToDelete));

forward({
  from: onGetMotherGroupsList,
  to: getMotherGroupsListTransportFx
});

sample({
  clock: onDeleteMotherGroup,
  fn: ({ groupCode }: TMotherGroup) => ({ groupCode }
  ),
  target: deleteMotherGroupTransportFx
});

export const $newMotherGroup = createForm<TMotherGroup>({
  fields: {
    groupCode: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value),
          errorText: 'Это обязательное поле'
        }
      ]
    },
    groupName: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value),
          errorText: 'Это обязательное поле'
        }
      ]
    },
    childGroups: {
      init: [],
      rules: [
        {
          name: 'required array',
          validator: (array) => !!array.length
        },
        {
          name: 'required in array',
          validator: (childGroups) => !childGroups.find((group) => !group.groupCode || !group.groupName),
          errorText: 'Это обязательное поле'
        }
      ]
    }
  },
  validateOn: ['change']
});

forward({
  from: setMotherGroupTransportFx.done,
  to: [createEffect(() => $newMotherGroup.reset()), getMotherGroupsListTransportFx]
});

sample({
  clock: $newMotherGroup.formValidated,
  source: $newMotherGroup.$values,
  fn: (motherGroup: TMotherGroup) => (motherGroup
  ),
  target: setMotherGroupTransportFx
});

export const editMotherGroupApi = {
  $motherGroups,
  getMotherGroupsList: () => {
    onGetMotherGroupsList();
  },
  deleteMotherGroup: (group: TMotherGroup) => {
    onDeleteMotherGroup(group);
  },
  $newMotherGroup
};

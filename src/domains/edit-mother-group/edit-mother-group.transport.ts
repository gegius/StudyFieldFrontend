import { createEffect, sample } from 'effector';
import { alertApi, TAlertData } from '../../models/notify';
import { deleteMotherGroup, getMotherGroupsList, setMotherGroup } from '../../api';
import { TDeleteMotherGroup, TGetMotherGroupsListResponse, TMotherGroup } from './edit-mother-group.types';

export const getMotherGroupsListTransportFx = createEffect<void, TGetMotherGroupsListResponse>();
getMotherGroupsListTransportFx.use(getMotherGroupsList);
export const deleteMotherGroupTransportFx = createEffect<TDeleteMotherGroup, boolean>();
deleteMotherGroupTransportFx.use(deleteMotherGroup);
export const setMotherGroupTransportFx = createEffect<TMotherGroup, void>();
setMotherGroupTransportFx.use(setMotherGroup);

sample({
  clock: deleteMotherGroupTransportFx.doneData,
  fn: () => ({ message: 'Материнская группа успешно удалена', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: deleteMotherGroupTransportFx.failData,
  fn: () => ({ message: 'Ошибка удаления материнской группы', type: 'danger' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: setMotherGroupTransportFx.doneData,
  fn: () => ({ message: 'Материнская группа успешно создана', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: setMotherGroupTransportFx.failData,
  fn: () => ({ message: 'Ошибка создания материнской группы', type: 'danger' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

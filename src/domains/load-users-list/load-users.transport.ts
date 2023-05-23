import { createEffect, sample } from 'effector';
import { alertApi, TAlertData } from '../../models/notify';
import { createUsers } from '../../api';
import { TLoadUsersRequest } from './load-users.types';

export const loadUsersTransportFx = createEffect<TLoadUsersRequest, boolean>();
loadUsersTransportFx.use(createUsers);

sample({
  clock: loadUsersTransportFx.doneData,
  fn: () => ({ message: 'Пользователи успешно загружены', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: loadUsersTransportFx.failData,
  fn: () => ({ message: 'Ошибка загрузки пользователей', type: 'danger' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

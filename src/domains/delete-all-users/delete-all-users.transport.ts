import { createEffect, sample } from 'effector';
import { alertApi, TAlertData } from '../../models/notify';
import { deleteAllUsers } from '../../api';

export const deleteAllUsersTransportFx = createEffect<void, string>();
deleteAllUsersTransportFx.use(deleteAllUsers);

sample({
  clock: deleteAllUsersTransportFx.doneData,
  fn: () => ({ message: 'Все пользователи удалены (кроме администраторов)', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: deleteAllUsersTransportFx.failData,
  fn: () => ({ message: 'Ошибка удаления пользователей', type: 'danger' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

import { createEffect, sample } from 'effector';
import { alertApi, TAlertData } from '../../models/notify';
import { downloadUsersTable } from '../../api';

export const downloadUsersTableTransportFx = createEffect<string, boolean>();
downloadUsersTableTransportFx.use(downloadUsersTable);

sample({
  clock: downloadUsersTableTransportFx.doneData,
  fn: () => ({ message: 'Документ скачивается', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: downloadUsersTableTransportFx.failData,
  fn: () => ({ message: 'Ошибка скачивания документа', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

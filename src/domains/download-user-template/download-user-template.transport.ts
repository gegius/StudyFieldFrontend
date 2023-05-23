import { createEffect, sample } from 'effector';
import { alertApi, TAlertData } from '../../models/notify';
import { downloadUserTemplate } from '../../api';

export const downloadUserTemplateTransportFx = createEffect<string, boolean>();
downloadUserTemplateTransportFx.use(downloadUserTemplate);

sample({
  clock: downloadUserTemplateTransportFx.doneData,
  fn: () => ({ message: 'Документ скачивается', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: downloadUserTemplateTransportFx.failData,
  fn: () => ({ message: 'Ошибка скачивания документа', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

import { createEffect, sample } from 'effector';
import { TSendDocumentTemplateResponse } from './load-document-template.types';
import { alertApi, TAlertData } from '../../models/notify';
import { loadDocumentTemplate } from '../../api';

export const sendDocumentTemplateTransportFx = createEffect<FormData, TSendDocumentTemplateResponse>();
sendDocumentTemplateTransportFx.use(loadDocumentTemplate);

sample({
  clock: sendDocumentTemplateTransportFx.doneData,
  fn: () => ({ message: 'Файл успешно отправлен', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: sendDocumentTemplateTransportFx.failData,
  fn: ({ message }) => ({ message: message, type: 'danger' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

import { createEvent, createStore, sample } from 'effector';
import { alertApi, TAlertData } from '../../models/notify';
import { sendDocumentTemplateTransportFx } from './load-document-template.transport';

const onLoadDocument = createEvent<FormData>();
const onSendDocument = createEvent();
const $documentTemplate = createStore<FormData | null>(null)
  .on(onLoadDocument, (_, document) => document);

sample({
  clock: onSendDocument,
  source: $documentTemplate,
  filter: (document) => !!document,
  fn: (document) => document!,
  target: sendDocumentTemplateTransportFx
});

sample({
  clock: $documentTemplate,
  fn: () => ({ message: 'Файл успешно загружен', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

export const loadDocumentTemplateApi = {
  $documentTemplate,
  sendDocument: () => {
    onSendDocument();
  },
  loadDocument: (document: FormData) => {
    onLoadDocument(document);
  }
};

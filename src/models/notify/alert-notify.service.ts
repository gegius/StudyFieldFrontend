import { createEvent, createStore } from 'effector';
import { TAlertData } from './alert-notify.types';

const onSendAlert = createEvent<TAlertData>();
const onResetData = createEvent();

const $alertData = createStore<TAlertData | null>(null)
  .on(onSendAlert, (_, alertData) => alertData);

$alertData.reset(onResetData);

export const alertApi = {
  $alertData,
  resetAlert: () => {
    onResetData();
  },
  onSendAlert
};

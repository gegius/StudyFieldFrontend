import { createEvent, createStore, forward, sample } from 'effector';
import { alertApi, TAlertData } from '../../models/notify';
import { TChildGroup, TUser } from './user.types';
import {
  downloadStatementTransportFx,
  getUserTransportFx,
  sendPriorityTransportFx,
  TSendPriorityRequest
} from './user.transport';

const onGetUser = createEvent();
const onChangedPriority = createEvent<TChildGroup[]>();
const onPrioritySend = createEvent();
const onDownloadStatement = createEvent();
const $user = createStore<TUser | null>(null)
  .on(getUserTransportFx.doneData, (_, user: TUser) => (
    {
      ...user,
      childGroups: user.childGroups.map((group, index) => ({ ...group, priority: index + 1 }
      ))
    }
  )).on(onChangedPriority, (user, changedChildGroups) => {
    if (user) {
      return { ...user, childGroups: changedChildGroups };
    }
  });

const $isDocumentDownloadVisible = createStore<boolean>(false)
  .on(sendPriorityTransportFx.doneData, (_, isSuccess) => isSuccess)
  .on(onChangedPriority, () => false);

const $isAdmin = createStore<boolean>(false)
  .on(getUserTransportFx.doneData, (_, user: TUser) => user.role.value === 'ADMIN');

forward({
  from: onGetUser,
  to: getUserTransportFx
});

forward({
  from: onDownloadStatement,
  to: downloadStatementTransportFx
});

sample({
  clock: sendPriorityTransportFx.doneData,
  fn: () => ({ message: 'Приоритеты успешно обновлены', type: 'success' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: sendPriorityTransportFx.failData,
  fn: () => ({ message: 'Ошибка обновления приоритетов', type: 'danger' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: onPrioritySend,
  source: $user,
  filter: (user: TUser | null) => !!user,
  fn: (user: TUser | null) => ({ childPriority: user!.childGroups } as TSendPriorityRequest
  ),
  target: sendPriorityTransportFx
});

export const userApi = {
  $user,
  changePriority: (childGroups: TChildGroup[]) => {
    onChangedPriority(childGroups);
  },
  getUser: () => {
    onGetUser();
  },
  $isAdmin,
  sendPriority: () => {
    onPrioritySend();
  },
  downloadStatement: () => {
    onDownloadStatement();
  },
  $isSendPriorityPending: sendPriorityTransportFx.pending,
  $isUserLoading: getUserTransportFx.pending,
  $isDocumentDownloadVisible
};

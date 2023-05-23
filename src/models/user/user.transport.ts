import { createEffect } from 'effector';
import { user, setPriority, downloadStatement } from '../../api';
import { TChildGroup, TUser } from './user.types';

export type TSendPriorityRequest = {
  childPriority: TChildGroup[]
}

export const getUserTransportFx = createEffect<void, TUser>();
getUserTransportFx.use(user);
export const sendPriorityTransportFx = createEffect<TSendPriorityRequest, boolean>();
sendPriorityTransportFx.use(setPriority);
export const downloadStatementTransportFx = createEffect<void, void>();
downloadStatementTransportFx.use(downloadStatement);


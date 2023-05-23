import { createEffect, sample } from 'effector';
import { alertApi, TAlertData } from '../../models/notify';
import { TChangePasswordRequest, TLoginForm, TTokenResponse } from './auth.types';
import { changePassword, getToken, login, logout } from '../../api';

export const getTokenTransportFx = createEffect<void, TTokenResponse>();
getTokenTransportFx.use(getToken);
export const loginTransportFx = createEffect<TLoginForm, TTokenResponse>();
loginTransportFx.use(login);
export const logoutTransportFx = createEffect<void, boolean>();
logoutTransportFx.use(logout);
export const changePasswordTransportFx = createEffect<TChangePasswordRequest, TTokenResponse>();
changePasswordTransportFx.use(changePassword);

sample({
  clock: loginTransportFx.failData,
  fn: ({ message }) => ({ message: message, type: 'danger' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

sample({
  clock: changePasswordTransportFx.failData,
  fn: ({ message }) => ({ message: message, type: 'danger' } as TAlertData
  ),
  target: alertApi.onSendAlert
});

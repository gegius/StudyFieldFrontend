import { createEvent, createStore, forward, sample } from 'effector';
import { createForm } from 'effector-forms';
import { $token } from './auth.token';
import { TChangePasswordRequest, TLoginForm } from './auth.types';
import { changePasswordTransportFx, getTokenTransportFx, loginTransportFx, logoutTransportFx } from './auth.transport';

const onLogout = createEvent();
const onChangePassword = createEvent<TChangePasswordRequest>();

// получение значения токена авторизации из кук
$token
  .on(getTokenTransportFx.doneData, (_, { token }) => token)
  .on(loginTransportFx.doneData, (_, { token }) => token)
  .on(changePasswordTransportFx.doneData, (_, { token }) => token);
const $isAuthorized = createStore<boolean | null>(null)
  .on(getTokenTransportFx.doneData, () => true)
  .on(loginTransportFx.doneData, () => true)
  .on(changePasswordTransportFx.doneData, () => true)
  .on(onLogout, () => false);
const onVerifyToken = createEvent();

$token.reset(getTokenTransportFx.fail)
$isAuthorized.reset(getTokenTransportFx.fail)

export const $loginForm = createForm<TLoginForm>({
  fields: {
    userId: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value)
        }
      ]
    },
    password: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value)
        }
      ]
    }
  },
  validateOn: ['submit']
});

sample({
  clock: $loginForm.formValidated,
  source: $loginForm.$values,
  fn: ({ userId, password }: TLoginForm) => ({ userId, password }
  ),
  target: loginTransportFx
});

sample({
  clock: onVerifyToken,
  target: getTokenTransportFx
});

forward({
  from: onLogout,
  to: logoutTransportFx
});

forward({
  from: onChangePassword,
  to: changePasswordTransportFx
});

export const authApi = {
  verifyToken: () => {
    onVerifyToken();
  },
  logout: () => {
    onLogout();
  },
  changePassword: (userId: string, oldPassword: string, newPassword: string) => {
    onChangePassword({ userId, oldPassword, newPassword });
  },
  $loginForm,
  $isAuthorized,
  $token
};

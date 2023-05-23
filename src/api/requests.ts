import { attach, createEffect } from 'effector';
import { saveAs } from 'file-saver';
import { $token } from '../models/auth/auth.token';

export type BackendRequestFxParams = {
  method: 'POST' | 'GET';
  token: string | null;
  data?: object;
  resource: string;
  file?: FormData | null; // добавить параметр файла
};

const backendRequestFx = createEffect(async (params: BackendRequestFxParams) => {
  const { method, token, data, resource, file } = params;
  let headers = new Headers();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);  // проставляем заголовок авторизации
  }

  if (!file) {
    headers.set('Content-Type', 'application/json;charset=utf-8');
  }

  try {
    // Изменить body на объект FormData с данными и файлами
    const response = await fetch(resource, {
      method: method,
      headers: headers,
      body: file ? file : JSON.stringify(data)
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw Error('Authorization error');
      } else {
        throw await response.json(); // бросить ошибку с ответом сервера
      }
    }
    if (response.status === 204) {
      return null; // Если код ответа 204 No Content, вернуть null
    }
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      // Если ответ содержит JSON-данные, вернуть их
      return response.json();
    } else {
      // Если ответ содержит файл, скачать его и вернуть null
      const contentDisp = response.headers.get('Content-Disposition') || '';
      const match = contentDisp.match(/filename="(.+)"/);
      const filename = match ? match[1] : 'file';
      const blob = await response.blob();
      saveAs(blob, filename);
      return null;
    }
  }
  catch (e) {
    throw e;
  }
});

export const requestWithTokenFx = attach({
  effect: backendRequestFx,
  source: $token,
  mapParams: ({ method, data, resource, file }, token) => ({
      data,
      resource,
      method,
      file,
      token
    }
  )
});

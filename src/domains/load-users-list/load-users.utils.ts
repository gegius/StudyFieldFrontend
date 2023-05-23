import React from 'react';
import { alertApi } from '../../models/notify';
import { TLoadedUser, RowObject } from './load-users.types';
import { read, utils } from 'xlsx';

const requiredHeaders = ['groupId', 'firstName', 'lastName', 'middleName', 'groupCode', 'userId', 'isContract'];

//Функция преобразования строк в объект пользователя
function convertRowToObjects(rows: unknown[], headers: RowObject): TLoadedUser[] {
  const users: TLoadedUser[] = [];
  for (let i = 1; i < rows.length; i++) {
    const rowObject: RowObject = {};
    const row = rows[i];
    for (const headerText in headers) {
      const columnIndex = headers[headerText];
      // @ts-ignore
      rowObject[headerText] = row[columnIndex]?.toString() ?? '';
    }
    users.push(rowObject as TLoadedUser);
  }
  return users;
}

//Проверка на обязательные заголовки
function checkRequiredHeaders(headers: RowObject) {
  return !requiredHeaders.some((header) => Object.keys(headers).includes(header)) ||
         requiredHeaders.length !== Object.keys(headers).length;
}

//Функция получения заголовков таблицы
function getHeaders(headerRow: unknown[]): RowObject {
  const headers: RowObject = {};
  for (const columnIndex in headerRow) {
    // @ts-ignore
    const headerText: string | undefined = headerRow[columnIndex]?.toString();
    if (headerText) {
      headers[headerText] = columnIndex;
    }
  }
  return headers;
}

//Функция обработки файла с пользователями
export async function getUsersFromXLS(event: React.ChangeEvent<HTMLInputElement>): Promise<TLoadedUser[]> {
  return new Promise((resolve) => {
    const file = event.target.files?.[0];
    if (!file) {
      alertApi.onSendAlert(({ message: 'Файл отсутствует', type: 'danger' }
      ));
      resolve([]);
      return;
    }
    //Читаем файл
    const reader = new FileReader();
    reader.onload = function (e) {
      if (!e.target?.result) {
        alertApi.onSendAlert(({ message: 'Ошибка чтения файла', type: 'danger' }
        ));
        resolve([]);
        return;
      }
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows: unknown[][] = utils.sheet_to_json(worksheet, { header: 1 });
      const headers = getHeaders(rows[0]);
      if (checkRequiredHeaders(headers)) {
        alertApi.onSendAlert(({ message: 'В файле нет обязательных заголовков', type: 'danger' }
        ));
        resolve([]);
        return;
      } else {
        const usersList = convertRowToObjects(rows, headers);
        resolve(usersList);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

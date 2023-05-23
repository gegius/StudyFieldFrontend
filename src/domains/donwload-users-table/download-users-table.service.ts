import { createEvent, forward } from 'effector';
import { downloadUsersTableTransportFx } from './download-users-table.transport';

const onDownloadUserTable = createEvent<string>();

forward({
  from: onDownloadUserTable,
  to: downloadUsersTableTransportFx
});

export const downloadUsersTableApi = {
  downloadUsers: (groupCode: string) => {
    onDownloadUserTable(groupCode);
  }
};

import { createEvent, forward } from 'effector';
import { deleteAllUsersTransportFx } from './delete-all-users.transport';

const onDeleteUsers = createEvent();

forward({
  from: onDeleteUsers,
  to: deleteAllUsersTransportFx
});

export const deleteUsersApi = {
  deleteUsers: () => {
    onDeleteUsers();
  },
  $isDeleteAllUsersPending: deleteAllUsersTransportFx.pending
};

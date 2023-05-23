import { createEvent, createStore, sample } from 'effector';
import { loadUsersTransportFx } from './load-users.transport';
import { TLoadedUser } from './load-users.types';

const onSetUsers = createEvent<TLoadedUser[]>();
const onUpdateUser = createEvent<TLoadedUser>();
const onDropUsersList = createEvent();
const onLoadUsersList = createEvent();
const $usersToLoad = createStore<TLoadedUser[]>([])
  .on(onSetUsers, (_, users) => users)
  .on(onUpdateUser, (oldUsers, updatedUser) => {
    return oldUsers.map((user) => {
      if (user.userId === updatedUser.userId) {
        return updatedUser;
      }
      return user;
    });
  });

$usersToLoad.reset(onDropUsersList, loadUsersTransportFx.doneData);

sample({
  clock: onLoadUsersList,
  source: $usersToLoad,
  filter: (users: TLoadedUser[]) => !!users.length,
  fn: (users: TLoadedUser[]) => ({ users }
  ),
  target: loadUsersTransportFx
});

export const loadUsersApi = {
  $usersToLoad,
  $isUsersLoading: loadUsersTransportFx.pending,
  setUsersList: (users: TLoadedUser[]) => {
    onSetUsers(users);
  },
  onUpdateUser: (updatedUser: TLoadedUser) => {
    onUpdateUser(updatedUser);
  },
  dropUsersList: () => {
    onDropUsersList();
  },
  loadUsersList: () => {
    onLoadUsersList();
  }
};

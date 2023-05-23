export type TLoadedUser = {
  [key: string]: string
  userId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: string;
  groupCode: string;
  isContract: string;
}

export type RowObject = {
  [key: string]: string;
}

export type TLoadUsersRequest = {
  users: TLoadedUser[]
}

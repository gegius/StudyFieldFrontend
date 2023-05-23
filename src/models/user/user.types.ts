export type TChildGroup = {
  groupCode: string,
  groupName: string
  priority: number,
  _id: string
}

export type TUser = {
  userId: number,
  firstName: string,
  lastName: string,
  middleName: string,
  groupId: string,
  groupCode: string,
  childGroups: TChildGroup[],
  role: {value: string}
}

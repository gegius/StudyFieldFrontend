export type TNewChildGroup = {
  id: string
  groupCode: string,
  groupName: string
}

export type TMotherGroup = {
  groupCode: string,
  groupName: string,
  childGroups: TNewChildGroup[]
}

export type TGetMotherGroupsListResponse = {
  motherGroups: TMotherGroup[]
}

export type TDeleteMotherGroup = {
  groupCode: string
}

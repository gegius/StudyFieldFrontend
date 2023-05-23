import {
  createFilePostRequestFx,
  createGetRequestFx,
  createGetRequestWithSearchFx,
  createPostRequestFx
} from './requests.methods';

export const getToken = createGetRequestFx('/auth/token');
export const login = createPostRequestFx('/auth/login');
export const logout = createPostRequestFx('/auth/logout');
export const changePassword = createPostRequestFx('/auth/change_password');
export const user = createGetRequestFx('/api/user');
export const setPriority = createPostRequestFx('/api/set_priority');
export const downloadStatement = createGetRequestFx('/api/download_priority_document');
export const createUsers = createPostRequestFx('/api/create_users');
export const getUsersList = createGetRequestFx('/api/get_users_list');
export const deleteUser = createPostRequestFx('/api/delete_user');
export const deleteAllUsers = createPostRequestFx('/api/delete_all_users');
export const getMotherGroupsList = createGetRequestFx('/api/get_mother_groups');
export const deleteMotherGroup = createPostRequestFx('/api/delete_mother_group');
export const setMotherGroup = createPostRequestFx('/api/set_mother_group');
export const loadDocumentTemplate = createFilePostRequestFx('/api/load_document_template');
export const downloadUsersTable = createGetRequestWithSearchFx('/api/download_users');
export const downloadUserTemplate = createGetRequestWithSearchFx('/api/download_priority_document');

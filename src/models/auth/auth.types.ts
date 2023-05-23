export type TLoginForm = {
  userId: string;
  password: string;
}

export type TTokenResponse = {
  token: string;
};

export type TChangePasswordRequest = {
  userId: string
  oldPassword: string,
  newPassword: string
}

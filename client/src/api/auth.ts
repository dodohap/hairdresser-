import api from "./api";

import { UserActivateAccountRequestDataType, UserActivateAccountResponseDataType, UserForgetPasswordDataType, UserLoginRequestDataType, UserLoginResponseDataType, UserRegisterRequestDataType, UserRegisterResponseDataType, UserResetPasswordByLinkRequestDataType } from "../types/User";

export const activateAccount = async (activateAccountData: UserActivateAccountRequestDataType): Promise<UserActivateAccountResponseDataType> => {
  const { data } = await api.post("activate-account", activateAccountData);
  return data;
};

export const forgetPassword = async (forgetPasswordData: UserForgetPasswordDataType): Promise<undefined> => {
  const { data } = await api.post("generate-reset-password-link", forgetPasswordData);
  return data;
};

export const loginUser = async (userData: UserLoginRequestDataType): Promise<UserLoginResponseDataType> => {
  const { data } = await api.post<UserLoginResponseDataType>("login", userData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("logout");
  return data;
};

export const registerUser = async (userData: UserRegisterRequestDataType) => {
  const data: UserRegisterResponseDataType = await api.post("register", userData);
  return data;
};

export const resetPassword = async (userResetPasswordByLinkData: UserResetPasswordByLinkRequestDataType): Promise<any> => {
  const { data } = await api.post("reset-password", userResetPasswordByLinkData);
  return data;
};

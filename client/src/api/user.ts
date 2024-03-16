import { UserDataResponseDataType, UserUpdateRequestDataType } from "../types/User";
import api from "./api";

export const getUser = async (): Promise<UserDataResponseDataType> => {
  const { data } = await api.get("get-user");
  return data;
};

export const putUserData = async (updateUserData: UserUpdateRequestDataType): Promise<UserDataResponseDataType> => {
  const { data } = await api.put("change-user-data", updateUserData);
  return data;
};

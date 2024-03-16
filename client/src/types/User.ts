export type User =
  | {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string;
      role: string;
      isAccountActive: boolean;
      createdAt: Date;
    }
  | undefined;

export type UserLoginRequestDataType =
  | {
      email: string;
      password: string;
    }
  | undefined;

export type UserLoginResponseDataType =
  | {
      message: string;
      data: User;
    }
  | undefined;

export type UserRegisterRequestDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type UserRegisterResponseDataType =
  | {
      message: string;
      data: User;
    }
  | undefined;

export type UserLogoutRequestDataType = {
  userId: string;
};

export type UserForgetPasswordDataType = {
  email: string;
};

export type UserResetPasswordByLinkRequestDataType = {
  key: string;
  newPassword: string;
};

export type UserActivateAccountRequestDataType = {
  key: string;
};

export type UserActivateAccountResponseDataType = {
  userId: string;
  key: string;
};

export type UserDataResponseDataType =
  | {
      message: string;
      user: User;
    }
  | undefined;

export type UpdateDataUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  isAccountActive?: boolean;
};

export type UserUpdateRequestDataType = {
  userId: string;
  password: string;
  newUserData: UpdateDataUser;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  isAccountActive: boolean;
  createdAt: Date;
};

export type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type UserUpdateData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  role?: string;
  isAccountActive?: boolean;
};

export type UserSession = {
  userId: number;
  role: string;
};

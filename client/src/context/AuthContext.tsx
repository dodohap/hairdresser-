import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, UserDataResponseDataType } from "../types/User";
import { useApi } from "../hooks/useApi";
import { getUser } from "../api/user";

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { mutate } = useApi<undefined, UserDataResponseDataType>(getUser);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const checkForUserSession = () => {
      mutate(undefined, {
        onSuccess: (data) => {
          if (!data) return;
          setUser(data.user);
        },
      });
    };

    checkForUserSession();
  }, [mutate]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return <AuthContext.Provider value={{ user, login, logout, updateUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { IUser } from "../Types/types";

// Define the user type
export type UserType = {
  token: string | null;
  user: IUser | null;
};

// Define the authentication context type
export type AuthContextType = {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
};

// Initial values for the authentication context
const initialUser: UserType = {
  token:
    (JSON.parse(localStorage.getItem("user")!) &&
      JSON.parse(localStorage.getItem("user")!).token) ||
    null,
  user:
    (JSON.parse(localStorage.getItem("user")!) &&
      JSON.parse(localStorage.getItem("user")!).user) ||
    null,
};

const initialValue: AuthContextType = {
  user: initialUser,
  setUser: () => {},
};

// Create the authentication context
export const AuthContext = createContext<AuthContextType>(initialValue);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (
      localStorage.getItem("user") == undefined ||
      localStorage.getItem("user") == null ||
      JSON.parse(localStorage.getItem("user")!) == null ||
      JSON.parse(localStorage.getItem("user")!) == undefined
    ) {
      localStorage.setItem("user", JSON.stringify(null));
    } else {
      setUser({
        token: JSON.parse(localStorage.getItem("user")!).token || null,
        user: JSON.parse(localStorage.getItem("user")!).user || null,
      });
    }
  }, []);
  const [user, setUser] = useState<UserType>(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

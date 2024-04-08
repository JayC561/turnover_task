import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type AuthProviderProps = PropsWithChildren;

export interface UserContext {
  email: string;
  isLogined: boolean;
  setEmail: (email: string) => void;
  setIsLogined: (isLogined: boolean) => void;
}

const AuthContext = createContext<UserContext | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [isLogined, setIsLogined] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        email,
        isLogined,
        setEmail,
        setIsLogined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

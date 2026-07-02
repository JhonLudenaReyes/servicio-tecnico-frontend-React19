import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, LoginResponse } from '../types/auth';
import type { Usuario } from '../types/entities/Usuario';


interface AuthContextType extends AuthState {
  login: (data: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    User: null,
    Token: null,
    IsAuthenticated: false,
    Loading: true,
  });

  useEffect(() => {
    const checkAuth = () => {
      const savedToken = localStorage.getItem("auth_token");
      const savedUser = localStorage.getItem("auth_user");

      if (savedToken && savedUser) {
        try {
          const user = JSON.parse(savedUser) as Usuario;
          setAuth({
            Token: savedToken,
            User: user,
            IsAuthenticated: true,
            Loading: false,
          });
        } catch (error) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          setAuth((prev) => ({ ...prev, Loading: false }));
        }
      } else {
        setAuth((prev) => ({ ...prev, Loading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = (data: LoginResponse) => {
    localStorage.setItem("auth_token", data.Token);
    localStorage.setItem("auth_user", JSON.stringify(data.User));
    setAuth({
      Token: data.Token,
      User: data.User,
      IsAuthenticated: true,
      Loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setAuth({
      Token: null,
      User: null,
      IsAuthenticated: false,
      Loading: false,
    });
  };

  const contextValue = useMemo(
    () => ({
      ...auth,
      login,
      logout,
    }),
    [auth],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

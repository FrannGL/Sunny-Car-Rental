"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginResponse, User } from "../types/user";
import { useLocale } from "next-intl";
import { CONFIG } from "@/src/config/config-global";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface SignInData {
  username: string;
  password: string;
}

interface AuthContextType extends AuthState {
  login: (data: SignInData, router: AppRouterInstance) => Promise<boolean>;
  logout: (router: AppRouterInstance) => Promise<void>;
  initializeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const locale = useLocale();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      const sessionCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user-session="));

      if (sessionCookie) {
        const cookieValue = sessionCookie.split("=")[1];
        const sessionData = JSON.parse(decodeURIComponent(cookieValue));

        setAuthState({
          token: sessionData.token,
          refreshToken: sessionData.refreshToken,
          user: sessionData.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      setAuthState({
        token: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Error al iniciar la autenticación",
      });
    }
  };

  const login = async (
    data: SignInData,
    router: AppRouterInstance
  ): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`${CONFIG.site.serverUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData: LoginResponse = await response.json();

      if (!response.ok) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Error al iniciar sesión",
        }));
        return false;
      }

      const { access_token, refresh_token, user } = responseData;

      const sessionData = {
        token: access_token,
        refreshToken: refresh_token,
        user,
      };

      document.cookie = `user-session=${encodeURIComponent(
        JSON.stringify(sessionData)
      )}; path=/; max-age=${60 * 60}; ${
        process.env.NODE_ENV === "production" ? "secure; sameSite=strict;" : ""
      }`;

      setAuthState({
        token: access_token,
        refreshToken: refresh_token,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      router.push(`/${locale}`);
      return true;
    } catch (error) {
      console.error("Error during sign in:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error inesperado. Intenta nuevamente.",
      }));
      return false;
    }
  };

  const logout = async (router: AppRouterInstance): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      document.cookie =
        "user-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setAuthState({
        token: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      router.push("/es");
    } catch (error) {
      console.error("Error during logout:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error al cerrar sesión",
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        initializeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

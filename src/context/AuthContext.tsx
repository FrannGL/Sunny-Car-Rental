"use client";

import { CONFIG } from "@/src/config/config-global";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginResponse, User } from "../types/user";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  expiresIn?: number;
}

interface SignInData {
  username: string;
  password: string;
}

export interface PreRegisterData {
  username: string;
  email: string;
}

export interface RegisterData {
  email: string;
  code: string;
  password: string;
  conf_pass: string;
}

interface AuthContextType extends AuthState {
  login: (data: SignInData) => Promise<boolean>;
  logout: () => Promise<boolean>;
  initializeAuth: () => void;
  refreshAuthToken: () => Promise<void>;
  preRegister: (data: PreRegisterData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
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
    expiresIn: undefined,
  });

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
          expiresIn: 900,
        });
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
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

  const login = async (data: SignInData): Promise<boolean> => {
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

      const { access_token, refresh_token, access_token_expires_in, user } =
        responseData;

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
        expiresIn: access_token_expires_in,
      });

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

  const logout = async () => {
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

      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error al cerrar sesión",
      }));

      return false;
    }
  };

  const preRegister = async (data: PreRegisterData): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`${CONFIG.site.serverUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Error al registrar usuario",
        }));
        return false;
      }

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      return true;
    } catch (error) {
      console.error("Error during pre-register:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error inesperado. Intenta nuevamente.",
      }));
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`${CONFIG.site.serverUrl}/confirmarUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Error al confirmar el usuario",
        }));
        return false;
      }

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      return true;
    } catch (error) {
      console.error("Error during registration:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error inesperado. Intenta nuevamente.",
      }));
      return false;
    }
  };

  const refreshAuthToken = useCallback(async () => {
    if (!authState.refreshToken) return;

    try {
      const response = await fetch(`${CONFIG.site.serverUrl}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: authState.refreshToken }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setAuthState((prev) => ({
          ...prev,
          error: "Error al refrescar el token",
        }));
        return;
      }

      const { access_token, access_token_expires_in } = responseData;

      const updatedSessionData = {
        token: access_token,
        refreshToken: authState.refreshToken,
        user: authState.user,
      };

      document.cookie = `user-session=${encodeURIComponent(
        JSON.stringify(updatedSessionData)
      )}; path=/; max-age=${60 * 60}; ${
        process.env.NODE_ENV === "production" ? "secure; sameSite=strict;" : ""
      }`;

      setAuthState((prev) => ({
        ...prev,
        token: access_token,
        expiresIn: access_token_expires_in,
        error: null,
      }));
    } catch (error) {
      console.error("Error refreshing token:", error);
      setAuthState((prev) => ({
        ...prev,
        error: "Error al refrescar el token",
      }));
    }
  }, [authState.refreshToken, authState.user]);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (authState.token && authState.expiresIn) {
        const timeRemaining =
          authState.expiresIn - Math.floor(Date.now() / 1000);
        if (timeRemaining <= 60) {
          refreshAuthToken();
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [authState, refreshAuthToken]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        preRegister,
        register,
        login,
        logout,
        initializeAuth,
        refreshAuthToken,
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

"use client";

/*
 * Maintains the authenticated BOCRA session and exposes helpers to portal and admin screens.
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearSession, fetchCurrentUser, persistSession, readStoredUser, type LoginResponse, type UserProfileResponse } from "@/lib/api";

type AuthContextValue = {
  user: UserProfileResponse | null;
  loading: boolean;
  setSession: (loginResponse: LoginResponse) => void;
  refreshUser: () => Promise<UserProfileResponse | null>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = readStoredUser();
    if (!storedUser) {
      setLoading(false);
      return;
    }

    setUser(storedUser);
    void refreshUser();
  }, []);

  const refreshUser = async () => {
    try {
      const freshUser = await fetchCurrentUser();
      setUser(freshUser);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("bocra.user", JSON.stringify(freshUser));
      }
      return freshUser;
    } catch {
      clearSession();
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    setSession: (loginResponse) => {
      persistSession(loginResponse);
      setUser(loginResponse.user);
      setLoading(false);
    },
    refreshUser,
    signOut: () => {
      clearSession();
      setUser(null);
      setLoading(false);
    },
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}

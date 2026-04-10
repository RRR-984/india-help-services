import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useActor } from "../hooks/use-actor";
import type { User } from "../types";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: () => {},
  logout: () => {},
  refetchUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { loginStatus, login, clear, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const isAuthenticated = loginStatus === "success" && !!identity;
  const isLoading = loginStatus === "logging-in" || isFetching || userLoading;

  const refetchUser = useCallback(async () => {
    if (!actor || isFetching || !isAuthenticated) {
      setUser(null);
      return;
    }
    setUserLoading(true);
    try {
      const profile = await actor.getMyProfile();
      setUser(profile);
    } catch {
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  }, [actor, isFetching, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && actor && !isFetching) {
      refetchUser();
    } else if (!isAuthenticated) {
      setUser(null);
    }
  }, [isAuthenticated, actor, isFetching, refetchUser]);

  const logout = useCallback(() => {
    clear();
    setUser(null);
  }, [clear]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout, refetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

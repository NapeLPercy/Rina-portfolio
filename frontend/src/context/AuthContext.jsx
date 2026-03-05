import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "user";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() =>
    safeParse(sessionStorage.getItem(STORAGE_KEY)),
  );

  // Load from sessionStorage on first mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setUserState(safeParse(stored));
  }, []);

  // Save helper
  const setUser = (userObj) => {
    if (!userObj) {
      sessionStorage.removeItem(STORAGE_KEY);
      setUserState(null);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
    setUserState(userObj);
  };

  const getUser = () => user;

  const logout = () => setUser(null);

  //check if user logged in
  const isLoggedIn = !!user;

  const value = useMemo(
    () => ({
      user,
      isLoggedIn,
      setUser, // aka "add user"
      getUser,
      logout,
    }),
    [user, isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}

"use client";

import { createContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [session, setSession] = useState();

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")) ?? null);
    setSession(window.localStorage.getItem("session") ?? false);
  }, []);

  const values = useMemo(
    () => ({
      user,
      session,
      setUser,
      setSession,
    }),
    [user, session]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserProvider;

"use client";

import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useContext } from "react";

const Navbar = () => {
  const { setUser } = useContext(UserContext);
  const { session, setSession } = useContext(UserContext);

  function logoutUser() {
    window.localStorage.removeItem("session");
    window.localStorage.removeItem("user");
    setSession(false);
    setUser(null);
    redirect("/");
  }

  return (
    <nav>
      <div className="flex flex-row flex-wrap justify-between p-6 bg-gray-800">
        <h1 className="text-2xl font-mono text-white">
          <Link href="/">Document Manager</Link>
        </h1>
        <ul className="flex flex-row md:gap-8 font-mono gap-4 text-center mt-2 text-white">
          <li>
            <Link href="/">Home</Link>
          </li>
          {session === false && (
            <>
              <li>
                <Link href="/regist">Register</Link>
              </li>
              <li>
                <Link href="/login">Log In</Link>
              </li>
            </>
          )}
          {session && (
            <>
              <li>
                <Link href="/user/documents">Documents</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

"use client"

import { UserContext } from "@/context/UserContext";
import { redirect } from "next/navigation";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { session } = useContext(UserContext);

  if (session) {
    return children;
  } else {
    return redirect("/");
  }
};

export default PrivateRoute;

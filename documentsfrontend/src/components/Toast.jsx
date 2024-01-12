"use client";

import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      toastOptions={{
        className: "font-mono",
        duration: 4500
      }}
    />
  );
};

export default Toast;

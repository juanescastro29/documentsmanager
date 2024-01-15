"use client";

import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion'
import toast from "react-hot-toast";

const LoginForm = () => {
  const { setSession, setUser } = useContext(UserContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function login(dataForm) {
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });

    const data = await response.json();

    if (data.message === "Session") {
      setUser(data.user);
      setSession(true);
      window.localStorage.setItem("session", true);
      window.localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
      toast.success("Login completed successfully");
    } else {
      if (data.message === "Unregistered user") {
        router.push("/regist");
        toast.error(`${data.message}`);
      } else {
        toast.error(`${data.message}`);
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2,
        duration: 0.8,
        type: "spring"
      },
    },
  };

  const formItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.form
      className="grid grid-cols-2 gap-2 p-5 border shadow-lg w-96 m-3"
      onSubmit={handleSubmit(login)}
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <h1 className="text-2xl lg:text-3xl font-bold col-span-2 text-center">
        Log In
      </h1>
      <motion.div className="col-span-2 w-full" variants={formItemVariants}>
        <label className="block text-sm font-medium leading-8">Email</label>
        <input
          type="text"
          name="email"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          placeholder="email"
          {...register("email", {
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        {errors.email?.type === "required" && (
          <div className="text-red-600 text-center">
            <small>This field is required.</small>
          </div>
        )}
        {errors.email?.type === "pattern" && (
          <div className="text-red-600 text-center">
            <small>Invalid email.</small>
          </div>
        )}
      </motion.div>
      <motion.div className="col-span-2 w-full" variants={formItemVariants}>
        <label className="block text-sm font-medium leading-8">Password</label>
        <input
          type="password"
          name="password"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          placeholder="password"
          {...register("password", {
            required: true,
          })}
        />
        {errors.password?.type === "required" && (
          <div className="text-red-600 text-center">
            <small>This field is required.</small>
          </div>
        )}
      </motion.div>
      <motion.div className="col-span-2 text-slate-400" variants={formItemVariants}>
        <small>
          <Link href="/regist" className="hover:underline">
            Create an account.
          </Link>
        </small>
      </motion.div>
      <motion.div className="flex items-center justify-center col-span-2 mt-4" variants={formItemVariants}>
        <button className="bg-gray-800 rounded-md shadow-lg text-white h-10 w-28">
          Login
        </button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;

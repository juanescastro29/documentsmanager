"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import Spinner from "./Spinner";

const Form = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function registUser(dataForm) {
    setLoading(true)
    dataForm.rol = "USER";
    const response = await fetch(
      "http://localhost:4000/api/user",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataForm),
      }
    );

    const data = await response.json();

    if (data.message === "User created successfully") {
      router.push("/login");
      toast.success("User created successfully");
      setLoading(false)
    } else {
      toast.error(`${data.message}`);
      setLoading(false)
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
        type: "spring",
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
      className="grid grid-cols-2 gap-2 p-5 border shadow-lg m-3"
      onSubmit={handleSubmit(registUser)}
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.h1 className="text-2xl lg:text-3xl font-bold col-span-2 text-center">
        Regist user
      </motion.h1>
      <motion.div className="col-span-2" variants={formItemVariants}>
        <label className="block text-sm font-medium leading-8">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          placeholder="first name"
          {...register("firstName", {
            required: true,
            pattern: /^[A-Za-z ]+$/,
          })}
        />
        {errors.firstName?.type === "required" && (
          <div className="text-red-600 text-center">
            <small>This field is required.</small>
          </div>
        )}
        {errors.firstName?.type === "pattern" && (
          <div className="text-red-600 text-center">
            <small>No special characters or numbers are accepted.</small>
          </div>
        )}
      </motion.div>
      <motion.div className="col-span-2" variants={formItemVariants}>
        <label className="block text-sm font-medium leading-8">Last Name</label>
        <input
          type="text"
          name="lastName"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          placeholder="last name"
          {...register("lastName", {
            required: true,
            pattern: /^[A-Za-z ]+$/,
          })}
        />
        {errors.lastName?.type === "required" && (
          <div className="text-red-600 text-center">
            <small>This field is required.</small>
          </div>
        )}
        {errors.lastName?.type === "pattern" && (
          <div className="text-red-600 text-center">
            <small>No special characters or numbers are accepted.</small>
          </div>
        )}
      </motion.div>
      <motion.div className="col-span-2" variants={formItemVariants}>
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
            <small>This feld is required.</small>
          </div>
        )}
        {errors.email?.type === "pattern" && (
          <div className="text-red-600 text-center">
            <small>Invalid email.</small>
          </div>
        )}
      </motion.div>
      <motion.div className="col-span-1" variants={formItemVariants}>
        <label className="block text-sm font-medium leading-8">Password</label>
        <input
          type="password"
          name="password"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          placeholder="password"
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
        />
        {errors.password?.type === "required" && (
          <div className="text-red-600 text-center">
            <small>This field is required.</small>
          </div>
        )}
        {errors.password?.type === "pattern" && (
          <div className="text-red-600 text-center">
            <small>Password too weak.</small>
          </div>
        )}
      </motion.div>
      <motion.div className="col-span-1" variants={formItemVariants}>
        <label className="block text-sm font-medium leading-8">
          Confirm Password
        </label>
        <input
          type="password"
          name="rePassword"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          placeholder="confirm password"
          {...register("rePassword", {
            required: true,
            validate: (value) => value === watch("password"),
          })}
        />
        {errors.rePassword?.type === "required" && (
          <div className="text-red-600 text-center">
            <small>This field is required.</small>
          </div>
        )}
        {errors.rePassword?.type === "validate" && (
          <div className="text-red-600 text-center">
            <small>Passwords do not match.</small>
          </div>
        )}
      </motion.div>
      <motion.div
        className="flex items-center justify-center col-span-2 mt-4"
        variants={formItemVariants}
      >
        {loading ? (
          <Spinner />
        ) : (
          <button className="bg-gray-800 rounded-md shadow-lg text-white h-10 w-28">
            Regist
          </button>
        )}
      </motion.div>
    </motion.form>
  );
};

export default Form;

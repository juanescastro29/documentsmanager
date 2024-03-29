import { UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { mutate } from "swr";

const UploadFiles = () => {
  const [filesNames, setFilesNames] = useState("");
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function upload(dataForm) {
    const formData = new FormData();
    const userId = user[0]._id;

    for (let i = 0; i < dataForm.files.length; i++) {
      formData.append("files", dataForm.files[i]);
      dataForm = { ...dataForm, file: dataForm.files[i].name };
    }

    const response = fetch(`http://localhost:4000/api/file/${userId}`, {
      method: "POST",
      body: formData,
    });

    toast.promise(response, {
      loading: "Uploading files...",
      success: () => {
        mutate("http://localhost:4000/api/file/");
        return "File uploaded successfully";
      },
      error: "File not uploaded",
    });
    reset();
    setFilesNames("");
  }

  function viewFiles(event) {
    const selectedFiles = event.target.files;
    const fileNames = Array.from(selectedFiles)
      .map((file) => file.name)
      .join(", ");
    setFilesNames(fileNames);
  }

  const variantsForm = {
    hidden: { opacity: 1, x: -30, opacity: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.3,
        type: "spring",
      },
    },
  };

  const variants = {
    hidden: { opacity: 1, y: -20, opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 1.3,
        type: "spring",
      },
    },
  };

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center items-center w-full">
        <form
          className="flex flex-col sm:flex-row md:flex-row w-full justify-between items-center p-6 align-middle"
          onSubmit={handleSubmit(upload)}
        >
          <motion.div
            className="items-center align-middle overflow-auto w-full"
            initial="hidden"
            animate="visible"
            variants={variantsForm}
          >
            <h2 className="text-xm md:text-lg align-middle item font-semibold">
              Files selected:
            </h2>
            <p className="h-7">{filesNames}</p>
          </motion.div>
          <motion.div
            className="flex flex-row gap-x-1"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <label className="bg-gray-800 rounded-md text-white cursor-pointer p-3 me-5 h-11 w-36 shadow-lg text-center">
              Select file
              <input
                onInput={viewFiles}
                type="file"
                accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf"
                style={{
                  display: "none",
                }}
                name="files"
                multiple
                {...register("files", {
                  required: true,
                })}
              />
            </label>
            <button className="bg-gray-800 shadow-lg rounded-md text-white h-11 w-28">
              Upload
            </button>
          </motion.div>
        </form>

        {errors.files?.type === "required" && (
          <div className="text-center text-red-600 py-4">
            <small>Any file selected.</small>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFiles;

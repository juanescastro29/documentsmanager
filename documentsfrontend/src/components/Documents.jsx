import { BsFileEarmarkExcel } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFileEarmarkWord } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { useContext, useState } from "react";
import { AnimatePresence, delay, motion } from "framer-motion";
import Delete from "@/app/icons/Delete";
import Download from "@/app/icons/Download";
import toast from "react-hot-toast";
import { UserContext } from "@/context/UserContext";
import useSWR, { mutate } from "swr";

const Documents = () => {
  const [page, setPage] = useState(1);
  const {
    data: documents,
    error,
    isLoading,
  } = useSWR(`http://localhost:4000/api/file/`, fetchDocs, {
    revalidateOnFocus: false,
  });
  const { user } = useContext(UserContext);

  async function fetchDocs(url) {
    const userId = user[0]._id;
    const response = await fetch(`${url}/${userId}`);
    const data = await response.json();
    return data;
  }

  async function deleteDoc(doc) {
    const dataFile = { driveId: doc.driveId, id: doc._id };

    const response = fetch("http://localhost:4000/api/file", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataFile),
    });

    toast.promise(response, {
      loading: "Deleting file...",
      success: () => {
        mutate("http://localhost:4000/api/file/");
        return `File deleted successfully`;
      },
      error: "Error deleting the file",
    });
  }

  const variants = {
    visible: ({ delay }) => ({
      opacity: 1,
      transition: {
        delay,
        duration: 1.2,
        ease: "easeInOut",
        type: "spring",
      },
    }),
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        type: "spring",
      },
    },
  };

  return (
    <>
      {error ? (
        <>
          <div className="flex flex-row justify-center items-center w-full h-64 text-center">
            <h1 className="text-3xl font-bold py-10">Fail to load</h1>
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-4 justify-center content-center p-5 text-xl">
            <div className="join" data-theme="corporate">
              <button className="join-item btn mr-2">«</button>
              <button className="join-item btn">Page {page}</button>
              <button className="join-item btn ml-2">»</button>
            </div>
          </div>
        </>
      ) : (
        <>
          {isLoading ? (
            <div
              role="status"
              className="flex justify-center items-center h-96"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              {documents.length > 0 ? (
                <>
                  {documents.slice(page * 8 - 8, page * 8).length > 0 ? (
                    <>
                      <AnimatePresence>
                        {documents
                          .slice(page * 8 - 8, page * 8)
                          .map((doc, index) => (
                            <motion.div
                              key={doc._id}
                              className="flex flex-col items-center justify-center border rounded-sm shadow-lg p-10 h-80 w-72"
                              custom={{ delay: (index + 1) * 0.4 }}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={variants}
                              layoutId={doc._id}
                              whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <div className="mb-3 hover:cursor-pointer">
                                {(doc.extention === "xls" ||
                                  doc.extention === "xlsx") && (
                                  <BsFileEarmarkExcel size={60} />
                                )}
                                {doc.extention === "pdf" && (
                                  <BsFiletypePdf size={60} />
                                )}
                                {doc.extention === "docx" && (
                                  <BsFileEarmarkWord size={60} />
                                )}
                                {doc.extention === "txt" && (
                                  <BsFiletypeTxt size={60} />
                                )}
                              </div>
                              <div className="text-center h-24 w-full overflow-auto">
                                <h1 className="text-md sm:text-md md:text-lg font-thin text-balanced">
                                  {doc.name}
                                </h1>
                              </div>
                              <div className="flex flex-row flex-wrap justify-center items-center min-w-max gap-2">
                                <button
                                  className="flex gap-x-2 border rounded-md hover:shadow-md p-2 mt-4"
                                  onClick={() => deleteDoc(doc)}
                                >
                                  <Delete />
                                  <span>Delete</span>
                                </button>

                                <a
                                  href={doc.downloadUrl}
                                  className="flex gap-x-2 border rounded-md hover:shadow-md p-2 mt-4"
                                >
                                  <Download />
                                  <span>Download</span>
                                </a>
                              </div>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                      <div className="min-w-full flex justify-center content-center p-5 text-xl">
                        <div className="join" data-theme="corporate">
                          <button
                            className="join-item btn mr-2"
                            onClick={() => {
                              page > 1 && setPage(page - 1);
                            }}
                          >
                            «
                          </button>
                          <button className="join-item btn">Page {page}</button>
                          <button
                            className="join-item btn ml-2"
                            onClick={() => {
                              documents.slice(page * 8 - 8, page * 8).length >
                                0 && setPage(page + 1);
                            }}
                          >
                            »
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row justify-center items-center w-full h-64 text-center">
                        <h1 className="text-3xl font-bold py-10">
                          There are no documents
                        </h1>
                      </div>
                      <div className="col-span-2 md:col-span-3 lg:col-span-4 justify-center content-center p-5 text-xl">
                        <div className="join" data-theme="corporate">
                          <button
                            className="join-item btn mr-2"
                            onClick={() => {
                              page > 1 && setPage(page - 1);
                            }}
                          >
                            «
                          </button>
                          <button className="join-item btn">Page {page}</button>
                          <button
                            className="join-item btn ml-2"
                            onClick={() => {
                              documents.slice(page * 8 - 8, page * 8).length >
                                0 && setPage(page + 1);
                            }}
                          >
                            »
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="flex flex-row justify-center items-center w-full h-64 text-center">
                    <h1 className="text-3xl font-bold py-10">
                      There are no documents
                    </h1>
                  </div>
                  <div className="col-span-2 md:col-span-3 lg:col-span-4 justify-center content-center p-5 text-xl">
                    <div className="join" data-theme="corporate">
                      <button className="join-item btn mr-2">«</button>
                      <button className="join-item btn">Page {page}</button>
                      <button className="join-item btn ml-2">»</button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Documents;

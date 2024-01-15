import { BsFileEarmarkExcel } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFileEarmarkWord } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Delete from "@/app/icons/Delete";
import Download from "@/app/icons/Download";
import toast from "react-hot-toast";
import { UserContext } from "@/context/UserContext";
import useSWR, { mutate } from "swr";
import Spinner from "./Spinner";

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
    console.log(userId);
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
              <Spinner />
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

import { BsFileEarmarkExcel } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFileEarmarkWord } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Delete from "@/app/icons/Delete";
import Download from "@/app/icons/Download";
import toast from "react-hot-toast";
import { UserContext } from "@/context/UserContext";

const Documents = ({ refresh, handleRefresh }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { user } = useContext(UserContext);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocs() {
      const userId = user[0]._id;
      const response = await fetch(`http://localhost:4000/api/file/${userId}`);
      const data = await response.json();
      setDocuments(data);
      router.refresh();
    }
    fetchDocs();
  }, [refresh]);

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
        handleRefresh();
        return `File deleted successfully`;
      },
      error: "Error deleting the file",
    });
  }

  return (
    <>
      {documents.length > 0 ? (
        <>
          {documents.slice(page * 8 - 8, page * 8).length > 0 ? (
            <>
              {documents.slice(page * 8 - 8, page * 8).map((doc) => (
                <div
                  className="flex flex-col items-center justify-center border rounded-sm shadow-lg p-10 h-64 w-64 hover:scale-105 hover:duration-75"
                  key={doc._id}
                >
                  <div className="mb-3 hover:cursor-pointer">
                    {(doc.extention === "xls" || doc.extention === "xlsx") && (
                      <BsFileEarmarkExcel size={60} />
                    )}
                    {doc.extention === "pdf" && <BsFiletypePdf size={60} />}
                    {doc.extention === "docx" && (
                      <BsFileEarmarkWord size={60} />
                    )}
                    {doc.extention === "txt" && <BsFiletypeTxt size={60} />}
                  </div>
                  <div className="text-center h-28">
                    <h1 className="text-md sm:text-md md:text-lg font-thin">
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
                </div>
              ))}
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
                      documents.slice(page * 8 - 8, page * 8).length > 0 &&
                        setPage(page + 1);
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
                      documents.slice(page * 8 - 8, page * 8).length > 0 &&
                        setPage(page + 1);
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
            <h1 className="text-3xl font-bold py-10">There are no documents</h1>
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
  );
};

export default Documents;

import React, { useState } from "react";
import { AiFillCamera, AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { client } from "../client";
import Loading from "./Loading";

function Modal({ userId, showModal, setShowModal }) {
  const [imageAsset, setImageAsset] = useState();
  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpeg"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };
  const saveAvatar = async () => {
    const urlImg = imageAsset.url;
    await client
      .patch(userId)
      .set({ image: urlImg })
      .commit()
      .then((result) => {
        setImageAsset();
        setShowModal(false);
      });
  };
  const closeModal = () => {
    setImageAsset();
    setShowModal(false);
  };
  return (
    <>
      <button
        className="bg-slate-50 text-black hover:bg-slate-300 
      font-bold p-2 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none  absolute -bottom-2 -right-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <AiFillCamera />
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4 xl:left-[194px] xl:-top-[100px] ">
            <div className="relative w-auto w-lg ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t  max-w-sm">
                  {wrongImageType && <p>It&apos;s wrong file type.</p>}
                  {!imageAsset ? (
                    // eslint-disable-next-line jsx-a11y/label-has-associated-control
                    <label>
                      <div className="flex flex-col items-center justify-center mt-4  ">
                        <div className="flex flex-col justify-center items-center">
                          {loading && <Loading />}
                          <p className="font-bold text-2xl">
                            <AiOutlineCloudUpload />
                          </p>
                          <p className="text-lg">Click to upload</p>
                        </div>

                        <p className=" text-gray-400 text-center">
                          Khuyến nghị: Sử dụng JPG, PNG và chất lượng dưới 20MB
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-image"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </label>
                  ) : (
                    <div className="relative max-h-370 max-w-sm overflow-hidden">
                      <img
                        src={imageAsset?.url}
                        alt="uploaded-pic"
                        className="h-full w-full"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() => setImageAsset(null)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b ">
                  <div className="flex justify-end items-end  ">
                    <button
                      className="bg-red-500 text-white font-bold p-2 rounded-full  outline-none"
                      type="button"
                      onClick={() => closeModal()}
                    >
                      Đóng
                    </button>

                    <button
                      type="button"
                      onClick={() => saveAvatar()}
                      className="bg-red-500 text-white font-bold p-2 rounded-full ml-2 outline-none"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Modal;

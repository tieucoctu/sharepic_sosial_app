import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { urlFor, client } from "../client";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "./fetchUser";

function Pin({ pin }) {
  const navigate = useNavigate();
  const { postedBy, image, _id, destination, save } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const user = fetchUser();

  const deletePin = async (id) => {
    await client.delete(id);
  };

  let alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  )?.length;

  // alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 py-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 p-1 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none "
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <div
                  type="button"
                  className="bg-red-500 opacity-70  text-white font-bold px-2 py-1 text-base rounded-3xl hover:shadow-md outline-none text-sm"
                >
                  Đã lưu
                </div>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-2 py-1 rounded-3xl hover:shadow-md outline-none text-sm"
                >
                  {savingPost ? "Đang lưu" : "Lưu"}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold py-1 px-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md text-sm"
                  rel="noreferrer"
                >
                  {" "}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
}

export default Pin;

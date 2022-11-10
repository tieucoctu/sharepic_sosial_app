import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import {
  categories,
  pinDetailMorePinQuery,
  pinDetailQuery,
} from "../utils/data";
import Loading from "./Loading";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import RemoveCmt from "./RemoveCmt";
const PinDetail = ({ user }) => {
  console.log("user :", user);
  const { pinId } = useParams();
  console.log("pinId :", pinId);
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  console.log("pinDetail :", pinDetail);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log("pinDetail :", pinDetail);

        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  const addComment = async () => {
    if (comment) {
      setAddingComment(true);

      await client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [addingComment]);

  if (!pinDetail) {
    return <Loading />;
  }

  return (
    <>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[
          {
            src: `${urlFor(pinDetail?.image).url()}`,
          },
        ]}
        carousel={{ finite: true }}
        plugins={[Zoom, Fullscreen]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
      {pinDetail && (
        <div
          className="flex xl:flex-row flex-col m-auto bg-white"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div className="flex justify-center items-center md:items-start flex-initial p-4 ">
            <div className="relative">
              <button
                type="button"
                className="absolute bottom-3 right-3"
                onClick={() => setIsOpen(true)}
              >
                <AiOutlineFullscreen className="z-50 opacity-70 hover:opacity-100 w-9 h-9  bg-white rounded-xl p-1" />
              </button>
              <img
                className="rounded-3xl "
                src={pinDetail?.image && urlFor(pinDetail?.image).url()}
                alt="user-post"
              />
            </div>
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline className="w-7 h-7" />
                </a>
              </div>
            </div>
            <p className="font-bold mt-3">
              Tác giả:{" "}
              <Link to={`/user-profile/${pinDetail?.postedBy._id}`}>
                {pinDetail?.postedBy.userName}
              </Link>
            </p>
            <p className="mt-3">Mô tả: {pinDetail.about}</p>
            <p className="mt-3">
              phân loại:
              {pinDetail?.category &&
                pinDetail?.category.map((detail) =>
                  categories.map((ctg) => {
                    if (ctg.value === detail)
                      return (
                        <Link
                          className=" text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize font-medium"
                          to={`/category/${detail}`}
                        >
                          {" "}
                          {`${ctg.label} `}
                        </Link>
                      );
                  })
                )}
            </p>
            <h2 className="mt-5 text-2xl">Nhận xét: </h2>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? "Đang gứi..." : "Gửi"}
              </button>
            </div>
            <div
              className=" mt-4 overflow-y-auto"
              style={{ maxHeight: "555px" }}
            >
              {pinDetail?.comments?.map((item, index) => {
                return (
                  <div
                    className="flex gap-2 mb-6 items-center bg-white rounded-full relative py-1 px-2  divide-y divide-gray-100 shadow dark:bg-gray-700 "
                    key={index}
                  >
                    <img
                      src={item.postedBy?.image}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      alt="user-profile"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{item.postedBy?.userName}</p>
                      <p>{item.comment}</p>
                    </div>

                    <RemoveCmt idKey={item?._key} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Loading message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;

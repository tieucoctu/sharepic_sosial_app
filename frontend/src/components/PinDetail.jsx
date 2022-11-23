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
import RemoveCmt from "./RemoveCmt";
import Like from "./Like";
import { useDispatch, useSelector } from "react-redux";
import { setUpdate } from "../app/constant/common";
const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { update } = useSelector((state) => state.common);
  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
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
          dispatch(setUpdate());
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [update]);
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
          <div className="flex justify-center items-center md:items-start flex-initial p-4 flex-col">
            <div className="relative">
              <button
                type="button"
                className="absolute bottom-3 right-3"
                onClick={() => setIsOpen(true)}
              >
                <AiOutlineFullscreen className="z-50 opacity-70 hover:opacity-100 w-9 h-9  bg-white rounded-xl p-1" />
              </button>
              <Like pinDetail={pinDetail}>
                <img
                  className="rounded-3xl "
                  src={pinDetail?.image && urlFor(pinDetail?.image).url()}
                  alt="user-post"
                />
              </Like>
            </div>

            <p className="ml-3">
              {pinDetail?.like ? pinDetail?.like.length : 0} lượt thích
            </p>
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
              Phân loại:
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
                {addingComment ? "Đang gửi..." : "Gửi"}
              </button>
            </div>
            <div className=" mt-4 " style={{ maxHeight: "555px" }}>
              {pinDetail?.comments?.map((item, index) => {
                return (
                  <div className="relative w-full">
                    <div
                      className="flex gap-2 mb-6 items-center bg-white rounded-full relative py-1 px-2   divide-gray-100 shadow dark:bg-gray-700  xl:max-w-[700px] max-w-[280px]"
                      key={index}
                    >
                      <img
                        src={item.postedBy?.image}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        alt="user-profile"
                      />
                      <div className="flex flex-col xl:max-w-[600px] max-w-[200px] ">
                        <Link
                          to={`/user-profile/${item?.postedBy._id}`}
                          className="font-bold"
                        >
                          {item.postedBy?.userName}
                        </Link>
                        <div className=" ">
                          <p className="break-words">{item.comment}</p>
                        </div>
                      </div>
                    </div>
                    {user?._id === item?.postedBy?._id ? (
                      <RemoveCmt idKey={index} />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          Thể loại tương tự
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

import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { v4 as uuidv4 } from "uuid";
import { fetchUser } from "./fetchUser";
import { AiOutlineHeart } from "react-icons/ai";
import { setUpdate } from "../app/constant/common";
import { useDispatch } from "react-redux";

function Like({ children, pinDetail }) {
  const { pinId } = useParams();
  const user = fetchUser();
  const [click, setClick] = useState();
  const dispatch = useDispatch();
  let alreadyLike = pinDetail?.like?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  )?.length;
  const handleLike = async (id) => {
    if (!alreadyLike && !click) {
      if (user?.googleId) {
        client
          .patch(id)
          .setIfMissing({ like: [] })
          .insert("after", "like[-1]", [
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
          .then((result) => {
            setClick(true);
            dispatch(setUpdate());
          });
      }
    } else {
      const like = pinDetail?.like?.findIndex(
        (item) => item?.postedBy?._id === user?.googleId
      );
      if (like >= 0) {
        await client
          .patch(pinId)
          .unset([`like[${like}]`])
          .commit()
          .then((result) => {
            dispatch(setUpdate());
            setClick(false);
          });
      }
    }
  };
  return (
    <>
      <button
        type="button"
        onDoubleClick={(e) => {
          e.stopPropagation();
          handleLike(pinId);
        }}
      >
        {alreadyLike ? (
          <div className="transition duration-150 ease-in-out">
            <FcLike className="z-50 w-8 h-8 absolute bottom-3 left-3" />
          </div>
        ) : (
          <AiOutlineHeart className="z-50 w-8 h-8 absolute bottom-3 left-3" />
        )}
        {children}
      </button>
    </>
  );
}

export default Like;

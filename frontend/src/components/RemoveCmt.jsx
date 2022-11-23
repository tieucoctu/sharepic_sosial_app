import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setUpdate } from "../app/constant/common";
import { client } from "../client";

export default function RemoveCmt({ idKey }) {
  const [isToggle, setIsToggle] = useState(false);
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const removeComment = async () => {
    await client
      .patch(pinId)
      .unset([`comments[${idKey}]`])
      .commit()
      .then((result) => {
        setIsToggle(!isToggle);
        dispatch(setUpdate());
      });
  };
  return (
    <div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="border-none">
          <FiMoreVertical onClick={() => setIsToggle(!isToggle)} />
        </div>
      </div>
      <div
        className={
          (isToggle ? "block " : "hidden ") + "absolute right-2 top-12 z-50"
        }
      >
        <button
          type="button"
          className=" z-50 p-2 px-4 bg-white rounded-xl  divide-y divide-gray-100 shadow dark:bg-gray-700"
          onClick={removeComment}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

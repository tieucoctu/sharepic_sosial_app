import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { client } from "../client";

export default function RemoveCmt({ idKey }) {
  const [isToggle, setIsToggle] = useState(false);
  const { pinId } = useParams();
  const removeComment = () => {
    client
      .patch(pinId)
      .unset([`comments[${idKey}]`])
      .commit()
      .then((result) => {
        setIsToggle(!isToggle);
        console.log("deleted imageAsset", result);
      });
    // client.delete(idKey).then((result) => {
    //   console.log("deleted imageAsset", result);
    // });
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
          (isToggle ? "block " : "hidden ") + "absolute right-2 top-10 z-50"
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

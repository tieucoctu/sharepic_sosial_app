import React from "react";

export default function Message({ success, message }) {
  return success ? (
    <div className="fixed bottom-20 left-1/2 rounded-lg border-green-400 border-l-[4px] bg-white px-[35px] py-[15px] transition duration-150 ease-in-out font-medium">
      {message}
    </div>
  ) : (
    <div className="fixed bottom-20 left-1/2 rounded-lg border-red-400 border-l-[4px] bg-white px-[35px] py-[15px] transition duration-150 ease-in-out font-medium">
      {message}
    </div>
  );
}

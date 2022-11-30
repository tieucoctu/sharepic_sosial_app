import React from "react";

function Success({ message }) {
  return (
    <div className="fixed bottom-20 left-1/2 rounded-lg border-green-400 border-l-[4px] bg-white px-[35px] py-[15px] transition duration-150 ease-in-out font-medium">
      {message}
    </div>
  );
}

export default Success;

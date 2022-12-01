import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../app/constant/common";

export default function Message({ message }) {
  const { state } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setState());
    }, 3000);
  }, [state]);
  const messageState = () => {
    switch (state) {
      case "error":
        return (
          <div className="fixed bottom-20 left-1/2 rounded-lg border-red-400 border-l-[4px] bg-white px-[35px] py-[15px] transition duration-150 ease-in-out font-medium">
            {message}
          </div>
        );
      case "success":
        return (
          <div className="fixed bottom-20 left-1/2 rounded-lg border-green-400 border-l-[4px] bg-white px-[35px] py-[15px] transition duration-150 ease-in-out font-medium">
            {message}
          </div>
        );
      default:
        // eslint-disable-next-line no-unused-expressions
        null;
    }
  };
  return messageState();
}

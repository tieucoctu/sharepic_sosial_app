/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Loading from "./Loading";
import { STATE_PIN } from "../utils/constants";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import LinkClipbroad from "./LinkClipbroad";
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState(STATE_PIN.created);
  const [activeBtn, setActiveBtn] = useState(STATE_PIN.created);
  const [toggle, setToggle] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState();
  const { userId } = useParams();
  const { update } = useSelector((state) => state.common);
  const id = localStorage.getItem("googleId");
  const url_profile = location.href;
  const inputRef = useRef();
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId, toggle, showModal]);

  useEffect(() => {
    if (text === STATE_PIN.created) {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else if (text === STATE_PIN.saved) {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId, toggle, update]);

  useEffect(() => {
    if (toggle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggle]);

  const handleChange = async (e) => {
    if (changeName) {
      await client
        .patch(userId)
        .set({ userName: changeName })
        .commit()
        .then((result) => {
          setToggle(!toggle);
          setChangeName("");
          setError();
        });
    } else {
      setError("Vui lòng nhập thông tin");
    }
  };
  if (!user) return <Loading message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <div className="relative ">
              <img
                className="rounded-full w-20 h-20 mt-4 shadow-xl object-cover"
                src={user.image}
                alt="user-pic"
              />
              {userId === id ? (
                <Modal
                  userId={userId}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              ) : null}
            </div>
          </div>
          {toggle ? (
            <div className="pt-3 flex items-center justify-center flex-col">
              <div
                className="relative w-5/6 xl:w-1/4 "

                // onClick={(e) => e.stopPropagation()}
              >
                <input
                  value={changeName}
                  ref={inputRef}
                  onBlur={(e) => {
                    if (
                      !changeName &&
                      !e.relatedTarget?.className?.includes("submit")
                    ) {
                      setToggle(false);
                      setError();
                    }
                  }}
                  type="text"
                  onChange={(e) => setChangeName(e.target.value)}
                  className=" w-full p-3 pl-4 text-base font-medium text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder={user.userName}
                  required
                  maxLength={30}
                />
                <button
                  type="submit"
                  onClick={handleChange}
                  className="submit text-white absolute top-[7px] right-[9px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Lưu
                </button>
              </div>
              <p className="text-red-500 ">{error}</p>
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              <div className="font-bold text-3xl text-center pt-3 ">
                {user.userName}
              </div>
              {userId === id ? (
                <button
                  className="relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    setToggle(true);
                  }}
                  type="button"
                >
                  <AiTwotoneEdit className="pt-1 ml-1 text-2xl absolute -top-1" />
                </button>
              ) : null}
            </div>
          )}
          <div className="flex justify-center items-center relative ">
            <div className=" text-center pt-3 ">
              <h3 className="text-center mt-3">{user?.email}</h3>
            </div>
            <div className="relative">
              <LinkClipbroad
                link={url_profile}
                className="absolute bg-slate-100 text-black hover:bg-slate-200 rounded-3xl ml-2 p-1 "
              />
            </div>
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn(STATE_PIN.created);
            }}
            className={`${
              activeBtn === STATE_PIN.created
                ? activeBtnStyles
                : notActiveBtnStyles
            }`}
          >
            Đã tạo
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn(STATE_PIN.saved);
            }}
            className={`${
              activeBtn === STATE_PIN.saved
                ? activeBtnStyles
                : notActiveBtnStyles
            }`}
          >
            Đã lưu
          </button>
        </div>

        {pins?.length ? (
          <div className="px-4">
            <MasonryLayout pins={pins} />
          </div>
        ) : (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            Không tìm thấy ghim nào!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

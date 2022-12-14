import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import { client } from "../client";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import Cookies from "js-cookie";
export const clientId = process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN;

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response?.profileObj));
    const { name, googleId, imageUrl, email } = response?.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
      email: email,
      status: true,
      role: "user",
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });

    localStorage.setItem("googleId", googleId);
    Cookies.set("googleId", googleId);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <div className="text-2xl text-center text-stone-50 font-bold flex justify-center">
              Share<p className="text-red-700">Pic</p>
            </div>
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> ????ng nh???p v???i Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

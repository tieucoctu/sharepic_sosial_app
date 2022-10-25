import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
import shareVideo from "../../assets/share.mp4";
import { client } from "../../client";

function Login() {
  const navigate = useNavigate();
  const createOrGetUser = (res) => {
    const decoded = jwt_decode(res.credential);
    localStorage.setItem("user", JSON.stringify(decoded));
    const { name, picture, sub } = decoded;
    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    client.createIfNotExists(user).then(() => {
      navigate("/", { replace: true });
    });
  };
  const user = false;
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}
    >
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
                onSuccess={(response) => createOrGetUser(response)}
                onError={() => console.log("error")}
              />
            </div>
          </div>
        </div>

        {/* {user ? (
          <div>login</div>
        ) : (
          
        )} */}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;

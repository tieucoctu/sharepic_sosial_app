import React from "react";
import { GoogleLogout } from "react-google-login";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Logout({ userId, User, className }) {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.clear();

    navigate("/login");
  };
  return (
    <div className={className}>
      <div className=" z-1 right-2 top-2 p-2">
        {userId === User?.googleId && (
          <GoogleLogout
            clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}
            render={(renderProps) => (
              <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <AiOutlineLogout color="red" className="md:text-3xl text-2xl" />
              </button>
            )}
            onLogoutSuccess={logout}
            cookiePolicy="single_host_origin"
          />
        )}
      </div>
    </div>
  );
}

export default Logout;

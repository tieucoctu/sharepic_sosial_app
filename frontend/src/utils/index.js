import axios from "axios";

export const BASE_URL = process.env.REACT_APP_PUBLIC_BASE_URL;
export const createOrGetUser = async (res, addUser) => {
  console.log("res :", res);
  console.log("addUser :", addUser);
  var base64Url = res.credential.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { name, picture, sub } = JSON.parse(jsonPayload);
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };
  addUser(user);
  console.log("user :", user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};

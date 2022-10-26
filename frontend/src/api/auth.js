import { client } from "../client";

export default async function handlerLogin(req, res) {
  if (req.method === "POST") {
    const user = req.body;
    client
      .createIfNotExists(user)
      .then(() => res.status(200).json("login success"));
  }
}

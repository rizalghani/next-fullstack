import db from "../../../libs/db";
import Auth from "../../../middlewares/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  await Auth(req, res);
  const data = await db.select("*").from("roles");

  res.status(200).json({ data, message: "get role successfully" });
}

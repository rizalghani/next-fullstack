import db from "../../../../libs/db";
import Auth from "../../../../middlewares/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  await Auth(req, res);

  const db_select = await db("posts").where({ id }).first();

  if (!db_select) return res.status(404).end();

  res.status(200);
  res.json({
    message: "get role successfully",
    data: db_select,
  });
}

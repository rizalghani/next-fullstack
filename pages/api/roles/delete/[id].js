import db from "../../../../libs/db";
import Auth from "../../../../middlewares/auth";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  await Auth(req, res);

  const { id } = req.query;

  const db_delete = await db("posts").where({ id }).del();

  res.status(200);
  res.json({
    message: "role deleted successfully",
  });
}

import db from "../../../../libs/db";
import Auth from "../../../../middlewares/auth";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  await Auth(req, res);

  const { id } = req.query;
  const { role_name } = req.body;

  await db("posts").where({ id }).update({
    role_name,
  });

  const db_select = await db("posts").where({ id }).first();

  res.status(200);
  res.json({
    message: "Post updated successfully",
    data: db_select,
  });
}

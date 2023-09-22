import db from "../../../libs/db";
import Auth from "../../../middlewares/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") res.status(405).end();

  try {
    await Auth(req, res);
    const { role_name } = req.body;

    if (!role_name) throw Error("role_name is required");

    // create
    const db_saved = await db("roles").insert({
      role_name,
    });

    // select by id
    const db_select = await db("roles").where("id", db_saved).first();

    res
      .status(201)
      .json({ data: db_select, message: "role created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

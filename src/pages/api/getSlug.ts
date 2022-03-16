import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../index";

export default async function checkSlug(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.body;

  const value = await redis.get(slug);

  if (value) {
    return res.json({ errors: "url" });
  }

  res.json({ value });
}

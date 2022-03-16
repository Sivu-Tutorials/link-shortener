import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../index";

export default async function createSlug(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, url } = req.body;

  const value = await redis.set(slug, url);

  res.json({ value });
}

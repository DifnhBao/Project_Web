import dotenv from "dotenv";

dotenv.config();

export const ignoreCache = (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
};

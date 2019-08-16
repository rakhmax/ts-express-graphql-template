import dotenv from "dotenv";

dotenv.config();

export const APP_MODE       = process.env.NODE_ENV;
export const MONGODB_URI    = process.env.MONGODB_URI;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const BASE_API_URL   = process.env.BASE_API_URL;
export const TMDB_API_KEY   = process.env.TMDB_API_KEY;
export const PORT           = process.env.PORT;
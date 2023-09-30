import express, { Express } from "express";
import cors from "cors";

import { loadEnv } from "./configs/envs";
import {
  betsRouter,
  gamesRouter,
  participantsRouter,
} from "./routers";
import { connectDb } from "./configs";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/", participantsRouter)
  .use("/", gamesRouter)
  .use("/", betsRouter)

export function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app);
}

export default app;      
      
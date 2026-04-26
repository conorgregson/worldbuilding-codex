import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

import authRoutes from "./modules/auth/auth.routes";
import worldsRoutes from "./modules/worlds/worlds.routes";
import entitiesRoutes from "./modules/entities/entities.routes";
import relationshipsRoutes from "./modules/relationships/relationships.routes";
import eventsRoutes from "./modules/events/events.routes";
import searchRoutes from "./modules/search/search.routes";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/worlds", worldsRoutes);
app.use("/api", entitiesRoutes);
app.use("/api", relationshipsRoutes);
app.use("/api", eventsRoutes);
app.use("/api", searchRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
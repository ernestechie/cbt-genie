import { StatusCode } from "@/constants/status-codes";
import authRoutes from "@/server/auth/authRoutes";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";
const app = new Hono().basePath("/api");

export const routes = app.route("/auth", authRoutes);
// .route('/users', usersRoutes);

app.get("*", (context) => {
  const { json, status } = context;

  status(StatusCode.RESOURCE_NOT_FOUND);
  return json({
    status: false,
    message: "Page not found",
  });
});

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

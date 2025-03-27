"use client";
import { AuthRoutes } from "@/constants/auth";
import httpClient from "@/server/axios";

export const handleLogout = async () => {
  try {
    const apiRes = await httpClient.get(AuthRoutes.Logout);
    window.location.href = "/auth";

    return await apiRes.data;
  } catch (err) {
    console.log("LOGOUT_ERROR -> ", err);
    return null;
  }
};

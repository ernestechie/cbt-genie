import { Context } from "hono";
import { setCookie } from "hono/cookie";

const defaultCookieAge = 60 * 60 * 24 * 1; // 24 hours

interface HttpCookie {
  context: Context;
  name: string;
  value: string;
  age?: number;
}

export const setHttpCookie = ({ context, name, value, age }: HttpCookie) => {
  setCookie(context, name, value, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: age ?? defaultCookieAge,
  });
};

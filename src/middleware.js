import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import cookie from "cookie";

const secretKey = process.env.JWT_SECRET;

export async function middleware(req) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secretKey));
    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/"],
};

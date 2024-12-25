import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;

export const decode = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  const decoded = await jwtVerify(token, new TextEncoder().encode(secretKey));

  return decoded;
};

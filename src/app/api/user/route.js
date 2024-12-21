import getUser from "@/lib/get-user";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await getUser();

  return NextResponse.json({ user });
}

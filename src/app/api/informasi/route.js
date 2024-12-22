import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const informasi = await prisma.informasi.findMany();
  return NextResponse.json({ informasi });
}

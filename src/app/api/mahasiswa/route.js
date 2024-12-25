import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const mahasiswa = await prisma.mahasiswa.findFirst({
    where: {
      nim: searchParams.get("nim"),
    },
  });
  return NextResponse.json({ mahasiswa });
}

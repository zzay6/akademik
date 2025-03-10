import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  role: z.string(),
  username: z.string(),
  password: z.string(),
});

export async function POST(req) {
  const body = await req.json();
  const { role, username, password } = loginSchema.parse(body);

  let loginAs = null;

  if (role === "mahasiswa") {
    loginAs = await prisma.mahasiswa.findFirst({
      where: { nim: username },
    });
  } else if (role === "dosen") {
    loginAs = await prisma.dosen.findFirst({
      where: { nidn: username },
    });
  }

  if (!loginAs)
    return NextResponse.json(
      { message: "Role tidak valid, Akun bukan " + role, success: false },
      { status: 403 }
    );

  const pengguna = await prisma.pengguna?.findFirst({
    where: {
      id: loginAs?.id_pengguna,
      role,
    },
  });

  if (!pengguna || !bcrypt.compareSync(password, pengguna.password)) {
    return NextResponse.json(
      { message: "Credentials tidak valid", success: false },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: pengguna.id, username },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return NextResponse.json({
    message: "Login sucessfully",
    success: true,
    data: { token },
  });
}

import prisma from "@/lib/prisma";
import { decode } from "./jwt";

const getUser = async () => {
  const jwt = await decode();
  const result = jwt.payload;

  const pengguna = await prisma.pengguna?.findFirst({
    where: {
      id: result?.id,
    },
  });

  if (pengguna.role == "mahasiswa")
    pengguna.mahasiswa = await prisma.mahasiswa.findFirst({
      where: { id_pengguna: result.id },
    });
  if (pengguna.role == "dosen")
    pengguna.dosen = await prisma.dosen.findFirst({
      where: { id_pengguna: result.id },
    });

  return pengguna;
};

export default getUser;

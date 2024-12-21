import prisma from "@/lib/prisma";
import { decode } from "./jwt";

export const getUser = async () => {
  const jwt = await decode();
  const result = jwt.payload;

  const pengguna = await prisma.pengguna?.findFirst({
    where: {
      id: result?.id,
    },
  });

  if (pengguna.role == "mahasiswa") {
    pengguna.mahasiswa = await prisma.mahasiswa?.findFirst({
      where: { id_pengguna: result.id },
    });

    pengguna.kelas = await prisma.kelas?.findFirst({
      where: { nama_kelas: pengguna?.mahasiswa?.nama_kelas },
    });

    pengguna.prodi = await prisma.prodi?.findFirst({
      where: { kode_prodi: pengguna?.kelas?.kode_prodiprodi },
    });
  }

  if (pengguna.role == "dosen")
    pengguna.dosen = await prisma.dosen?.findFirst({
      where: { id_pengguna: result.id },
    });

  return pengguna;
};
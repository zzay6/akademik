import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await getUser();

  const nilai = await prisma.nilai.findMany({
    where: {
      nim: user.mahasiswa.nim,
    },
  });

  const nilai_new = await Promise.all(
    nilai.map(async (nl) => {
      const nl2 = nl;
      nl2.detail = await prisma.detail_nilai.findMany({
        where: {
          kode_nilai: nl.kode_nilai,
        },
      });

      const jadwal = await Promise.all(
        nl2.detail.map(async (dn) => {
          dn.jadwal = await prisma.jadwal.findFirst({
            where: {
              kode_jadwal: dn.kode_jadwal,
            },
          });

          dn.jadwal.mata_kuliah = await prisma.mata_kuliah.findFirst({
            where: {
              kode_mata_kuliah: dn.mata_kuliah,
            },
          });

          return dn;
        })
      );

      return nl2;
    })
  );

  return NextResponse.json({ nilai: nilai_new });
}

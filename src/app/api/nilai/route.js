import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await getUser();

  const url = new URL(req.url);
  const queryNim = url.searchParams.get("nim");

  const nim = queryNim || user.mahasiswa.nim;

  const nilai = await prisma.nilai.findMany({
    where: {
      nim: nim,
    },
  });

  const nilai_new = await Promise.all(
    nilai.map(async (nl) => {
      const nl2 = { ...nl };
      nl2.detail = await prisma.detail_nilai.findMany({
        where: {
          kode_nilai: nl.kode_nilai,
        },
      });

      await Promise.all(
        nl2.detail.map(async (dn) => {
          dn.jadwal = await prisma.jadwal.findFirst({
            where: {
              kode_jadwal: dn.kode_jadwal,
            },
          });

          if (dn.jadwal) {
            dn.jadwal.mata_kuliah = await prisma.mata_kuliah.findFirst({
              where: {
                kode_mata_kuliah: dn.jadwal.kode_mata_kuliah,
              },
            });
          }

          return dn;
        })
      );

      return nl2;
    })
  );

  return NextResponse.json({ nilai: nilai_new });
}

export async function POST(req) {
  const {
    nim,
    kode_jadwal,
    semester,
    nilai_formatif,
    nilai_tugas,
    nilai_uts,
    nilai_uas,
    action,
    kode_nilai,
  } = await req.json();

  if (action == "delete") {
    prisma.detail_nilai.delete({
      where: {
        kode_nilai,
      },
    });
    prisma.nilai.delete({
      where: {
        kode_nilai,
      },
    });

    return NextResponse.json({ message: "Berhasil hapus nilai" });
  } else {
    const existingNilai = await prisma.nilai.findMany({
      where: {
        semester,
        nim,
        detail_nilai: {
          some: {
            kode_jadwal,
          },
        },
      },
      include: {
        detail_nilai: true,
      },
    });

    if (existingNilai.length)
      return NextResponse.json({
        message: "Gagal, Nilai telah di input sebelumnya!",
        nilai: existingNilai,
      });

    const lastNilai = await prisma.nilai.findFirst({
      orderBy: {
        kode_nilai: "desc",
      },
    });

    let kode_nilai = "KN001";
    if (lastNilai) {
      const lastNumber = parseInt(lastNilai.kode_nilai.replace("KN", ""), 10);

      const newNumber = lastNumber + 1;

      kode_nilai = `KN${newNumber.toString().padStart(3, "0")}`;
    }

    // const nilai_akhir =
    //   (nilai_formatif + nilai_tugas + nilai_uts + nilai_uas) / 4;

    // let nilai_huruf = "E";
    // if (nilai_akhir >= 80) nilai_huruf = "A";
    // if (nilai_akhir >= 70) nilai_huruf = "B";
    // if (nilai_akhir >= 60) nilai_huruf = "C";
    // if (nilai_akhir >= 50) nilai_huruf = "D";
    const data = {
      semester,
      kode_nilai,
      // nim,
      ipk: "E",
      mahasiswa: {
        connect: { nim },
      },
      detail_nilai: {
        create: [
          {
            kode_jadwal,
            nilai_formatif: parseFloat(nilai_formatif),
            nilai_tugas: parseFloat(nilai_tugas),
            nilai_uts: parseFloat(nilai_uts),
            nilai_uas: parseFloat(nilai_uas),
            nilai_akhir: null,
            nilai_huruf: null,
          },
        ],
      },
    };

    let nilai;
    try {
      nilai = await prisma?.nilai?.create({
        data,
      });
      console.log("Data berhasil ditambahkan:", nilai);
    } catch (error) {
      console.error("Error saat menambahkan data:", error);
    }

    return NextResponse.json({ nilai: nilai || {} });
  }
}

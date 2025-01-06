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
                kode_mata_kuliah: dn.jadwal.mata_kuliah,
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
    await prisma.detail_nilai.deleteMany({
      where: {
        kode_nilai,
      },
    });
    await prisma.nilai.delete({
      where: {
        kode_nilai,
      },
    });

    return NextResponse.json({
      message: "Berhasil hapus nilai",
      success: true,
    });
  } else {
    const existingNilai = await prisma.nilai.findFirst({
      where: {
        semester,
        nim,
      },
      include: {
        detail_nilai: {
          where: {
            kode_jadwal,
          },
        },
      },
    });

    // Jika nim dan semester sudah ada
    if (existingNilai) {
      if (existingNilai.detail_nilai.length > 0) {
        return NextResponse.json(
          {
            message:
              "Gagal, Nilai dengan kode jadwal tersebut sudah diinput sebelumnya!",
            success: false,
            data: { nilai: existingNilai },
          },
          {
            status: 400,
          }
        );
      }

      // Jika detail_nilai belum ada untuk kode_jadwal tersebut
      try {
        console.log("KODE JADWAL!!", kode_jadwal);
        const newDetailNilai = await prisma.detail_nilai.create({
          data: {
            nilai: {
              connect: { kode_nilai: existingNilai.kode_nilai },
            },
            jadwal: {
              connect: { kode_jadwal },
            },
            nilai_formatif: parseFloat(nilai_formatif),
            nilai_tugas: parseFloat(nilai_tugas),
            nilai_uts: parseFloat(nilai_uts),
            nilai_uas: parseFloat(nilai_uas),
            nilai_akhir: null,
            nilai_huruf: null,
          },
        });

        console.log("Detail nilai berhasil ditambahkan:", newDetailNilai);

        return NextResponse.json(
          {
            message: "Detail nilai berhasil ditambahkan!",
            success: true,
            data: newDetailNilai,
          },
          {
            status: 200,
          }
        );
      } catch (error) {
        console.error("Error saat menambahkan detail nilai:", error);

        return NextResponse.json(
          {
            message: "Gagal menambahkan detail nilai.",
            success: false,
          },
          {
            status: 500,
          }
        );
      }
    }

    // Jika nim dan semester belum ada, buat data baru
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

    const data = {
      semester,
      kode_nilai,
      ipk: "-",
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

    try {
      const newNilai = await prisma.nilai.create({
        data,
      });

      console.log("Data berhasil ditambahkan:", newNilai);

      return NextResponse.json(
        {
          message: "Nilai berhasil ditambahkan!",
          success: true,
          data: newNilai,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error saat menambahkan data:", error);

      return NextResponse.json(
        {
          message: "Gagal menambahkan nilai.",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  }
}

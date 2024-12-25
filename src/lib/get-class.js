import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export const getClass = async () => {
  const user = await getUser();
  const kelas = user.kelas || {};
  const jadwal =
    user.role == "mahasiswa"
      ? await prisma?.jadwal?.findMany({
          where: {
            kelas: kelas.nama_kelas,
          },
        })
      : await prisma?.jadwal?.findMany({
          where: {
            dosen: user.dosen.nidn,
          },
        });

  kelas.jadwal = jadwal;
  const mata_kuliah = await prisma.mata_kuliah.findMany({
    where: {
      kode_mata_kuliah: {
        in: jadwal.map((candidate) => candidate.mata_kuliah),
      },
    },
  });

  const mata_kuliah_dosen = await Promise.all(
    mata_kuliah.map(async (candidate) => {
      const matkul = candidate;
      matkul.dosen = await prisma.dosen.findFirst({
        where: {
          nidn: jadwal.find((j) => j.mata_kuliah === candidate.kode_mata_kuliah)
            ?.dosen,
        },
      });
      return matkul;
    })
  );

  kelas.mata_kuliah = await mata_kuliah_dosen;

  return kelas;
};

export const findClass = async (kode) => {
  const user = await getUser();
  let kelas;

  if (user.role == "mahasiswa") {
    kelas = user.kelas;
    kelas.mahasiswa = await prisma.mahasiswa.findMany({
      where: {
        nama_kelas: kelas.nama_kelas,
      },
    });
  } else {
    kelas = {};
    const jadwal = await prisma.jadwal.findFirst({
      where: {
        kode_jadwal: kode,
      },
    });
    kelas.mahasiswa = await prisma.mahasiswa.findMany({
      where: {
        nama_kelas: jadwal.kel,
      },
    });
  }

  return kelas;
};

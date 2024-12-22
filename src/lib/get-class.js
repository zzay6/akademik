import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export const getClass = async () => {
  const user = await getUser();
  const kelas = user.kelas;
  const jadwal = await prisma?.jadwal?.findMany({
    where: {
      kelas: kelas.nama_kelas,
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
          nidn: jadwal.find((j) => j.mata_kuliah === candidate.kode_mata_kuliah)?.dosen,
        },
      });
      return matkul;
    })
  );

  kelas.mata_kuliah = await mata_kuliah_dosen;

  return kelas;
};

export const findClass = async () => {
  const user = await getUser();
  const kelas = user.kelas;
  kelas.mahasiswa = await prisma.mahasiswa.findMany({
    where: {
      nama_kelas: kelas.nama_kelas,
    },
  });
  
  return kelas;
};

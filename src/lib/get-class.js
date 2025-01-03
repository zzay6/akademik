import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export const getClass = async () => {
  const user = await getUser();
  const kelas = user.kelas || {};

  const jadwal = await prisma?.jadwal?.findMany({
    where:
      user.role == "mahasiswa"
        ? {
            kelas: kelas.nama_kelas,
          }
        : {
            dosen: user.dosen.nidn,
          },
    include: {
      kelas_jadwal_kelasTokelas: true,
      dosen_jadwal_dosenTodosen: true,
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

  kelas.mata_kuliah = mata_kuliah_dosen;

  console.log(kelas);
  return kelas;
};

export const findClass = async (kode) => {
  const kodeDecode = decodeURIComponent(kode);
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
    const mahasiswa = await prisma.$queryRaw`
      SELECT mahasiswa.*, jadwal.* 
      FROM mahasiswa 
      JOIN kelas ON kelas.nama_kelas = mahasiswa.nama_kelas
      JOIN jadwal ON jadwal.kelas = mahasiswa.nama_kelas
      WHERE jadwal.dosen = ${user.dosen.nidn}
        AND jadwal.kelas = ${kodeDecode}
    `;

    kelas.mahasiswa = mahasiswa;
  }
  return kelas;
};

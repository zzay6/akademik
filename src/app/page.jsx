import { App } from "@/layout/app";
import { getClass } from "@/lib/get-class";
import { getUser } from "@/lib/get-user";
import Link from "next/link";

const Home = async () => {
  const user = await getUser();
  const kelas = await getClass();

  console.log(kelas);

  return (
    <App>
      <div className="p-4">
        <input
          type="text"
          placeholder="search"
          className="w-full p-2 rounded-md border border-gray-300"
        />
      </div>
      <div className="p-4 space-y-4 text-black">
        {kelas.jadwal.map((jadwal, i) => {
          const matkul = kelas.mata_kuliah.find(
            (mt) => mt.kode_mata_kuliah == jadwal.mata_kuliah
          );
          return (
            <Link
              href={
                "/kelas/" +
                kelas.jadwal.find(
                  (candidate) =>
                    candidate.mata_kuliah === jadwal.kode_mata_kuliah
                )?.kelas_jadwal_kelasTokelas?.nama_kelas
              }
              key={i}
              className="bg-purple-200 rounded-lg p-4 flex items-center block"
            >
              <div className="flex-1">
                <p className="font-bold">{matkul?.nama}</p>
                <p className="">
                  {user.role == "mahasiswa"
                    ? jadwal?.dosen_jadwal_dosenTodosen?.nama
                    : jadwal.kelas}
                </p>
              </div>
              <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-xl">
                {
                  (user.role == "mahasiswa"
                    ? jadwal?.dosen_jadwal_dosenTodosen?.nama
                    : matkul.nama
                  ).split("")[0]
                }
              </div>
            </Link>
          );
        })}
      </div>
    </App>
  );
};

export default Home;

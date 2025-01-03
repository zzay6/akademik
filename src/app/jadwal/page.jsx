import { App } from "@/layout/app";
import { getClass } from "@/lib/get-class";
import { getRoom } from "@/lib/get-room";
import Link from "next/link";

const Jadwal = async () => {
  const kelas = await getClass();
  const room = await getRoom();

  return (
    <App>
      <div className="w-full max-w-md p-4">
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4">Jadwal</h1>
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            className="w-full border-collapse border border-gray-400"
            style={{
              whiteSpace: "nowrap",
              position: "static",
            }}
          >
            <thead>
              <tr>
                <th className="border border-gray-400 px-2 py-1">No</th>
                <th className="border border-gray-400 px-2 py-1">
                  Mata Kuliah
                </th>
                <th className="border border-gray-400 px-2 py-1">Kelas</th>
                <th className="border border-gray-400 px-2 py-1">Jam</th>
                <th className="border border-gray-400 px-2 py-1">Hari</th>
                <th className="border border-gray-400 px-2 py-1">Ruang</th>
                <th className="border border-gray-400 px-2 py-1">Dosen</th>
              </tr>
            </thead>
            <tbody>
              {kelas.jadwal.map((candidate, i) => {
                const mata_kuliah = kelas.mata_kuliah.find(
                  (matkul) => matkul.kode_mata_kuliah == candidate.mata_kuliah
                );
                return (
                  <tr key={i}>
                    <td className="border border-gray-400 px-2 py-1">
                      {i + 1}
                    </td>
                    <td className="border border-gray-400 px-2 py-1">
                      {mata_kuliah.nama}
                    </td>
                    <td className="border border-gray-400 px-2 py-1">
                      {candidate.kelas}
                    </td>
                    <td className="border border-gray-400 px-2 py-1">
                      {candidate.jam}
                    </td>
                    <td className="border border-gray-400 px-2 py-1">
                      {candidate.hari}
                    </td>
                    <td className="border border-gray-400 px-2 py-1">
                      {
                        room.find((r) => r.kode_ruang == candidate.ruang)
                          .nama_ruang
                      }
                    </td>
                    <td className="border border-gray-400 px-2 py-1">
                      {mata_kuliah.dosen.nama}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </App>
  );
};

export default Jadwal;

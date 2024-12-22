import { App } from "@/layout/app";
import { getUser } from "@/lib/get-user";
import Link from "next/link";

const Biodata = async () => {
  const user = await getUser();

  let program;

  if (user?.mahasiswa?.nama_kelas?.split(" ")[3] == "P") program = "Regular";
  if (user?.mahasiswa?.nama_kelas?.split(" ")[3] == "M")
    program = "Non Regular";
  if (user?.mahasiswa?.nama_kelas?.split(" ")[3] == "SH") program = "Shif";

  return (
    <App>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-2xl"></i>
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Biodata Pribadi</h1>
        <div className="bg-purple-500 text-white p-4 rounded-lg mb-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            <span>Nama Lengkap</span>
            <span className="text-center">:</span>
            <span className="text-right">
              {user?.mahasiswa?.nama_mahasiswa}
            </span>

            <span>NIM</span>
            <span className="text-center">:</span>
            <span className="text-right">{user?.mahasiswa?.nim || "-"}</span>

            <span>Kelas</span>
            <span className="text-center">:</span>
            <span className="text-right">
              {user?.mahasiswa?.nama_kelas || "-"}
            </span>

            <span>Program Studi</span>
            <span className="text-center">:</span>
            <span className="text-right">{user?.prodi?.nama_prodi || "-"}</span>

            <span>Program Kuliah</span>
            <span className="text-center">:</span>
            <span className="text-right">{program}</span>
          </div>
        </div>
        <button className="w-full bg-purple-700 text-white py-2 rounded-lg">
          Edit Data
        </button>
      </div>
    </App>
  );
};

export default Biodata;

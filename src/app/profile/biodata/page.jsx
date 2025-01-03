import { App } from "@/layout/app";
import { getUser } from "@/lib/get-user";
import Link from "next/link";

const Biodata = async () => {
  const user = await getUser({});

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
          <div className="flex items-center mb-4">
            <div style={{ width: "100%" }}>Nama Lengkap</div>
            <div
              className="text-center"
              style={{
                width: "20px",
              }}
            >
              :
            </div>
            <div style={{ width: "100%" }} className="text-left pl-4">
              {user?.mahasiswa?.nama_mahasiswa}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div style={{ width: "100%" }}>NIM</div>
            <div
              className="text-center"
              style={{
                width: "20px",
              }}
            >
              :
            </div>
            <div style={{ width: "100%" }} className="text-left pl-4">
              {user?.mahasiswa?.nim || "-"}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div style={{ width: "100%" }}>Kelas</div>
            <div
              className="text-center"
              style={{
                width: "20px",
              }}
            >
              :
            </div>
            <div style={{ width: "100%" }} className="text-left pl-4">
              {user?.mahasiswa?.nama_kelas || "-"}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div style={{ width: "100%" }}>Program Studi</div>
            <div
              className="text-center"
              style={{
                width: "20px",
              }}
            >
              :
            </div>
            <div style={{ width: "100%" }} className="text-left pl-4">
              {user?.prodi?.nama_prodi || "-"}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div style={{ width: "100%" }}>Program Kuliah</div>
            <div
              className="text-center"
              style={{
                width: "20px",
              }}
            >
              :
            </div>
            <div style={{ width: "100%" }} className="text-left pl-4">
              {program}
            </div>
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

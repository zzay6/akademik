import { App } from "@/layout/app";
import { findClass } from "@/lib/get-class";
import { getUser } from "@/lib/get-user";
import Link from "next/link";

const Mahasiswa = async ({ params }) => {
  const user = await getUser();
  const kelas = await findClass();

  return (
    <App>
      <div className="w-full max-w-md p-4">
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-2xl"></i>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-6">Mahasiswa</h1>
        <div className="space-y-4">
          {kelas.mahasiswa?.map((mhs, i) => (
            <div
              className="flex justify-between items-center p-4 border-2 hover:border-blue-500 rounded-lg"
              key={i}
            >
              <span>{mhs.nama_mahasiswa}</span>
              {user.role == "dosen" && (
                <Link
                  href={params?.kode + "/nilai?nim=" + mhs?.nim}
                  className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  Nilai
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </App>
  );
};

export default Mahasiswa;

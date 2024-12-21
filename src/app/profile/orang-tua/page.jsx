import { App } from "@/layout/app";
import Link from "next/link";

const OrangTua = () => {
  return (
    <App>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-2xl"></i>
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">Biodata Pribadi</h1>
        <div className="bg-pink-500 text-white p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <span>Nama Lengkap</span>
            <span>:</span>
          </div>
          <div className="flex justify-between">
            <span>NIM</span>
            <span>:</span>
          </div>
          <div className="flex justify-between">
            <span>Kelas</span>
            <span>:</span>
          </div>
          <div className="flex justify-between">
            <span>Program Studi</span>
            <span>:</span>
          </div>
          <div className="flex justify-between">
            <span>Konsentrasi</span>
            <span>:</span>
          </div>
          <div className="flex justify-between">
            <span>Program Kuliah</span>
            <span>:</span>
          </div>
        </div>
        <button className="w-full bg-purple-700 text-white py-2 rounded-lg">
          Edit Data
        </button>
      </div>
    </App>
  );
};

export default OrangTua;

import { App } from "@/layout/app";
import Link from "next/link";

const Mahasiswa = () => {
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
          <div className="flex justify-between items-center p-4 border-2 border-blue-500 rounded-lg">
            <span>Nabila Innas</span>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-full">
              Input Nilai
            </button>
          </div>
          <div className="flex justify-between items-center p-4 border-2 border-gray-300 rounded-lg">
            <span>Zacky Zalfa</span>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-full">
              Input Nilai
            </button>
          </div>
          <div className="flex justify-between items-center p-4 border-2 border-gray-300 rounded-lg">
            <span>Hafiz</span>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-full">
              Input Nilai
            </button>
          </div>
          <div className="flex justify-between items-center p-4 border-2 border-gray-300 rounded-lg">
            <span>Rifky</span>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-full">
              Input Nilai
            </button>
          </div>
        </div>
      </div>
    </App>
  );
};

export default Mahasiswa;

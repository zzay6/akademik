import { App } from "@/layout/app";
import Link from "next/link";

const Informasi = () => {
  return (
    <App>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Informasi</h1>
        <p className="text-lg">Nilai Telah di input</p>
        <div className="flex items-center mt-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full p-2 border rounded-full pl-10"
              placeholder="search"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <i className="fas fa-filter text-xl ml-4"></i>
        </div>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold">1. Basis Data</p>
              <p>Pertemuan 3</p>
              <a href="#" className="text-blue-500">
                Lihat nilai
              </a>
            </div>
            <p className="text-gray-500">15 maret 2024</p>
          </div>
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold">2. Algoritma Pemograman</p>
              <p>Pertemuan 3</p>
              <a href="#" className="text-blue-500">
                Lihat nilai
              </a>
            </div>
            <p className="text-gray-500">16 maret 2024</p>
          </div>
        </div>
      </div>
    </App>
  );
};

export default Informasi;

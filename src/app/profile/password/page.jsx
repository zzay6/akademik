import { App } from "@/layout/app";
import Link from "next/link";

const InputNilai = async () => {
  return (
    <App>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-2xl"></i>
          </Link>
        </div>
        <h1 class="text-2xl font-bold ml-2">Masukan Nilai</h1>
        <h1 class="text-2xl font-bold mb-6">Ubah Password</h1>
        <div class="bg-pink-500 p-6 rounded-lg mb-3">
          <label class="block text-white mb-2">Password Lama</label>
          <input
            class="w-full p-2 mb-4 text-gray-500 bg-gray-200 rounded"
            type="password"
            placeholder="Masukkan password lama"
          />
          <label class="block text-white mb-2">Password Baru</label>
          <input
            class="w-full p-2 mb-4 text-gray-500 bg-gray-200 rounded"
            type="password"
            placeholder="Masukkan password baru"
          />
          <label class="block text-white mb-2">Konfirmasi Password Baru</label>
          <input
            class="w-full p-2 mb-4 text-gray-500 bg-gray-200 rounded"
            type="password"
            placeholder="Masukkan password baru"
          />
        </div>
        <button class="w-full bg-purple-700 text-white py-2 rounded mt-4">
          Simpan Perubahan
        </button>
      </div>
    </App>
  );
};

export default InputNilai;

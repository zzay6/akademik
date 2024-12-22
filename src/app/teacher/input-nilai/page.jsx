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
        <div class="bg-purple-600 p-4 rounded-lg mb-3">
          <div class="mb-4">
            <label class="block text-white mb-2">Nilai Formatif</label>
            <input
              class="w-full p-2 rounded bg-pink-200 text-gray-700"
              type="text"
              placeholder="Masukan Nilai"
            />
          </div>
          <div class="mb-4">
            <label class="block text-white mb-2">Nilai Tugas</label>
            <input
              class="w-full p-2 rounded bg-pink-200 text-gray-700"
              type="text"
              placeholder="Masukan Nilai"
            />
          </div>
          <div class="mb-4">
            <label class="block text-white mb-2">Nilai UTS</label>
            <input
              class="w-full p-2 rounded bg-pink-200 text-gray-700"
              type="text"
              placeholder="Masukan Nilai"
            />
          </div>
          <div class="mb-4">
            <label class="block text-white mb-2">Nilai UAS</label>
            <input
              class="w-full p-2 rounded bg-pink-200 text-gray-700"
              type="text"
              placeholder="Masukan Nilai"
            />
          </div>
        </div>
        <button class="w-full bg-purple-700 text-white py-2 rounded">
          Simpan
        </button>
      </div>
    </App>
  );
};

export default InputNilai;

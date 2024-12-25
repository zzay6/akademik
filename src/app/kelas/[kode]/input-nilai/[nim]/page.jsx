"use client";
import { App } from "@/layout/app";
import { findApiMahasiswa } from "@/lib/api/mahasiswa";
import { storeApiNilai } from "@/lib/api/nilai";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const InputNilai = ({ params }) => {
  const resolvedParams = use(params);
  const [mahasiswa, setMahasiswa] = useState({});

  useEffect(() => {
    const fetchMahasiswa = async () => {
      const findMahasiswa = await findApiMahasiswa(resolvedParams.nim);
      setMahasiswa(findMahasiswa);
    };
    fetchMahasiswa();
  }, [resolvedParams.nim]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formObject = {};

    const formData = new FormData(event.target);
    formData.set("nim", resolvedParams.nim);
    formData.set("kode_jadwal", resolvedParams.kode);

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const response = await storeApiNilai(formObject);
      if (response.ok) {
        alert("Nilai berhasil disimpan");
      } else {
        alert("Terjadi kesalahan saat menyimpan nilai");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Terjadi kesalahan pada server");
    }
  };

  return (
    <App>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-2xl"></i>
          </Link>
        </div>
        <h1 className="text-2xl font-bold ml-2">Masukan Nilai</h1>
        <form onSubmit={handleSubmit}>
          <div className="bg-purple-600 p-4 rounded-lg mb-3">
            <div className="mb-4">
              <label className="block text-white mb-2">Mahasiswa</label>
              <input
                className="w-full p-2 rounded bg-white text-gray-700"
                type="text"
                defaultValue={`${params.nim} (${mahasiswa.nama_mahasiswa})`}
                disabled={true}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Semester</label>
              <input
                className="w-full p-2 rounded bg-white text-gray-700"
                type="text"
                placeholder="Masukan Semester"
                name="semester"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Nilai Formatif</label>
              <input
                className="w-full p-2 rounded bg-white text-gray-700"
                type="text"
                placeholder="Masukan Nilai"
                name="nilai_formatif"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Nilai Tugas</label>
              <input
                className="w-full p-2 rounded bg-white text-gray-700"
                type="text"
                placeholder="Masukan Nilai"
                name="nilai_tugas"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Nilai UTS</label>
              <input
                className="w-full p-2 rounded bg-white text-gray-700"
                type="text"
                placeholder="Masukan Nilai"
                name="nilai_uts"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Nilai UAS</label>
              <input
                className="w-full p-2 rounded bg-white text-gray-700"
                type="text"
                placeholder="Masukan Nilai"
                name="nilai_uas"
              />
            </div>
          </div>
          <button className="w-full bg-purple-700 text-white py-2 rounded">
            Simpan
          </button>
        </form>
      </div>
    </App>
  );
};

export default InputNilai;

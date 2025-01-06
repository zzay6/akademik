"use client";
import { App } from "@/layout/app";
import { findApiMahasiswa } from "@/lib/api/mahasiswa";
import { storeApiNilai } from "@/lib/api/nilai";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const InputNilai = () => {
  const router = useRouter();
  const { kode, jadwal } = useParams();
  const params = useSearchParams();
  const nim = params.get("nim");
  const [mahasiswa, setMahasiswa] = useState({});
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMahasiswa = async () => {
      const findMahasiswa = await findApiMahasiswa(nim);
      setMahasiswa(findMahasiswa);
    };
    if (nim) fetchMahasiswa();
  }, [params]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formObject = {};

    const formData = new FormData(event.target);
    formData.set("nim", nim);
    formData.set("kode_jadwal", jadwal);

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const response = await axios.post("/api/nilai", formObject, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data, message, success } = response?.data || {};

      if (success) {
        setSuccess(true);
        setMessage(message || "Nilai berhasil disimpan");
        setTimeout(
          () => router.push("../nilai/" + jadwal + "?nim=" + nim),
          1200
        );
      } else {
        setSuccess(false);
        setMessage("Terjadi kesalahan saat menyimpan nilai");
      }
    } catch (error) {
      setSuccess(false);
      console.error("Error submitting data:", error);

      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan pada server";
      setMessage(errorMessage);
    }
  };

  return (
    <App
      alertClose={(e) => setMessage("")}
      alertMessage={message}
      alertType={success ? "success" : "error"}
    >
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Link href={"../nilai/" + jadwal + "?nim=" + nim}>
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
                value={`${nim} (${mahasiswa.nama_mahasiswa})`}
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

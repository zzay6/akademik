"use client";
import { App } from "@/layout/app";
import { deleteApiNilai, getApiNilai, getApiSemester } from "@/lib/api/nilai";
import Link from "next/link";
import { useEffect, useState } from "react";
import TableNilai from "@/components/TableNilai";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";

const Nilai = () => {
  const { kode, jadwal } = useParams();
  const params = useSearchParams();
  const nim = params.get("nim");
  const [semester, setSemester] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [nilai, setNilai] = useState([]);
  const [detailNilai, setDetailNilai] = useState([]);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [ipk, setIpk] = useState(null);
  const [nilai2, setNilai2] = useState(null);

  useEffect(() => {
    (async () => {
      const getSemester = await getApiSemester(nim);
      setSemester(getSemester);
      const getNilai = await getApiNilai(nim);
      setNilai(getNilai);
    })();
  }, []);

  useEffect(() => {
    const nilaiSemester = nilai.filter((n) => n.semester === selectedSemester);
    const detail = nilaiSemester.flatMap((n) => n.detail);

    const filterNilai = detail.filter((d) => d?.kode_jadwal == jadwal);

    setDetailNilai(filterNilai);
    setIpk(nilaiSemester[0]?.ipk);
    setNilai2(nilaiSemester[0]);
  }, [nilai, selectedSemester]);

  const onDelete = async (kode_nilai) => {
    try {
      const result = await axios.post(`/api/nilai`, {
        kode_nilai,
        action: "delete",
      });

      if (result.status === 200) {
        setSuccess(true);
        setMessage("Nilai berhasil dihapus");

        const getNilai = await getApiNilai(nim);
        setNilai(getNilai);
      } else {
        setSuccess(false);
        setMessage("Gagal menghapus nilai");
      }
    } catch (error) {
      setSuccess(false);
      console.error("Error deleting nilai:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menghapus nilai";
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
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-2xl"></i>
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-3 mt-3">Nilai</h1>
          <div>
            <Link
              href={"../input-nilai/" + jadwal + "?nim=" + nim}
              className="bg-pink-600 text-white px-4 py-2 rounded text-sm"
            >
              <i className="fas fa-plus mr-3"></i>
              Input
            </Link>
          </div>
        </div>

        <div className="bg-purple-500 p-6 rounded-lg mb-3">
          <label className="block text-white mb-2">Pilih Semester</label>
          <select
            className="w-full p-2 mb-4 text-gray-500 rounded"
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">-- Pilih --</option>
            {semester?.map((sm, i) => (
              <option value={sm} key={i}>
                {sm}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto mt-4">
          <TableNilai
            detailNilai={detailNilai}
            isCanDelete={true}
            onDelete={onDelete}
            ipk={ipk}
            semester={nilai2?.semester}
          />
        </div>
      </div>
    </App>
  );
};

export default Nilai;

"use client";
import { App } from "@/layout/app";
import { getApiNilai, getApiSemester } from "@/lib/api/nilai";
import Link from "next/link";
import { useEffect, useState } from "react";
import TableNilai from "@/components/TableNilai";

const Nilai = () => {
  const [semester, setSemester] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [nilai, setNilai] = useState([]);
  const [detailNilai, setDetailNilai] = useState([]);

  useEffect(() => {
    (async () => {
      const getSemester = await getApiSemester();
      setSemester(getSemester);

      const getNilai = await getApiNilai();
      setNilai(getNilai);
    })();
  }, []);

  useEffect(() => {
    const detail =
      nilai.find((nl) => nl.semester == selectedSemester)?.detail || [];
    setDetailNilai(detail);
  }, [selectedSemester]);

  return (
    <App>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-2xl"></i>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-6">Nilai</h1>

        <div className="bg-purple-500 p-6 rounded-lg mb-3">
          <label className="block text-white mb-2">Pilih Semester</label>
          <select
            className="w-full p-2 mb-4 text-gray-500 rounded"
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">-- Pilih --</option>
            {semester.map((sm, i) => (
              <option value={sm} key={i}>
                {sm}
              </option>
            ))}
          </select>
        </div>
        <button className="w-full bg-purple-700 text-white py-2 rounded-lg">
          Ambil Data
        </button>
        <div className="overflow-x-auto mt-4">
          <TableNilai detailNilai={detailNilai} />
        </div>
      </div>
    </App>
  );
};

export default Nilai;

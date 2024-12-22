"use client";
import { App } from "@/layout/app";
import { getApiNilai, getApiSemester } from "@/lib/api/nilai";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      nilai.find((nl) => nl.semester === selectedSemester)?.detail || [];
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
          <table className="min-w-full border-collapse border border-gray-400 whitespace-nowrap">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">No</th>
                <th className="border border-gray-400 px-4 py-2">
                  Mata Kuliah
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Nilai Tugas
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Nilai Formatif
                </th>
                <th className="border border-gray-400 px-4 py-2">Nilai UTS</th>
                <th className="border border-gray-400 px-4 py-2">Nilai UAS</th>
                <th className="border border-gray-400 px-4 py-2">
                  Nilai Akhir
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Nilai Huruf
                </th>
                <th className="border border-gray-400 px-4 py-2">SKS</th>
              </tr>
            </thead>
            <tbody>
              {detailNilai.map((dn, i) => {
                const nilai_akhir =
                  (dn.nilai_tugas +
                    dn.nilai_formatif +
                    dn.nilai_uts +
                    dn.nilai_uas) /
                  4;

                const grade =
                  nilai_akhir >= 90
                    ? "A"
                    : nilai_akhir >= 80
                    ? "B"
                    : nilai_akhir >= 70
                    ? "C"
                    : "D";
                return (
                  <tr key={i}>
                    <td className="border border-gray-400 px-4 py-2">1</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {dn.jadwal?.mata_kuliah?.nama}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {dn.nilai_tugas}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {dn.nilai_formatif}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {dn.nilai_uts}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {dn.nilai_uas}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {nilai_akhir}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {grade}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">3</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </App>
  );
};

export default Nilai;

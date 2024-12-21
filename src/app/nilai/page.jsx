import { App } from "@/layout/app";
import Link from "next/link";

const Nilai = () => {
  return (
    <App>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <i className="fas fa-arrow-left text-2xl"></i>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-6">Nilai</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-400">
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
              <tr>
                <td className="border border-gray-400 px-4 py-2">1</td>
                <td className="border border-gray-400 px-4 py-2">
                  Jaringan Komputer
                </td>
                <td className="border border-gray-400 px-4 py-2">80</td>
                <td className="border border-gray-400 px-4 py-2">80</td>
                <td className="border border-gray-400 px-4 py-2">80</td>
                <td className="border border-gray-400 px-4 py-2">81</td>
                <td className="border border-gray-400 px-4 py-2">81.5</td>
                <td className="border border-gray-400 px-4 py-2">A</td>
                <td className="border border-gray-400 px-4 py-2">3</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">2</td>
                <td className="border border-gray-400 px-4 py-2">Basis Data</td>
                <td className="border border-gray-400 px-4 py-2">90</td>
                <td className="border border-gray-400 px-4 py-2">90</td>
                <td className="border border-gray-400 px-4 py-2">90</td>
                <td className="border border-gray-400 px-4 py-2">91</td>
                <td className="border border-gray-400 px-4 py-2">91.5</td>
                <td className="border border-gray-400 px-4 py-2">A</td>
                <td className="border border-gray-400 px-4 py-2">3</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">3</td>
                <td className="border border-gray-400 px-4 py-2">
                  Pengantar Teknologi Komputer
                </td>
                <td className="border border-gray-400 px-4 py-2">85</td>
                <td className="border border-gray-400 px-4 py-2">85</td>
                <td className="border border-gray-400 px-4 py-2">85</td>
                <td className="border border-gray-400 px-4 py-2">86</td>
                <td className="border border-gray-400 px-4 py-2">85.5</td>
                <td className="border border-gray-400 px-4 py-2">A</td>
                <td className="border border-gray-400 px-4 py-2">2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </App>
  );
};

export default Nilai;

const TableNilai = ({ detailNilai }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-400 whitespace-nowrap">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2">No</th>
          <th className="border border-gray-400 px-4 py-2">Mata Kuliah</th>
          <th className="border border-gray-400 px-4 py-2">Nilai Tugas</th>
          <th className="border border-gray-400 px-4 py-2">Nilai Formatif</th>
          <th className="border border-gray-400 px-4 py-2">Nilai UTS</th>
          <th className="border border-gray-400 px-4 py-2">Nilai UAS</th>
          <th className="border border-gray-400 px-4 py-2">Nilai Akhir</th>
          <th className="border border-gray-400 px-4 py-2">Nilai Huruf</th>
          <th className="border border-gray-400 px-4 py-2">SKS</th>
        </tr>
      </thead>
      <tbody>
        {detailNilai?.map((dn, i) => {
          const nilai_akhir =
            (dn.nilai_tugas + dn.nilai_formatif + dn.nilai_uts + dn.nilai_uas) /
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
              <td className="border border-gray-400 px-4 py-2">{grade}</td>
              <td className="border border-gray-400 px-4 py-2">3</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableNilai;

const TableNilai = ({ detailNilai, isCanDelete, onDelete, ipk, semester }) => {
  return (
    <div>
      {!semester && (
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "430px",
            zIndex: 9,
            marginBottom: '-70px'
          }}
          className="flex justify-center items-center pt-12"
        >
          <h6
            style={{ fontWeight: 500 }}
            className="bg-yellow-100 py-2 w-full text-center"
          >
            Pilih semester dulu
          </h6>
        </div>
      )}
      <table
        className="min-w-full border-collapse border border-gray-400 whitespace-nowrap"
        style={{
          opacity: !semester && 0.3,
        }}
      >
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">No</th>
            {isCanDelete && (
              <th className="border border-gray-400 px-4 py-2">Aksi</th>
            )}
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
            if (dn?.kode_nilai) {
              return (
                <tr key={i}>
                  <td className="border border-gray-400 px-4 py-2">1</td>
                  {isCanDelete && (
                    <td className="border border-gray-400 px-4 py-2">
                      <button
                        className="text-white bg-red-500 text-sm py-1 px-2 rounded"
                        onClick={(e) => onDelete(dn.kode_nilai)}
                      >
                        <i className="fas fa-trash"></i>{" "}
                      </button>
                    </td>
                  )}
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
                    {dn.nilai_akhir}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {dn.nilai_huruf}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">3</td>
                </tr>
              );
            } else {
              return (
                <tr key={i}>
                  <td colSpan={isCanDelete ? 10 : 9} className="text-center">
                    Nilai belum di input
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={2}
              className="border border-gray-400 px-4 py-2 font-bold text-right"
            >
              Semester
            </td>
            <td
              colSpan={isCanDelete ? 8 : 7}
              className="border border-gray-400 px-4 py-2 font-bold"
            >
              {semester}
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              className="border border-gray-400 px-4 py-2 font-bold text-right"
            >
              IPK
            </td>
            <td
              colSpan={isCanDelete ? 8 : 7}
              className="border border-gray-400 px-4 py-2 font-bold"
            >
              {ipk}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableNilai;

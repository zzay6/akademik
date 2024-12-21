const { App } = require("@/layout/app");

const Jadwal = () => {
  return (
    <App>
      <div className="w-full max-w-md p-4">
        <div className="flex items-center mb-4">
          <i className="fas fa-arrow-left text-xl"></i>
        </div>
        <h1 className="text-4xl font-bold mb-4">Jadwal</h1>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-2 py-1">No</th>
              <th className="border border-gray-400 px-2 py-1">Mata Kuliah</th>
              <th className="border border-gray-400 px-2 py-1">Jam</th>
              <th className="border border-gray-400 px-2 py-1">Ruang</th>
              <th className="border border-gray-400 px-2 py-1">Dosen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-2 py-1">1</td>
              <td className="border border-gray-400 px-2 py-1">Basis Data</td>
              <td className="border border-gray-400 px-2 py-1">18.00-19.40</td>
              <td className="border border-gray-400 px-2 py-1">LAB B</td>
              <td className="border border-gray-400 px-2 py-1">Nofi Cahyono</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1">2</td>
              <td className="border border-gray-400 px-2 py-1">
                Algoritma Pemograman
              </td>
              <td className="border border-gray-400 px-2 py-1">20.00-22.00</td>
              <td className="border border-gray-400 px-2 py-1">LAB D</td>
              <td className="border border-gray-400 px-2 py-1">Pramana</td>
            </tr>
          </tbody>
        </table>
      </div>
    </App>
  );
};

export default Jadwal;

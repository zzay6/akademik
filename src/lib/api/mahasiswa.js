import axios from "axios";

export const findApiMahasiswa = async (nim) => {
  const result = await axios.get("/api/mahasiswa?nim=" + nim);
  return result.data.mahasiswa;
};

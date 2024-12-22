import axios from "axios";

export const getApiInformasi = async () => {
  const informasi = await axios.get("api/informasi");
  return informasi.data.informasi;
};

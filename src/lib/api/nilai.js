"use client";
import axios from "axios";

export const getApiSemester = async (data) => {
  const seenSemesters = new Set();

  const uniqueSemesters = data
    .filter((d) => {
      if (seenSemesters.has(d.semester)) {
        return false;
      }
      seenSemesters.add(d.semester);
      return true;
    })
    .map((d) => d.semester);

  return uniqueSemesters;
};

export const getApiNilai = async (nim = null) => {
  const result = nim
    ? await axios.get("/api/nilai?nim=" + nim)
    : await axios.get("/api/nilai");
  const data = result.data.nilai;
  return data;
};

export const storeApiNilai = async (formData) => {
  const result = await axios.post("/api/nilai", formData);
  return result;
};

export const deleteApiNilai = async (kode_nilai) => {
  const result = await axios.post("/api/nilai", {
    kode_nilai,
    action: "delete",
  });
  return result;
};

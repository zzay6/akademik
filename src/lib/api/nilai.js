"use client";
import axios from "axios";

export const getApiSemester = async () => {
  const result = await axios.get("/api/nilai");
  const data = result.data.nilai;
  return data.map((d) => d.semester);
};

export const getApiNilai = async () => {
  const result = await axios.get("/api/nilai");
  const data = result.data.nilai;
  return data;
};

export const storeApiNilai = async (formData) => {
  const result = await axios.post("/api/nilai", formData);
  console.log(result);
};

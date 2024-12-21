"use client";
import axios from "axios";

export const getApiUser = async () => {
  const result = await axios.get("/api/user");
  return result.data;
};

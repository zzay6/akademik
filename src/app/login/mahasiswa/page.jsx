"use client";
import { App } from "@/layout/app";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginMahasiswa = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/login", {
        role: "mahasiswa",
        username: event.target.username.value,
        password: event.target.password.value,
      });

      const { data, success, message } = response.data;

      if (success) {
        const { token } = data;
        document.cookie = `token=${token}; path=/`;

        setResMessage(message);
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setResMessage(message || "Login failed!");
        setSuccess(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      setResMessage(
        error.response.data.message ||
          "Terjadi kesalahan saat login. Silakan coba lagi."
      );
      setSuccess(false);
    }
  };

  return (
    <App
      hideTopBar={true}
      alertClose={(e) => setResMessage("")}
      alertMessage={resMessage}
      alertType={success ? "success" : "error"}
      loading={loading}
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href={"/login"}>
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="ml-2 text-xl font-semibold">Mahasiswa</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <img
              alt="Illustration of a student standing on books with a graduation cap and various educational elements around"
              height="200"
              src="https://storage.googleapis.com/a1aa/image/iHFqfZpyWoQtQiX94SiJen3yuKn2fam69DHQR7baSFqZSfyPB.jpg"
              width="300"
            />
          </div>
          <div className="bg-purple-200 p-6 rounded-lg">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nim"
            >
              NIM
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              placeholder="Masukan NIM Anda"
              type="text"
              name="username"
            />
            <label
              className="block text-gray-700 text-sm font-bold mt-4 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="Masukkan password"
              type="password"
              name="password"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full w-full">
              Masuk
            </button>
          </div>
        </form>
      </div>
    </App>
  );
};

export default LoginMahasiswa;

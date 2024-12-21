"use client";

import { App } from "@/layout/app";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginDosen = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        role: "dosen",
        username: event.target.username.value,
        password: event.target.password.value,
      }),
    });

    if (res.ok) {
      const { token } = await res.json();
      document.cookie = `token=${token}; path=/`;
      router.push("/");
    } else {
      alert("Login failed!");
    }
  };

  return (
    <App hideTopBar={true}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href={"/login"}>
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="ml-2 text-xl font-semibold">Dosen</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <img
              alt="Illustration of a student standing on books with a graduation cap and various educational elements around"
              height="200"
              src="https://storage.googleapis.com/a1aa/image/8fj20jbba9yGcSoCPhLFPiIOrV2KMmcf7jJU253W4UkAtv8TA.jpg"
              width="300"
            />
          </div>
          <div className="bg-purple-200 p-6 rounded-lg">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nidn"
            >
              NIDN
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nidn"
              placeholder="Masukan NIDN Anda"
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

export default LoginDosen;

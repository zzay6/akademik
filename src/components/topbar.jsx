"use client";
import Link from "next/link";
import { useState } from "react";

export const Topbar = ({ user }) => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="bg-purple-600 p-4 flex items-center">
        <button className="" onClick={(e) => setMenu(true)}>
          <i className="fas fa-bars text-white text-2xl mr-4"></i>
        </button>
        <div>
          <p className="text-white text-lg">Hi</p>
          <p className="text-white text-sm">
            Welcome, {user?.mahasiswa?.nama_mahasiswa || user?.dosen?.nama}
          </p>
        </div>
      </div>
      <div
        className="bg-white fixed h-screen w-full text-gray-500"
        style={{
          maxWidth: "430px",
          zIndex: 999,
          transition: "all 0.3s",
          top: menu ? "0" : "-100vh",
        }}
      >
        <div className="pt-5 px-5 mx-auto">
          <div className="flex items-end justify-between mb-5">
            <div className="text-left pt-10">
              <h1 className="text-xl font-bold text-black">Welcome</h1>
              <h2 className="text-xl font-bold text-purple-700">Akadify</h2>
            </div>
            <div className="text-right">
              <button
                className="ml-auto hover:bg-gray-100 px-3 py-2 rounded-lg"
                onClick={(e) => setMenu(false)}
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          <Link
            href={"/"}
            className="text-xl p-3 my-3 block text-black bg-purple-200"
          >
            <i className="fas fa-home mr-3"></i>
            Kelas
          </Link>
          <Link href={"/jadwal"} className="text-xl p-3 my-3 block">
            <i className="fas fa-calendar mr-3"></i>
            Jadwal
          </Link>
          {user.role == "mahasiswa" && (
            <Link href={"/nilai"} className="text-xl p-3 my-3 block">
              <i className="fas fa-dashboard mr-3"></i>
              Nilai
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

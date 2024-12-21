"use client";
import { App } from "@/layout/app";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  return (
    <App>
      <div className="flex flex-col items-center w-full px-4 space-y-4 mt-8">
        <button className="w-full bg-gray-200 p-4 rounded-lg text-black flex items-center">
          <i className="fas fa-user text-xl mr-4"></i>
          <span className="text-lg">Data Diri</span>
        </button>
        <button className="w-full bg-gray-200 p-4 rounded-lg text-black flex items-center">
          <i className="fas fa-users text-xl mr-4"></i>
          <span className="text-lg">Data Orang Tua</span>
        </button>
        <button className="w-full bg-gray-200 p-4 rounded-lg text-black flex items-center">
          <i className="fas fa-key text-xl mr-4"></i>
          <span className="text-lg">Password</span>
        </button>
        <button
          className="w-full bg-gray-200 p-4 rounded-lg text-black flex items-center"
          onClick={(e) => {
            document.cookie =
              "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            router.push("/login");
          }}
        >
          <i className="fas fa-sign-out-alt text-xl mr-4"></i>
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </App>
  );
};

export default Profile;

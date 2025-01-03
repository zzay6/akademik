"use client";
import { App } from "@/layout/app";
import { getApiUser } from "@/lib/api/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const getuser = await getApiUser();
      setUser(getuser.user);
    })();
  }, []);
  return (
    <App>
      <div className="flex flex-col items-center w-full px-4 space-y-4 mt-8">
        {user.role == "mahasiswa" && (
          <Link href={"/profile/biodata"} className="w-full">
            <button className="w-full bg-gray-200 p-4 rounded-lg text-black flex items-center">
              <i className="fas fa-user text-xl mr-4"></i>
              <span className="text-lg">Data Diri</span>
            </button>
          </Link>
        )}
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

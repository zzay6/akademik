"use client";
import { Topbar } from "@/components/topbar";
import { Navbar } from "@/components/navbar";
import { getApiUser } from "@/lib/api/user";
import { useEffect, useState } from "react";

export const App = ({ children, hideTopBar }) => {
  const [user, setUser] = useState({});

  useEffect((e) => {
    const fetchUser = async () => {
      const result = await getApiUser();
      setUser(result.user);
    };
    if (!hideTopBar) fetchUser();
  }, []);

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "auto",
        minHeight: "100vh",
      }}
      className="bg-gray-50 text-black"
    >
      {!hideTopBar && <Topbar user={user} />}
      {children}
      {!hideTopBar && <Navbar />}
    </div>
  );
};

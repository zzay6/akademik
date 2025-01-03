"use client";
import { Topbar } from "@/components/topbar";
import { Navbar } from "@/components/navbar";
import { getApiUser } from "@/lib/api/user";
import { useEffect, useState } from "react";

export const App = ({ children, hideTopBar }) => {
  const [user, setUser] = useState({});

  useEffect((e) => {
    try {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : {};
      setUser(parsedUser);
      const fetchUser = async () => {
        try {
          const result = await getApiUser();
          const userFromApi = result?.user || {};
          localStorage.setItem("user", JSON.stringify(userFromApi));
          setUser(userFromApi);
        } catch (apiError) {
          console.error("Error fetching user data from API:", apiError);
        }
      };

      if (!hideTopBar) {
        fetchUser();
      }
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      setUser({});
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "auto",
        minHeight: "100vh",
        paddingBottom: "70px",
      }}
      className="bg-gray-50 text-black"
    >
      {!hideTopBar && <Topbar user={user} />}
      {children}
      {!hideTopBar && <Navbar />}
    </div>
  );
};

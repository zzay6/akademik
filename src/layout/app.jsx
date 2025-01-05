"use client";
import { Topbar } from "@/components/topbar";
import { Navbar } from "@/components/navbar";
import { getApiUser } from "@/lib/api/user";
import { useEffect, useState } from "react";
import Alert from "@/components/alert";
import Loading from "@/components/loading";

export const App = ({
  children,
  hideTopBar,
  alertMessage,
  alertClose,
  alertType,
  loading,
}) => {
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
          setUser(parsedUser);
          setLoadingUser(false);
          return;
        }

        const result = await getApiUser();
        const userFromApi = result?.user || {};
        localStorage.setItem("user", JSON.stringify(userFromApi));
        setUser(userFromApi);
        setLoadingUser(false);
      } catch (apiError) {
        console.error("Error fetching user data from API:", apiError);
        setUser({});
        setLoadingUser(false);
      }
    };

    if (!hideTopBar) fetchUser();
    setLoadingUser(false);

    return () => {
      setUser(null);
      setLoadingUser(true);
    };
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
      {alertMessage && (
        <Alert
          handleClose={alertClose}
          message={alertMessage}
          type={alertType}
        />
      )}
      {(loading || loadingUser) && <Loading />}
      {children}
      {!hideTopBar && <Navbar />}
    </div>
  );
};

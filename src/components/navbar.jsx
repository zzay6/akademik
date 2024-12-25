import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div
        className="bg-white border-t border-gray-100 flex justify-around p-2 text-black"
        style={{
          maxWidth: "430px",
          margin: "auto",
        }}
      >
        <Link href={"/"}>
          <div className="flex flex-col items-center">
            <i className="fas fa-home text-xl"></i>
            <p className="text-xs">Home</p>
          </div>
        </Link>
        <Link href={"/informasi"}>
          <div className="flex flex-col items-center">
            <i className="fas fa-info-circle text-xl"></i>
            <p className="text-xs">Informasi</p>
          </div>
        </Link>
        <Link href={"/profile"}>
          <div className="flex flex-col items-center">
            <i className="fas fa-user text-xl"></i>
            <p className="text-xs">Profile</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

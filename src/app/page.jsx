"use server";
import { App } from "@/layout/app";

const Home = async () => {
  return (
    <App>
      <div className="p-4">
        <input
          type="text"
          placeholder="search"
          className="w-full p-2 rounded-md border border-gray-300"
        />
      </div>
      <div className="p-4 space-y-4 text-black">
        <div className="bg-purple-200 rounded-lg p-4 flex items-center">
          <div className="flex-1">
            <p className="font-bold">Basis Data TI SE 24 M</p>
            <p className="">Nofi Cahyono</p>
          </div>
          <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-xl">
            N
          </div>
        </div>
        <div className="bg-purple-200 rounded-lg p-4 flex items-center">
          <div className="flex-1">
            <p className="font-bold">Algoritma Pemrograman TI SE 24 M</p>
            <p className="">Pramana</p>
          </div>
          <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-xl">
            P
          </div>
        </div>
      </div>
    </App>
  );
};

export default Home;

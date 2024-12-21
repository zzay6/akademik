import { App } from "@/layout/app";
import Image from "next/image";
import Link from "next/link";

export const Login = () => {
  return (
    <App hideTopBar={true}>
      <div>
        <div className="text-center pt-10">
          <h1 className="text-3xl font-bold text-purple-700">Welcome</h1>
          <h2 className="text-3xl font-bold text-purple-700">Akadify</h2>
        </div>
        <div className="my-8">
          <Image
            alt="Illustration of people studying with books and a clock"
            className="w-64 h-64 mx-auto"
            height="200"
            src="https://storage.googleapis.com/a1aa/image/36vKsgVtRQK8BdteoKK7XnaIRZrOnmgzUOyEpKOKeXPtss7TA.jpg"
            width="300"
          />
        </div>
        <div className="text-center mb-4">
          <p className="text-gray-700">Sebagai</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Link href={"/login/dosen"}>
            <button className="w-64 py-4 text-2xl font-bold text-white bg-purple-400 rounded-lg">
              Dosen
            </button>
          </Link>
          <div className="flex items-center w-64">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="mx-2 text-gray-700">Or</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
          <Link href={"/login/mahasiswa"}>
            <button className="w-64 py-4 text-2xl font-bold text-white bg-purple-400 rounded-lg">
              Mahasiswa
            </button>
          </Link>
        </div>
      </div>
    </App>
  );
};

export default Login;

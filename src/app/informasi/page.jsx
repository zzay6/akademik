"use client";
import { App } from "@/layout/app";
import { getApiInformasi } from "@/lib/api/informasi";
import Link from "next/link";
import { useEffect, useState } from "react";

const Informasi = () => {
  const [informasi, setInformasi] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (index) => {
    setExpanded((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    (async () => {
      const getInformasi = await getApiInformasi();
      setInformasi(getInformasi);
    })();
  }, []);

  return (
    <App>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Informasi</h1>
        <div className="flex items-center mt-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full p-2 border rounded-full pl-10"
              placeholder="search"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <i className="fas fa-filter text-xl ml-4"></i>
        </div>
        <div className="space-y-4">
          {informasi.map((info, i) => {
            const isExpanded = expanded.includes(i);
            const maxLength = 100;
            const shouldTruncate = info.informasi.length > maxLength;
            return (
              <div className="p-4 border rounded-lg" key={i}>
                <div>
                  <div className="flex justify-between">
                    <p className="font-bold">{info.subject}</p>
                    <p className="text-gray-500">15 maret 2024</p>
                  </div>
                  <p className="mt-3">
                    {shouldTruncate && !isExpanded
                      ? `${info.informasi.slice(0, maxLength)}...`
                      : info.informasi}
                  </p>
                  {shouldTruncate && (
                    <button
                      className="mt-2 text-blue-500 hover:underline"
                      onClick={() => toggleExpand(i)}
                    >
                      {isExpanded ? "baca sedikit" : "baca lebih"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </App>
  );
};

export default Informasi;

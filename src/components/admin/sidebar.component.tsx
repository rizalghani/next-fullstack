"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div
      className="p-2 bg-white w-full md:w-60 flex flex-col md:flex"
      id="sideNav"
    >
      <nav>
        <Link
          className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
          href="/users"
        >
          <i className="fas fa-home mr-2"></i>
          Dashboard
        </Link>
        <Link
          className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
          href="/users"
        >
          Manajemen User
        </Link>
        <Link
          className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
          href="/products"
        >
          Manajemen Produk
        </Link>
      </nav>
      <div className="bg-gradient-to-r mt-auto from-cyan-300 to-cyan-500 h-px"></div>
      <p className="mb-1 px-5 py-3 text-left text-xs text-cyan-500">
        Copyright mrghani@2023
      </p>
    </div>
  );
};

export default Sidebar;

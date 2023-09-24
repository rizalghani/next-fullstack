"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Topbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="bg-white shadow w-full p-2 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center">
          <Link href="/dashboard">
            <img
              className="pr-2"
              src="/images/logo.svg"
              alt=""
              style={{ height: "1.5rem" }}
            />
          </Link>
        </div>
      </div>

      <div className="space-x-5">
        <button>
          <i className="fas fa-bell text-gray-500 text-lg"></i>
        </button>

        <button>
          <i className="fas fa-user text-gray-500 text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default Topbar;

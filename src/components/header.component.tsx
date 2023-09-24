"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log({ session })
  return (
    <header className="bg-white h-20">
      <nav className="h-full flex justify-between container items-center">
        <Link href="/">
          <img
            className="pr-2"
            src="/images/logo.svg"
            alt=""
            style={{ height: "2rem" }}
          />
        </Link>
        <div className="w-[662px] h-8 px-4 py-1.5 bg-stone-50 rounded-sm justify-between items-center inline-flex">
          <div className="text-stone-400 text-xs font-normal font-['SF Pro Display'] tracking-tight">
            Cari parfum kesukaanmu
          </div>
          <div className="w-5 h-5 relative" />
        </div>
        <ul className="flex items-right gap-4">
          {/* <li>
            
          </li> */}
          {!user && (
            <>
              <li>
                <div className="w-24 h-10 px-4 py-2 border border-blue-500 justify-center items-center gap-2.5 inline-flex">
                  <Link
                    href="/login"
                    className="text-blue-500 text-sm font-bold font-['SF Pro Display'] tracking-[3.50px]"
                  >
                    MASUK
                  </Link>
                </div>
              </li>
              <li>
                <div className="w-[102px] h-10 px-4 py-2 bg-blue-500 justify-center items-center gap-2.5 inline-flex">
                  <Link
                    href="/register"
                    className="text-white text-sm font-bold font-['SF Pro Display'] tracking-[3.50px]"
                  >
                    DAFTAR
                  </Link>
                </div>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link href="/profile" className="text-ct-dark-600">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-ct-dark-600">
                  Dashboard
                </Link>
              </li>
              <li className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="w-[1366px] h-[0.90px] bg-neutral-200" />
    </header>
  );
};

export default Header;

import { ReactNode } from "react";
import Topbar from "./topbar.component";
import Sidebar from "./sidebar.component";
import Link from "next/link";

interface propsType {
  children: ReactNode;
}

export default function AdminLayout(props: propsType) {
  const { children } = props;

  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex-1 flex flex-wrap">
        <Sidebar />
        <div className="flex-1 p-4 w-full md:w-1/2">{children}</div>
      </div>
    </div>
  );
}

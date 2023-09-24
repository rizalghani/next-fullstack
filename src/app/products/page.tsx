import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "@/components/header.component";

import AdminLayout from "@/components/admin/adminLayout.component";
import ProductForm from "./form";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <Header />
      {user && (
        <AdminLayout>
          <ProductForm />
        </AdminLayout>
      )}
    </>
  );
}

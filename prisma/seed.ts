import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const role = await prisma.role.createMany({
    data: [
      { id: 1, name: "admin" },
      { id: 2, name: "user" }
    ],
    skipDuplicates: true,
  });
  console.log({ role });

  const password = await hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "Admin",
      password,
      phone: "",
      roleId: 1,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

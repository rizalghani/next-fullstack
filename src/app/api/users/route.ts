import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      status: true,
      message: "ok",
      data: users,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, roleId } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
      phone: string;
      roleId: number;
    };
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        phone,
        roleId,
      },
    });

    return NextResponse.json({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

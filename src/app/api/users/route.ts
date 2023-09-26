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
    const { id, name, email, password, phone, roleId } = (await req.json()) as {
      id?: string;
      name: string;
      email: string;
      password: string;
      phone: string;
      roleId: number;
    };

    let user = null;
    const hashed_password = await hash(password, 12);

    if (id) {
      user = await prisma.user.update({
        where: { id },
        data: {
          name,
          email: email.toLowerCase(),
          password: hashed_password,
          phone,
          roleId,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: hashed_password,
          phone,
          roleId,
        },
      });
    }

    return NextResponse.json({
      status: true,
      message: "ok",
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

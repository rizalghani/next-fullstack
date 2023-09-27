import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json({
      status: true,
      message: "ok",
      data: products,
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
    const { id, name, group } = (await req.json()) as {
      id?: number;
      name: string;
      group: string;
    };

    let product = null;

    if (id) {
      product = await prisma.product.update({
        where: { id },
        data: {
          name,
          group,
        },
      });
    } else {
      product = await prisma.product.create({
        data: {
          name,
          group,
        },
      });
    }

    return NextResponse.json({
      status: true,
      message: "ok",
      data: {
        name: product.name,
        group: product.group,
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

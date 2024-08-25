import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, isAdmin }: User = body;

    if (!name || !email || !password) {
      return NextResponse.json({
        status: 400,
        message: "Please provide all required credentials",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        status: 400,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("User registration error:", error);
    return NextResponse.json({
      status: 500,
      message: "Unable to register user",
    });
  }
}

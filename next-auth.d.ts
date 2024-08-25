import NextAuth from "next-auth";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    isAdmin?: boolean;
  }

  interface Session {
    user: User;
  }
}

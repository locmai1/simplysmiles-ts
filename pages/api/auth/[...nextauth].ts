import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z
    .string()
    .regex(
      /^(?:\w+|\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-z]{2,4})+)$/gm,
      "Invalid Email"
    ),
  password: z.string().min(6, "Password should be minimum 6 characters"),
});

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // CredentialsProvider({

    // })
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const loginUserSchema = z.object({
  email: z
    .string()
    .regex(
      /^(?:\w+|\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-z]{2,4})+)$/gm,
      "Invalid Email"
    ),
  password: z.string().min(6, "Password should be minimum 6 characters"),
});

export const authOptions: NextAuthOptions = {
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
    CredentialsProvider({
      credentials: {
        name: { type: "text", placeholder: "John Doe" },
        email: { type: "text", placeholder: "example@domain.com" },
        password: {
          type: "password",
          placeholder: "Must have at least 6 characters",
        },
      },
      async authorize(credentials) {
        const user = loginUserSchema.parse(credentials);

        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (!existingUser) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          user.password,
          existingUser.password
        );
        if (!validPassword) {
          return null;
        }

        return existingUser;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.email = (user as User).email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);

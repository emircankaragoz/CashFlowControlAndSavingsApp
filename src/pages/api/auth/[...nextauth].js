import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prismadb";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    // Google Provider
    /* GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_ID
        }), */
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // check user existance
        const result = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!result) {
          throw new Error("No user found, please sign up.");
        }

        // compare password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("User or password does not match!")
        }

        return result;
      },
    }),
  ],
  secret: `${process.env.SECRET}`,
});

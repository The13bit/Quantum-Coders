import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/utils/db";
import User from "@/app/models/User";
import { compare, hash } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // ...existing credentials config...
      async authorize(credentials) {
        try {
          await db();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) throw new Error("No user found!");

          const isValid = compare(
            await hash(
              credentials?.password,
              parseInt(process.env.BCRYPT_SALT)
            ),
            user.password
          );
          if (!isValid) throw new Error("Invalid password!");

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  skipCSRFCheck: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = token.user;
      console.log(session)
      
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        console.log(user)
        token.user = user;
      }
      return token;
    },
    async signIn() {
      return true;
    },
    async signOut() {
      return true;
    }
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };